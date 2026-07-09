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
  var W = 515; // usable width at our margins

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
        out.push({ text: txt(node).toUpperCase(), color: GREEN, bold: true, fontSize: 8, characterSpacing: 1, margin: [0, 0, 0, 4] });
        return;
      }
      if (/\bpol-meta\b/.test(cls)) {
        out.push({ text: txt(node), color: MUTED, fontSize: 8.5, margin: [0, 0, 0, 10] });
        out.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 0.75, lineColor: LINE }], margin: [0, 0, 0, 12] });
        return;
      }
      if (tag === 'H1') { out.push({ text: txt(node), fontSize: 19, bold: true, color: INK, margin: [0, 0, 0, 8] }); return; }
      if (tag === 'H2') { out.push({ text: txt(node), fontSize: 12.5, bold: true, color: INK, margin: [0, 14, 0, 5] }); return; }
      if (tag === 'H3') { out.push({ text: txt(node), fontSize: 10.5, bold: true, color: INK, margin: [0, 10, 0, 4] }); return; }
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

  function build(opts) {
    var content = [
      {
        columns: [
          { text: 'Noor Therapy Center', bold: true, fontSize: 12, color: INK },
          { text: (opts.kicker || '').toUpperCase(), alignment: 'right', color: GREEN, bold: true, fontSize: 8, characterSpacing: 1, margin: [0, 3, 0, 0] }
        ]
      },
      { canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 2, lineColor: INK }], margin: [0, 8, 0, 16] }
    ];
    opts.nodes.forEach(function (el, i) {
      if (i > 0) content.push({ canvas: [{ type: 'line', x1: 0, y1: 0, x2: W, y2: 0, lineWidth: 1.5, lineColor: INK }], margin: [0, 18, 0, 14] });
      convert(el, content);
    });
    return {
      pageSize: 'LETTER',
      pageMargins: [46, 42, 46, 48],
      content: content,
      footer: function (cur, total) {
        return {
          columns: [
            { text: 'Noor Therapy Center \u00b7 ' + (opts.kicker || ''), fontSize: 7.5, color: MUTED },
            { text: cur + ' / ' + total, alignment: 'right', fontSize: 7.5, color: MUTED }
          ],
          margin: [46, 16, 46, 0]
        };
      },
      defaultStyle: { lineHeight: 1.2 }
    };
  }

  /* opts: { title, kicker, filename, nodes: [Element] } */
  function share(opts) {
    return load().then(function () {
      var dd = build(opts);
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
