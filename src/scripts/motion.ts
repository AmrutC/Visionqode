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
let ticking = false;
const frame = () => {
  const vh = window.innerHeight; const y = window.scrollY;
  nav?.classList.toggle('is-scrolled', y > 12);
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
