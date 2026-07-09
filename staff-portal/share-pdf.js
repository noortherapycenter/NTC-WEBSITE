/* Noor Therapy Center — shared "share as PDF" helper for the admin portal.
   Builds real text-based PDFs (pdfmake) from policy/handbook DOM content,
   then hands the file to the device share sheet, or downloads it. */
window.NoorPdf = (function () {
  var libP = null;
  function load() {
    if (libP) return libP;
    libP = new Promise(function (res, rej) {
      function add(src, cb) {
        var s = document.createElement('script');
        s.src = src;
        s.onload = cb;
        s.onerror = function () { libP = null; rej(new Error('load ' + src)); };
        document.head.appendChild(s);
      }
      add('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/pdfmake.min.js', function () {
        add('https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.2.7/vfs_fonts.js', res);
      });
    });
    return libP;
  }

  var GREEN = '#2aa63a', INK = '#1f2e1a', BODY = '#2c3826', MUTED = '#6b7263', LINE = '#ddd8c4';
  var DOTS = ['#2aa63a', '#f18a2c', '#2f6fd6', '#9b51c7', '#e5396a'];
  var W = 515; // usable width at our margins

  var logoP = null;
  function loadLogo() {
    if (logoP) return logoP;
    logoP = new Promise(function (res) {
      var img = new Image();
      img.onload = function () {
        try {
          var c = document.createElement('canvas');
          c.width = img.naturalWidth; c.height = img.naturalHeight;
          c.getContext('2d').drawImage(img, 0, 0);
          res(c.toDataURL('image/png'));
        } catch (e) { res(null); }
      };
      img.onerror = function () { res(null); };
      img.src = 'noor-mark.png';
    });
    return logoP;
  }

  function dotsRow(margin, width) {
    return {
      canvas: DOTS.map(function (c, i) {
        return { type: 'ellipse', x: 4 + i * 13, y: 3, r1: 3, r2: 3, color: c };
      }),
      width: width || 'auto',
      margin: margin || [0, 0, 0, 0]
    };
  }

  function txt(el) { return el.textContent.replace(/\s+/g, ' ').trim(); }

  function listItems(el) {
    return [].slice.call(el.children).filter(function (c) { return c.tagName === 'LI'; }).map(function (li) {
      return { text: txt(li), fontSize: 9.5, color: BODY, lineHeight: 1.4, margin: [0, 0, 0, 3] };
    });
  }

  function convert(el, out) {
    [].slice.call(el.children).forEach(function (node) {
      if (node.hidden) return;
      var tag = node.tagName;
      var cls = (typeof node.className === 'string' ? node.className : '') || '';
      if (/\bkicker\b|\bhb-secnum\b/.test(cls)) {
        out.push({ text: txt(node).toUpperCase(), color: GREEN, bold: true, fontSize: 8, characterSpacing: 1, margin: [0, 0, 0, 4], headlineLevel: 1 });
        return;
      }
      if (/\bpol-meta\b/.test(cls)) {
        out.push({ text: txt(node), color: MUTED, fontSize: 8.5, margin: [0, 0, 0, 10] });
        out.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 0.75, lineColor: LINE }], margin: [0, 0, 0, 12] });
        return;
      }
      if (tag === 'H1') { out.push({ text: txt(node), fontSize: 19, bold: true, color: INK, margin: [0, 0, 0, 8], headlineLevel: 1 }); return; }
      if (tag === 'H2') { out.push({ text: txt(node), fontSize: 12.5, bold: true, color: INK, margin: [0, 14, 0, 5], headlineLevel: 1 }); return; }
      if (tag === 'H3') {
        var sp3 = node.querySelector('span');
        if (sp3) {
          var clone = node.cloneNode(true);
          clone.querySelector('span').remove();
          out.push({ text: [{ text: txt(sp3) + '  ', color: GREEN }, { text: txt(clone) }], fontSize: 10.5, bold: true, color: INK, margin: [0, 10, 0, 4], headlineLevel: 1 });
        } else {
          out.push({ text: txt(node), fontSize: 10.5, bold: true, color: INK, margin: [0, 10, 0, 4], headlineLevel: 1 });
        }
        return;
      }
      if (tag === 'P') { var t = txt(node); if (t) out.push({ text: t, fontSize: 9.5, color: BODY, lineHeight: 1.45, margin: [0, 0, 0, 6] }); return; }
      if (tag === 'UL') { out.push({ ul: listItems(node), margin: [6, 0, 0, 8] }); return; }
      if (tag === 'OL') { out.push({ ol: listItems(node), margin: [6, 0, 0, 8] }); return; }
      if (/\bsig-grid\b/.test(cls)) {
        var cols = [].slice.call(node.children).map(function (f) {
          var label = f.querySelector('label');
          return {
            stack: [
              { canvas: [{ type: 'line', x1: 0, y1: 0, x2: 140, y2: 0, lineWidth: 1, lineColor: INK }], margin: [0, 26, 0, 3] },
              { text: label ? txt(label).toUpperCase() : '', fontSize: 7, bold: true, color: MUTED, characterSpacing: 0.5 }
            ],
            width: '*', margin: [0, 0, 14, 0]
          };
        });
        out.push({ columns: cols, margin: [0, 10, 0, 0] });
        return;
      }
      if (/\bsig-block\b/.test(cls)) {
        out.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 1.5, lineColor: INK }], margin: [0, 16, 0, 10] });
        convert(node, out);
        return;
      }
      if (node.children && node.children.length) { convert(node, out); return; }
      var t2 = txt(node);
      if (t2) out.push({ text: t2, fontSize: 9.5, color: BODY, lineHeight: 1.45, margin: [0, 0, 0, 6] });
    });
  }

  function build(opts, logo) {
    var hasCover = opts.nodes.length > 1;
    var content = [];
    if (hasCover) {
      /* Cover page for multi-section documents (the handbook) */
      content.push({ text: '', margin: [0, 130, 0, 0] });
      if (logo) content.push({ image: logo, width: 72, alignment: 'center', margin: [0, 0, 0, 24] });
      content.push({ text: 'NOOR THERAPY CENTER', alignment: 'center', color: GREEN, bold: true, fontSize: 10, characterSpacing: 2.5, margin: [0, 0, 0, 10] });
      content.push({ text: opts.title, alignment: 'center', color: INK, bold: true, fontSize: 30, margin: [0, 0, 0, 18] });
      content.push({
        canvas: DOTS.map(function (c, i) {
          return { type: 'ellipse', x: (W / 2) - 26 + i * 13, y: 3, r1: 3, r2: 3, color: c };
        }),
        margin: [0, 0, 0, 18]
      });
      content.push({
        text: (opts.version ? 'Version ' + opts.version + ' \u00b7 ' : '') + new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        alignment: 'center', color: MUTED, fontSize: 9.5
      });
      content.push({
        text: '6250 Excelsior Blvd, Suite 102 \u00b7 St. Louis Park, MN 55416\n(612) 703-9022 \u00b7 info@noortherapycenter.com',
        alignment: 'center', color: MUTED, fontSize: 8.5, lineHeight: 1.5, margin: [0, 200, 0, 0]
      });
    } else {
      /* Compact branded masthead for single documents (policies) */
      content.push({
        columns: [
          logo ? { image: logo, width: 30, margin: [0, 0, 10, 0] } : { text: '', width: 0 },
          {
            stack: [
              { text: 'Noor Therapy Center', bold: true, fontSize: 13, color: INK },
              { text: (opts.kicker || '').toUpperCase(), color: GREEN, bold: true, fontSize: 7.5, characterSpacing: 1.2, margin: [0, 2, 0, 0] }
            ],
            margin: [0, 3, 0, 0]
          },
          dotsRow([0, 12, 0, 0], 80)
        ]
      });
      content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 2, lineColor: GREEN }], margin: [0, 10, 0, 16] });
    }
    opts.nodes.forEach(function (el, i) {
      var start = content.length;
      convert(el, content);
      /* Each section starts on a fresh page instead of running into the previous one */
      if ((i > 0 || hasCover) && content.length > start) content[start].pageBreak = 'before';
    });
    return {
      pageSize: 'LETTER',
      pageMargins: [46, 42, 46, 48],
      content: content,
      footer: function (cur, total) {
        if (hasCover && cur === 1) return null;
        return {
          columns: [
            { text: 'Noor Therapy Center \u00b7 ' + (opts.kicker || ''), fontSize: 7.5, color: MUTED, width: '*' },
            dotsRow([0, 1, 0, 0], 60),
            { text: cur + ' / ' + total, alignment: 'right', fontSize: 7.5, color: MUTED }
          ],
          margin: [46, 16, 46, 0]
        };
      },
      defaultStyle: { lineHeight: 1.2 },
      /* Never leave a heading stranded at the bottom of a page */
      pageBreakBefore: function (currentNode, followingNodesOnPage) {
        return currentNode.headlineLevel === 1 && followingNodesOnPage.length === 0;
      }
    };
  }

  /* opts: { title, kicker, filename, nodes: [Element] } */
  function share(opts) {
    return Promise.all([load(), loadLogo()]).then(function (r) {
      var dd = build(opts, r[1]);
      return new Promise(function (resolve) { pdfMake.createPdf(dd).getBlob(resolve); });
    }).then(function (blob) {
      var file = new File([blob], opts.filename, { type: 'application/pdf' });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        return navigator.share({ files: [file], title: opts.title }).catch(function () {});
      }
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = opts.filename;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
    });
  }

  return { share: share };
})();
