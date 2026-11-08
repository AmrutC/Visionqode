/**
 * Visionqode motion system — no dependencies.
 *  - reveals: IntersectionObserver toggles `.is-in` on [data-reveal] targets
 *  - schematic: draws the hero diagram once on load (stroke-dashoffset)
 *  - nav: scrolled state + mobile menu
 *  - stagger: sets --i on children of [data-stagger]
 * Everything is a no-op when prefers-reduced-motion is set; content is visible without JS.
 */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- stagger indices
document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
  Array.from(group.children).forEach((child, i) => (child as HTMLElement).style.setProperty('--i', String(i)));
});

// ---- scroll reveals
const revealTargets = document.querySelectorAll<HTMLElement>('.reveal, .reveal-clip');
if (reduced || !('IntersectionObserver' in window)) {
  revealTargets.forEach((el) => el.classList.add('is-in'));
} else {
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('is-in');
          io.unobserve(e.target);
        }
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
  );
  revealTargets.forEach((el) => io.observe(el));
}

// ---- hero schematic draw-in
const schematic = document.querySelector<SVGSVGElement>('[data-schematic]');
if (schematic) {
  const paths = schematic.querySelectorAll<SVGPathElement | SVGLineElement>('[data-draw]');
  if (reduced) {
    schematic.classList.add('is-drawn');
  } else {
    paths.forEach((p) => {
      const len = (p as SVGGeometryElement).getTotalLength?.() ?? 400;
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    requestAnimationFrame(() => {
      paths.forEach((p, i) => {
        p.style.transition = `stroke-dashoffset 900ms cubic-bezier(.22,1,.36,1) ${260 + i * 140}ms`;
        p.style.strokeDashoffset = '0';
      });
      schematic.classList.add('is-drawn');
    });
  }
}

// ---- nav
const nav = document.querySelector<HTMLElement>('[data-nav]');
const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
const links = document.getElementById('primary-nav');
if (nav) {
  const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
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

// ---- marquee duplicates content for seamless loop (only when motion allowed)
document.querySelectorAll<HTMLElement>('[data-marquee]').forEach((m) => {
  if (reduced) return;
  const track = m.firstElementChild as HTMLElement | null;
  if (!track) return;
  const clone = track.cloneNode(true) as HTMLElement;
  clone.setAttribute('aria-hidden', 'true');
  m.appendChild(clone);
  m.classList.add('is-animated');
});
