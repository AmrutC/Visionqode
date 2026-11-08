// Builds dist-single/index.html: the homepage as ONE self-contained HTML file
// (stylesheets, scripts and latin font files inlined). Run after `npm run build`.
import fs from 'node:fs'; import path from 'node:path';
const dist = 'dist'; let html = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const read = (p) => fs.readFileSync(path.join(dist, p.replace(/^\//, '')));
// 1. inline stylesheets
html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"[^>]*>/g, (_, href) => {
  let css = read(href).toString('utf8');
  // inline latin woff2 fonts as data URIs; drop other subsets' @font-face blocks
  css = css.replace(/@font-face\{[^}]*\}/g, (block) => {
    const m = block.match(/url\((\/_astro\/[^)]+?\.woff2)\)/);
    if (!m) return '';
    const file = m[1];
    const isLatin = /-latin-(?!ext)/.test(file) || /latin-wght/.test(file) && !/latin-ext/.test(file);
    if (!isLatin) return '';
    const b64 = read(file).toString('base64');
    // keep only the woff2 src
    return block.replace(/src:[^;]+;/, `src:url(data:font/woff2;base64,${b64}) format("woff2");`);
  });
  return `<style>${css}</style>`;
});
// 2. inline module scripts
html = html.replace(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/g, (_, src) => `<script type="module">${read(src).toString('utf8')}</script>`);
// 3. inline favicon + touch icon + OG stays absolute
html = html.replace('href="/favicon.svg"', `href="data:image/svg+xml;base64,${read('/favicon.svg').toString('base64')}"`);
html = html.replace('href="/apple-touch-icon.png"', `href="data:image/png;base64,${read('/apple-touch-icon.png').toString('base64')}"`);
// 4. make inner links absolute to the live domain so the single file still navigates
html = html.replace(/href="\/(?!\/)([^"#]*)"/g, (m, p) => p.startsWith('_astro') ? m : `href="https://www.visionqode.com/${p}"`);
fs.mkdirSync('dist-single', { recursive: true });
fs.writeFileSync('dist-single/index.html', html);
console.log('dist-single/index.html', (fs.statSync('dist-single/index.html').size / 1024).toFixed(0) + ' KB');
