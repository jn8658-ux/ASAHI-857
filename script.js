/* 朝日綠源 857号 · 产品站交互 */
(function () {
  'use strict';

  /* ── sticky header shadow ── */
  var hdr = document.getElementById('hdr');
  var onScroll = function () {
    if (window.scrollY > 8) hdr.classList.add('scrolled');
    else hdr.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ── mobile menu ── */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');
  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('on');
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  nav.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') {
      nav.classList.remove('on');
      burger.classList.remove('on');
    }
  });

  /* ── reveal on scroll ── */
  var items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          io.unobserve(en.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('in'); });
  }

  /* ── image lightbox for case gallery ── */
  var lb = document.getElementById('lb');
  var lbImg = lb.querySelector('img');
  var close = function () { lb.classList.remove('on'); document.body.style.overflow = ''; };

  document.querySelectorAll('[data-zoom]').forEach(function (fig) {
    fig.addEventListener('click', function () {
      var src = fig.querySelector('img');
      if (!src) return;
      lbImg.src = src.currentSrc || src.src;
      lbImg.alt = src.alt || '';
      lb.classList.add('on');
      document.body.style.overflow = 'hidden';
    });
  });
  lb.addEventListener('click', close);
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
})();
