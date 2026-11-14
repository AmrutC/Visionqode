/**
 * Visionqode motion system — no dependencies, transform/opacity only.
 *  - split:     headings reveal word by word (h2.reveal-clip, p.display-l.reveal-clip, [data-split])
 *  - reveals:   IntersectionObserver toggles `.is-in` (children of [data-stagger] animate one by one in CSS)
 *  - count-up:  [data-count] numbers animate when their board enters view (real value is in the markup)
 *  - process:   [data-process] timeline; inside [data-pin] it is scrubbed by the pinned section's scroll
 *  - zones:     [data-zone] pauses its looping animations while off-screen
 *  - pointer:   card spotlight, [data-tilt], [data-magnetic] (hover-capable devices only)
 *  - nav:       scrolled state, progress bar, Services menu (Escape), mobile menu (focus-managed)
 * Scroll-driven CSS (animation-timeline) adds scrubbing where supported — see global.css.
 * Everything degrades to static under prefers-reduced-motion; content is visible without JS.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// ---- stagger indices (restart per row so late items never wait long)
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  const per = Number(group.dataset.stagger) || 3;
  Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i % per)));
});

// ---- word split (top-level text nodes → words; child elements stay whole)
const splitWords = (el: HTMLElement) => {
  let wi = 0;
  const wrap = (node: Node) => {
    const w = document.createElement('span'); w.className = 'w';
    const inner = document.createElement('span'); inner.style.setProperty('--wi', String(wi++));
    inner.appendChild(node); w.appendChild(inner); return w;
  };
  const frag = document.createDocumentFragment();
  Array.from(el.childNodes).forEach((n) => {
    if (n.nodeType === Node.TEXT_NODE) {
      (n.textContent ?? '').split(/(\s+)/).forEach((part) => {
        if (!part) return;
        frag.appendChild(/^\s+$/.test(part) ? document.createTextNode(' ') : wrap(document.createTextNode(part)));
      });
    } else if ((n as HTMLElement).dataset?.splitInner !== undefined) {
      // keep the wrapper (e.g. a muted sentence) but split its words too
      const holder = (n as HTMLElement).cloneNode(false) as HTMLElement;
      (n.textContent ?? '').split(/(\s+)/).forEach((part) => { if (part) holder.appendChild(/^\s+$/.test(part) ? document.createTextNode(' ') : wrap(document.createTextNode(part))); });
      frag.appendChild(holder);
    } else frag.appendChild(wrap(n));
  });
  el.textContent = ''; el.appendChild(frag);
  if (wi > 24) el.style.setProperty('--wstep', '14ms');
  el.classList.add('reveal-words');
};
if (!reduced) {
  document.querySelectorAll<HTMLElement>('h2.reveal-clip, p.display-l.reveal-clip, [data-split]').forEach((el) => {
    el.classList.remove('reveal-clip');
    splitWords(el);
  });
}

// ---- count-up
const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);
const countUp = (el: HTMLElement) => {
  if (reduced) return;
  const target = Number(el.dataset.count || 0); const suffix = el.dataset.suffix || '';
  const start = performance.now(); const dur = 1600;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * easeOut(p)).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// ---- scroll reveals
const revealTargets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-clip, .reveal-words, [data-stagger], [data-kpi-board]');
const onIn = (el: HTMLElement) => { el.classList.add('is-in'); el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp); };
if (reduced || !('IntersectionObserver' in window)) revealTargets.forEach((el) => el.classList.add('is-in'));
else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { onIn(e.target as HTMLElement); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0 });
  revealTargets.forEach((el) => io.observe(el));
  // pause looping animations that are off-screen
  const zio = new IntersectionObserver((entries) => entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting)), { rootMargin: '100px' });
  document.querySelectorAll('[data-zone]').forEach((z) => zio.observe(z));
}

// ---- one rAF-throttled scroll loop: nav state, progress bar, process timeline
const nav = document.querySelector<HTMLElement>('[data-nav]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const timelines = Array.from(document.querySelectorAll<HTMLElement>('[data-process]'));
const pinQuery = window.matchMedia('(min-width: 1000px) and (min-height: 640px)');
const darkZones = Array.from(document.querySelectorAll<HTMLElement>('[data-nav-dark]'));

// ---- horizontal gallery: vertical scroll drives a pinned sideways track (desktop, motion allowed)
const galleries = Array.from(document.querySelectorAll<HTMLElement>('[data-hscroll]')).map((el) => ({ el, track: el.querySelector<HTMLElement>('[data-hscroll-track]')!, overflow: 0 }));
const hQuery = window.matchMedia('(min-width: 1000px) and (min-height: 820px) and (hover: hover)');
const layoutGalleries = () => {
  for (const g of galleries) {
    const on = !reduced && hQuery.matches;
    g.el.classList.toggle('is-pinned', on);
    g.track.style.transform = '';
    if (!on) { g.el.style.height = ''; g.overflow = 0; continue; }
    const vp = g.track.parentElement!; const pad = parseFloat(getComputedStyle(vp).paddingLeft) || 0;
    g.overflow = Math.max(0, g.track.scrollWidth + pad * 2 - window.innerWidth);
    g.el.style.height = `${window.innerHeight + g.overflow}px`;
  }
};
layoutGalleries();
window.addEventListener('resize', layoutGalleries, { passive: true });
window.addEventListener('load', layoutGalleries);
let ticking = false;
const frame = () => {
  const vh = window.innerHeight; const y = window.scrollY;
  nav?.classList.toggle('is-scrolled', y > 12);
  if (nav) { let dark = false; for (const z of darkZones) { const r = z.getBoundingClientRect(); if (r.top <= 46 && r.bottom >= 46) { dark = true; break; } } nav.classList.toggle('is-dark', dark); }
  for (const g of galleries) {
    if (!g.overflow) continue;
    const r = g.el.getBoundingClientRect(); const p = clamp(-r.top / Math.max(1, r.height - vh));
    g.track.style.transform = `translate3d(${(-p * g.overflow).toFixed(1)}px, 0, 0)`;
    g.el.style.setProperty('--hp', p.toFixed(3));
  }
  if (progress) { const max = document.documentElement.scrollHeight - vh; progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`; }
  for (const tl of timelines) {
    const steps = tl.children; const n = steps.length;
    const pin = tl.closest<HTMLElement>('[data-pin]');
    let p = 1;
    if (!reduced) {
      if (pin && pinQuery.matches) { const r = pin.getBoundingClientRect(); p = clamp(-r.top / Math.max(1, r.height - vh)); }
      else { const r = tl.getBoundingClientRect(); p = clamp((vh * 0.8 - r.top) / (r.height + vh * 0.25)); }
    }
    const pos = p * n; // 0…n
    const current = reduced ? -1 : Math.min(n - 1, Math.floor(pos));
    tl.style.setProperty('--p', clamp((pos - 0.5) / (n - 1)).toFixed(3));
    for (let i = 0; i < n; i++) {
      steps[i].classList.toggle('is-active', reduced || pos >= i + 0.15);
      steps[i].classList.toggle('is-current', i === current && pos >= 0.15);
    }
  }
  ticking = false;
};
window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }, { passive: true });
window.addEventListener('resize', frame, { passive: true });
frame();

// ---- pointer effects (desktop only)
if (fine && !reduced) {
  document.querySelectorAll<HTMLElement>('.card').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`); card.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((zone) => {
    const target = zone.querySelector<HTMLElement>('[data-tilt-target]') ?? zone;
    zone.addEventListener('pointermove', (e) => {
      const r = zone.getBoundingClientRect();
      const rx = ((e.clientY - r.top) / r.height - 0.5) * -5; const ry = ((e.clientX - r.left) / r.width - 0.5) * 6;
      target.style.transform = `perspective(1400px) rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg)`;
    });
    zone.addEventListener('pointerleave', () => { target.style.transform = ''; });
  });
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      btn.style.transition = 'transform 120ms linear';
      btn.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.22).toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transition = ''; btn.style.transform = ''; });
  });
}

// ---- Services menu: aria state + Escape to dismiss
document.querySelectorAll<HTMLElement>('.has-menu').forEach((item) => {
  const link = item.querySelector<HTMLAnchorElement>(':scope > a');
  const set = (open: boolean) => link?.setAttribute('aria-expanded', String(open));
  item.addEventListener('mouseenter', () => { item.classList.remove('is-dismissed'); set(true); });
  item.addEventListener('mouseleave', () => { item.classList.remove('is-dismissed'); set(false); });
  item.addEventListener('focusin', () => set(!item.classList.contains('is-dismissed')));
  item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget as Node)) { item.classList.remove('is-dismissed'); set(false); } });
  item.addEventListener('keydown', (e) => { if (e.key === 'Escape') { item.classList.add('is-dismissed'); set(false); link?.focus(); } });
});

// ---- mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const links = document.getElementById('primary-nav');
if (toggle && links) {
  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
  const close = (refocus = false) => { if (!isOpen()) return; toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); if (refocus) toggle.focus(); };
  toggle.addEventListener('click', () => { const open = isOpen(); toggle.setAttribute('aria-expanded', String(!open)); links.classList.toggle('is-open', !open); });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => close()));
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close(true); });
  document.addEventListener('click', (e) => { if (!(e.target as Element).closest('[data-nav]')) close(); });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => e.matches && close());
}

// ---- hero particle network (2D canvas; pauses off-screen; static frame under reduced motion)
document.querySelectorAll<HTMLCanvasElement>('canvas[data-net]').forEach((cv) => {
  const ctx = cv.getContext('2d'); if (!ctx) return;
  const zone = cv.closest<HTMLElement>('[data-zone]') ?? cv.parentElement!;
  let w = 0, h = 0, dpr = 1; let pts: { x: number; y: number; vx: number; vy: number; r: number; g: boolean }[] = [];
  const mouse = { x: -9999, y: -9999 };
  const size = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); w = cv.clientWidth; h = cv.clientHeight;
    cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const n = Math.round(clamp(w / 20, 28, 84));
    pts = Array.from({ length: n }, (_, i) => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: 1 + Math.random() * 1.6, g: i % 5 === 0 }));
  };
  const LINK = 150;
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    for (const p of pts) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < -20) p.x = w + 20; if (p.x > w + 20) p.x = -20; if (p.y < -20) p.y = h + 20; if (p.y > h + 20) p.y = -20;
      const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
      if (d2 < 26000) { p.x += dx * 0.012; p.y += dy * 0.012; }
    }
    for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) {
      const a = pts[i], b = pts[j]; const dx = a.x - b.x, dy = a.y - b.y; const d = Math.hypot(dx, dy);
      if (d < LINK) { ctx.strokeStyle = `rgba(140,185,255,${(0.22 * (1 - d / LINK)).toFixed(3)})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
    }
    for (const p of pts) { ctx.fillStyle = p.g ? 'rgba(212,172,92,.95)' : 'rgba(190,215,255,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, p.g ? p.r + 0.8 : p.r, 0, 6.283); ctx.fill(); }
  };
  let raf = 0; let visible = true;
  const loop = () => { if (!visible) { raf = 0; return; } draw(); raf = requestAnimationFrame(loop); };
  size(); draw();
  window.addEventListener('resize', () => { size(); draw(); }, { passive: true });
  if (reduced) return;
  zone.addEventListener('pointermove', (e) => { const r = cv.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
  zone.addEventListener('pointerleave', () => { mouse.x = mouse.y = -9999; });
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }).observe(cv);
});
