/* ============================================================
   VOIDFORGE SYSTEMS — Core Interactions  (performance pass)
   ------------------------------------------------------------
   Principles:
   - Animate ONLY transform / opacity (compositor-only).
   - NEVER call getBoundingClientRect() inside a mousemove. Cache
     the rect once on mouseenter and reuse it.
   - Batch every style write inside a single requestAnimationFrame
     so we never read-then-write-then-read in the same frame
     (which forces synchronous layout = the classic "laggy" feel).
   - Disable the heavy pointer effects on touch / coarse pointers
     and when the user prefers reduced motion.
   ============================================================ */

(() => {
  'use strict';

  const mqFine   = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  const mqReduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const POINTER_FX = mqFine && !mqReduce;   // master switch for cursor / tilt / magnetic

  // ---------- Loader ----------
  window.addEventListener('load', () => {
    setTimeout(() => {
      const loader = document.querySelector('.nf-loader');
      if (loader) loader.classList.add('hidden');
    }, 500);
  });

  // ---------- Kill stray middle-click autoscroll ----------
  // A scroll-wheel (middle button) click puts the browser into "autoscroll"
  // mode — the page drifts down when the cursor sits low and up when it sits
  // high. That's what was randomly scrolling the page on click. We cancel it
  // for clicks on empty space / cards, but leave real links & buttons alone so
  // middle-click-to-open-in-new-tab still works exactly as expected.
  document.addEventListener('mousedown', (e) => {
    if (e.button === 1 && !(e.target.closest && e.target.closest('a, button, [role="button"], input, textarea, select'))) {
      e.preventDefault();
    }
  }, false);

  // ---------- Custom Cursor ----------
  // Only on real mice. A trailing cursor on touch / reduced-motion just
  // reads as lag, so we skip it entirely there and let the OS cursor show.
  if (POINTER_FX) {
    const cursor = document.createElement('div');
    cursor.className = 'nf-cursor';
    const cursorRing = document.createElement('div');
    cursorRing.className = 'nf-cursor-ring';
    document.body.appendChild(cursor);
    document.body.appendChild(cursorRing);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;            // smoothed ring only (dot is instant)
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      // Dot tracks the pointer with zero lag (transform write only).
      cursor.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      if (!visible) {
        visible = true;
        rx = mx; ry = my;            // snap ring on first appearance
        cursor.style.opacity = '1';
        cursorRing.style.opacity = '1';
      }
    }, { passive: true });

    // Single rAF drives ONLY the ring (snappier 0.3 follow — no sluggish trail).
    (function ring() {
      rx += (mx - rx) * 0.3;
      ry += (my - ry) * 0.3;
      cursorRing.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(ring);
    })();

    const HOVER_SEL = 'a, button, .interactive, input, select, textarea, .glass-hover, .nf-product-card, .nf-feature-card, .nf-spec-row, [data-magnetic]';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        cursor.classList.add('hovering'); cursorRing.classList.add('hovering');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest && e.target.closest(HOVER_SEL)) {
        cursor.classList.remove('hovering'); cursorRing.classList.remove('hovering');
      }
    });
    document.addEventListener('mousedown', () => { cursor.classList.add('clicking'); cursorRing.classList.add('clicking'); });
    document.addEventListener('mouseup',   () => { cursor.classList.remove('clicking'); cursorRing.classList.remove('clicking'); });
    document.addEventListener('mouseleave',() => { cursor.style.opacity = '0'; cursorRing.style.opacity = '0'; visible = false; });
  }

  // ---------- Nav scroll state ----------
  const nav = document.querySelector('.nf-nav');
  let navTick = false;
  window.addEventListener('scroll', () => {
    if (navTick) return;
    navTick = true;
    requestAnimationFrame(() => {
      if (window.scrollY > 20) nav?.classList.add('scrolled');
      else nav?.classList.remove('scrolled');
      navTick = false;
    });
  }, { passive: true });

  // ---------- Mobile nav toggle ----------
  (function mobileNav() {
    const toggle = document.querySelector('.nf-nav-toggle');
    if (!nav || !toggle) return;
    const close = () => { nav.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); };
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('.nf-nav-link, .nf-nav-cta a').forEach(a => a.addEventListener('click', close));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(); });
  })();

  // ---------- Fade up observer ----------
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.fade-up').forEach(el => io.observe(el));

  // ---------- Reactive hover light (--mx/--my) ----------
  // Rect cached on enter; write batched in rAF. No layout reads on move.
  document.querySelectorAll('.hover-light, .btn').forEach(el => {
    let rect = null, raf = 0, px = 50, py = 50;
    el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); }, { passive: true });
    el.addEventListener('mousemove', (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      px = ((e.clientX - rect.left) / rect.width) * 100;
      py = ((e.clientY - rect.top) / rect.height) * 100;
      if (!raf) raf = requestAnimationFrame(() => {
        raf = 0;
        el.style.setProperty('--mx', px + '%');
        el.style.setProperty('--my', py + '%');
      });
    }, { passive: true });
    el.addEventListener('mouseleave', () => { rect = null; }, { passive: true });
  });

  // ---------- Magnetic buttons ----------
  if (POINTER_FX) {
    document.querySelectorAll('.magnetic').forEach(el => {
      let rect = null, raf = 0, tx = 0, ty = 0;
      el.addEventListener('mouseenter', () => { rect = el.getBoundingClientRect(); }, { passive: true });
      el.addEventListener('mousemove', (e) => {
        if (!rect) rect = el.getBoundingClientRect();
        tx = (e.clientX - rect.left - rect.width / 2) * 0.2;
        ty = (e.clientY - rect.top - rect.height / 2) * 0.25;
        if (!raf) raf = requestAnimationFrame(() => {
          raf = 0; el.style.transform = `translate(${tx}px, ${ty}px)`;
        });
      }, { passive: true });
      el.addEventListener('mouseleave', () => { rect = null; el.style.transform = ''; }, { passive: true });
    });
  }

  // ---------- Counters ----------
  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split('.')[1] || '').length;
      const duration = 1800, start = performance.now();
      (function tick(now) {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 4);
        const val = target * eased;
        el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val).toLocaleString();
        if (t < 1) requestAnimationFrame(tick);
        else el.textContent = decimals ? target.toFixed(decimals) : target.toLocaleString();
      })(start);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.4 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  // ---------- Scroll progress bar ----------
  (function scrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'nf-scrollbar';
    document.body.appendChild(bar);
    let ticking = false;
    function update() {
      const sc = document.documentElement.scrollTop || document.body.scrollTop;
      const h = (document.documentElement.scrollHeight - document.documentElement.clientHeight) || 1;
      bar.style.width = Math.max(0, Math.min(100, (sc / h) * 100)) + '%';
      ticking = false;
    }
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
    update();
  })();

  // ---------- Spotlight glow + depth tilt on cards ----------
  // Rect cached on enter; a single rAF writes both the --mx/--my glow vars
  // and the tilt transform together (one style write per frame per card).
  (function interactiveCards() {
    const SEL = '.nf-rig-card, .nf-trust-card, .nf-builder-card, .nf-community-tile, .nf-config-feat, .nf-pricing-card, .glass-hover, .tilt';
    document.querySelectorAll(SEL).forEach(card => {
      if (card.classList.contains('nf-ix')) return;
      card.classList.add('nf-ix');
      const glow = document.createElement('div'); glow.className = 'nf-ix-glow';
      const edge = document.createElement('div'); edge.className = 'nf-ix-border';
      card.appendChild(glow); card.appendChild(edge);

      let rect = null, raf = 0, px = 0.5, py = 0.5;
      card.addEventListener('mouseenter', () => { rect = card.getBoundingClientRect(); }, { passive: true });
      card.addEventListener('mousemove', (e) => {
        if (!rect) rect = card.getBoundingClientRect();
        px = (e.clientX - rect.left) / rect.width;
        py = (e.clientY - rect.top) / rect.height;
        if (!raf) raf = requestAnimationFrame(() => {
          raf = 0;
          card.style.setProperty('--mx', (px * 100).toFixed(1) + '%');
          card.style.setProperty('--my', (py * 100).toFixed(1) + '%');
          if (POINTER_FX) {
            const rxd = (-(py - 0.5) * 5).toFixed(2);
            const ryd = ((px - 0.5) * 5).toFixed(2);
            card.style.transform = `perspective(900px) rotateX(${rxd}deg) rotateY(${ryd}deg) translateY(-6px)`;
          }
        });
      }, { passive: true });
      card.addEventListener('mouseleave', () => { rect = null; card.style.transform = ''; }, { passive: true });
    });
  })();

})();
