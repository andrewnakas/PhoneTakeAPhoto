// Static site generator for phonetakeaphoto.com.
// Usage: node scripts/build.mjs   (writes HTML pages, sitemap.xml)
// Edit page content in this file and re-run; generated files are committed for GitHub Pages.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SITE = "https://phonetakeaphoto.com";
const IOS_URL = "https://apps.apple.com/app/apple-store/id6450124820?mt=8";
const IOS_CANON = "https://apps.apple.com/us/app/phone-take-a-photo/id6450124820";
const PLAY_URL = "https://play.google.com/store/apps/details?id=com.nakas.phonetakeaphoto";
const EMAIL = "PhoneTakeAPhoto@gmail.com";
const TODAY = new Date().toISOString().slice(0, 10);

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const abs = (path) => SITE + path;

// ---------- Shared fragments ----------
const badges = (placement) => `
<div class="badges">
  <a data-store="ios" data-placement="${placement}" href="${IOS_URL}"><img src="/ios_button.png" alt="Download on the App Store" width="156" height="52"></a>
  <a data-store="android" data-placement="${placement}" href="${PLAY_URL}"><img class="badge-play" src="/android_button.png" alt="Get it on Google Play" width="134" height="52"></a>
</div>`;

const appSchema = (os, url, extra = {}) => ({
  "@type": "MobileApplication",
  name: "Phone Take A Photo",
  alternateName: "Phone Take a Photo – Speech powered camera",
  operatingSystem: os,
  applicationCategory: "PhotographyApplication",
  url,
  image: abs("/assets/icon-512.png"),
  description: "Voice-activated, hands-free camera. Say “take a photo” to snap pictures or “start recording” for video. Offline on-device speech recognition.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  author: { "@type": "Person", name: "Andrew Nakas" },
  ...extra
});

const header = `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/"><img src="/assets/icon.svg" alt="" width="34" height="34">Phone Take A Photo</a>
    <nav class="nav" aria-label="Main">
      <a class="hide-sm" href="/#try">Try it</a>
      <a class="hide-sm" href="/uses/">Use cases</a>
      <a class="hide-sm" href="/guides/take-photo-with-voice/">Guide</a>
      <a class="btn btn-primary btn-sm" data-store="auto" data-placement="nav" href="/get/">Get the app</a>
    </nav>
  </div>
</header>`;

const ctaBand = (placement, title = "Put your phone down. Say “take a photo.”", body = "Free to download for iPhone, iPad, Mac, Vision Pro and Android. Works offline — your voice never leaves your device.") => `
<section>
  <div class="wrap">
    <div class="cta-band">
      <div>
        <h2>${title}</h2>
        <p>${body}</p>
        ${badges(placement)}
      </div>
      <div class="qr" aria-hidden="true"><img src="/assets/qr-get.svg" alt="" width="126" height="126"><span>Scan to download</span></div>
    </div>
  </div>
</section>`;

const footer = `
<footer class="site-footer">
  <div class="wrap">
    <div class="cols">
      <div>
        <a class="brand" href="/"><img src="/assets/icon.svg" alt="" width="34" height="34">Phone Take A Photo</a>
        <p class="muted" style="margin-top:12px">The hands-free, voice-activated camera. Just say “take a photo.”</p>
        <button class="btn btn-ghost btn-sm" data-share="footer" type="button">Share with a friend</button>
      </div>
      <div>
        <h4>Use cases</h4>
        <ul>
          <li><a href="/uses/hands-free-selfies/">Hands-free selfies</a></li>
          <li><a href="/uses/group-photos/">Group photos</a></li>
          <li><a href="/uses/hands-free-video/">Hands-free video</a></li>
          <li><a href="/uses/night-long-exposure/">Night &amp; long exposure</a></li>
          <li><a href="/uses/accessibility/">Accessibility</a></li>
        </ul>
      </div>
      <div>
        <h4>Learn</h4>
        <ul>
          <li><a href="/uses/voice-activated-camera/">Voice-activated camera</a></li>
          <li><a href="/guides/take-photo-with-voice/">Take a photo with your voice</a></li>
          <li><a href="/#try">Browser demo</a></li>
          <li><a href="/full-demo.html">Offline AI demo</a></li>
        </ul>
      </div>
      <div>
        <h4>App</h4>
        <ul>
          <li><a data-store="ios" data-placement="footer" href="${IOS_URL}">App Store</a></li>
          <li><a data-store="android" data-placement="footer" href="${PLAY_URL}">Google Play</a></li>
          <li><a href="/press/">Press kit</a></li>
          <li><a href="mailto:${EMAIL}">Support: ${EMAIL}</a></li>
        </ul>
      </div>
    </div>
    <p class="legal">© <span data-year>2026</span> Phone Take A Photo by Andrew Nakas. App Store is a service mark of Apple Inc. Google Play is a trademark of Google LLC.</p>
  </div>
</footer>
<div class="sticky-cta" role="complementary" aria-label="Download the app">
  <img src="/assets/icon.svg" alt="" width="40" height="40">
  <div><strong>Phone Take A Photo</strong>Free · hands-free camera</div>
  <a class="btn btn-primary btn-sm" data-store="auto" data-placement="sticky" href="/get/">Get</a>
  <button class="close" type="button" aria-label="Dismiss">×</button>
</div>`;

function layout({ path, title, description, body, schema = [], noindex = false, extraHead = "", scripts = "", ogImage = "/assets/og.png", bare = false }) {
  const url = abs(path);
  const ld = schema.length ? `<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": schema })}</script>` : "";
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
${noindex ? '<meta name="robots" content="noindex">' : '<meta name="robots" content="index, follow, max-image-preview:large">'}
<meta name="apple-itunes-app" content="app-id=6450124820, app-argument=${url}">
<meta name="theme-color" content="#ff4d2e">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Phone Take A Photo">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${abs(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Phone Take A Photo — say “take a photo” and your phone snaps the picture">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${abs(ogImage)}">
<link rel="icon" href="/assets/icon.svg" type="image/svg+xml">
<link rel="icon" href="/TemplateData/favicon.ico" sizes="any">
<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&display=swap">
<link rel="stylesheet" href="/assets/site.css">
${extraHead}
${ld}
<!-- Analytics: paste your Plausible / GA4 snippet here (see GROWTH.md). Events are sent via window.PTAP.track. -->
</head>
<body>
${header}
<main id="main">
${body}
</main>
${bare ? "" : footer}
<script src="/assets/site.js" defer></script>
${scripts}
<script>if("serviceWorker"in navigator)addEventListener("load",function(){navigator.serviceWorker.register("/ServiceWorker.js")});</script>
</body>
</html>
`;
}

function write(path, html) {
  const file = path.endsWith(".html") ? join(ROOT, path) : join(ROOT, path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

const faqSchema = (faqs) => ({
  "@type": "FAQPage",
  mainEntity: faqs.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a.replace(/<[^>]+>/g, "") } }))
});
const faqHtml = (faqs) => `<div class="faq">${faqs.map(([q, a]) => `
  <details><summary>${q}</summary><p>${a}</p></details>`).join("")}
</div>`;
const breadcrumbs = (trail) => ({
  "@type": "BreadcrumbList",
  itemListElement: trail.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) }))
});

// ---------- Home ----------
const HOME_FAQ = [
  ["How does Phone Take A Photo work?", "Open the app, prop your phone up, and say “take a photo.” The camera fires instantly. Say “start recording” and “stop recording” for video. No buttons, no timers, no Bluetooth remote."],
  ["Does it need an internet connection?", "No. Speech recognition runs on-device with an offline AI model, so it works on a hike, at the beach or in airplane mode — and your voice is never uploaded."],
  ["Is it free?", "Yes, Phone Take A Photo is free to download. Optional in-app purchases unlock the full feature set and remove the watermark."],
  ["Which devices are supported?", "iPhone and iPad (iOS/iPadOS 16+), Apple silicon Macs (macOS 13+), Apple Vision Pro, and Android phones via Google Play."],
  ["Can I use a Bluetooth or external microphone?", "Yes. You can pick which microphone the app listens to, including Bluetooth headsets and earbuds — handy when the phone is far away on a tripod."],
  ["Can I trigger the camera without talking?", "Yes. The sound-reactive shutter fires on a clap or a loud sound, which is great in places where you'd rather not speak."],
  ["Is the browser demo the same as the app?", `The demo on this page uses your browser's built-in speech engine to show the idea. The app uses its own offline speech model, takes full-resolution photos and video, and adds night mode, long exposures and manual controls. Need help? Email <a href="mailto:${EMAIL}">${EMAIL}</a>.`]
];

const demoMarkup = `
<div>
  <div class="phone" id="demo">
    <div class="screen">
      <div class="notch"></div>
      <video playsinline muted autoplay class="mirror" aria-label="Live camera preview"></video>
      <div class="flash"></div>
      <div class="top-hud">
        <span class="pill"><span class="dot"></span><span>Mic off</span></span>
        <div class="mode-toggle" role="group" aria-label="Trigger">
          <button type="button" data-mode="voice" aria-pressed="true">Voice</button>
          <button type="button" data-mode="clap" aria-pressed="false">Clap</button>
        </div>
      </div>
      <div class="hud">
        <div class="bubble" aria-live="polite"><small>Say</small><span>“Take a photo”</span></div>
        <div class="meter" aria-hidden="true"><i></i></div>
        <div class="shutter-row">
          <button class="thumb" type="button" aria-label="Open last photo"></button>
          <button class="shutter" type="button" aria-label="Take photo"></button>
          <button class="icon-btn flip" type="button" aria-label="Flip camera"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 11a8 8 0 0 0-14.9-4M4 4v4h4M4 13a8 8 0 0 0 14.9 4M20 20v-4h-4"/></svg></button>
        </div>
      </div>
      <div class="demo-start">
        <div>
          <h3>Try it right here</h3>
          <p>Turn on your camera, step back, and say:</p>
          <div class="say">“Take a photo”</div>
          <button class="btn btn-primary demo-go" type="button">Start the camera</button>
          <p class="demo-msg" style="margin-top:14px"></p>
        </div>
      </div>
    </div>
  </div>
  <p class="demo-note">Photos stay on your device — nothing is uploaded. No speech support in your browser? Switch to <b>Clap</b>.</p>
</div>
<div class="modal" id="demo-modal" role="dialog" aria-modal="true" aria-label="Your photo">
  <div class="sheet">
    <img alt="The photo you just took">
    <div class="row">
      <a class="btn btn-primary dl" href="#">Download</a>
      <button class="btn btn-ghost share-photo" type="button" hidden>Share</button>
      <button class="btn btn-ghost close-modal" type="button">Keep shooting</button>
    </div>
    <div class="upsell">
      <p><strong>That was the browser preview.</strong> The app shoots full-resolution photos and video, works offline, and adds night mode, long exposures and a clap shutter.</p>
      ${badges("demo-modal")}
    </div>
  </div>
</div>`;

const home = layout({
  path: "/",
  title: "Phone Take A Photo — Voice-Activated Camera App | Hands-Free Selfies",
  description: "Say “take a photo” and your phone snaps the picture. A free hands-free camera for iPhone, iPad, Mac and Android with offline voice control, video, night mode and a clap shutter. Try it in your browser.",
  schema: [
    { "@type": "WebSite", name: "Phone Take A Photo", url: SITE + "/" },
    { "@type": "Organization", name: "Phone Take A Photo", url: SITE + "/", logo: abs("/assets/icon-512.png"), email: EMAIL, sameAs: [IOS_CANON, PLAY_URL] },
    appSchema("iOS 16.0+, iPadOS 16.0+, macOS 13.0+, visionOS 1.0+", IOS_CANON, {
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", ratingCount: "16", bestRating: "5" }
    }),
    appSchema("Android", PLAY_URL),
    faqSchema(HOME_FAQ)
  ],
  body: `
<section class="hero">
  <div class="wrap">
    <div>
      <span class="eyebrow">The voice-activated camera</span>
      <h1>Say <span class="quote">“take a photo.”</span> Your phone does the rest.</h1>
      <p class="lede">Phone Take A Photo is the hands-free camera for iPhone, iPad, Mac and Android. Prop your phone up, step into the shot, and just say it — no timer, no remote, no running back and forth.</p>
      <div class="cta-row">
        ${badges("hero")}
      </div>
      <div class="proof">
        <span><span class="stars" aria-hidden="true">★★★★★</span> 4.8 on the App Store</span>
        <span>• Free download</span>
        <span>• Works offline</span>
      </div>
      <p style="margin-top:22px"><a href="#try" class="btn btn-ghost">Try it in your browser ↓</a></p>
    </div>
    <div id="try">${demoMarkup}</div>
  </div>
</section>

<section class="alt" id="how">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">How it works</span>
      <h2>Three steps. Zero buttons.</h2>
    </div>
    <ol class="steps">
      <li><h3>Prop it up</h3><p class="muted">Lean your phone on anything — a tripod, a shelf, a rock, a coffee mug.</p></li>
      <li><h3>Get in the shot</h3><p class="muted">Walk back, pose, grab the whole crew. Take your time — there's no timer counting down.</p></li>
      <li><h3>Say the words</h3><p class="muted"><span class="cmd">“Take a photo.”</span> Snap. Want video? <span class="cmd">“Start recording.”</span></p></li>
    </ol>
  </div>
</section>

<section id="features">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Features</span>
      <h2>A real camera that listens.</h2>
      <p>Built for the moments when you can't — or don't want to — touch your phone.</p>
    </div>
    <div class="grid grid-3">
      <div class="card"><div class="ico">🗣</div><h3>Voice photo &amp; video</h3><p>“Take a photo,” “start recording,” “stop recording.” That's the whole manual.</p></div>
      <div class="card"><div class="ico">🔒</div><h3>Offline &amp; private</h3><p>On-device speech AI. Works with no signal, and your voice never leaves your phone.</p></div>
      <div class="card"><div class="ico">👏</div><h3>Clap shutter</h3><p>Sound-reactive mode fires on a clap or a loud sound when you'd rather not talk.</p></div>
      <div class="card"><div class="ico">🌙</div><h3>Night &amp; long exposure</h3><p>No finger on the screen means no shake — perfect for low light, stars and light trails.</p></div>
      <div class="card"><div class="ico">🎛</div><h3>Manual controls</h3><p>Dial in the shot yourself, then trigger it from across the room.</p></div>
      <div class="card"><div class="ico">🎧</div><h3>Bluetooth mics</h3><p>Choose your microphone. Talk into your earbuds while the phone is 30 feet away.</p></div>
    </div>
  </div>
</section>

<section class="alt" id="uses">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Made for</span>
      <h2>Every shot you used to miss.</h2>
    </div>
    <div class="grid grid-3">
      <a class="card" href="/uses/hands-free-selfies/"><h3>Hands-free selfies</h3><p>Full-body, both hands free, no arm in the frame.</p><span class="more">Learn more →</span></a>
      <a class="card" href="/uses/group-photos/"><h3>Group photos</h3><p>Finally, the photographer is in the picture too.</p><span class="more">Learn more →</span></a>
      <a class="card" href="/uses/hands-free-video/"><h3>Creators &amp; video</h3><p>Start and stop recording mid-recipe, mid-rep, mid-take.</p><span class="more">Learn more →</span></a>
      <a class="card" href="/uses/night-long-exposure/"><h3>Night &amp; tripod shots</h3><p>Shake-free long exposures without a remote.</p><span class="more">Learn more →</span></a>
      <a class="card" href="/uses/accessibility/"><h3>Accessibility</h3><p>A camera you can use without touching the screen.</p><span class="more">Learn more →</span></a>
      <a class="card" href="/uses/voice-activated-camera/"><h3>Why voice?</h3><p>Voice vs. timers, remotes and smartwatches.</p><span class="more">Compare →</span></a>
    </div>
  </div>
</section>

<section id="commands">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Just say</span>
      <h2>The entire instruction manual.</h2>
    </div>
    <div class="commands">
      <span>“Take a photo”</span>
      <span>“Start recording”</span>
      <span>“Stop recording”</span>
      <span>👏 (clap)</span>
    </div>
  </div>
</section>

<section class="alt" id="reviews">
  <div class="wrap">
    <div class="section-head">
      <span class="eyebrow">Reviews</span>
      <h2>Rated 4.8 out of 5 on the App Store.</h2>
    </div>
    <div class="grid grid-2">
      <div class="card quote-card"><blockquote>“Great for taking high resolution hands-free photos.”</blockquote><cite>App Store review</cite></div>
      <div class="card quote-card"><blockquote>Loved it? A quick review helps other people find a camera they can use without hands.</blockquote><cite><a data-store="auto" data-placement="review-ask" href="/get/">Leave a review →</a></cite></div>
    </div>
  </div>
</section>

<section id="faq">
  <div class="narrow">
    <div class="section-head"><span class="eyebrow">FAQ</span><h2>Questions, answered.</h2></div>
    ${faqHtml(HOME_FAQ)}
  </div>
</section>
${ctaBand("home-bottom")}`,
  scripts: `<script src="/assets/demo.js" defer></script>`
});
write("/", home);

// ---------- Article pages ----------
const ARTICLES = [
  {
    path: "/uses/voice-activated-camera/",
    crumb: "Voice-activated camera",
    title: "Voice-Activated Camera App for iPhone & Android | Phone Take A Photo",
    description: "Take pictures and video with your voice. See how a voice-activated camera compares with self-timers, Bluetooth remotes and smartwatch shutters — and why it works offline.",
    eyebrow: "Voice-activated camera",
    h1: "The voice-activated camera: say it, shoot it.",
    lede: "A voice-activated camera fires the shutter when it hears a command. No timer to race, no remote to lose, no watch to pair. Here's how it works and when it beats the alternatives.",
    content: `
<h2>What is a voice-activated camera?</h2>
<p>A voice-activated camera listens for a spoken command and takes the picture the instant it hears it. With Phone Take A Photo the commands are exactly what you'd expect: <strong>“take a photo”</strong>, <strong>“start recording”</strong> and <strong>“stop recording”</strong>.</p>
<p>The difference from a self-timer is control. A timer fires whether you're ready or not; a voice shutter fires <em>when you are</em>. Fix your hair, wait for the kid to look up, count everyone in — then say the words.</p>

<h2>Voice vs. the other ways to take a hands-free photo</h2>
<div class="table-scroll"><table>
  <thead><tr><th></th><th>Voice (Phone Take A Photo)</th><th>Self-timer</th><th>Bluetooth remote</th><th>Smartwatch shutter</th></tr></thead>
  <tbody>
    <tr><th>Extra hardware</th><td>None</td><td>None</td><td>Remote + battery</td><td>A paired watch</td></tr>
    <tr><th>Shoots when you're ready</th><td>Yes</td><td>No — fixed countdown</td><td>Yes</td><td>Yes</td></tr>
    <tr><th>Hands stay free</th><td>Yes</td><td>Yes</td><td>One hand on remote</td><td>Tap on wrist</td></tr>
    <tr><th>Repeat shots</th><td>Just say it again</td><td>Run back each time</td><td>Yes</td><td>Yes</td></tr>
    <tr><th>Start/stop video</th><td>By voice</td><td>No</td><td>Sometimes</td><td>Sometimes</td></tr>
    <tr><th>Works offline</th><td>Yes, on-device AI</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
  </tbody>
</table></div>

<h2>Why offline speech recognition matters</h2>
<p>Many voice features stream audio to a server. Phone Take A Photo recognizes speech <strong>on the device</strong> with an offline AI model. That means it keeps working on a trail with no signal or in airplane mode, it responds fast, and what you say near your phone stays on your phone.</p>

<h2>When there's too much noise — or you can't talk</h2>
<p>Concert, waterfall, sleeping baby? Switch to the <strong>sound-reactive shutter</strong> and trigger with a clap. Phone far away? Choose a <strong>Bluetooth microphone</strong> and talk into your earbuds.</p>

<h2>Where a voice camera shines</h2>
<ul>
  <li><a href="/uses/hands-free-selfies/">Hands-free, full-body selfies</a></li>
  <li><a href="/uses/group-photos/">Group photos with everyone in them</a></li>
  <li><a href="/uses/hands-free-video/">Recording recipes, workouts and tutorials</a></li>
  <li><a href="/uses/night-long-exposure/">Shake-free night and long-exposure shots</a></li>
  <li><a href="/uses/accessibility/">Photography without touching the screen</a></li>
</ul>`,
    faqs: [
      ["Can my phone take a picture when I say a word?", "Yes. With Phone Take A Photo, saying “take a photo” fires the camera immediately. It's available for iPhone, iPad, Mac, Vision Pro and Android."],
      ["Does a voice-activated camera work without internet?", "Phone Take A Photo does. Its speech recognition runs entirely on-device, so it works offline."],
      ["Is a voice shutter better than a self-timer?", "For most hands-free shots, yes: it fires when you're ready instead of after a fixed countdown, and you can take shot after shot without walking back to the phone."]
    ]
  },
  {
    path: "/uses/hands-free-selfies/",
    crumb: "Hands-free selfies",
    title: "How to Take a Hands-Free Selfie (No Timer, No Remote) | Phone Take A Photo",
    description: "Take full-body, hands-free selfies by saying “take a photo.” No arm in the frame, no 10-second sprint, no selfie stick. Tips for setup, lighting and posing.",
    eyebrow: "Hands-free selfies",
    h1: "Hands-free selfies. Both hands. Whole body.",
    lede: "Arm-length selfies are all face and forearm. Prop your phone up, step back, and say “take a photo” — you get the outfit, the view and both hands free.",
    content: `
<h2>How to take a hands-free selfie in 30 seconds</h2>
<ol>
  <li><strong>Download Phone Take A Photo</strong> (free) and allow camera and microphone access.</li>
  <li><strong>Prop your phone up</strong> at chest height — a shelf, a stack of books, a mini tripod or a car dashboard all work.</li>
  <li><strong>Frame the shot</strong> with the front or rear camera. The rear camera is sharper; voice control means you don't need to see the screen.</li>
  <li><strong>Step back and pose.</strong> Take as long as you like.</li>
  <li><strong>Say “take a photo.”</strong> Change pose and say it again. And again.</li>
</ol>

<div class="callout"><p><strong>Pro tip:</strong> use the rear camera for your best-looking selfies. It has the better sensor — and since you're not tapping a button, you don't need to see yourself.</p></div>

<h2>Why not just use the timer?</h2>
<p>The timer gives you 3 or 10 seconds, then fires whether you're ready or not. Every retake means walking back to the phone. With a voice shutter you can shoot a dozen poses in a minute without moving your feet.</p>

<h2>Selfie ideas that need both hands</h2>
<ul>
  <li>Outfit-of-the-day and mirror-free full-length shots</li>
  <li>Yoga, dance and fitness poses</li>
  <li>Holding a baby, a pet, a guitar or a trophy</li>
  <li>Travel shots with the whole landmark behind you</li>
  <li>Cooking and craft progress photos</li>
</ul>

<h2>Lighting and framing tips</h2>
<ul>
  <li>Face a window or the sun at a slight angle for soft, flattering light.</li>
  <li>Put the phone slightly above eye level for portraits, at waist height for full-body.</li>
  <li>Low light? <a href="/uses/night-long-exposure/">Night mode</a> plus a touch-free shutter means no blur from tapping.</li>
</ul>`,
    faqs: [
      ["How do I take a selfie without holding my phone?", "Prop the phone up, open Phone Take A Photo, step back and say “take a photo.” The camera fires instantly without you touching it."],
      ["Can I take a full-body selfie without a selfie stick?", "Yes. Lean the phone on any stable surface, walk back until you're fully in frame, and trigger the shot with your voice."],
      ["Does it work with the rear camera?", "Yes, you can use either camera. The rear camera usually gives the sharpest results."]
    ]
  },
  {
    path: "/uses/group-photos/",
    crumb: "Group photos",
    title: "Group Photos With Everyone In Them — No Timer Needed | Phone Take A Photo",
    description: "Stop leaving the photographer out. Prop your phone up, get everyone in place, and say “take a photo.” Take as many shots as you need without running back to the phone.",
    eyebrow: "Group photos",
    h1: "Finally, the photographer is in the group photo.",
    lede: "No asking strangers, no 10-second sprint, no “wait, my eyes were closed.” Get everyone in place, then say “take a photo” — as many times as it takes.",
    content: `
<h2>The group photo problem</h2>
<p>Someone always has to hold the phone. A timer helps, but you get one try per sprint, and somebody's always blinking. A stranger helps, if they don't cut off everyone's feet.</p>
<p>With Phone Take A Photo, <strong>whoever's in the group can trigger the shot</strong> by voice. Kids can say it. Grandma can say it. Take ten in a row and pick the one where everyone's eyes are open.</p>

<h2>How to take the perfect group photo</h2>
<ol>
  <li>Set the phone at about chest height, 2–4 meters away. Use the rear camera for the widest, sharpest shot.</li>
  <li>Frame with a little room around the edges — you can crop later.</li>
  <li>Get everyone in place. Tall people at the back, kids in front.</li>
  <li>Say <strong>“take a photo”</strong>. Then say “one more, everyone silly” and say it again.</li>
</ol>
<div class="callout"><p><strong>Loud party?</strong> Switch to the clap shutter, or pick a Bluetooth earbud as the microphone and say the command close to your mouth.</p></div>

<h2>Perfect for</h2>
<ul>
  <li>Family reunions, holidays and birthdays</li>
  <li>Weddings and engagement shoots on a budget</li>
  <li>Team photos, clubs and classrooms</li>
  <li>Hiking summits and road trips — it works offline</li>
</ul>`,
    faqs: [
      ["How do I take a group photo without someone holding the camera?", "Prop the phone up, open Phone Take A Photo, and have anyone in the group say “take a photo.” Repeat for as many shots as you want."],
      ["Will it hear me from far away?", "In typical conditions it works from across a room. For longer distances or noisy places, use a Bluetooth microphone or the clap shutter."]
    ]
  },
  {
    path: "/uses/hands-free-video/",
    crumb: "Hands-free video",
    title: "Start Recording Video With Your Voice — For Creators | Phone Take A Photo",
    description: "Say “start recording” and “stop recording” to film recipes, workouts, tutorials and TikToks hands-free. No messy fingers on the screen, no dead air to trim.",
    eyebrow: "Hands-free video",
    h1: "“Start recording.” Your hands stay on the work.",
    lede: "Flour on your fingers, a barbell in your hands, a guitar on your lap — you shouldn't have to walk to your phone to start and stop a take.",
    content: `
<h2>Built for people who film themselves</h2>
<p>Creators lose time to the walk: walk to the phone, tap record, walk back, do the thing, walk back, tap stop, trim the dead air. With voice commands you stay in position and in character.</p>
<ul>
  <li><strong>“Start recording”</strong> begins a clip.</li>
  <li><strong>“Stop recording”</strong> ends it.</li>
  <li><strong>“Take a photo”</strong> grabs a still for the thumbnail.</li>
</ul>

<h2>Great for</h2>
<ul>
  <li><strong>Cooking and baking</strong> — no dough on the screen.</li>
  <li><strong>Workouts and form checks</strong> — record a set without breaking your setup.</li>
  <li><strong>Music practice</strong> — keep both hands on the instrument.</li>
  <li><strong>Crafts, DIY and repair tutorials</strong> — record step by step.</li>
  <li><strong>TikTok, Reels and Shorts</strong> — film multiple takes in one go.</li>
</ul>

<h2>Tips for clean voice-triggered clips</h2>
<ul>
  <li>Use a Bluetooth lapel mic or earbuds as the listening microphone for reliable commands from further away.</li>
  <li>Pause for a beat after “start recording” before you begin, so the cut is clean.</li>
  <li>Use the rear camera and frame once; manual controls lock in your look.</li>
</ul>`,
    faqs: [
      ["Can I start a video recording with my voice?", "Yes. In Phone Take A Photo, say “start recording” to begin and “stop recording” to end."],
      ["Does it work with a Bluetooth microphone?", "Yes. You can choose the microphone the app listens to, including Bluetooth earbuds and headsets."]
    ]
  },
  {
    path: "/uses/night-long-exposure/",
    crumb: "Night & long exposure",
    title: "Shake-Free Night & Long Exposure Photos Without a Remote | Phone Take A Photo",
    description: "Tapping the shutter shakes your phone and blurs long exposures. Trigger night shots, star photos and light trails by voice for sharp, touch-free results.",
    eyebrow: "Night & long exposure",
    h1: "Sharper night shots: don't touch the phone.",
    lede: "In low light, the camera keeps the shutter open longer — and the tap of your finger becomes blur. Trigger it with your voice instead and keep it rock-steady.",
    content: `
<h2>Why tapping ruins long exposures</h2>
<p>A long exposure records every tiny movement. Pressing the shutter button wobbles even a tripod-mounted phone. Photographers use cable releases and remotes for exactly this reason. A voice shutter does the same job with nothing to carry.</p>

<h2>What you can shoot</h2>
<ul>
  <li>City lights and night skylines</li>
  <li>Car light trails and fireworks</li>
  <li>Silky waterfalls and seascapes</li>
  <li>Star fields and the moon on a dark night</li>
  <li>Low-light interiors without flash</li>
</ul>

<h2>Setup checklist</h2>
<ol>
  <li>Mount the phone on a tripod or wedge it somewhere solid.</li>
  <li>Open Phone Take A Photo and enable night mode / long exposure.</li>
  <li>Use manual controls to set focus and exposure.</li>
  <li>Step away so you don't bump anything and say <strong>“take a photo.”</strong></li>
</ol>
<div class="callout"><p><strong>Out in the wild?</strong> Speech recognition is fully offline, so it works far from any cell tower.</p></div>`,
    faqs: [
      ["How do I avoid blur in night photos on my phone?", "Keep the phone perfectly still: use a tripod and trigger the shutter without touching the screen, for example with a voice command in Phone Take A Photo."],
      ["Do I need a Bluetooth shutter remote?", "Not with a voice shutter. Saying “take a photo” triggers the camera without any extra hardware."]
    ]
  },
  {
    path: "/uses/accessibility/",
    crumb: "Accessibility",
    title: "An Accessible, Touch-Free Camera App | Phone Take A Photo",
    description: "A camera you control with your voice or a clap. Helpful for people with limited hand mobility, tremors, or who use a mounted phone. Works offline on iPhone, iPad, Mac and Android.",
    eyebrow: "Accessibility",
    h1: "A camera you can use without touching it.",
    lede: "Small on-screen buttons can be hard to hit precisely. Phone Take A Photo lets you take photos and videos by voice — or by a clap — from a phone that's mounted where it works for you.",
    content: `
<h2>Who it helps</h2>
<ul>
  <li>People with limited hand or arm mobility, or who use a wheelchair-mounted phone</li>
  <li>People with tremors, where tapping causes blurry photos</li>
  <li>People with arthritis or RSI who find holding a phone up painful</li>
  <li>Anyone whose hands are busy: caregivers, parents, makers</li>
</ul>

<h2>Features that make it easier</h2>
<ul>
  <li><strong>Simple commands</strong>: “take a photo,” “start recording,” “stop recording.”</li>
  <li><strong>Clap shutter</strong> for people who prefer a sound to speech.</li>
  <li><strong>Microphone choice</strong>, including Bluetooth headsets, so commands are heard reliably.</li>
  <li><strong>Offline</strong> recognition — no account, no network, no lag.</li>
</ul>

<h2>Combine with your device's accessibility features</h2>
<p>iOS and Android include Voice Control, Switch Control and Voice Access for navigating your phone. Phone Take A Photo complements them: once the camera is open, taking the picture is just a phrase away.</p>
<div class="callout"><p>Have feedback on accessibility? We'd love to hear it: <a href="mailto:${EMAIL}">${EMAIL}</a>.</p></div>`,
    faqs: [
      ["Is there a camera app I can use without my hands?", "Yes. Phone Take A Photo takes photos when you say “take a photo” and records video on “start recording.” It can also trigger on a clap."],
      ["Does it need an internet connection or an account?", "No. Speech recognition runs offline on the device."]
    ]
  },
  {
    path: "/guides/take-photo-with-voice/",
    crumb: "Take a photo with your voice",
    title: "How to Take a Picture With Your Voice on iPhone & Android (2026 Guide)",
    description: "Every way to take a photo hands-free on iPhone and Android: Siri, Google Assistant, Voice Control, timers, remotes — and the one-step way: say “take a photo.”",
    eyebrow: "Guide",
    h1: "How to take a picture with your voice on iPhone and Android",
    lede: "There are several ways to take a photo hands-free. Here's an honest rundown of the built-in options and where a dedicated voice camera fits.",
    content: `
<h2>The quick answer</h2>
<p>Install <strong>Phone Take A Photo</strong> (free), prop your phone up, and say <strong>“take a photo.”</strong> It works the same on iPhone, iPad, Mac and Android, keeps listening so you can shoot again and again, and runs offline.</p>
<div class="inline-cta"><strong>Get it free</strong>${badges("guide-top")}</div>

<h2>On iPhone</h2>
<h3>Siri</h3>
<p>Siri can open the Camera app for you. Depending on your iOS version and settings it may open the camera ready to shoot, but you'll usually still need to press the shutter or rely on a timer.</p>
<h3>Accessibility Voice Control</h3>
<p>iOS Voice Control (Settings → Accessibility → Voice Control) lets you operate on-screen buttons by speaking. It's powerful but system-wide, has a learning curve, and is designed for navigating the whole phone rather than for photography.</p>
<h3>Self-timer and volume buttons</h3>
<p>The built-in timer gives you 3 or 10 seconds. Wired EarPods' volume buttons can also trigger the shutter — if you still have a pair with a long enough cable.</p>

<h2>On Android</h2>
<h3>Google Assistant</h3>
<p>On many Android phones you can ask Google Assistant to take a picture or a selfie, often with a short countdown. Availability and behaviour vary by phone maker and camera app.</p>
<h3>Manufacturer voice shutters</h3>
<p>Some camera apps include a voice-trigger option (for example saying “cheese” or “shoot”). Look in your camera settings — it's often hidden and not on every device.</p>
<h3>Voice Access</h3>
<p>Android's Voice Access accessibility service can tap buttons by name or number. Like iOS Voice Control, it's general-purpose rather than built for repeated shooting.</p>

<h2>Comparison</h2>
<div class="table-scroll"><table>
  <thead><tr><th>Method</th><th>Repeat shots by voice</th><th>Video start/stop</th><th>Works offline</th><th>Same on all devices</th></tr></thead>
  <tbody>
    <tr><td><strong>Phone Take A Photo</strong></td><td>Yes</td><td>Yes</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Siri / Google Assistant</td><td>Varies</td><td>Varies</td><td>Varies</td><td>No</td></tr>
    <tr><td>Voice Control / Voice Access</td><td>Yes, with setup</td><td>Yes, with setup</td><td>Mostly</td><td>No</td></tr>
    <tr><td>Self-timer</td><td>No</td><td>No</td><td>Yes</td><td>Yes</td></tr>
  </tbody>
</table></div>

<h2>Try it before you install</h2>
<p>Our <a href="/#try">in-browser demo</a> lets you take a photo by saying “take a photo” right now, using your browser's speech engine. The app does the same with an offline model, full resolution and video.</p>`,
    faqs: [
      ["Can I take a picture on my iPhone by saying a word?", "Yes. Install Phone Take A Photo, and saying “take a photo” fires the camera. Built-in options like Siri and Voice Control can help but usually involve extra steps."],
      ["How do I take a picture with voice on Android?", "Google Assistant and some manufacturer camera apps offer voice shutters that vary by device. Phone Take A Photo works the same way on any supported Android phone: just say “take a photo.”"],
      ["Is there a free voice camera app?", "Phone Take A Photo is free to download on the App Store and Google Play, with optional in-app purchases."]
    ]
  }
];

for (const a of ARTICLES) {
  const isGuide = a.path.startsWith("/guides/");
  const trail = [["Home", "/"], isGuide ? ["Guides", a.path] : ["Use cases", "/uses/"], [a.crumb, a.path]];
  if (isGuide) trail.splice(1, 1);
  const related = ARTICLES.filter((x) => x !== a).slice(0, 3);
  const html = layout({
    path: a.path,
    title: a.title,
    description: a.description,
    schema: [
      breadcrumbs(trail),
      { "@type": isGuide ? "HowTo" : "Article", name: a.h1, headline: a.h1, description: a.description, url: abs(a.path),
        dateModified: TODAY, author: { "@type": "Organization", name: "Phone Take A Photo" },
        ...(isGuide ? { step: [{ "@type": "HowToStep", text: "Install Phone Take A Photo from the App Store or Google Play." }, { "@type": "HowToStep", text: "Prop your phone up and frame the shot." }, { "@type": "HowToStep", text: "Say “take a photo.”" }] } : {}) },
      ...(a.faqs ? [faqSchema(a.faqs)] : [])
    ],
    body: `
<div class="narrow article">
  <div class="article-hero">
    <nav class="crumbs" aria-label="Breadcrumb">${trail.map(([n, p], i) => i === trail.length - 1 ? esc(n) : `<a href="${p}">${esc(n)}</a> / `).join("")}</nav>
    <span class="eyebrow">${a.eyebrow}</span>
    <h1>${a.h1}</h1>
    <p class="lede" style="font-size:1.2rem">${a.lede}</p>
    ${badges(a.path.split("/").filter(Boolean).pop() + "-top")}
  </div>
  ${a.content}
  <div class="inline-cta"><div><strong>See it work in 10 seconds.</strong><br><span class="muted">Try the voice shutter in your browser.</span></div><a class="btn btn-primary" href="/#try">Try the demo</a></div>
  ${a.faqs ? `<h2>FAQ</h2>${faqHtml(a.faqs)}` : ""}
  <h2>Keep reading</h2>
</div>
<div class="wrap" style="margin-top:20px">
  <div class="grid grid-3">${related.map((r) => `<a class="card" href="${r.path}"><h3>${r.crumb}</h3><p>${esc(r.description.slice(0, 110))}…</p><span class="more">Read →</span></a>`).join("")}</div>
</div>
${ctaBand(a.path.split("/").filter(Boolean).pop() + "-bottom")}`
  });
  write(a.path, html);
}

// ---------- Use case hub ----------
write("/uses/", layout({
  path: "/uses/",
  title: "Use Cases — Hands-Free Photos & Video by Voice | Phone Take A Photo",
  description: "Hands-free selfies, group photos, creator video, night shots and accessible photography — everything you can do with a voice-activated camera.",
  schema: [breadcrumbs([["Home", "/"], ["Use cases", "/uses/"]])],
  body: `
<section class="article-hero">
  <div class="wrap">
    <span class="eyebrow">Use cases</span>
    <h1>What will you shoot hands-free?</h1>
    <p class="lede" style="font-size:1.2rem;max-width:40em">One phrase, a lot of possibilities.</p>
  </div>
</section>
<section style="padding-top:0">
  <div class="wrap"><div class="grid grid-3">
    ${ARTICLES.map((r) => `<a class="card" href="${r.path}"><h3>${r.crumb}</h3><p>${esc(r.description)}</p><span class="more">Read →</span></a>`).join("")}
  </div></div>
</section>
${ctaBand("uses-hub")}`
}));

// ---------- Smart download link (/get) ----------
// Share this one URL everywhere (bios, QR codes, print, videos). Phones go straight to their store.
write("/get/", layout({
  path: "/get/",
  title: "Download Phone Take A Photo — Free for iPhone, iPad, Mac & Android",
  description: "Download Phone Take A Photo, the free voice-activated camera. Say “take a photo” and your phone takes the picture.",
  extraHead: `<script>
(function(){var u=navigator.userAgent,q=location.search,ios=/iPad|iPhone|iPod/.test(u)||(navigator.platform==="MacIntel"&&navigator.maxTouchPoints>1),and=/Android/i.test(u);
if(/[?&]stay=1/.test(q))return;
var p=new URLSearchParams(q),src=p.get("utm_source")||p.get("ref")||"get-link",camp=p.get("utm_campaign")||"get";
var ct=(src+"-"+camp).toLowerCase().replace(/[^a-z0-9]+/g,"-").slice(0,40);
if(ios)location.replace("https://apps.apple.com/app/apple-store/id6450124820?mt=8&ct="+encodeURIComponent(ct));
else if(and)location.replace("https://play.google.com/store/apps/details?id=com.nakas.phonetakeaphoto&referrer="+encodeURIComponent("utm_source="+src+"&utm_medium="+(p.get("utm_medium")||"get-link")+"&utm_campaign="+camp));
})();
</script>`,
  bare: true,
  body: `
<section class="get">
  <div class="narrow">
    <img src="/assets/icon.svg" alt="" width="96" height="96" style="margin:0 auto 18px;border-radius:22px">
    <h1 style="font-size:clamp(2rem,5vw,3rem)">Get Phone Take A Photo</h1>
    <p class="lede muted">Free for iPhone, iPad, Mac, Vision Pro and Android.</p>
    ${badges("get-page")}
    <div class="qr-big"><img src="/assets/qr-get.svg" alt="QR code to download Phone Take A Photo" width="188" height="188"></div>
    <p class="muted">On a computer? Scan with your phone's camera.</p>
    <p><a href="/">← Back to phonetakeaphoto.com</a></p>
  </div>
</section>`
}));

// ---------- Press kit ----------
write("/press/", layout({
  path: "/press/",
  title: "Press Kit — Phone Take A Photo",
  description: "Facts, descriptions, logo and contact for journalists, bloggers and creators covering Phone Take A Photo, the voice-activated camera app.",
  body: `
<div class="narrow article">
  <div class="article-hero">
    <span class="eyebrow">Press kit</span>
    <h1>Phone Take A Photo — press &amp; creators</h1>
    <p class="lede" style="font-size:1.2rem">Everything you need to write about or film the app. Want a promo code or an interview? Email <a href="mailto:${EMAIL}?subject=Press%20inquiry">${EMAIL}</a>.</p>
  </div>
  <h2>Fact sheet</h2>
  <div class="table-scroll"><table><tbody>
    <tr><th>Name</th><td>Phone Take A Photo</td></tr>
    <tr><th>Tagline</th><td>Say “take a photo.” Your phone does the rest.</td></tr>
    <tr><th>Developer</th><td>Andrew Nakas (independent)</td></tr>
    <tr><th>Platforms</th><td>iPhone &amp; iPad (16+), Mac with Apple silicon (13+), Apple Vision Pro, Android</td></tr>
    <tr><th>Price</th><td>Free, with optional in-app purchases</td></tr>
    <tr><th>Category</th><td>Photo &amp; Video</td></tr>
    <tr><th>Rating</th><td>4.8 / 5 on the App Store</td></tr>
    <tr><th>Website</th><td><a href="/">phonetakeaphoto.com</a></td></tr>
    <tr><th>Download link</th><td><a href="/get/">phonetakeaphoto.com/get</a></td></tr>
  </tbody></table></div>

  <h2>Short description (25 words)</h2>
  <p>Phone Take A Photo is a free voice-activated camera: say “take a photo” or “start recording” and your phone shoots hands-free, fully offline.</p>
  <h2>Long description</h2>
  <p>Phone Take A Photo turns any iPhone, iPad, Mac or Android device into a hands-free camera. Prop the phone up, step into the frame and say “take a photo” — the shutter fires instantly. “Start recording” and “stop recording” control video. Speech recognition runs on-device with an offline AI model, so it works without a connection and audio never leaves the phone. A sound-reactive shutter triggers on a clap, Bluetooth microphones are supported, and night mode, long exposures and manual controls make it a serious camera, not just a gimmick. It's popular for full-body selfies, group photos where the photographer is included, creator videos, shake-free night shots, and for people who find touchscreens hard to use.</p>

  <h2>Story angles</h2>
  <ul>
    <li>The end of the 10-second self-timer sprint</li>
    <li>On-device AI that respects privacy — no cloud needed for voice control</li>
    <li>An accessible camera for people with limited hand mobility</li>
    <li>Indie developer builds a single-purpose app that does one thing well</li>
  </ul>

  <h2>Assets</h2>
  <ul>
    <li><a href="/assets/icon-512.png" download>App icon (PNG, 512×512)</a> · <a href="/assets/icon.svg" download>SVG</a></li>
    <li><a href="/assets/og.png" download>Social banner (1200×630)</a></li>
    <li><a href="/assets/qr-get.svg" download>Download QR code (SVG)</a></li>
  </ul>
</div>
${ctaBand("press")}`
}));

// ---------- 404 ----------
write("/404.html", layout({
  path: "/404.html",
  title: "Page not found — Phone Take A Photo",
  description: "This page doesn't exist. Try the voice-activated camera instead.",
  noindex: true,
  body: `
<section class="get"><div class="narrow">
  <h1>We couldn't find that shot.</h1>
  <p class="lede muted">The page you're looking for isn't here. Maybe say “take a photo” instead?</p>
  <p><a class="btn btn-primary" href="/#try">Try the demo</a> <a class="btn btn-ghost" href="/">Home</a></p>
</div></section>`
}));

// ---------- Unity "offline AI" demo ----------
write("/full-demo.html", layout({
  path: "/full-demo.html",
  title: "Offline Voice Camera Demo (Unity WebGL) — Phone Take A Photo",
  description: "Run the Phone Take A Photo offline speech recognition engine in your browser. A larger download that shows the same on-device AI the app uses.",
  extraHead: `<style>
  .unity-wrap { width: min(1000px, 100% - 32px); margin: 24px auto; }
  #unity-container { position: relative; width: 100%; aspect-ratio: 16 / 10; background: #231F20; border-radius: 18px; overflow: hidden; }
  #unity-canvas { width: 100%; height: 100%; display: block; background: #231F20; }
  #unity-loading-bar { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); display: none; text-align: center; color: #fff; }
  #unity-progress-bar-empty { width: 220px; height: 8px; background: rgba(255,255,255,.2); border-radius: 8px; overflow: hidden; margin-top: 10px; }
  #unity-progress-bar-full { width: 0; height: 100%; background: var(--accent); }
  #unity-warning { position: absolute; left: 50%; top: 5%; transform: translate(-50%); background: #fff; color: #14110f; padding: 10px; display: none; border-radius: 10px; }
  #unity-start { position: absolute; inset: 0; display: grid; place-items: center; text-align: center; color: #fff; padding: 24px; }
  #unity-start p { color: #d9cfc4; }
</style>`,
  body: `
<div class="unity-wrap">
  <span class="eyebrow">Offline AI demo</span>
  <h1 style="font-size:clamp(1.8rem,4vw,2.8rem)">The real on-device speech engine, in your browser.</h1>
  <p class="muted">This demo runs the same style of offline speech recognition the app uses, compiled to WebAssembly. It's a large download (~30&nbsp;MB plus a language model) and works best on a desktop browser. For a quick try on mobile, use the <a href="/#try">instant demo</a>.</p>
  <div id="unity-container">
    <canvas id="unity-canvas" tabindex="-1"></canvas>
    <div id="unity-loading-bar"><div>Loading speech engine…</div><div id="unity-progress-bar-empty"><div id="unity-progress-bar-full"></div></div></div>
    <div id="unity-warning"></div>
    <div id="unity-start"><div><h3>Load the offline demo</h3><p>About 30&nbsp;MB. Allow microphone access when asked.</p><button class="btn btn-primary" id="unity-go" type="button">Load demo</button></div></div>
  </div>
  <div class="inline-cta"><div><strong>Get the full app</strong><br><span class="muted">Full-resolution photos, video, night mode and more.</span></div>${badges("unity-demo")}</div>
</div>`,
  scripts: `<script>
(function () {
  var canvas = document.querySelector("#unity-canvas"), loadingBar = document.querySelector("#unity-loading-bar"),
      progressBarFull = document.querySelector("#unity-progress-bar-full"), warningBanner = document.querySelector("#unity-warning"),
      start = document.querySelector("#unity-start");
  function unityShowBanner(msg, type) {
    function upd() { warningBanner.style.display = warningBanner.children.length ? "block" : "none"; }
    var div = document.createElement("div"); div.innerHTML = msg; warningBanner.appendChild(div);
    if (type == "error") div.style = "background: red; padding: 10px;";
    else { if (type == "warning") div.style = "background: yellow; padding: 10px;"; setTimeout(function () { warningBanner.removeChild(div); upd(); }, 5000); }
    upd();
  }
  var buildUrl = "/Build";
  var config = {
    dataUrl: buildUrl + "/ok1.data", frameworkUrl: buildUrl + "/ok1.framework.js", codeUrl: buildUrl + "/ok1.wasm",
    streamingAssetsUrl: "/StreamingAssets", companyName: "DefaultCompany", productName: "webglPhoneTakeAPhoto",
    productVersion: "1.0", showBanner: unityShowBanner, matchWebGLToCanvasSize: true
  };
  document.querySelector("#unity-go").addEventListener("click", function () {
    start.hidden = true; loadingBar.style.display = "block";
    if (window.PTAP) window.PTAP.track("unity_demo_start", {});
    var script = document.createElement("script");
    script.src = buildUrl + "/ok1.loader.js";
    script.onload = function () {
      createUnityInstance(canvas, config, function (p) { progressBarFull.style.width = 100 * p + "%"; })
        .then(function () { loadingBar.style.display = "none"; })
        .catch(function (m) { unityShowBanner(String(m), "error"); });
    };
    document.body.appendChild(script);
  });
})();
</script>`
}));

// ---------- Sitemap ----------
const urls = ["/", "/uses/", ...ARTICLES.map((a) => a.path), "/get/", "/press/", "/full-demo.html"];
writeFileSync(join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${abs(u)}</loc><lastmod>${TODAY}</lastmod><priority>${u === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n")}
</urlset>
`);

console.log("Built", urls.length + 1, "pages");
