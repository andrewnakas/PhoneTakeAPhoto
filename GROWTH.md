# Phone Take A Photo — Growth Playbook

How this website drives downloads, plus a channel-by-channel plan with copy you can paste.

---

## 1. What the site does for growth

| Lever | Where | Why it matters |
|---|---|---|
| **Instant in-browser demo** | `/#try` (`assets/demo.js`) | People *feel* the product in 10 seconds: say "take a photo" and the camera fires. No install needed to get the "aha". |
| **Viral watermark** | Every demo photo is stamped `phonetakeaphoto.com` | Each downloaded/shared photo advertises the app. |
| **Native share** | Demo photo modal + footer "Share with a friend" | One tap to send to group chats/Instagram via the OS share sheet. |
| **Conversion moment** | Modal opens after the first shot with store badges | Asks for the install right at peak excitement. |
| **Smart download link** | `phonetakeaphoto.com/get` | ONE link for bios, QR codes, videos, print. iPhone → App Store, Android → Play, desktop → QR page. |
| **Attribution** | `assets/site.js` | Store links carry the source page + placement (`ct=` for Apple, `referrer=utm_…` for Play). |
| **iOS Smart App Banner** | `<meta name="apple-itunes-app">` on every page | Safari shows a native "Open / Get" banner. |
| **Sticky mobile CTA** | Bottom bar after scrolling | Always one tap from the store on phones. |
| **SEO landing pages** | `/uses/*`, `/guides/*` | Rank for long-tail searches (see §3). |
| **Structured data** | JSON-LD on every page | MobileApplication with ★4.8 rating, FAQ, HowTo, Breadcrumbs → rich results. |
| **AI search** | `/llms.txt` | Gives ChatGPT/Perplexity/Claude clean facts to cite when people ask "is there an app that takes a photo when I say…". |
| **Social cards** | `assets/og.png` | Good-looking previews on iMessage, WhatsApp, X, Slack, Reddit, LinkedIn. |
| **Press kit** | `/press/` | Makes it easy for bloggers/journalists to write about you. |

### Turn on analytics (5 minutes, do this first)
1. Create a free [Plausible](https://plausible.io) or Google Analytics 4 property for `phonetakeaphoto.com`.
2. Paste its snippet into `scripts/build.mjs` where the `<!-- Analytics -->` comment is, then run `node scripts/build.mjs`.
3. Events already fire automatically: `store_click` (store, placement, page), `demo_start`, `demo_capture` (voice/clap/tap), `demo_download`, `demo_share`, `share_click`.

### Turn on App Store campaign tracking
In **App Store Connect → Analytics → Sources → Campaigns**, generate a link to get your **provider token (`pt`)**. Put it in `appleProviderToken` in `assets/site.js`. You'll then see installs per `ct` campaign (e.g. `direct-home-hero`, `reddit-launch-get`). Google Play attributes the `referrer` utm values automatically in **Play Console → Store performance → Traffic sources**.

### Use the /get link everywhere, with a tag
`https://phonetakeaphoto.com/get/?utm_source=tiktok&utm_campaign=video12` — the source flows into the store campaign so you know which post worked.

---

## 2. App Store Optimization (biggest lever — most installs come from store search)

**Current subtitle:** "Speech powered camera". Few people search for "speech powered".

Suggested (iOS, 30 chars each):
- **Title:** `Phone Take A Photo: Voice Cam` (29)
- **Subtitle:** `Hands-Free Selfie & Timer Cam` (29)
- **Keyword field (100 chars, no spaces after commas, don't repeat title words):**
  `voice,activated,camera,shutter,remote,clap,selfie,group,tripod,say,cheese,speak,command,photo,video`
  (adjust based on what App Store Connect shows for impressions)

**Google Play:**
- Title: `Phone Take A Photo: Voice Camera`
- Short description (80): `Say "take a photo" — hands-free voice camera for selfies, groups & video.`
- Put "voice activated camera", "hands-free selfie", "camera remote", "clap to take photo" naturally in the full description (Play indexes it).

**Screenshots (first 3 matter most):** show the *command in a speech bubble* on top of a great result photo:
1. "Say 'take a photo'" + full-body selfie
2. "The photographer's in the group photo" + family shot
3. "Works offline. Private." + hiking summit photo
4. "Clap to shoot" 5. "Start recording by voice" 6. "Night & long exposure"

**App preview video (15–30s):** phone on a shelf, person walks back, says the line, flash, cut to the photo. That loop *is* the ad.

**Ratings:** you have ★4.8 from only 16 ratings. Add `SKStoreReviewController.requestReview()` (iOS) / Play In-App Review API after a user's **3rd successful voice capture** — a happy moment. Going from 16 to 200+ ratings will noticeably lift conversion and ranking.

**Localize** the store listing (and later the voice model — the WebGL build already includes de/es/fr/ru speech models): Spanish, German, French, Portuguese, Japanese listings are cheap and open new search markets.

**In-app events (iOS) / Promotional content (Play):** run seasonal events — "Holiday Group Photo Week" (Nov–Dec), "Graduation Photos" (May–Jun), "Summer Travel Selfies" (Jun–Aug). They appear in search and on the product page.

**Apple Search Ads:** start with a $5–10/day "Search Match" + exact keywords `voice camera`, `hands free camera`, `selfie timer`, `camera remote`. Pause terms with cost-per-install above what a user is worth to you.

---

## 3. SEO (built into this site)

Target keywords → page:

| Keyword cluster | Page |
|---|---|
| voice activated camera app, camera that takes pictures when you talk | `/uses/voice-activated-camera/` |
| how to take a picture with your voice iphone / android, take photo by voice | `/guides/take-photo-with-voice/` |
| hands free selfie, take selfie without holding phone, full body selfie | `/uses/hands-free-selfies/` |
| group photo without timer, how to take a group photo with everyone in it | `/uses/group-photos/` |
| start recording with voice, hands free video recording app | `/uses/hands-free-video/` |
| long exposure without remote, night photo blur phone | `/uses/night-long-exposure/` |
| camera app for limited mobility, accessible camera app | `/uses/accessibility/` |
| voice camera app iphone, hands free camera app iphone | `/iphone/` |
| voice camera app android, take picture with voice android | `/android/` |
| take photo on mac without clicking, photo booth alternative | `/mac/` |
| how to take pictures of yourself, solo travel photos of yourself | `/guides/take-pictures-of-yourself/` |
| take photo without touching phone, hands free photo | `/guides/take-photo-without-touching-phone/` |
| self timer alternative, bluetooth camera remote alternative | `/guides/self-timer-alternatives/` |
| clap to take picture app, sound activated camera | `/guides/clap-to-take-photo/` |
| how to take a full body picture of yourself, outfit photos alone | `/guides/full-body-photo-of-yourself/` |
| diy family christmas card photo, take own family photo | `/guides/diy-family-christmas-photo/` (seasonal: promote Oct–Dec) |
| professional headshot at home with phone | `/guides/diy-headshot-at-home/` |

**Next steps:**
1. Add the site to **Google Search Console** and **Bing Webmaster Tools**, submit `https://phonetakeaphoto.com/sitemap.xml`.
2. Publish one new guide every 2 weeks (add an entry in `scripts/content-seo.mjs`, then run `node scripts/build.mjs`). Ideas: "How to photograph stars with a phone", "DIY engagement photos", "Pregnancy/maternity photos at home", "How to film yourself cooking", "Back-to-school family photo", "Best cheap phone tripods". When content changes, bump `UPDATED` in `scripts/build.mjs`.
3. Backlinks: get listed on accessibility resource pages (see §5), "best selfie apps" roundups and AlternativeTo (as an alternative to "camera remote" apps).

---

## 4. Short-form video (TikTok, Reels, Shorts) — highest upside

The product demos itself in under 5 seconds, so video is your best organic channel. Post 3–5×/week from one account (e.g. @phonetakeaphoto), all linking to `/get/?utm_source=tiktok`.

Hooks that work:
1. **"POV: you're the friend who's always taking the photo"** → prop phone, run in, "phone, take a photo", everyone in shot.
2. **"Solo travel hack nobody told you about"** → scenic spot, phone on a rock, say it, cut to amazing photo.
3. **"My dog won't sit still so…"** → set up, wait for the moment, say it.
4. **"Recording a recipe with flour hands"** → "start recording" … "stop recording".
5. **"This app works in airplane mode"** → mountain/no signal.
6. **"Testing if it can hear me from 50 feet"** → challenge format, comments fuel reach.
7. **Duet/Stitch** anyone complaining about self-timers or asking strangers to take photos.

Seed with creators: 10–20 micro creators (5k–50k followers) in solo travel, OOTD fashion, fitness, cooking and disability/accessibility. Offer a free unlock (promo codes) plus a small fee or affiliate. The deliverable is one video using the app naturally.

---

## 5. Communities (be helpful, not spammy)

**Reddit** — answer existing questions ("how do I take photos of myself traveling alone?") with a genuine answer that mentions the app. Relevant subs: r/solotravel, r/iphone, r/androidapps, r/apps, r/AppHookup (post a launch/sale), r/selfie, r/OUTFITS, r/photography (night/long-exposure angle), r/disability, r/ChronicPain, r/cerebralpalsy, r/ALS (accessibility angle, ask mods first), r/SideProject, r/indiehackers (founder story).

Sample r/SideProject post:
> **I built a camera that takes the photo when you say "take a photo"**
> I was always the one left out of group photos, and the 10-second timer never worked. So I built Phone Take A Photo: prop up your phone, say "take a photo" and it shoots. The speech recognition runs fully offline on-device, so there's no cloud and it works in airplane mode. There's also a clap trigger and voice-controlled video. You can try it in your browser without installing: phonetakeaphoto.com. I'd love feedback!

**Product Hunt** — launch on a Tuesday–Thursday. Tagline: *"Say 'take a photo' — a hands-free camera that works offline."* Gallery: og.png + 4 screenshots + the 20s demo video. First comment: the founder story above. Link: `/get/?utm_source=producthunt`.

**Hacker News "Show HN"** — lead with the privacy/tech angle: *"Show HN: A camera app you trigger by saying 'take a photo' (offline, on-device speech)"* linking to the homepage demo.

**Facebook groups** — solo female travel groups, family photography, homeschool co-ops (field trip photos), wedding DIY groups.

---

## 6. Accessibility channel (high intent, high goodwill, link-worthy)

People with limited hand mobility truly need this. Reach out to:
- AppleVis (iOS accessibility app directory and community; submit the app)
- Assistive-technology bloggers and YouTubers, OT/PT (occupational therapy) communities
- Spinal-cord-injury, MS, ALS, cerebral palsy, arthritis foundations' resource pages
- Ask to be listed as a resource, and offer free unlock codes to their members.

Email template:
> Subject: Free hands-free camera app for your members
> Hi {name}, I'm Andrew, the developer of Phone Take A Photo, a camera app that takes photos and video with a voice command ("take a photo") or a clap, with no screen tapping needed. It runs offline and works with Bluetooth headsets. I'd love to offer {org} members free full-version codes and would be grateful for any feedback on accessibility. More info: phonetakeaphoto.com/uses/accessibility. Thanks, Andrew

---

## 7. PR & roundups

Pitch to tech/lifestyle writers, app roundup sites and newsletters (9to5Mac, iMore, Android Police, MakeUseOf, Lifehacker, travel bloggers). Use `/press/`. Pitch angles:
- "Self-timers are dead": the voice shutter for group photos (send before **Thanksgiving / holidays**, the peak group-photo season)
- "Privacy-first AI: voice control with no cloud"
- "Solo travel essential" (send in spring before summer travel)

Also submit to "best apps" directories: AlternativeTo, Slant, There's An AI For That (on-device AI), Uneed, BetaList, SaaSHub.

---

## 8. Offline / QR

`assets/qr-get.svg` points to `/get/?utm_source=website&utm_medium=qr`. Make variants per placement (e.g. `utm_source=flyer-campus`) and use them on:
- Stickers or table tents at photo spots, venues, wedding tables ("Want a group photo? Scan, then say 'take a photo'")
- Business cards, the back of printed photos, conference badges

---

## 9. Lifecycle (inside the app)

- **Watermark on free photos** already markets the app. Make sure it says `phonetakeaphoto.com` so viewers can find it.
- **Referral:** "Give a friend the full version, get watermark removal free".
- **Review prompt** after the 3rd voice capture (see §2).
- **Share sheet default text:** "Taken hands-free with Phone Take A Photo 📸 phonetakeaphoto.com/get".

---

## 10. Weekly scorecard

Track these every Monday: store page views → installs (conversion rate) per store; installs by campaign (`ct` / utm); site visitors → `demo_start` → `demo_capture` → `store_click`; ratings count and average; and the top 10 keyword ranks in App Store Connect/AppFigures.

---

## Maintaining the site

- Content lives in `scripts/build.mjs`. Edit it, then run `node scripts/build.mjs` to regenerate pages and `sitemap.xml`.
- Share images/icons: `node scripts/render-images.mjs` (needs Playwright).
- Hosted on GitHub Pages (`CNAME` → phonetakeaphoto.com). Push to the publishing branch to deploy.
