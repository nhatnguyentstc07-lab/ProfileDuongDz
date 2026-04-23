// ============================================
//  NHẬT — Portfolio Script
// ============================================

(function () {
  'use strict';

  // ── CURSOR ──
  const cursor    = document.getElementById('cursor');
  const cursorRing = document.getElementById('cursorRing');
  let mx = 0, my = 0, cx = 0, cy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    cursorRing.style.left = mx + 'px';
    cursorRing.style.top  = my + 'px';
  });

  (function tickCursor() {
    cx += (mx - cx) * 0.14;
    cy += (my - cy) * 0.14;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(tickCursor);
  })();

  // ── NAV SCROLL ──
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
  window.addEventListener('scroll', onScroll, { passive: true });

  // ── MOBILE MENU ──
  const toggle    = document.getElementById('menuToggle');
  const menu      = document.getElementById('mobileMenu');
  const closeBtn  = document.getElementById('mobileClose');
  const mlinks    = document.querySelectorAll('.mlink');

  function openMenu()  { menu.classList.add('open');    document.body.style.overflow = 'hidden'; }
  function closeMenu() { menu.classList.remove('open'); document.body.style.overflow = ''; }

  toggle.addEventListener('click', openMenu);
  closeBtn.addEventListener('click', closeMenu);
  mlinks.forEach(l => l.addEventListener('click', closeMenu));

  // ── SMOOTH SCROLL ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // ── SKILL BARS ──
  const fills = document.querySelectorAll('.sk-fill');
  const skillObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.width = entry.target.dataset.p + '%';
        skillObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  fills.forEach(f => skillObs.observe(f));

  // ── SCROLL REVEAL ──
  const revealEls = document.querySelectorAll(
    '.sk, .sc, .ptile, .titem, .ccard, .vlist li'
  );
  revealEls.forEach(el => el.classList.add('reveal'));

  const revealObs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = Array.from(entry.target.parentElement.children);
        const idx = siblings.indexOf(entry.target);
        entry.target.style.transitionDelay = (idx * 0.055) + 's';
        entry.target.classList.add('in');
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObs.observe(el));

  // ── ACTIVE NAV ──
  const sections  = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-links a');
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => {
          l.style.color = l.getAttribute('href') === '#' + e.target.id
            ? 'var(--ink)' : '';
        });
      }
    });
  }, { threshold: 0.45 });
  sections.forEach(s => secObs.observe(s));

  console.log('%c NH. %c Portfolio ready', 
    'background:#1c1b18;color:#f4f2ee;padding:3px 8px;border-radius:4px;font-weight:500;',
    'color:#1c1b18;');
})();
