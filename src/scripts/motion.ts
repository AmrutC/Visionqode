/**
 * Visionqode motion system — no dependencies.
 *  - reveals: IntersectionObserver toggles `.is-in` on .reveal / .reveal-clip / [data-kpi-board]
 *  - count-up: [data-count] numbers animate when their board enters view
 *  - schematic: draws the hero diagram once on load (stroke-dashoffset)
 *  - parallax: [data-parallax="0.2"] elements drift with scroll (transform only)
 *  - magnetic: .btn--primary[data-magnetic] follows the cursor a few px (desktop, hover-capable only)
 *  - nav: scrolled state, progress bar, mobile menu
 *  - marquee: duplicates content for a seamless loop
 * Everything degrades to static when prefers-reduced-motion is set; content is visible without JS.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// ---- stagger indices
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
});

// ---- count-up
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const countUp = (el: HTMLElement) => {
  const target = Number(el.dataset.count || 0);
  const suffix = el.dataset.suffix || '';
  if (reduced) { el.textContent = target.toLocaleString('en-IN') + suffix; return; }
  const start = performance.now(); const dur = 1400;
  const tick = (now: number) => {
    const p = Math.min(1, (now - start) / dur);
    el.textContent = Math.round(target * easeOut(p)).toLocaleString('en-IN') + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};

// ---- scroll reveals
const revealTargets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-clip, [data-kpi-board]');
const onIn = (el: HTMLElement) => {
  el.classList.add('is-in');
  el.querySelectorAll<HTMLElement>('[data-count]').forEach(countUp);
};
if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach(onIn);
} else {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { onIn(e.target as HTMLElement); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
  revealTargets.forEach((el) => io.observe(el));
}

// ---- hero schematic draw-in
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

// ---- parallax (transform-only, rAF-throttled)
const px = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'));
if (px.length && !reduced) {
  let ticking = false;
  const update = () => {
    const vh = window.innerHeight;
    for (const el of px) {
      const r = el.getBoundingClientRect();
      const center = r.top + r.height / 2 - vh / 2;
      const f = Number(el.dataset.parallax || 0.15);
      el.style.transform = `translate3d(0, ${(-center * f).toFixed(1)}px, 0)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

// ---- magnetic buttons (sparingly: only elements opting in)
if (fine && !reduced) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((btn) => {
    const strength = 0.25;
    btn.addEventListener('mousemove', (e) => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * strength;
      const y = (e.clientY - r.top - r.height / 2) * strength;
      btn.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`;
    });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
  });
}

// ---- nav: scrolled state + progress bar
const nav = document.querySelector<HTMLElement>('[data-nav]');
const progress = document.querySelector<HTMLElement>('[data-progress]');
if (nav) {
  const onScroll = () => {
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = `scaleX(${max > 0 ? Math.min(1, window.scrollY / max) : 0})`;
    }
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const links = document.getElementById('primary-nav');
if (toggle && links) {
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); links.classList.remove('is-open'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    links.classList.toggle('is-open', !open);
    document.body.style.overflow = open ? '' : 'hidden';
  });
  links.querySelectorAll('a').forEach((a) => a.addEventListener('click', close));
  window.addEventListener('keydown', (e) => e.key === 'Escape' && close());
  window.matchMedia('(min-width: 960px)').addEventListener('change', (e) => e.matches && close());
}

// ---- marquee
document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((m) => {
  if (reduced) return;
  const track = m.firstElementChild as HTMLElement | null;
  if (!track) return;
  const clone = track.cloneNode(true) as HTMLElement;
  clone.setAttribute('aria-hidden', 'true');
  m.appendChild(clone);
  m.classList.add('is-animated');
});
