/* Noor Therapy Center — built-in site translation (no Google).
   How it works:
   - The language picker stores the choice in localStorage ('noor_lang') and reloads the page.
   - On load, if the language isn't English, this script loads the matching dictionary
     (src/lang/so.js / ar.js / es.js) and swaps every known English text node for its translation.
   - A MutationObserver re-applies translations whenever React re-renders (page navigation).
   - Arabic also flips the page to right-to-left.
   Anything not in the dictionary simply stays in English. */
(function () {
  var MAP = { EN: 'en', SO: 'so', AR: 'ar', ES: 'es' };
  var code = 'en';
  try { code = MAP[localStorage.getItem('noor_lang')] || 'en'; } catch (e) {}

  // Called by the language picker in the nav.
  window.setNoorLang = function (c) {
    try { localStorage.setItem('noor_lang', String(c || 'en').toUpperCase()); } catch (e) {}
    location.reload();
  };

  if (code === 'en') return;

  document.documentElement.setAttribute('lang', code);
  if (code === 'ar') document.documentElement.setAttribute('dir', 'rtl');

  var DICT = null;
  var SKIP = { SCRIPT: 1, STYLE: 1, TEXTAREA: 1, INPUT: 1, SELECT: 1, NOSCRIPT: 1 };

  function norm(s) { return s.replace(/\s+/g, ' ').trim(); }

  function translateTextNode(t) {
    var raw = t.nodeValue;
    if (!raw || !raw.trim()) return;
    var tr = DICT[norm(raw)];
    if (tr === undefined) return;
    var lead = raw.match(/^\s*/)[0];
    var tail = raw.match(/\s*$/)[0];
    var next = lead + tr + tail;
    if (t.nodeValue !== next) t.nodeValue = next;
  }

  function skipEl(el) {
    if (!el) return true;
    if (SKIP[el.tagName]) return true;
    if (el.closest && el.closest('.notranslate,[translate="no"]')) return true;
    return false;
  }

  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) {
      if (!skipEl(root.parentElement)) translateTextNode(root);
      return;
    }
    if (root.nodeType !== 1 || skipEl(root)) return;
    var w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        return skipEl(n.parentElement) ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT;
      }
    });
    var n;
    while ((n = w.nextNode())) translateTextNode(n);
  }

  var pending = false;
  function scheduleWalk() {
    if (pending) return;
    pending = true;
    requestAnimationFrame(function () {
      pending = false;
      walk(document.body);
    });
  }

  function start() {
    walk(document.body);
    // Re-translate after every React render. Our own text writes trigger the
    // observer once more, but translated text no longer matches any dictionary
    // key, so the pass makes no changes and the loop settles immediately.
    new MutationObserver(scheduleWalk).observe(document.body, {
      childList: true, subtree: true, characterData: true
    });
  }

  var s = document.createElement('script');
  s.src = 'src/lang/' + code + '.js';
  s.onload = function () {
    DICT = window.NOOR_I18N || {};
    if (document.body) start();
    else document.addEventListener('DOMContentLoaded', start);
  };
  s.onerror = function () { /* dictionary missing — leave the site in English */ };
  document.head.appendChild(s);
})();
