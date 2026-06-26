/* ============================================================
   VOIDFORGE SYSTEMS — Rig visuals (photo-ready, zero fake renders)
   ------------------------------------------------------------
   Each prebuilt rig shows a REAL product photo when one is
   present. Until then it shows a clean, premium branded plate
   built from the rig's own accent + key specs — no cartoon
   SVG renders, no glowing placeholder boxes.

   DROP IN A REAL PHOTO:
     1. Name the photo after the rig key, e.g.  quasar.jpg
     2. Put it in  assets/parts/
     3. Uncomment its line in RIG_IMAGES below.
   The photo then replaces the plate automatically everywhere.
   ============================================================ */
(function (w) {
  'use strict';

  w.RIG_IMAGES = {
    // quasar: 'assets/parts/quasar.jpg',
    // nova:   'assets/parts/nova.jpg',
    // pulsar: 'assets/parts/pulsar.jpg',
  };

  var RIGS = {
    quasar: { accent: '#00d4ff', tier: 'Flagship · Apex Tier', label: 'QUASAR X9',
              specs: ['RTX 5090', 'Ryzen 9 9950X3D', '360mm RGB AIO'] },
    nova:   { accent: '#fbbf24', tier: 'Creator Tier',        label: 'NOVA C7',
              specs: ['RTX 5070 Ti', 'Ryzen 9 7900X3D', '64GB DDR5'] },
    pulsar: { accent: '#22ff88', tier: 'Esports Tier',        label: 'PULSAR E5',
              specs: ['RTX 5070', 'Ryzen 7 7800X3D', '240Hz+ ready'] }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/"/g, '&quot;'); }

  /* Returns the inner HTML for a rig visual area.
     key: 'quasar' | 'nova' | 'pulsar'  (falls back to quasar) */
  w.rigVisual = function (key) {
    var r = RIGS[key] || RIGS.quasar;
    var src = w.RIG_IMAGES && w.RIG_IMAGES[key];
    if (src) {
      return '<img class="rig-photo" src="' + esc(src) + '" alt="VoidForge Systems ' +
        esc(r.label) + ' custom PC" loading="lazy" decoding="async" ' +
        'onerror="this.parentNode.innerHTML=window.rigPlate(\'' + esc(key) + '\')">';
    }
    return w.rigPlate(key);
  };

  /* The premium fallback plate (also exposed for the img onerror handler). */
  w.rigPlate = function (key) {
    var r = RIGS[key] || RIGS.quasar;
    var chips = r.specs.map(function (s) { return '<span>' + esc(s) + '</span>'; }).join('');
    return '<div class="rig-plate" style="--ac:' + esc(r.accent) + '">' +
             '<div class="rig-plate-glow"></div>' +
             '<div class="rig-plate-body">' +
               '<span class="rig-plate-ey">' + esc(r.tier) + '</span>' +
               '<span class="rig-plate-wm">' + esc(r.label) + '</span>' +
               '<div class="rig-plate-chips">' + chips + '</div>' +
             '</div>' +
           '</div>';
  };

  /* Auto-fill any [data-rig] mount on the page. */
  w.mountRigVisuals = function () {
    var els = document.querySelectorAll('[data-rig]');
    for (var i = 0; i < els.length; i++) {
      els[i].innerHTML = w.rigVisual(els[i].getAttribute('data-rig'));
    }
  };

})(window);
