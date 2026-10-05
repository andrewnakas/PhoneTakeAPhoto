/* Phone Take A Photo — shared site behaviour: store links, attribution, sticky CTA, analytics hook. */
(function () {
  "use strict";

  var CONFIG = {
    iosId: "6450124820",
    androidId: "com.nakas.phonetakeaphoto",
    // App Store Connect > Analytics > Campaigns gives you a provider token (pt).
    // Fill it in to see which page/placement drives installs. Leave empty to skip.
    appleProviderToken: ""
  };

  var ua = navigator.userAgent || "";
  var isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  var isAndroid = /Android/i.test(ua);
  var platform = isIOS ? "ios" : isAndroid ? "android" : "desktop";
  document.documentElement.setAttribute("data-platform", platform);

  // Carry inbound campaign info (utm_source etc.) into store links so installs are attributable.
  var params = new URLSearchParams(location.search);
  var source = params.get("utm_source") || params.get("ref") || (document.referrer ? hostOf(document.referrer) : "") || "direct";
  var campaign = params.get("utm_campaign") || "";

  function hostOf(url) { try { return new URL(url).hostname.replace(/^www\./, ""); } catch (e) { return ""; } }
  function slug(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40); }

  function storeUrl(store, placement) {
    var page = slug(location.pathname.replace(/index\.html$/, "")) || "home";
    if (store === "ios") {
      var ct = slug([source, campaign, page, placement].filter(Boolean).join("-")).slice(0, 40);
      var u = "https://apps.apple.com/app/apple-store/id" + CONFIG.iosId + "?mt=8&ct=" + encodeURIComponent(ct);
      if (CONFIG.appleProviderToken) u += "&pt=" + encodeURIComponent(CONFIG.appleProviderToken);
      return u;
    }
    var ref = "utm_source=" + encodeURIComponent(source) + "&utm_medium=website&utm_campaign=" +
      encodeURIComponent(campaign || page) + "&utm_content=" + encodeURIComponent(placement || "link");
    return "https://play.google.com/store/apps/details?id=" + CONFIG.androidId + "&referrer=" + encodeURIComponent(ref);
  }

  function track(name, props) {
    props = props || {};
    props.platform = platform;
    try {
      if (window.plausible) window.plausible(name, { props: props });
      if (window.gtag) window.gtag("event", name, props);
      if (window.dataLayer && !window.gtag) window.dataLayer.push(Object.assign({ event: name }, props));
    } catch (e) { /* analytics must never break the page */ }
  }

  function bestStore() { return platform === "android" ? "android" : "ios"; }

  window.PTAP = { track: track, storeUrl: storeUrl, platform: platform, bestStore: bestStore, config: CONFIG };

  document.addEventListener("DOMContentLoaded", function () {
    // Store badges and "Get the app" buttons.
    document.querySelectorAll("[data-store]").forEach(function (a) {
      var store = a.getAttribute("data-store");
      if (store === "auto") store = bestStore();
      a.href = storeUrl(store, a.getAttribute("data-placement") || "link");
      a.rel = "noopener";
      a.addEventListener("click", function () {
        track("store_click", { store: store, placement: a.getAttribute("data-placement") || "link", page: location.pathname });
      });
    });

    // Put the visitor's own platform badge first.
    if (platform === "android") {
      document.querySelectorAll(".badges").forEach(function (b) {
        var play = b.querySelector('[data-store="android"]');
        if (play) b.insertBefore(play, b.firstChild);
      });
    }

    // Sticky mobile CTA appears after the visitor scrolls past the hero.
    var sticky = document.querySelector(".sticky-cta");
    if (sticky) {
      var dismissed = false;
      try { dismissed = sessionStorage.getItem("ptap-sticky") === "x"; } catch (e) {}
      var onScroll = function () {
        if (dismissed) return;
        sticky.classList.toggle("show", window.scrollY > 600);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      var close = sticky.querySelector(".close");
      if (close) close.addEventListener("click", function () {
        dismissed = true; sticky.classList.remove("show");
        try { sessionStorage.setItem("ptap-sticky", "x"); } catch (e) {}
      });
    }

    // Share buttons
    document.querySelectorAll("[data-share]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var data = { title: "Phone Take A Photo", text: "Take photos just by saying “take a photo” — hands-free camera app:", url: "https://phonetakeaphoto.com/?utm_source=share&utm_medium=web_share" };
        track("share_click", { placement: btn.getAttribute("data-share") });
        if (navigator.share) { navigator.share(data).catch(function () {}); }
        else if (navigator.clipboard) { navigator.clipboard.writeText(data.url); btn.textContent = "Link copied!"; }
      });
    });

    var y = document.querySelector("[data-year]");
    if (y) y.textContent = new Date().getFullYear();
  });
})();
