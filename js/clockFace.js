// ─── Shared analog clock-face helper ─────────────────────────────────────────
//
//   APP.clockHandAngles(hour, minute) → { hour, minute }  (degrees clockwise
//     from 12 o'clock; pure + testable)
//   APP.clockFace({ hour, minute, showNumbers, showMinutes, size }) → <svg>
//   APP.clockUpdate(svg, hour, minute)  — reposition the hands of a built face
//
// `showNumbers` (1–12) and `showMinutes` (0,5,…55) are the "visual aids" toggle.
// ─────────────────────────────────────────────────────────────────────────────
window.APP = window.APP || {};
(function (APP) {
  var NS = 'http://www.w3.org/2000/svg';
  var C = 100, R = 92;

  // Pure: degrees clockwise from the 12. Hour hand drifts with the minutes.
  APP.clockHandAngles = function (hour, minute) {
    return {
      hour:   (((hour % 12) + 12) % 12 + minute / 60) * 30,
      minute: (((minute % 60) + 60) % 60) * 6
    };
  };

  function pt(deg, len) {
    var rad = deg * Math.PI / 180;
    return { x: C + len * Math.sin(rad), y: C - len * Math.cos(rad) };
  }
  function mk(tag, attrs) {
    var el = document.createElementNS(NS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    return el;
  }

  APP.clockFace = function (opts) {
    opts = opts || {};
    var hour = opts.hour || 0, minute = opts.minute || 0;
    var svg = mk('svg', { viewBox: '0 0 200 200', class: 'clockface' });
    if (opts.size) { svg.style.width = opts.size + 'px'; svg.style.height = opts.size + 'px'; }
    svg.style.maxWidth = '100%';

    svg.appendChild(mk('circle', { cx: C, cy: C, r: R, fill: '#fffdf5', stroke: '#3a4a6b', 'stroke-width': 5 }));

    var i;
    for (i = 0; i < 60; i++) {
      var major = (i % 5 === 0);
      var o = pt(i * 6, R - 4), n = pt(i * 6, R - (major ? 14 : 8));
      svg.appendChild(mk('line', {
        x1: o.x, y1: o.y, x2: n.x, y2: n.y,
        stroke: major ? '#3a4a6b' : '#c2cad8', 'stroke-width': major ? 3 : 1.5, 'stroke-linecap': 'round'
      }));
    }

    if (opts.showNumbers) {
      for (i = 1; i <= 12; i++) {
        var p = pt(i * 30, R - 26);
        var tx = mk('text', { x: p.x, y: p.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 18, 'font-weight': 'bold', fill: '#1a4a6b', 'font-family': 'sans-serif' });
        tx.textContent = i;
        svg.appendChild(tx);
      }
    }
    if (opts.showMinutes) {
      for (i = 0; i < 12; i++) {
        var pm = pt(i * 30, R - (opts.showNumbers ? 44 : 26));
        var tm = mk('text', { x: pm.x, y: pm.y, 'text-anchor': 'middle', 'dominant-baseline': 'central', 'font-size': 10, 'font-weight': '600', fill: '#e06666', 'font-family': 'sans-serif' });
        tm.textContent = i * 5;
        svg.appendChild(tm);
      }
    }

    var ang = APP.clockHandAngles(hour, minute);
    var hp = pt(ang.hour, R * 0.5);
    var hourHand = mk('line', { x1: C, y1: C, x2: hp.x, y2: hp.y, stroke: '#1a4a6b', 'stroke-width': 7, 'stroke-linecap': 'round', class: 'clock-hand-hour' });
    svg.appendChild(hourHand);
    var mp = pt(ang.minute, R * 0.82);
    var minHand = mk('line', { x1: C, y1: C, x2: mp.x, y2: mp.y, stroke: '#e06666', 'stroke-width': 4.5, 'stroke-linecap': 'round', class: 'clock-hand-minute' });
    svg.appendChild(minHand);
    svg.appendChild(mk('circle', { cx: C, cy: C, r: 6, fill: '#3a4a6b' }));

    svg.__clock = { hourHand: hourHand, minHand: minHand, C: C, R: R };
    return svg;
  };

  APP.clockUpdate = function (svg, hour, minute) {
    if (!svg || !svg.__clock) return;
    var ang = APP.clockHandAngles(hour, minute);
    APP.clockSetHandAngles(svg, ang.hour, ang.minute);
  };

  // Set each hand to an explicit angle (degrees from 12). Used by Set-the-Hands,
  // where the hour hand points exactly at its number with no minute drift.
  APP.clockSetHandAngles = function (svg, hourDeg, minuteDeg) {
    if (!svg || !svg.__clock) return;
    var hp = pt(hourDeg, R * 0.5), mp = pt(minuteDeg, R * 0.82);
    svg.__clock.hourHand.setAttribute('x2', hp.x);
    svg.__clock.hourHand.setAttribute('y2', hp.y);
    svg.__clock.minHand.setAttribute('x2', mp.x);
    svg.__clock.minHand.setAttribute('y2', mp.y);
  };
})(window.APP);
