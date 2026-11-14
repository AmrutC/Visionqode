// Builds dist-single/visionqode-full.html: EVERY page of the site in ONE HTML file.
// A small shell keeps each page as a string and shows the current one in a
// full-window frame; internal links switch pages (address shows #/about etc.,
// back/forward work). Fonts are stored once and shared. Run after `npm run build`.
import fs from 'node:fs'; import path from 'node:path';
const dist = 'dist';
const read = (p) => fs.readFileSync(path.join(dist, p.replace(/^\//, '')));
const walk = (d) => fs.readdirSync(d, { withFileTypes: true }).flatMap((e) => e.isDirectory() ? walk(path.join(d, e.name)) : [path.join(d, e.name)]);
let fonts = ''; const seen = new Set();
const pages = {};
for (const f of walk(dist).filter((f) => f.endsWith('.html'))) {
  let html = fs.readFileSync(f, 'utf8');
  html = html.replace(/<link rel="stylesheet" href="(\/_astro\/[^"]+\.css)"[^>]*>/g, (_, href) => {
    const css = read(href).toString('utf8').replace(/@font-face\{[^}]*\}/g, (block) => {
      const m = block.match(/url\((\/_astro\/[^)]+?\.woff2)\)/);
      if (m && !/latin-ext/.test(m[1]) && /latin/.test(m[1]) && !seen.has(m[1])) { seen.add(m[1]); fonts += block.replace(/src:[^;]+;/, `src:url(data:font/woff2;base64,${read(m[1]).toString('base64')}) format("woff2");`); }
      return '';
    });
    return `<style>${css}</style>`;
  });
  html = html.replace(/<script type="module" src="(\/_astro\/[^"]+\.js)"><\/script>/g, (_, s) => `<script type="module">${read(s).toString('utf8')}</script>`);
  html = html.replace(/<link rel="(canonical|icon|apple-touch-icon|sitemap)"[^>]*>/g, '').replace('@view-transition{navigation:auto}', '');
  html = html.replace('</head>', '<!--SHARED--></head>');
  let route = '/' + path.relative(dist, f).replace(/\\/g, '/').replace(/\.html$/, ''); if (route === '/index') route = '/';
  pages[route] = html;
}
const bridge = `<script>(function(){var H=__HASH__;addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[href]');if(!a||e.defaultPrevented||a.target==='_blank')return;var h=a.getAttribute('href');if(h.charAt(0)==='#'){var t=document.getElementById(h.slice(1));if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}return;}if(h.charAt(0)==='/'&&h.charAt(1)!=='/'){e.preventDefault();parent.postMessage({vqGo:h},'*');}},true);addEventListener('load',function(){if(H){var t=document.getElementById(H);if(t)setTimeout(function(){t.scrollIntoView();},60);}});})();<\/script>`;
const favicon = `data:image/svg+xml;base64,${read('/favicon.svg').toString('base64')}`;
const esc = (s) => JSON.stringify(s).replace(/</g, '\\u003c');
const shell = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Visionqode — AI, Software &amp; Digital Innovation Studio</title><link rel="icon" href="${favicon}"><style>html,body{margin:0;height:100%;background:#0d1128;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0;background:#fff}</style></head><body><iframe id="view" title="Visionqode website"></iframe><script>
var PAGES=${esc(pages)};var FONTS=${esc(fonts)};var BRIDGE=${esc(bridge)};
var view=document.getElementById('view');
function show(){var raw=(location.hash||'#/').slice(1);var i=raw.indexOf('#');var route=i<0?raw:raw.slice(0,i);var hash=i<0?'':raw.slice(i+1);if(route.length>1)route=route.replace(/\\/$/,'');var html=PAGES[route]||PAGES['/404'];var m=html.match(/<title>([^<]*)<\\/title>/);if(m){var d=document.createElement('textarea');d.innerHTML=m[1];document.title=d.value;}view.srcdoc=html.replace('<!--SHARED-->','<style>'+FONTS+'</style>'+BRIDGE.replace('__HASH__',JSON.stringify(hash)));}
addEventListener('message',function(e){if(e.source===view.contentWindow&&e.data&&e.data.vqGo){var n='#'+e.data.vqGo;if(location.hash===n)show();else location.hash=n;}});
addEventListener('hashchange',show);show();
<\/script></body></html>`;
fs.mkdirSync('dist-single', { recursive: true });
fs.writeFileSync('dist-single/visionqode-full.html', shell);
console.log('dist-single/visionqode-full.html', Object.keys(pages).length, 'pages', (shell.length / 1048576).toFixed(2) + ' MB');
