# Visionqode — website

Source for **www.visionqode.com**. Static site built with [Astro](https://astro.build) — no server, no database; the build output in `dist/` can be uploaded to any host (the current hosting included), or deployed to Cloudflare Pages / Netlify / Vercel.

Design source of truth: Figma file **“Visionqode — Website Redesign 2026”** (pages: Foundations, Components, Homepage). Colour, spacing, radius and type tokens in Figma mirror `src/styles/global.css` — change both together.

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
  components/  Nav, Footer, Logo, Schematic (hero diagram), Marquee, Faq, Cta, EnquiryForm, PageHeader, Breadcrumbs
  pages/       index · services/index · services/[slug] (6 pages) · solutions · industries · work · about · insights · contact · privacy · terms · 404
  scripts/     motion.ts — reveals, hero draw-in, nav, marquee (no dependencies; respects prefers-reduced-motion)
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
  RewriteEngine On
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.*)$ $1.html [L]
  ErrorDocument 404 /404.html
  ```
- Old anchor links (`/#services`, `/#work`, `/#faq`, `/#contact`) still resolve on the homepage; `/#ai` and `/#tech` no longer exist (404 page lists the new destinations).

## Lighthouse (mobile, local build)

Home 99 / 96 / 100 / 100 · Service page 99 / 96 / 100 / 100 · Contact 100 / 97 / 100 / 100 (Performance / Accessibility / Best practices / SEO). LCP ≈ 2.1 s on throttled mobile, CLS 0, TBT 60 ms.
