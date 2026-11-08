// Generates public/og-default.png (1200x630) from an HTML template using the installed Chromium.
import { chromium } from '/opt/npm-tools/node_modules/playwright/index.mjs';
const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600&family=IBM+Plex+Mono&display=swap');
body{margin:0;width:1200px;height:630px;background:#071428;color:#F9FBFD;font-family:'Bricolage Grotesque',Arial,sans-serif;position:relative;overflow:hidden}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(249,251,253,.06) 1px,transparent 1px),linear-gradient(90deg,rgba(249,251,253,.06) 1px,transparent 1px);background-size:40px 40px}
.brand{position:absolute;left:72px;top:64px;display:flex;align-items:center;gap:14px;font-size:30px;font-weight:600}
.mark{width:34px;height:34px;border:3px solid #F9FBFD;border-radius:50%;position:relative}.mark:after{content:'';position:absolute;inset:9px;border-radius:50%;background:#2FA2F5}
h1{position:absolute;left:72px;top:190px;margin:0;font-size:78px;line-height:1.02;letter-spacing:-.03em;width:760px}
.sub{position:absolute;left:72px;bottom:72px;font-family:'IBM Plex Mono',monospace;font-size:20px;color:#93A3B8}
.schem{position:absolute;right:72px;top:160px;width:300px;height:300px}
.n{position:absolute;border:2px solid #F9FBFD;border-radius:4px;background:#0D1F3C;font-family:'IBM Plex Mono',monospace;font-size:14px;padding:10px 14px}
.l{position:absolute;border-top:2px dashed #93A3B8}
</style></head><body><div class="grid"></div>
<div class="brand"><span class="mark"></span>Visionqode</div>
<h1>Software that runs the business, not just the website.</h1>
<div class="sub">Navi Mumbai · ERP · Automation · AI systems · visionqode.com</div>
<div class="schem"><div class="n" style="left:0;top:0">Enquiry</div><div class="n" style="right:0;top:0">Qualify</div><div class="n" style="left:0;top:130px">Approve</div><div class="n" style="right:0;top:130px">Invoice</div><div class="n" style="left:100px;top:250px;border-color:#2FA2F5;color:#2FA2F5">Ledger</div><div class="l" style="left:84px;top:20px;width:130px"></div><div class="l" style="left:84px;top:150px;width:130px"></div></div>
</body></html>`;
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
await p.setContent(html, { waitUntil: 'networkidle' }); await p.waitForTimeout(500);
await p.screenshot({ path: 'public/og-default.png' }); 
await p.setViewportSize({width:180,height:180}); await p.setContent(`<body style="margin:0;width:180px;height:180px;background:#071428;display:grid;place-items:center"><div style="width:110px;height:110px;border:10px solid #F9FBFD;border-radius:50%;position:relative"><div style="position:absolute;inset:28px;border-radius:50%;background:#2FA2F5"></div></div></body>`); await p.screenshot({ path: 'public/apple-touch-icon.png' });
await b.close(); console.log('og + touch icon written');
