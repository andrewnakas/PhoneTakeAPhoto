/* Phone Take A Photo — in-browser demo.
 * Say "take a photo" (or clap) and the camera fires. Everything runs locally in the page;
 * photos are never uploaded anywhere. */
(function () {
  "use strict";
  var root = document.getElementById("demo");
  if (!root) return;

  var $ = function (sel) { return root.querySelector(sel); };
  var video = $("video"), flash = $(".flash"), bubble = $(".bubble"), bubbleText = $(".bubble span"), bubbleLabel = $(".bubble small");
  var statusPill = $(".pill"), statusText = $(".pill span:last-child"), meter = $(".meter i");
  var startLayer = $(".demo-start"), startBtn = $(".demo-go"), startMsg = $(".demo-msg");
  var shutter = $(".shutter"), thumb = $(".thumb"), flipBtn = $(".flip"), modeBtns = root.querySelectorAll("[data-mode]");
  var modal = document.getElementById("demo-modal");

  var SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  var TRIGGER = /\b(take|snap|grab|shoot)\s+(a\s+|the\s+|my\s+|another\s+)?(photo|picture|pic|pick|selfie|shot|foto)\b|\bcheese\b/i;
  var track = (window.PTAP && window.PTAP.track) || function () {};

  var state = { running: false, mode: SR ? "voice" : "clap", facing: "user", stream: null, audioStream: null,
    rec: null, audioCtx: null, analyser: null, raf: 0, lastShot: 0, firedFor: -1, shots: [], modalShown: false };

  if (!SR) {
    var vb = root.querySelector('[data-mode="voice"]');
    if (vb) { vb.disabled = true; vb.title = "Speech recognition isn't available in this browser"; }
  }
  setModeButtons();

  function say(label, text, hit) {
    bubbleLabel.textContent = label;
    bubbleText.textContent = text;
    bubble.classList.toggle("hit", !!hit);
  }
  function setStatus(text, live) { statusText.textContent = text; statusPill.classList.toggle("live", !!live); }
  function setModeButtons() {
    modeBtns.forEach(function (b) { b.setAttribute("aria-pressed", String(b.getAttribute("data-mode") === state.mode)); });
  }

  function ensureAudioCtx() {
    var Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    if (!state.audioCtx) { try { state.audioCtx = new Ctx(); } catch (e) { return null; } }
    if (state.audioCtx.state === "suspended") state.audioCtx.resume();
    return state.audioCtx;
  }

  function fallBackToClap(why) {
    stopVoice();
    state.mode = "clap"; setModeButtons();
    startClap().then(function () { say(why, "Clap to take a photo", false); })
      .catch(function () { state.mode = "tap"; setModeButtons(); setStatus("Tap mode", false); say(why, "Tap the shutter", false); });
  }

  // ---------- Camera ----------
  function startCamera() {
    if (state.stream) state.stream.getTracks().forEach(function (t) { t.stop(); });
    return navigator.mediaDevices.getUserMedia({
      video: { facingMode: state.facing, width: { ideal: 1920 }, height: { ideal: 1080 } }, audio: false
    }).then(function (stream) {
      state.stream = stream;
      video.srcObject = stream;
      video.classList.toggle("mirror", state.facing === "user");
      return video.play().catch(function () {});
    });
  }

  // ---------- Voice ----------
  function startVoice() {
    if (!SR) return;
    var rec = new SR();
    rec.lang = "en-US";
    rec.continuous = true;
    rec.interimResults = true;
    rec.maxAlternatives = 3;
    var started = false;
    rec.onstart = function () { started = true; setStatus("Listening", true); };
    setTimeout(function () { if (state.rec === rec && !started) fallBackToClap("Voice didn't start"); }, 4000);
    rec.onresult = function (e) {
      for (var i = e.resultIndex; i < e.results.length; i++) {
        var res = e.results[i], heard = res[0].transcript.trim();
        if (heard) say("Heard", "“" + heard + "”", false);
        var matched = false;
        for (var a = 0; a < res.length; a++) if (TRIGGER.test(res[a].transcript)) matched = true;
        if (matched && state.firedFor !== i) {
          state.firedFor = i;
          capture("voice");
        }
        if (res.isFinal && state.firedFor === i) state.firedFor = -1 - i; // allow next utterance
      }
    };
    var restarts = [];
    rec.onerror = function (e) {
      if (e.error === "not-allowed" || e.error === "service-not-allowed") {
        stopVoice();
        say("Mic blocked", "Allow the microphone, or tap the shutter", false);
        setStatus("Mic off", false);
        state.mode = "tap"; setModeButtons();
      } else if (e.error === "network" || e.error === "language-not-supported") {
        // Some browsers (e.g. Brave, offline Chrome) expose speech recognition but can't run it.
        fallBackToClap("Voice unavailable here");
      }
    };
    rec.onend = function () {
      state.firedFor = -1;
      if (state.rec !== rec) return;
      if (state.running && state.mode === "voice" && !document.hidden) {
        var now = Date.now();
        restarts = restarts.filter(function (t) { return now - t < 4000; });
        restarts.push(now);
        if (restarts.length > 6) { fallBackToClap("Voice keeps stopping"); return; }
        setTimeout(function () { if (state.rec === rec) { try { rec.start(); } catch (err) {} } }, 200);
      } else setStatus("Mic off", false);
    };
    state.rec = rec;
    try { rec.start(); } catch (err) {}
    say("Say", "“Take a photo”", false);
  }
  function stopVoice() {
    if (state.rec) { var r = state.rec; state.rec = null; r.onend = null; try { r.abort(); } catch (e) {} }
  }

  // ---------- Clap (sound-reactive shutter) ----------
  function startClap() {
    return navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: false, noiseSuppression: false, autoGainControl: false } })
      .then(function (s) {
        state.audioStream = s;
        if (state.mode !== "clap") { s.getTracks().forEach(function (t) { t.stop(); }); state.audioStream = null; return; }
        if (!ensureAudioCtx()) throw new Error("no audio");
        var src = state.audioCtx.createMediaStreamSource(s);
        var an = state.audioCtx.createAnalyser();
        an.fftSize = 1024;
        src.connect(an);
        state.analyser = an;
        var buf = new Float32Array(an.fftSize), avg = 0.02;
        setStatus("Listening for a clap", true);
        say("Clap mode", "Clap or snap your fingers", false);
        var loop = function () {
          if (!state.analyser) return;
          an.getFloatTimeDomainData(buf);
          var sum = 0, peak = 0;
          for (var i = 0; i < buf.length; i++) { var v = Math.abs(buf[i]); sum += v * v; if (v > peak) peak = v; }
          var rms = Math.sqrt(sum / buf.length);
          meter.style.width = Math.min(100, rms * 400) + "%";
          if (peak > 0.35 && rms > Math.max(0.06, avg * 5)) capture("clap");
          avg = avg * 0.95 + rms * 0.05;
          state.raf = requestAnimationFrame(loop);
        };
        loop();
      });
  }
  function stopClap() {
    cancelAnimationFrame(state.raf);
    state.analyser = null;
    meter.style.width = "0";
    if (state.audioStream) { state.audioStream.getTracks().forEach(function (t) { t.stop(); }); state.audioStream = null; }
  }

  function startListening() {
    stopVoice(); stopClap();
    if (state.mode === "voice") startVoice();
    else if (state.mode === "clap") startClap().catch(function () {
      say("Mic blocked", "Allow the microphone to use Clap mode", false); setStatus("Mic off", false);
    });
    else { setStatus("Tap mode", false); say("Tap", "Tap the shutter", false); }
  }

  // ---------- Capture ----------
  function shutterSound() {
    try {
      var ctx = ensureAudioCtx();
      if (!ctx) return;
      var len = ctx.sampleRate * 0.12, b = ctx.createBuffer(1, len, ctx.sampleRate), d = b.getChannelData(0);
      for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      var s = ctx.createBufferSource(), g = ctx.createGain();
      g.gain.value = 0.35; s.buffer = b; s.connect(g); g.connect(ctx.destination); s.start();
    } catch (e) {}
  }

  function capture(trigger) {
    var now = Date.now();
    if (!state.running || now - state.lastShot < 1500 || !video.videoWidth) return;
    state.lastShot = now;

    var w = video.videoWidth, h = video.videoHeight, scale = Math.min(1, 1600 / Math.max(w, h));
    var cw = Math.round(w * scale), ch = Math.round(h * scale);
    var c = document.createElement("canvas"); c.width = cw; c.height = ch;
    var g = c.getContext("2d");
    if (state.facing === "user") { g.translate(cw, 0); g.scale(-1, 1); }
    g.drawImage(video, 0, 0, cw, ch);
    g.setTransform(1, 0, 0, 1, 0, 0);

    // Branded watermark: every shared photo advertises how it was taken.
    var bar = Math.max(36, Math.round(ch * 0.065)), fs = Math.round(bar * 0.42);
    var grad = g.createLinearGradient(0, ch - bar * 2, 0, ch);
    grad.addColorStop(0, "rgba(0,0,0,0)"); grad.addColorStop(1, "rgba(0,0,0,.6)");
    g.fillStyle = grad; g.fillRect(0, ch - bar * 2, cw, bar * 2);
    g.fillStyle = "#fff"; g.textBaseline = "middle";
    g.font = "700 " + fs + "px system-ui, -apple-system, Segoe UI, Roboto, sans-serif";
    var label = trigger === "clap" ? "👏 Taken with a clap" : trigger === "voice" ? "🗣 “Take a photo”" : "📸 Hands-free camera";
    g.textAlign = "left"; g.fillText(label, Math.round(bar * 0.5), ch - bar * 0.65);
    g.textAlign = "right"; g.fillStyle = "#ffc93c"; g.fillText("phonetakeaphoto.com", cw - Math.round(bar * 0.5), ch - bar * 0.65);

    flash.classList.remove("go"); void flash.offsetWidth; flash.classList.add("go");
    shutterSound();
    if (navigator.vibrate) navigator.vibrate(30);
    say(trigger === "voice" ? "Heard you!" : trigger === "clap" ? "Clap detected!" : "Snap!", "📸 Photo taken", true);
    setTimeout(function () { if (state.running) say(state.mode === "clap" ? "Clap mode" : "Say", state.mode === "clap" ? "Clap again for another" : "“Take a photo”", false); }, 1800);

    c.toBlob(function (blob) {
      if (!blob) return;
      var url = URL.createObjectURL(blob);
      state.shots.push({ blob: blob, url: url });
      thumb.style.backgroundImage = "url(" + url + ")";
      track("demo_capture", { trigger: trigger, count: state.shots.length });
      if (!state.modalShown) { state.modalShown = true; setTimeout(function () { openModal(state.shots.length - 1); }, 700); }
    }, "image/jpeg", 0.9);
  }

  // ---------- Modal ----------
  function openModal(idx) {
    var shot = state.shots[idx];
    if (!shot || !modal) return;
    modal.querySelector("img").src = shot.url;
    var dl = modal.querySelector(".dl");
    dl.href = shot.url;
    dl.download = "phone-take-a-photo-" + new Date().toISOString().slice(0, 19).replace(/[:T]/g, "-") + ".jpg";
    var shareBtn = modal.querySelector(".share-photo");
    var file;
    try { file = new File([shot.blob], dl.download, { type: "image/jpeg" }); } catch (e) {}
    var canShare = file && navigator.canShare && navigator.canShare({ files: [file] });
    shareBtn.hidden = !canShare;
    shareBtn.onclick = function () {
      track("demo_share", {});
      navigator.share({ files: [file], title: "Hands-free photo", text: "I took this by saying “take a photo” — phonetakeaphoto.com" }).catch(function () {});
    };
    modal.classList.add("open");
    modal.querySelector(".close-modal").focus();
  }
  if (modal) {
    modal.addEventListener("click", function (e) { if (e.target === modal || e.target.closest(".close-modal")) modal.classList.remove("open"); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") modal.classList.remove("open"); });
    modal.querySelector(".dl").addEventListener("click", function () { track("demo_download", {}); });
  }

  // ---------- Wiring ----------
  startBtn.addEventListener("click", function () {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      startMsg.textContent = "This browser can't open the camera. Open this page in Safari or Chrome — or just get the app.";
      return;
    }
    startBtn.disabled = true; startBtn.textContent = "Starting…";
    ensureAudioCtx();
    state.running = true;
    startListening(); // inside the tap, so mobile browsers allow the mic
    startCamera().then(function () {
      startLayer.hidden = true;
      track("demo_start", { mode: state.mode });
    }).catch(function (err) {
      state.running = false; stopVoice(); stopClap(); setStatus("Mic off", false);
      startBtn.disabled = false; startBtn.textContent = "Try again";
      startMsg.textContent = err && err.name === "NotAllowedError"
        ? "Camera permission was blocked. Allow it in your browser's site settings, then try again."
        : "Couldn't open a camera on this device. The app works on any iPhone, iPad, Mac or Android phone.";
    });
  });

  shutter.addEventListener("click", function () { capture("tap"); });
  thumb.addEventListener("click", function () { if (state.shots.length) openModal(state.shots.length - 1); });
  flipBtn.addEventListener("click", function () {
    state.facing = state.facing === "user" ? "environment" : "user";
    if (state.running) startCamera().catch(function () { state.facing = "user"; });
  });
  modeBtns.forEach(function (b) {
    b.addEventListener("click", function () {
      if (b.disabled) return;
      ensureAudioCtx();
      state.mode = b.getAttribute("data-mode");
      setModeButtons();
      if (state.running) startListening();
    });
  });
  document.addEventListener("visibilitychange", function () {
    if (!state.running) return;
    if (document.hidden) { stopVoice(); stopClap(); setStatus("Paused", false); }
    else startListening();
  });
})();
