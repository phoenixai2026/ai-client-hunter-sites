/* WebLorosae Meta Pixel. Load only after visitor opts in to marketing tracking. */
(function () {
  'use strict';
  var consentKey = 'weblorosae_meta_pixel_consent_v1';
  var pixelId = '1462417659041905';
  var loaded = false;
  function storedChoice() {
    try { return window.localStorage.getItem(consentKey); } catch (e) { return null; }
  }
  function saveChoice(choice) {
    try { window.localStorage.setItem(consentKey, choice); } catch (e) {}
  }
  function loadPixel() {
    if (loaded || storedChoice() !== 'accepted') return;
    loaded = true;
    !function(f,b,e,v,n,t,s) {
      if(f.fbq)return;
      n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
      t=b.createElement(e);t.async=!0;t.src=v;
      s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s);
    }(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  }
  function showConsent() {
    if (document.getElementById('wl-tracking-consent')) return;
    var box = document.createElement('section');
    box.id = 'wl-tracking-consent';
    box.setAttribute('role', 'dialog');
    box.setAttribute('aria-label', 'Optional advertising tracking');
    box.style.cssText = 'position:fixed;z-index:10000;bottom:15px;left:15px;right:15px;max-width:600px;margin:auto;background:#fff;color:#17211d;border:1px solid #dedfd9;border-radius:16px;box-shadow:0 12px 40px #0003;padding:18px;font:15px/1.5 system-ui,sans-serif';
    box.innerHTML = '<strong>Optional advertising cookies</strong><p style="margin:8px 0 12px">With your permission, we use the Meta Pixel to understand website visits and Get Started clicks from our advertising. You can decline and still use this website. <a href="/privacy.html" style="text-decoration:underline;color:#214f3d">Privacy Policy</a></p><div style="display:flex;gap:10px;flex-wrap:wrap"><button type="button" data-wl-consent="declined" style="padding:10px 15px;border:1px solid #214f3d;background:white;color:#214f3d;border-radius:30px;font:inherit;cursor:pointer">Decline</button><button type="button" data-wl-consent="accepted" style="padding:10px 15px;border:1px solid #214f3d;background:#214f3d;color:white;border-radius:30px;font:inherit;cursor:pointer">Allow tracking</button></div>';
    box.addEventListener('click', function(e) {
      var button=e.target.closest('[data-wl-consent]');
      if (!button) return;
      var choice=button.getAttribute('data-wl-consent');
      saveChoice(choice);
      box.remove();
      if (choice==='accepted') loadPixel();
      if (choice==='declined' && loaded) window.location.reload();
    });
    document.body.appendChild(box);
  }
  function addSettingsLink() {
    var footer = document.querySelector('footer');
    if (!footer || document.getElementById('wl-cookie-settings')) return;
    var a=document.createElement('a');
    a.id='wl-cookie-settings';
    a.href='#';
    a.textContent='Advertising cookie settings';
    a.style.cssText='display:inline-block;margin:12px 16px;color:inherit;text-decoration:underline;font-size:13px';
    a.addEventListener('click',function(e) {
      e.preventDefault();
      showConsent();
    });
    footer.appendChild(a);
  }
  document.addEventListener('DOMContentLoaded',function() {
    addSettingsLink();
    if (storedChoice() === 'accepted') loadPixel();
    else if (storedChoice() !== 'declined') showConsent();
    // A click is an indication of interest, NOT a completed lead or purchase.
    document.querySelectorAll('a[href*="fvautomation.app.n8n.cloud/form/"]').forEach(function(link) {
      link.addEventListener('click',function() {
        if (loaded && typeof window.fbq === 'function') window.fbq('trackCustom','GetStartedClick');
      });
    });
  });
}());
