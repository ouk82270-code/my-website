/* ============================================================
   site.js — shared across all pages
   Features: lightbox, scroll-reveal with stagger
   No dependencies. Pure vanilla JS.
============================================================ */
(function () {
  'use strict';

  /* ---------- Lightbox ---------- */
  function initLightbox() {
    const overlay = document.createElement('div');
    overlay.id = 'lb-overlay';
    overlay.innerHTML =
      '<div id="lb-inner"><img id="lb-img" src="" alt=""><button id="lb-close" aria-label="Close">✕</button></div>';
    document.body.appendChild(overlay);

    const img = document.getElementById('lb-img');

    function open(src) {
      img.src = src;
      overlay.classList.add('lb-active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      overlay.classList.remove('lb-active');
      document.body.style.overflow = '';
      setTimeout(function () { img.src = ''; }, 320);
    }

    overlay.addEventListener('click', function (e) { if (e.target === overlay) close(); });
    document.getElementById('lb-close').addEventListener('click', close);
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });

    document.querySelectorAll('.project-img, .achievement-img').forEach(function (el) {
      el.style.cursor = 'zoom-in';
      el.addEventListener('click', function () { open(el.src); });
    });
  }

  /* ---------- Scroll Reveal ---------- */
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    var selectors = [
      '.card', '.content-card', '.achievement-card',
      '.achievement-item', '.scroll-card', '.profile'
    ];
    var targets = document.querySelectorAll(selectors.join(', '));

    targets.forEach(function (el, i) {
      el.classList.add('sr-hidden');
      el.style.setProperty('--sr-i', String(i % 6));
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.remove('sr-hidden');
          entry.target.classList.add('sr-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' });

    targets.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Init ---------- */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      initLightbox();
      initScrollReveal();
    });
  } else {
    initLightbox();
    initScrollReveal();
  }
})();
