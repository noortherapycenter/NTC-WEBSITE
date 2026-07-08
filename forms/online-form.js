/* ============================================================
   Noor Therapy Center — online form engine
   Builds a PDF that mirrors the branded form layout (grid rows,
   checkbox marks, signature line) with the applicant's answers
   filled in — by rendering the filled sheet with html2canvas and
   paginating it onto Letter pages with jsPDF — then submits the
   PDF + field data to Netlify, which emails it.
   Depends on: jsPDF + html2canvas (loaded before this file).
   ============================================================ */
(function () {
  'use strict';

  var MUTE = [138, 148, 130];
  var DOTS = [[42,166,58],[241,138,44],[47,111,214],[155,81,199],[229,57,106]];
  var CHECK_SVG = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='20 6 9 17 4 12'/%3E%3C/svg%3E\")";

  function esc(s) { return String(s).replace(/[\\/:*?"<>|]+/g, '').trim(); }

  function buildFilename(form, title) {
    var f = (form.querySelector('[name="firstName"]') || {}).value || '';
    var l = (form.querySelector('[name="lastName"]') || {}).value || '';
    var who = (f + ' ' + l).trim();
    return esc(title + (who ? ' - ' + who : '')) + '.pdf';
  }

  function prettyDate(v) {
    if (!v) return '';
    var p = v.split('-');
    return (p.length === 3) ? (p[1] + '/' + p[2] + '/' + p[0]) : v;
  }

  function displayValue(el) {
    if (el.tagName === 'SELECT') {
      var o = el.options[el.selectedIndex];
      return o ? o.textContent.trim() : '';
    }
    var v = (el.value || '').trim();
    if (el.type === 'date') v = prettyDate(v);
    return v;
  }

  // Build an off-screen, print-styled clone of the filled form.
  function buildCaptureNode(form) {
    var clone = form.cloneNode(true);

    // sync live values onto the clone (cloneNode doesn't carry them)
    var src = form.querySelectorAll('input, textarea, select');
    var dst = clone.querySelectorAll('input, textarea, select');
    src.forEach(function (s, i) {
      var d = dst[i];
      if (!d) return;
      if (s.type === 'checkbox' || s.type === 'radio') {
        d.checked = s.checked;
        if (s.checked) d.setAttribute('checked', 'checked'); else d.removeAttribute('checked');
      } else if (d.tagName === 'SELECT') {
        d.selectedIndex = s.selectedIndex;
      } else {
        d.setAttribute('value', s.value);
        d.value = s.value;
        if (d.tagName === 'TEXTAREA') d.textContent = s.value;
      }
    });

    clone.classList.add('capturing');
    clone.style.width = '816px';
    clone.style.maxWidth = '816px';

    // strip plumbing that shouldn't render
    clone.querySelectorAll('.vh, .no-capture, .actions').forEach(function (n) { n.remove(); });

    // replace text inputs / textareas / selects with a filled "line" value
    clone.querySelectorAll('.field input:not([type=radio]):not([type=checkbox]), .field textarea, .field select').forEach(function (el) {
      var v = displayValue(el);
      var div = document.createElement('div');
      div.className = 'pdf-val' + (v ? '' : ' empty');
      if (el.name === 'signature') div.className += ' sig';
      div.textContent = v || '\u00a0';
      el.parentNode.replaceChild(div, el);
    });

    // make selected radios/checkboxes render their mark reliably in html2canvas
    clone.querySelectorAll('.opt').forEach(function (opt) {
      var input = opt.querySelector('input');
      var mark = opt.querySelector('.mark');
      if (!input || !mark) return;
      if (input.checked) {
        opt.style.borderColor = '#2aa63a';
        opt.style.background = 'rgba(42,166,58,0.08)';
        mark.style.borderColor = '#2aa63a';
        mark.style.backgroundColor = '#2aa63a';
        mark.style.backgroundImage = CHECK_SVG;
        mark.style.backgroundRepeat = 'no-repeat';
        mark.style.backgroundPosition = 'center';
        mark.style.backgroundSize = '14px 14px';
      } else {
        opt.style.opacity = '0.55';
      }
    });

    return clone;
  }

  function waitImages(node) {
    var imgs = Array.prototype.slice.call(node.querySelectorAll('img'));
    return Promise.all(imgs.map(function (img) {
      if (img.complete && img.naturalWidth) return Promise.resolve();
      return new Promise(function (res) { img.onload = img.onerror = res; });
    }));
  }

  async function makePdfBlob(form, opts) {
    var clone = buildCaptureNode(form);
    var wrap = document.createElement('div');
    wrap.style.cssText = 'position:fixed;left:-10000px;top:0;width:816px;background:#fff;z-index:-1;';
    wrap.appendChild(clone);
    document.body.appendChild(wrap);

    try { await document.fonts.ready; } catch (e) {}
    await waitImages(clone);

    var canvas = await html2canvas(clone, {
      scale: 2, backgroundColor: '#ffffff', useCORS: true,
      windowWidth: 816, width: 816, scrollX: 0, scrollY: 0
    });
    document.body.removeChild(wrap);

    var jsPDFctor = (window.jspdf && window.jspdf.jsPDF) || window.jsPDF;
    var doc = new jsPDFctor({ unit: 'pt', format: 'letter', compress: true });
    var PW = 612, PH = 792, M = 30, FOOT = 22;
    var imgW = PW - M * 2;
    var pxPerPt = canvas.width / imgW;
    var pageHpx = (PH - M * 2 - FOOT) * pxPerPt;

    var pages = Math.max(1, Math.ceil(canvas.height / pageHpx));
    var stamp = new Date().toLocaleString();

    for (var pg = 0; pg < pages; pg++) {
      if (pg > 0) doc.addPage();
      var sy = pg * pageHpx;
      var sliceH = Math.min(pageHpx, canvas.height - sy);
      var slice = document.createElement('canvas');
      slice.width = canvas.width;
      slice.height = sliceH;
      slice.getContext('2d').drawImage(canvas, 0, sy, canvas.width, sliceH, 0, 0, canvas.width, sliceH);
      doc.addImage(slice.toDataURL('image/jpeg', 0.9), 'JPEG', M, M, imgW, sliceH / pxPerPt);

      // footer
      var fy = PH - 18;
      doc.setFont('helvetica', 'normal'); doc.setFontSize(7.5);
      doc.setTextColor(MUTE[0], MUTE[1], MUTE[2]);
      doc.text('Noor Therapy Center · ' + opts.title + ' · Submitted ' + stamp, M, fy);
      doc.text('Page ' + (pg + 1) + ' of ' + pages, PW - M, fy, { align: 'right' });
      var dx = PW / 2 - 22;
      DOTS.forEach(function (c, i) { doc.setFillColor(c[0], c[1], c[2]); doc.circle(dx + i * 11, fy - 2.4, 2.2, 'F'); });
    }

    return doc.output('blob');
  }

  var ICON_CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';
  var ICON_MAIL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>';
  var ICON_DL = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><path d="M12 15V3"/></svg>';

  function showDone(opts, ok, blobUrl, filename) {
    var host = document.querySelector(opts.form).closest('.page') || document.body;
    var sheet = document.querySelector(opts.sheet);
    if (sheet) sheet.style.display = 'none';
    var green = '#2aa63a', berry = '#e5396a';
    var card = document.createElement('div');
    card.className = 'done-card';
    if (ok) {
      card.innerHTML =
        '<div class="ic" style="background:color-mix(in srgb,' + green + ' 16%,#fff);color:' + green + '">' + ICON_CHECK + '</div>' +
        '<h2>All set — thank you!</h2>' +
        '<p>Your ' + opts.label + ' was sent to <strong>Noor Therapy Center</strong> as a PDF. We received it and will follow up soon.</p>' +
        (blobUrl ? '<a class="dl" href="' + blobUrl + '" download="' + filename + '">' + ICON_DL + 'Download your copy</a>' : '') +
        '<div class="dots"><span style="background:#2aa63a"></span><span style="background:#f18a2c"></span><span style="background:#2f6fd6"></span><span style="background:#9b51c7"></span><span style="background:#e5396a"></span></div>';
    } else {
      var subject = encodeURIComponent(opts.label + ' — submission');
      var body = encodeURIComponent('Hi Noor Therapy Center,\n\nMy ' + opts.label.toLowerCase() + ' is attached as a PDF (downloaded to my device).\n\nThank you.');
      card.innerHTML =
        '<div class="ic" style="background:color-mix(in srgb,' + berry + ' 16%,#fff);color:' + berry + '">' + ICON_MAIL + '</div>' +
        '<h2>Almost there</h2>' +
        '<p>We couldn\'t submit automatically, but your PDF is ready. Download it, then email it to us and we\'ll take it from there.</p>' +
        (blobUrl ? '<a class="dl" href="' + blobUrl + '" download="' + filename + '" style="margin-bottom:12px">' + ICON_DL + 'Download your PDF</a><br/>' : '') +
        '<a class="dl" href="mailto:info@noortherapycenter.com?subject=' + subject + '&body=' + body + '" style="background:' + berry + '">' + ICON_MAIL + 'Email info@noortherapycenter.com</a>';
    }
    host.appendChild(card);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function init(opts) {
    var form = document.querySelector(opts.form);
    if (!form) { console.error('NoorForm: form not found', opts); return; }
    opts.kicker = opts.kicker || opts.title;
    var btn = form.querySelector('[type="submit"]');
    var label = btn ? btn.textContent : 'Submit';

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (btn) { btn.disabled = true; btn.textContent = 'Preparing your PDF…'; }

      var blob = null, blobUrl = null;
      var filename = buildFilename(form, opts.title);
      try { blob = await makePdfBlob(form, opts); } catch (err) { console.error('PDF generation failed', err); }

      if (btn) btn.textContent = 'Sending…';
      var ok = false;
      try {
        var fd = new FormData(form);
        fd.set('form-name', opts.netlifyName);
        if (blob) fd.set('submission', blob, filename);
        var res = await fetch('/', { method: 'POST', body: fd });
        ok = res.ok;
      } catch (err) { console.error('Submit failed', err); ok = false; }

      if (blob) blobUrl = URL.createObjectURL(blob);
      if (btn) { btn.disabled = false; btn.textContent = label; }
      showDone(opts, ok, blobUrl, filename);
    });
  }

  window.NoorForm = { init: init };
})();
