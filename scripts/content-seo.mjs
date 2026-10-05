// Long-tail SEO pages: platform landing pages and how-to guides.
// Each entry: section ("platform" | "guides"), path, crumb, title (<= ~60 chars), description (<= ~158 chars),
// eyebrow, h1, lede, content (HTML), faqs [[q, a]], related [paths].
export function seoPages({ badges, EMAIL }) {
  return [
    // ---------------- Platforms ----------------
    {
      section: "platform",
      path: "/iphone/",
      crumb: "iPhone & iPad",
      title: "Hands-Free Camera App for iPhone: Take Photos by Voice",
      description: "Take photos on iPhone by saying “take a photo.” A free hands-free camera for iPhone & iPad with offline voice control, voice video and a clap shutter.",
      eyebrow: "For iPhone & iPad",
      h1: "The voice-activated camera for iPhone.",
      lede: "Your iPhone has a great camera and no way to fire it from across the room without extra steps. Phone Take A Photo fixes that: set it down, say “take a photo,” done.",
      content: `
<h2>What you get on iPhone and iPad</h2>
<ul>
  <li><strong>Voice shutter</strong>: “take a photo” fires instantly, as many times as you like.</li>
  <li><strong>Voice video</strong>: “start recording” and “stop recording.”</li>
  <li><strong>On-device speech recognition</strong>: works in airplane mode, nothing is uploaded.</li>
  <li><strong>Clap shutter</strong> for noisy places or when you'd rather not talk.</li>
  <li><strong>Pick your microphone</strong>, including Bluetooth earbuds and headsets, so the phone can hear you from far away.</li>
  <li><strong>Night mode, long exposure and manual controls</strong> for touch-free, shake-free shots.</li>
</ul>
<p>Requires iOS or iPadOS 16 or later. The same app also runs on Apple silicon Macs and Apple Vision Pro.</p>

<h2>Set it up in under a minute</h2>
<ol>
  <li>Download Phone Take A Photo from the App Store (free).</li>
  <li>Allow <strong>Camera</strong> and <strong>Microphone</strong> access when asked. If you tapped “Don't Allow,” turn them back on in <em>Settings → Phone Take A Photo</em>.</li>
  <li>Lean your iPhone against something stable, or put it on a tripod.</li>
  <li>Step into the frame and say <strong>“take a photo.”</strong></li>
</ol>

<h2>Why not just use Siri or the timer?</h2>
<p>Siri can open the Camera app, and the built-in timer gives you 3 or 10 seconds, but neither lets you take shot after shot on your own cue. iOS Voice Control can tap buttons by voice, but it's a system-wide accessibility mode with a learning curve. Phone Take A Photo is built for one job, so it's quick to use. Read the full comparison in <a href="/guides/take-photo-with-voice/">How to take a picture with your voice</a>.</p>

<div class="callout"><p><strong>iPhone tip:</strong> use the rear camera even for selfies. It's sharper than the front camera, and with a voice shutter you don't need to see the screen.</p></div>`,
      faqs: [
        ["Is there an app that takes a picture when you say something on iPhone?", "Yes. Phone Take A Photo takes a picture on iPhone when you say “take a photo,” and starts or stops video with “start recording” and “stop recording.”"],
        ["Does it work with AirPods?", "You can choose which microphone the app listens to, including Bluetooth earbuds and headsets, so you can give commands while the iPhone is far away."],
        ["Does it work on iPad?", "Yes, it supports iPadOS 16 and later, and it also runs on Apple silicon Macs and Apple Vision Pro."]
      ],
      related: ["/guides/take-photo-with-voice/", "/uses/hands-free-selfies/", "/android/"]
    },
    {
      section: "platform",
      path: "/android/",
      crumb: "Android",
      title: "Voice Camera App for Android: Say “Take a Photo”",
      description: "Hands-free, voice-activated camera for Android. Say “take a photo” or “start recording.” Works offline, has a clap shutter, and it's free on Google Play.",
      eyebrow: "For Android",
      h1: "A voice camera that works the same on every Android phone.",
      lede: "Voice shutters on Android depend on your phone's brand and camera app. Phone Take A Photo works the same way on any supported Android phone: say “take a photo” and it shoots.",
      content: `
<h2>Why a dedicated voice camera on Android?</h2>
<p>Some Android camera apps hide a voice-trigger option deep in their settings, and Google Assistant can sometimes take a photo with a countdown. Whether you get those, and how well they work, varies by manufacturer and model. Phone Take A Photo gives you one consistent experience:</p>
<ul>
  <li><strong>“Take a photo”</strong> to shoot, as many times as you like.</li>
  <li><strong>“Start recording” / “stop recording”</strong> for video.</li>
  <li><strong>Offline</strong> speech recognition, with no account and no upload.</li>
  <li><strong>Clap shutter</strong> for loud places.</li>
  <li><strong>Bluetooth microphone</strong> support for long distances.</li>
</ul>

<h2>Get started</h2>
<ol>
  <li>Install Phone Take A Photo from Google Play (free).</li>
  <li>Grant camera and microphone permissions. If you denied them, open <em>Settings → Apps → Phone Take A Photo → Permissions</em>.</li>
  <li>Prop the phone up, step back and say <strong>“take a photo.”</strong></li>
</ol>

<h2>Tips for Android</h2>
<ul>
  <li>Turn off battery optimisation for the app if your phone aggressively pauses apps, so listening doesn't stop mid-shoot.</li>
  <li>For long distances, pair Bluetooth earbuds and choose them as the microphone.</li>
  <li>A cheap phone tripod with a clamp is the best $15 you'll spend on photos of yourself.</li>
</ul>`,
      faqs: [
        ["How do I take a picture with my voice on Android?", "Install Phone Take A Photo from Google Play, allow camera and microphone access, and say “take a photo.” It works the same on any supported Android phone."],
        ["Does it need Google Assistant or internet?", "No. It uses its own offline speech recognition, so it doesn't need Assistant or a data connection."]
      ],
      related: ["/guides/take-photo-with-voice/", "/guides/take-photo-without-touching-phone/", "/iphone/"]
    },
    {
      section: "platform",
      path: "/mac/",
      crumb: "Mac",
      title: "Take Photos on Mac Hands-Free: Photo Booth Alternative",
      description: "Snap photos with your Mac's camera by saying “take a photo.” A hands-free Photo Booth alternative for Apple silicon Macs. No clicking, and it works offline.",
      eyebrow: "For Mac",
      h1: "Take photos on your Mac without touching the keyboard.",
      lede: "Photo Booth makes you click, then counts down. With Phone Take A Photo on an Apple silicon Mac, sit back, get the pose right and say “take a photo.”",
      content: `
<h2>Why use a voice shutter on a Mac?</h2>
<p>Reaching for the trackpad means leaning toward the camera, which spoils the pose and the framing. A voice shutter lets you stay in position:</p>
<ul>
  <li><strong>Profile pictures and quick headshots</strong>: sit at a natural distance, try a few expressions, say the words each time.</li>
  <li><strong>Showing an object to the camera</strong>: hold up a drawing, a product or a pet with both hands.</li>
  <li><strong>Desk and setup shots</strong>: stand back from the desk and shoot.</li>
  <li><strong>Recording short clips</strong> with “start recording” and “stop recording.”</li>
</ul>

<h2>Requirements</h2>
<p>Phone Take A Photo runs on Macs with Apple silicon (M1 or later) running macOS 13 Ventura or newer. Download it from the Mac App Store listing of the same app.</p>

<h2>Photo Booth vs. Phone Take A Photo</h2>
<div class="table-scroll"><table>
  <thead><tr><th></th><th>Photo Booth</th><th>Phone Take A Photo</th></tr></thead>
  <tbody>
    <tr><td>Trigger</td><td>Click, then a countdown</td><td>Say “take a photo,” or clap</td></tr>
    <tr><td>Repeat shots</td><td>Click again each time</td><td>Just say it again</td></tr>
    <tr><td>Video start/stop</td><td>Click</td><td>By voice</td></tr>
    <tr><td>Works offline</td><td>Yes</td><td>Yes</td></tr>
  </tbody>
</table></div>
<p>Looking for a better headshot? See our guide to <a href="/guides/diy-headshot-at-home/">taking a professional headshot at home</a>.</p>`,
      faqs: [
        ["How do I take a picture on my Mac without clicking?", "Install Phone Take A Photo on an Apple silicon Mac (macOS 13+), allow camera and microphone access, and say “take a photo.”"],
        ["Does it work on Intel Macs?", "No. The Mac version requires Apple silicon (M1 or later)."]
      ],
      related: ["/guides/diy-headshot-at-home/", "/iphone/", "/uses/voice-activated-camera/"]
    },

    // ---------------- Guides ----------------
    {
      section: "guides",
      path: "/guides/take-pictures-of-yourself/",
      crumb: "Take pictures of yourself",
      title: "How to Take Pictures of Yourself Alone: 10 Pro Tips",
      description: "How to take great photos of yourself with no photographer: setups, phone height, lighting, poses and a hands-free voice shutter. Perfect for solo travel.",
      eyebrow: "Guide",
      h1: "How to take good pictures of yourself when you're alone",
      lede: "Solo trip, new outfit, no one to hold the phone? Here's the setup that working photographers and travel creators use, and the one trick that makes it effortless.",
      content: `
<h2>The short version</h2>
<ol>
  <li>Prop your phone at the right height (usually chest level).</li>
  <li>Use the <strong>rear camera</strong> and frame the shot with room to move.</li>
  <li>Step into position and trigger the shutter <strong>without walking back</strong>, ideally by voice.</li>
  <li>Take lots of frames and pick the best one later.</li>
</ol>

<h2>10 tips for better self-portraits</h2>
<h3>1. Get the phone off your hand</h3>
<p>An arm-length selfie can only show your face and arm. Put the phone down and you get the background, your outfit and natural hands. A mini tripod, a wall ledge, a backpack or a rock all work.</p>
<h3>2. Chest height is the flattering default</h3>
<p>Below the chin looks up your nose; far above the head distorts proportions. For full-body photos go lower: about waist height, tilted very slightly up, makes legs look longer.</p>
<h3>3. Use the rear camera</h3>
<p>It has the better sensor and lenses. You can't see yourself, but you don't need to. Frame first, then shoot several variations.</p>
<h3>4. Ditch the 10-second timer</h3>
<p>The timer fires when it decides, not when you're ready, and every retake costs a walk back. A voice shutter like <a href="/">Phone Take A Photo</a> fires when you say “take a photo,” so you can shoot ten poses without moving your feet.</p>
<h3>5. Put the light in front of you</h3>
<p>Face a window or the sun at about 45°. Midday sun overhead is harsh; golden hour (the hour after sunrise or before sunset) is easy mode.</p>
<h3>6. Leave space around you</h3>
<p>Frame wider than you think. You can crop later, but you can't add back cut-off feet.</p>
<h3>7. Move between shots</h3>
<p>Turn slightly, shift your weight, look away, walk toward the camera. Small changes between frames give you natural-looking options.</p>
<h3>8. Use burst-style repetition</h3>
<p>Say the command again and again while you move. Shooting 20 frames to get one great one is normal; professionals do the same.</p>
<h3>9. Lock focus and exposure</h3>
<p>If the camera hunts for focus, set it on the spot where you'll stand before you walk in. Manual controls in the app keep it fixed.</p>
<h3>10. Make it safe and quick in public</h3>
<p>Keep the phone within sight, pick spots with fewer passers-by, and use a clamp tripod you can grab in a second. Clap mode is handy when you'd rather not talk out loud.</p>

<h2>Gear that helps (all optional)</h2>
<ul>
  <li>A small flexible tripod or clamp mount</li>
  <li>Bluetooth earbuds as the microphone for long distances</li>
  <li>A cheap reflector or white card to bounce light onto your face</li>
</ul>`,
      faqs: [
        ["How do I take pictures of myself without a tripod?", "Lean your phone on anything stable at roughly chest height: a ledge, a stack of books, a bag or a rock. Then trigger the shot hands-free, for example by saying “take a photo” with Phone Take A Photo."],
        ["How do solo travelers take photos of themselves?", "Most use a small tripod or a stable surface, the rear camera, and a hands-free trigger such as a remote, a watch or a voice shutter, then shoot many frames and pick the best."],
        ["What's the best app to take pictures of yourself?", "Any app that lets you trigger the camera from a distance helps. Phone Take A Photo is free and uses your voice, so you can take repeated shots without going back to the phone."]
      ],
      related: ["/uses/hands-free-selfies/", "/guides/full-body-photo-of-yourself/", "/guides/self-timer-alternatives/"]
    },
    {
      section: "guides",
      path: "/guides/take-photo-without-touching-phone/",
      crumb: "Take a photo without touching your phone",
      title: "How to Take a Photo Without Touching Your Phone (6 Ways)",
      description: "Six ways to take a picture without touching your phone: voice command, clap, self-timer, Bluetooth remote, smartwatch and volume buttons, with pros and cons.",
      eyebrow: "Guide",
      h1: "6 ways to take a photo without touching your phone",
      lede: "Touch-free photos give you sharper long exposures, group shots that include you, and selfies that don't look like selfies. Here's every method, ranked by how hands-free it really is.",
      content: `
<h2>1. Voice command (most hands-free)</h2>
<p>Say a phrase and the camera fires. With <a href="/">Phone Take A Photo</a> the phrase is “take a photo,” and “start recording” / “stop recording” for video. It doesn't need a device or a countdown, and the speech recognition runs offline.</p>
<p><strong>Best for:</strong> selfies, group photos, tripod shots, creators.</p>

<h2>2. Clap or sound trigger</h2>
<p>A sound-reactive shutter fires on a sharp sound like a clap. Phone Take A Photo includes one. It's great where talking feels awkward, but avoid it near other loud noises.</p>

<h2>3. Self-timer</h2>
<p>Built into every camera app. It's simple and always available, but it gives you one shot per run and a fixed 3 or 10 seconds.</p>

<h2>4. Bluetooth shutter remote</h2>
<p>A small clicker that pairs with your phone. It's reliable, but it's extra hardware to buy, charge and lose, and it's visible in your hand in the shot.</p>

<h2>5. Smartwatch camera remote</h2>
<p>Apple Watch and many Wear OS watches can preview and trigger the phone's camera. It works well, but it needs a paired watch, and tapping your wrist changes your pose.</p>

<h2>6. Volume buttons or wired earphones</h2>
<p>Many phones fire the shutter with a volume button, and older wired earphones with volume controls work as a cable remote. You still need to touch something, and the cable length limits how far you can stand.</p>

<h2>Comparison</h2>
<div class="table-scroll"><table>
  <thead><tr><th>Method</th><th>Extra gear</th><th>Repeat shots</th><th>Hands in shot are free</th></tr></thead>
  <tbody>
    <tr><td><strong>Voice command</strong></td><td>No</td><td>Yes</td><td>Yes</td></tr>
    <tr><td>Clap trigger</td><td>No</td><td>Yes</td><td>Mostly</td></tr>
    <tr><td>Self-timer</td><td>No</td><td>No</td><td>Yes</td></tr>
    <tr><td>Bluetooth remote</td><td>Yes</td><td>Yes</td><td>No</td></tr>
    <tr><td>Smartwatch</td><td>Yes</td><td>Yes</td><td>Mostly</td></tr>
    <tr><td>Volume button / cable</td><td>Sometimes</td><td>Yes</td><td>No</td></tr>
  </tbody>
</table></div>`,
      faqs: [
        ["Can I take a picture without pressing the button?", "Yes. You can use a voice command, a clap trigger, the self-timer, a Bluetooth remote or a smartwatch. A voice camera like Phone Take A Photo needs no extra hardware."],
        ["What is the easiest hands-free way to take a photo?", "A voice shutter: prop the phone up and say “take a photo.” There's no countdown and you can repeat it as often as you like."]
      ],
      related: ["/guides/self-timer-alternatives/", "/guides/clap-to-take-photo/", "/uses/voice-activated-camera/"]
    },
    {
      section: "guides",
      path: "/guides/self-timer-alternatives/",
      crumb: "Self-timer alternatives",
      title: "Better Than a Self-Timer: Bluetooth Remote Alternatives",
      description: "Tired of racing the 10-second timer? Compare self-timer alternatives (Bluetooth remotes, smartwatches and voice shutters) and pick the best one.",
      eyebrow: "Guide",
      h1: "Self-timer alternatives that actually work",
      lede: "The self-timer was designed for film cameras: one frame per sprint. Here's what to use instead, and why a voice shutter beats a $15 Bluetooth remote for most people.",
      content: `
<h2>What's wrong with the self-timer?</h2>
<ul>
  <li><strong>It fires on its schedule, not yours.</strong> Someone's always mid-blink.</li>
  <li><strong>One shot per run.</strong> Every retake is another trip to the phone.</li>
  <li><strong>The countdown is stressful.</strong> You end up posing in a rush.</li>
</ul>

<h2>The alternatives</h2>
<h3>Bluetooth camera remote</h3>
<p><strong>Pros:</strong> cheap, reliable, works with the stock camera. <strong>Cons:</strong> another gadget with a battery; it's in your hand and often in the shot; easy to forget at home.</p>
<h3>Smartwatch camera remote</h3>
<p><strong>Pros:</strong> live preview on your wrist. <strong>Cons:</strong> requires a compatible paired watch; glancing at your wrist breaks the pose.</p>
<h3>Interval / burst timer</h3>
<p><strong>Pros:</strong> takes several frames after the countdown. <strong>Cons:</strong> still on a fixed schedule; you'll sort through many near-identical photos.</p>
<h3>Voice shutter (our pick)</h3>
<p><strong>Pros:</strong> nothing to carry or charge; fires exactly when you're ready; unlimited retakes; voice-controlled video too. <strong>Cons:</strong> very loud places need a clap trigger or a Bluetooth mic instead.</p>
<p><a href="/">Phone Take A Photo</a> is a free voice shutter for iPhone, iPad, Mac and Android. It recognises speech offline, includes a clap trigger, and lets you pick a Bluetooth microphone when the phone is far away.</p>

<h2>Which should you use?</h2>
<div class="table-scroll"><table>
  <thead><tr><th>If you…</th><th>Use</th></tr></thead>
  <tbody>
    <tr><td>Want zero extra gear</td><td>Voice shutter</td></tr>
    <tr><td>Shoot at loud concerts or events</td><td>Clap trigger or Bluetooth remote</td></tr>
    <tr><td>Need to see a live preview from far away</td><td>Smartwatch</td></tr>
    <tr><td>Shoot long exposures on a tripod</td><td>Voice shutter (no touch, no shake)</td></tr>
  </tbody>
</table></div>`,
      faqs: [
        ["What can I use instead of a Bluetooth camera remote?", "A voice-activated camera app like Phone Take A Photo replaces a remote: say “take a photo” and the phone shoots, with no hardware needed."],
        ["Is there a self-timer that waits until I'm ready?", "A voice shutter does exactly that. It waits until you say the command, so you're never rushed by a countdown."]
      ],
      related: ["/guides/take-photo-without-touching-phone/", "/uses/group-photos/", "/uses/night-long-exposure/"]
    },
    {
      section: "guides",
      path: "/guides/clap-to-take-photo/",
      crumb: "Clap to take a photo",
      title: "Clap to Take a Photo: Sound-Activated Camera App",
      description: "Take a picture by clapping. How a sound-activated camera shutter works, when to use it instead of voice, and how to get reliable results on iPhone and Android.",
      eyebrow: "Guide",
      h1: "Take a picture by clapping your hands",
      lede: "Sometimes talking to your phone feels awkward: a quiet gallery, a sleeping baby, a crowd. A sound-activated shutter fires on a clap instead.",
      content: `
<h2>How a clap shutter works</h2>
<p>The app listens to the microphone's volume. A clap is a short, sharp spike, much louder than the background for a split second. When the app hears that spike, it fires the shutter. <a href="/">Phone Take A Photo</a> includes this “sound-reactive shutter” alongside voice commands. You can even <a href="/#try">try a clap shutter in your browser</a>.</p>

<h2>When to clap instead of talk</h2>
<ul>
  <li>Somewhere you'd rather not speak out loud</li>
  <li>When people around you are talking (a clap cuts through conversation)</li>
  <li>For kids who love the game of “clap for a photo”</li>
  <li>When you can't easily speak, or prefer not to</li>
</ul>

<h2>Tips for reliable clap triggers</h2>
<ol>
  <li><strong>Clap with cupped hands</strong> for a sharper, louder pop. Finger snaps work up close.</li>
  <li><strong>Mind the background.</strong> Slamming doors, music beats and dropped objects can trigger it too.</li>
  <li><strong>Stay within a few meters</strong>, or use a Bluetooth mic near you.</li>
  <li><strong>Hold the pose for a beat</strong> after clapping so your hands are back in place.</li>
</ol>

<h2>Clap vs. voice</h2>
<p>Voice is more precise: “take a photo” won't fire by accident. Clapping is quicker and language-free. Phone Take A Photo lets you use whichever fits the moment.</p>`,
      faqs: [
        ["Is there an app that takes a picture when you clap?", "Yes. Phone Take A Photo has a sound-reactive shutter that fires on a clap, as well as voice commands like “take a photo.”"],
        ["Can loud noises trigger a clap camera by accident?", "Sudden loud sounds can. In noisy places switch to voice commands, which only fire on the phrase “take a photo.”"]
      ],
      related: ["/guides/take-photo-without-touching-phone/", "/uses/accessibility/", "/uses/voice-activated-camera/"]
    },
    {
      section: "guides",
      path: "/guides/full-body-photo-of-yourself/",
      crumb: "Full-body photo of yourself",
      title: "How to Take a Full-Body Photo of Yourself (Outfit Pics)",
      description: "Take full-length outfit photos of yourself with no mirror and no photographer: camera height, distance, lens choice, poses and a hands-free voice shutter.",
      eyebrow: "Guide",
      h1: "How to take a full-body photo of yourself",
      lede: "Mirror selfies hide your face behind the phone, and arm-length shots can't fit your shoes. Here's how to take clean, full-length outfit photos on your own.",
      content: `
<h2>The setup</h2>
<ol>
  <li><strong>Phone height: waist to hip level</strong>, angled very slightly upward. This keeps proportions natural and makes legs look longer. Shooting from head height makes you look shorter.</li>
  <li><strong>Distance: 2–3 meters</strong> with the main (1×) rear lens. Avoid the ultra-wide (0.5×) lens up close: it stretches whatever's nearest to it.</li>
  <li><strong>Portrait orientation</strong>, with a little space above your head and below your feet.</li>
  <li><strong>Plain background</strong>: a wall, a door or open sky. Clutter steals attention from the outfit.</li>
</ol>

<h2>Trigger it hands-free</h2>
<p>Walk into position and say <strong>“take a photo”</strong> with <a href="/">Phone Take A Photo</a>. Because you're not racing a timer, you can adjust your sleeves, hair and stance, and then shoot. Change pose and say it again.</p>

<h2>Poses that work for outfit photos</h2>
<ul>
  <li><strong>The walk:</strong> step toward the camera and shoot mid-stride.</li>
  <li><strong>The contrapposto:</strong> weight on your back leg, front knee relaxed.</li>
  <li><strong>The look-away:</strong> eyes off-camera, chin slightly down.</li>
  <li><strong>The detail:</strong> hand in pocket, adjusting a cuff, holding a bag.</li>
</ul>

<h2>Light</h2>
<p>Stand facing a window or open shade. Avoid strong light from behind you unless you want a silhouette.</p>`,
      faqs: [
        ["How do I take a full-body picture of myself without a mirror?", "Put your phone at waist height 2–3 meters away using the rear 1× lens, step into frame, and trigger it hands-free with a voice shutter like Phone Take A Photo."],
        ["What height should the camera be for full-body photos?", "Around waist to hip height, tilted slightly upward. That keeps proportions natural and lengthens legs."]
      ],
      related: ["/guides/take-pictures-of-yourself/", "/uses/hands-free-selfies/", "/guides/self-timer-alternatives/"]
    },
    {
      section: "guides",
      path: "/guides/diy-family-christmas-photo/",
      crumb: "DIY family holiday photo",
      title: "How to Take Your Own Family Christmas Card Photo (DIY Guide)",
      description: "Take your own family holiday card photo, everyone included, with just a phone. Location, light, posing kids and pets, outfits, and a hands-free voice shutter.",
      eyebrow: "Seasonal guide",
      h1: "How to take your own family Christmas card photo",
      lede: "No photographer, no session fee, and no one left out. Here's how to shoot a holiday card you'll be proud of with the phone in your pocket.",
      content: `
<h2>1. Pick the spot</h2>
<ul>
  <li><strong>Outdoors in open shade</strong> or on an overcast day gives soft, even light, with no squinting.</li>
  <li><strong>Indoors</strong>, face a big window, turn off overhead lights, and use the tree lights as background sparkle.</li>
  <li>Keep the background simple: a wreath on a door, a staircase, a snowy field.</li>
</ul>

<h2>2. Set up the phone</h2>
<ol>
  <li>Put the phone on a tripod or stack of books at chest height, 3–4 meters away.</li>
  <li>Use the rear 1× camera in portrait for a card, or landscape if you'll crop.</li>
  <li>Frame with extra room at the edges: card templates crop more than you'd expect.</li>
</ol>

<h2>3. Shoot without the timer sprint</h2>
<p>With <a href="/">Phone Take A Photo</a>, anyone in the group can say <strong>“take a photo.”</strong> No one has to run back to the phone, so you can keep the kids in place and fire the moment everyone's looking. Shoot 30+ frames; one will be perfect.</p>
<div class="callout"><p><strong>Kids and pets:</strong> let a child be the “photographer” who says the magic words. It keeps them engaged and smiling. For pets, have someone hold a treat just above the phone.</p></div>

<h2>4. Posing that looks natural</h2>
<ul>
  <li>Stagger heads at different heights and keep everyone touching (arm around, hand on shoulder).</li>
  <li>Do a “serious” round, then a “silly” round: the silly ones often win.</li>
  <li>Try a walking shot toward the camera, holding hands.</li>
</ul>

<h2>5. Outfits</h2>
<p>Coordinate, don't match: pick 2–3 colors that go together, and avoid big logos and tiny stripes.</p>

<h2>Timeline</h2>
<p>Order cards by early December: shoot in mid-November so you have time to reshoot if needed.</p>`,
      faqs: [
        ["How do I take a family photo with everyone in it?", "Prop your phone on a tripod or stable surface, frame the shot, and use a hands-free trigger. With Phone Take A Photo, anyone in the group can say “take a photo” to shoot."],
        ["What's the best time of day for an outdoor holiday photo?", "The hour before sunset, or any time in open shade or on an overcast day, for soft, flattering light."]
      ],
      related: ["/uses/group-photos/", "/guides/self-timer-alternatives/", "/guides/take-pictures-of-yourself/"]
    },
    {
      section: "guides",
      path: "/guides/diy-headshot-at-home/",
      crumb: "DIY headshot at home",
      title: "How to Take a Professional Headshot at Home With Your Phone",
      description: "Take a LinkedIn-ready professional headshot at home with your phone: window light, background, lens, posing tips and a hands-free shutter so you can relax.",
      eyebrow: "Guide",
      h1: "How to take a professional headshot at home",
      lede: "A good headshot comes down to light, angle and a relaxed face. The hardest part of a self-portrait is staying relaxed while you reach for the button, so don't reach for it.",
      content: `
<h2>What you need</h2>
<ul>
  <li>A phone (rear camera) or an Apple silicon Mac</li>
  <li>A window with indirect daylight</li>
  <li>A plain wall, or space to blur the background</li>
  <li>Something to hold the phone at eye level: a tripod, a shelf or books</li>
</ul>

<h2>Step by step</h2>
<ol>
  <li><strong>Face the window.</strong> Stand 1–2 meters from it, facing it or angled about 45°. Turn off the room lights to avoid mixed colors.</li>
  <li><strong>Background 1–2 meters behind you.</strong> Distance makes it softer and avoids shadows on the wall.</li>
  <li><strong>Camera at eye level or slightly above</strong>, about 1–1.5 meters away. Use the 2× lens or portrait mode if your phone has one; it flatters facial features.</li>
  <li><strong>Frame from mid-chest up</strong>, with a little headroom.</li>
  <li><strong>Trigger hands-free.</strong> Say <strong>“take a photo”</strong> with <a href="/">Phone Take A Photo</a>, adjust and say it again. No reaching means your shoulders stay relaxed.</li>
</ol>

<h2>Expression tips</h2>
<ul>
  <li>Push your forehead slightly toward the camera and drop your chin a little. This is the classic “turtle” trick for a defined jawline.</li>
  <li>Squint very slightly with your lower eyelids for a confident look.</li>
  <li>Exhale, then smile as you breathe out. Do 20+ frames.</li>
</ul>

<h2>Finish</h2>
<p>Crop to a square for LinkedIn, lightly brighten, and keep skin retouching subtle.</p>`,
      faqs: [
        ["Can I take a professional headshot with my phone?", "Yes. Use soft window light, the rear camera at eye level, a plain background, and a hands-free trigger so you can stay relaxed while you shoot."],
        ["What lens should I use for a phone headshot?", "The 2× or portrait lens if you have one. Avoid the ultra-wide lens up close, as it distorts faces."]
      ],
      related: ["/mac/", "/guides/take-pictures-of-yourself/", "/uses/hands-free-selfies/"]
    }
  ];
}
