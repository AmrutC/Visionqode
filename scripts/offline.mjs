// Builds dist-offline/: the whole site as plain files that open by double-click
// (file://) with every link working. Links become relative .html paths, scripts
// are inlined (browsers block module scripts on file://). Run after `npm run build`.
import fs from 'node:fs'; import path from 'node:path';
const src = 'dist', out = 'dist-offline';
fs.rmSync(out, { recursive: true, force: true }); fs.cpSync(src, out, { recursive: true });
for (const f of ['_headers', 'robots.txt']) fs.rmSync(path.join(out, f), { force: true });
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
const files = walk(out); const pages = files.filter((f) => f.endsWith('.html'));
// stylesheets: root-absolute asset urls → relative to the css file (all in /_astro)
for (const f of files.filter((f) => f.endsWith('.css'))) fs.writeFileSync(f, fs.readFileSync(f, 'utf8').replace(/url\(\/_astro\//g, 'url(./'));
let n = 0;
for (const f of pages) {
  const depth = path.relative(out, f).split(path.sep).length - 1; const up = depth ? '../'.repeat(depth) : './';
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/g, (_, s) => `<script type="module">${fs.readFileSync(path.join(src, s), 'utf8')}</script>`);
  html = html.replace(/url\(\/_astro\//g, `url(${up}_astro/`);
  html = html.replace(/(href|src)="\/(?!\/)([^"]*)"/g, (m, attr, rest) => {
    const [p, hash = ''] = rest.split('#'); const h = hash ? '#' + hash : '';
    if (p === '') return `${attr}="${up}index.html${h}"`;
    if (/\.[a-z0-9]+$/i.test(p)) return `${attr}="${up}${p}${h}"`;
    return `${attr}="${up}${p}.html${h}"`;
  });
  html = html.replace(/<link rel="canonical"[^>]*>/, '');
  fs.writeFileSync(f, html); n++;
}
console.log(`dist-offline: ${n} pages`);
