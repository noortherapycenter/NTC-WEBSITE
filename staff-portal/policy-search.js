/* Keyword search inside a single policy page: highlights every match
   in the policy text with prev/next navigation. Injected into the
   .pol-actions bar — no per-page markup needed. */
(function () {
  'use strict';
  document.addEventListener('DOMContentLoaded', function () {
    var actions = document.querySelector('.pol-actions');
    var doc = document.querySelector('article.policy');
    if (!actions || !doc) return;

    var box = document.createElement('div');
    box.className = 'find-bar';
    box.innerHTML =
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"></circle><path d="m21 21-4.3-4.3"></path></svg>' +
      '<input type="search" placeholder="Search this policy\u2026" autocomplete="off"/>' +
      '<span class="fb-count"></span>' +
      '<button type="button" class="fb-prev" title="Previous match">&#8593;</button>' +
      '<button type="button" class="fb-next" title="Next match">&#8595;</button>';
    var back = actions.querySelector('#pol-back');
    if (back && back.nextSibling) actions.insertBefore(box, back.nextSibling);
    else actions.appendChild(box);

    var input = box.querySelector('input');
    var count = box.querySelector('.fb-count');
    var hits = [], cur = -1, timer = null;

    function clearHits() {
      hits.forEach(function (m) {
        var p = m.parentNode;
        p.replaceChild(document.createTextNode(m.textContent), m);
        p.normalize();
      });
      hits = []; cur = -1;
    }

    function mark(q) {
      var walker = document.createTreeWalker(doc, NodeFilter.SHOW_TEXT, null);
      var nodes = [], n;
      while ((n = walker.nextNode())) nodes.push(n);
      var lower = q.toLowerCase();
      nodes.forEach(function (node) {
        var text = node.nodeValue, i = text.toLowerCase().indexOf(lower);
        if (i === -1) return;
        var frag = document.createDocumentFragment(), pos = 0;
        while (i !== -1) {
          frag.appendChild(document.createTextNode(text.slice(pos, i)));
          var m = document.createElement('mark');
          m.className = 'find-hit';
          m.textContent = text.slice(i, i + q.length);
          frag.appendChild(m);
          hits.push(m);
          pos = i + q.length;
          i = text.toLowerCase().indexOf(lower, pos);
        }
        frag.appendChild(document.createTextNode(text.slice(pos)));
        node.parentNode.replaceChild(frag, node);
      });
    }

    function go(idx) {
      if (!hits.length) return;
      if (cur >= 0) hits[cur].classList.remove('current');
      cur = (idx + hits.length) % hits.length;
      var m = hits[cur];
      m.classList.add('current');
      count.textContent = (cur + 1) + ' / ' + hits.length;
      var y = m.getBoundingClientRect().top + window.pageYOffset - 130;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }

    function run() {
      clearHits();
      var q = input.value.trim();
      if (q.length < 2) { count.textContent = ''; return; }
      mark(q);
      if (hits.length) go(0);
      else count.textContent = '0 matches';
    }

    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(run, 250);
    });
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') { e.preventDefault(); e.shiftKey ? go(cur - 1) : go(cur + 1); }
    });
    box.querySelector('.fb-next').addEventListener('click', function () { go(cur + 1); });
    box.querySelector('.fb-prev').addEventListener('click', function () { go(cur - 1); });
  });
})();
