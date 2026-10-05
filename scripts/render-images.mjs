// Renders social/share images and PNG icons from HTML using Playwright's Chromium.
// Usage: node scripts/render-images.mjs  (needs `playwright` available, e.g. npm i -g playwright)
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const icon = readFileSync(join(ROOT, "assets/icon.svg"), "utf8");
const iconSquare = icon.replace('rx="14"', 'rx="0"');

const og = `<html><head><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,800&display=block">
<style>
body{margin:0;width:1200px;height:630px;background:#fbf7f0;font-family:"Bricolage Grotesque",sans-serif;display:flex;align-items:center;overflow:hidden;position:relative}
.l{padding:0 0 0 80px;width:700px}
.brand{display:flex;align-items:center;gap:16px;font-size:30px;font-weight:800;color:#14110f;margin-bottom:34px}
.brand svg{width:64px;height:64px}
h1{font-size:76px;line-height:1.02;letter-spacing:-2px;margin:0 0 26px;color:#14110f}
h1 span{color:#ff4d2e}
p{font:600 28px/1.35 system-ui,sans-serif;color:#4a433d;margin:0}
.phone{position:absolute;right:90px;top:36px;width:300px;height:560px;background:#0b0908;border-radius:52px;padding:14px;box-shadow:0 30px 80px rgba(20,17,15,.3);transform:rotate(6deg)}
.scr{width:100%;height:100%;border-radius:40px;background:radial-gradient(120% 80% at 50% 25%,#ff8a5c,#7a2a18 55%,#1d0f0b);position:relative;overflow:hidden}
.b{position:absolute;left:22px;right:40px;top:260px;background:#ffc93c;border-radius:22px 22px 22px 6px;padding:14px 18px;font-size:28px;font-weight:800;color:#14110f}
.s{position:absolute;left:50%;bottom:40px;width:76px;height:76px;margin-left:-38px;border-radius:50%;border:6px solid #fff}
</style></head><body>
<div class="l"><div class="brand">${icon}Phone Take A Photo</div>
<h1>Say <span>“take a photo.”</span><br>Your phone does the rest.</h1>
<p>Hands-free voice camera · iPhone, iPad, Mac &amp; Android</p></div>
<div class="phone"><div class="scr"><div class="b">“Take a photo” 📸</div><div class="s"></div></div></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage();
async function shot(html, w, h, out) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html, { waitUntil: "networkidle" });
  await page.screenshot({ path: join(ROOT, out), omitBackground: false });
}
const iconHtml = (svg, size) => `<html><body style="margin:0;width:${size}px;height:${size}px">${svg.replace("<svg ", `<svg width="${size}" height="${size}" `)}</body></html>`;
await shot(og, 1200, 630, "assets/og.png");
await shot(iconHtml(iconSquare, 512), 512, 512, "assets/icon-512.png");
await shot(iconHtml(iconSquare, 192), 192, 192, "assets/icon-192.png");
await shot(iconHtml(iconSquare, 180), 180, 180, "assets/apple-touch-icon.png");
await browser.close();
console.log("Rendered images");
