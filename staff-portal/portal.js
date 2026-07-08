/* Noor Therapy Center — Admin Portal guard + shared behavior */
(function () {
  'use strict';
  var KEY = 'noor-admin-auth';
  var THEME = 'noor-portal-theme';
  var script = document.currentScript;
  var root = (script && script.getAttribute('data-root')) || '.';

  // Apply saved theme before first paint, and re-sync whenever the user
  // returns to an already-open tab or flips the toggle on another page.
  function applyTheme() {
    var dark = false;
    try { dark = localStorage.getItem(THEME) === 'dark'; } catch (e) {}
    if (dark) document.documentElement.setAttribute('data-theme', 'dark');
    else document.documentElement.removeAttribute('data-theme');
    var t = document.querySelector('.theme-toggle');
    if (t) {
      t.textContent = dark ? '\u2600' : '\u263E';
      t.title = dark ? 'Switch to light mode' : 'Switch to dark mode';
    }
  }
  applyTheme();
  window.addEventListener('storage', applyTheme);
  window.addEventListener('pageshow', applyTheme);
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) applyTheme();
  });

  // Synchronous auth check while the page is still parsing — no hidden
  // flash, no delay for authorized users.
  var authed = false;
  try { authed = sessionStorage.getItem(KEY) === '1'; } catch (e) {}
  if (!authed) {
    document.documentElement.style.visibility = 'hidden';
    location.replace(root + '/admin.html');
    return;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var lock = document.querySelector('.lock');
    if (lock) {
      // "Back to main website" button, before the theme toggle (icon only)
      var site = document.createElement('a');
      site.className = 'site-link';
      site.href = root + '/index.html';
      site.title = 'Back to the main Noor Therapy Center website';
      site.setAttribute('aria-label', 'Back to main website');
      site.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18z"/></svg>';
      lock.parentNode.insertBefore(site, lock);

      // Lock becomes an icon button too
      lock.title = 'Lock the portal';
      lock.setAttribute('aria-label', 'Lock the portal');
      lock.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>';
      lock.classList.add('iconbtn');

      // Dark mode toggle, inserted before the Lock button on every page
      var t = document.createElement('button');
      t.type = 'button';
      t.className = 'theme-toggle';
      t.addEventListener('click', function () {
        var dark = document.documentElement.getAttribute('data-theme') === 'dark';
        try { localStorage.setItem(THEME, dark ? 'light' : 'dark'); } catch (e) {}
        applyTheme();
      });
      lock.parentNode.insertBefore(t, lock);
      applyTheme();

      lock.addEventListener('click', function () {
        try { sessionStorage.removeItem(KEY); } catch (e) {}
        location.href = root + '/admin.html';
      });
    }
  });
})();
