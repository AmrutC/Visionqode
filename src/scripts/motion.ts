/**
 * Visionqode motion system — no dependencies, transform/opacity only.
 *  - split:     headings reveal word by word ([data-split], and h2.reveal-clip upgraded automatically)
 *  - reveals:   IntersectionObserver toggles `.is-in`
 *  - count-up:  [data-count] numbers animate when their board enters view
 *  - progress:  [data-process] timeline fills as the section scrolls through the viewport
 *  - spotlight: .card gets --mx/--my for a cursor-following glow
 *  - tilt:      [data-tilt] leans a few degrees toward the cursor
 *  - parallax:  [data-parallax="0.2"] drifts with scroll
 *  - magnetic:  [data-magnetic] follows the cursor a few px
 *  - nav:       scrolled state, progress bar, mobile menu
 *  - marquee:   duplicates content for a seamless loop
 * Everything degrades to static under prefers-reduced-motion; content is visible without JS.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

// ---- stagger indices
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
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
  const target = Number(el.dataset.count || 0); const suffix = el.dataset.suffix || '';
  if (reduced) { el.textContent = target.toLocaleString('en-IN') + suffix; return; }
  const start = performance.now(); const dur = 1600;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * easeOut(p)).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// ---- scroll reveals
const revealTargets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-clip, .reveal-words, [data-kpi-board]');
const onIn = (el: HTMLElement) => { el.classList.add('is-in'); el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp); };
if (reduced || !('IntersectionObserver' in window)) revealTargets.forEach(onIn);
else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { onIn(e.target as HTMLElement); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
  revealTargets.forEach((el) => io.observe(el));
}

// ---- hero schematic draw-in (inner pages that still use it)
const schematic = document.querySelector<SVGSVGElement>('[data-schematic]');
if (schematic) {
  const paths = schematic.querySelectorAll<SVGGeometryElement>('[data-draw]');
  if (reduced) schematic.classList.add('is-drawn');
  else {
    paths.forEach((p) => { const len = p.getTotalLength?.() ?? 400; p.style.strokeDasharray = `${len}`; p.style.strokeDashoffset = `${len}`; });
    requestAnimationFrame(() => {
      paths.forEach((p, i) => { p.style.transition = `stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1) ${260 + i * 140}ms`; p.style.strokeDashoffset = '0'; });
      schematic.classList.add('is-drawn');
    });
  }
}

// ---- one rAF-throttled scroll loop: nav state, progress bar, parallax, process timeline
const nav = document.querySelector<HTMLElement>('[data-nav]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
const px = reduced ? [] : Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
const timelines = Array.from(document.querySelectorAll<HTMLElement>('[data-process]'));
let ticking = false;
const frame = () => {
  const vh = window.innerHeight; const y = window.scrollY;
  nav?.classList.toggle('is-scrolled', y > 12);
  if (progress) { const max = document.documentElement.scrollHeight - vh; progress.style.transform = `scaleX(${max > 0 ? clamp(y / max) : 0})`; }
  for (const el of px) {
    const r = el.getBoundingClientRect();
    el.style.transform = `translate3d(0, ${(-(r.top + r.height / 2 - vh / 2) * Number(el.dataset.parallax || 0.15)).toFixed(1)}px, 0)`;
  }
  for (const tl of timelines) {
    const r = tl.getBoundingClientRect();
    const p = reduced ? 1 : clamp((vh * 0.72 - r.top) / Math.max(1, r.height));
    tl.style.setProperty('--p', p.toFixed(3));
    const steps = tl.children; const n = steps.length;
    for (let i = 0; i < n; i++) steps[i].classList.toggle('is-active', p >= (i + 0.35) / n);
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
      btn.style.transform = `translate(${((e.clientX - r.left - r.width / 2) * 0.22).toFixed(1)}px, ${((e.clientY - r.top - r.height / 2) * 0.22).toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ---- mobile menu
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const links = document.getElementById('primary-nav');
if (toggle && links) {
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open)); links.classList.toggle('is-open', !open);
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  document.addEventListener('click', (e) => { if (!(e.target as Element).closest('[data-nav]')) close(); });
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => e.matches && close());
}

// ---- marquee
document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((m) => {
  if (reduced) return;
  const track = m.firstElementChild as HTMLElement | null;
  if (!track) return;
  const clone = track.cloneNode(true) as HTMLElement;
  clone.setAttribute('aria-hidden', 'true');
  m.appendChild(clone); m.classList.add('is-animated');
});
