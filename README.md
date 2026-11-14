# Visionqode — website

Source for **www.visionqode.com**. Static site built with [Astro](https://astro.build) — no server, no database; the build output in `dist/` can be uploaded to any host (the current hosting included), or deployed to Cloudflare Pages / Netlify / Vercel.

Design source of truth: Figma file **“Visionqode — Website Redesign 2026”** (pages: Foundations, Components, Homepage). Colour, spacing, radius and type tokens in Figma mirror `src/styles/global.css` — change both together.

**Brand:** the existing Visionqode mark (navy V + gold swoosh) was vectorised from the live site into `public/logo-mark.svg` (`#242C54` navy, `#D4AC5C` gold). Base is white + milky white; accents are blue `#0575E6`, green `#34A853`, red `#E53935`, navy and gold — used as gradient words, eyebrow dots, icon tiles and full-bleed bands (`data-theme="navy" | "blue" | "red"`). Type: Plus Jakarta Sans (self-hosted).

## Design v3 (polish pass)

- **Palette:** navy + gold (from the logo) as the brand pair, one blue accent; green/red only for status inside product previews. White base, milk sections.
- **Foundations:** navy-tinted hairlines, 3-step shadow scale (`--shadow-sm/md/lg`), radii 10/16/24/32. Mirrored in Figma (variables + `Shadow/*` effect styles); the v3 homepage frame is `Home / Desktop 1440 — v3`.
- **Components:** floating glass nav with Services menu, navy pill button with gold arrow chip, spotlight cards, bento grid, scroll-linked process timeline (`[data-process]`), inset rounded navy bands (`.band`), footer wordmark.
- **Motion:** word-by-word heading reveals, native cross-page view transitions, animated `<details>`, cursor tilt on the dashboard, count-ups, parallax. All transform/opacity; all disabled under `prefers-reduced-motion`.

## Expert review pass (v4)

Four specialist reviews (visual, motion, UX/conversion, technical) were run against v3; this is what changed.

- **Bugs fixed:** canonicals no longer end in `.html`; favicon restored; form error colours defined; mobile menu and Services dropdown are keyboard-accessible (Escape, focus return, `aria-expanded`); dropdown no longer clips at laptop widths; KPI values and feed render without JS; `#faq` and `#contact` anchors exist.
- **Motion:** card grids now stagger child by child; process section pins and scrubs on desktop (`[data-pin]`, 230vh); intro statement lights up word by word on scroll and the hero board eases out (CSS `animation-timeline`, static fallback); looping animations pause off-screen.
- **Visual:** deeper navy, CTA flows into the footer, one icon-tile style, text row instead of pill clouds, three-line hero headline sized to its column, lighter intro statement, plain columns for "How we work differently".
- **Trust:** Work left the nav and homepage until a case study is approved; replaced by "What you hold before you sign anything". `.needs-approval` content shows in `npm run dev` and is hidden in production builds. Form has an optional phone field and hands off to WhatsApp when no endpoint is set. Google Map loads on click.

## Commands

```bash
npm install          # once
npm run dev          # local dev server on http://localhost:4321
npm run build        # production build → dist/
npm run preview      # serve dist/ locally
node scripts/og.mjs  # regenerate public/og-default.png + apple-touch-icon.png
```

## Structure

```
src/
  data/        site.ts (verified company facts, nav, process, FAQs) · services.ts · industries.ts
  layouts/     Base.astro — <head>, SEO meta, JSON-LD (Organization, WebSite, BreadcrumbList), nav, footer
  components/  Nav, Footer, Logo, Icon (line icon set), KpiBoard (dashboard preview, demo data), Schematic, Marquee, Faq, Cta, EnquiryForm, PageHeader, Breadcrumbs
  pages/       index · services/index · services/[slug] (6 pages) · solutions · industries · work · about · insights · contact · privacy · terms · 404
  scripts/     motion.ts — reveals, count-up, parallax, magnetic CTA, scroll progress, nav, marquee (no dependencies; respects prefers-reduced-motion)
  styles/      global.css — design tokens + base styles
public/        robots.txt, favicon.svg, logo.svg, og-default.png, _headers (security + cache headers for Cloudflare/Netlify)
```

All content lives in `src/data/*.ts`. To change copy, services, FAQs or industries, edit those files — no HTML editing needed.

## Enquiry form (action required)

The form posts to the endpoint in `PUBLIC_FORM_ENDPOINT` (see `.env.example`). Create a free form at **web3forms.com** or **formspree.io** for `roshan@visionqode.com`, put the POST URL in `.env`, rebuild. Until then the form falls back to opening the visitor's email app with the enquiry pre-filled and offers WhatsApp — a real channel, never a fake “sent”.

Form fields: name, work email, company (optional), need, budget range (optional), details, DPDP consent. Honeypot field included.

## Content awaiting approval

Anything marked with a dashed amber outline (`class="needs-approval"`) is a placeholder. The previous site carried claims that could not be verified (50+ products, 12+ industries, case-study percentages, anonymous testimonials) — these were **removed**, not restyled. To publish:

1. **Work / case studies** (`src/pages/work.astro`) — client names, screenshots, verified outcomes. Page is `noindex` until done.
2. **About** — founder bio, founding year, team size, CIN/GSTIN.
3. **Contact** — street address, business hours.
4. **Footer** — LinkedIn / Instagram / X URLs in `src/data/site.ts` (`social`).
5. **Insights** — first articles; page is `noindex` until one is published.
6. **Terms** — legal review of the draft; page is `noindex` until approved.

Remove `noindex` by deleting the `noindex` prop on the page's `<Base>` and the slug from the sitemap `filter` in `astro.config.mjs`.

## SEO

- One H1 per page, semantic sections, breadcrumbs with `BreadcrumbList` JSON-LD.
- `Organization` + `WebSite` on every page; `Service` + `FAQPage` on service pages; `FAQPage` on home; `AboutPage` / `ContactPage`.
- `sitemap-index.xml` generated at build (placeholder pages excluded); `robots.txt` points to it.
- Canonicals without trailing slash; `trailingSlash: 'never'` + `build.format: 'file'` produce `/about.html` served at `/about` by most hosts. On Apache/cPanel add to `.htaccess`:
  ```
  DirectorySlash Off
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
  ErrorDocument 404 /404.html
  ```
- Old anchor links (`/#services`, `/#work`, `/#faq`, `/#contact`) still resolve on the homepage; `/#ai` and `/#tech` no longer exist (404 page lists the new destinations).

## Lighthouse (mobile, local build)

Home 99 / 100 / 100 / 100 · Service page 100 / 100 / 100 / 100 · Contact 100 / 100 / 100 / 100 (Performance / Accessibility / Best practices / SEO). LCP ≈ 1.7 s on throttled mobile, CLS 0.

The KPI board on the homepage shows **demo data** (labelled on the board). Replace with real, approved figures or keep as a product preview.
