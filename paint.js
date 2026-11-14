/* MoonHongZEN — 채색 그림 (이 사이트를 위해 새로 그린 장면. 원작 그림을 따라 그린 것이 아니다)
 * 100×110 상자 기준. PAINT에 있는 카드는 선화(art.js) 대신 이 그림을 쓴다.
 * 그라데이션은 PAINT_DEFS에 모아 두고 app.js가 문서에 한 번만 넣는다.
 */
(function () {
  'use strict';
  const grad = (id, stops, x2, y2) => `<linearGradient id="${id}" x1="0" y1="0" x2="${x2 || 0}" y2="${y2 === undefined ? 1 : y2}">` +
    stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('') + '</linearGradient>';
  const dots = (list, fill) => list.map(([x, y, r, o]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity="${o || 1}"/>`).join('');
  const petals = (n, d, fill) => Array.from({ length: n }, (_, i) => `<path transform="rotate(${i * 360 / n})" d="${d}" fill="${fill}"/>`).join('');

  window.PAINT_DEFS =
    grad('pm00a', [[0, '#2b2a5e'], [.45, '#b05a7a'], [.72, '#f0a06a'], [1, '#f8dc8c']]) +
    grad('pm08a', [[0, '#1c2248'], [.6, '#46508a'], [1, '#8f9bd0']]) +
    grad('pm17a', [[0, '#090c1c'], [.6, '#1a2758'], [1, '#34508f']]) +
    grad('pm17b', [[0, '#22356e'], [1, '#0b0f22']]) +
    grad('pw12a', [[0, '#22347e'], [.5, '#5d8fd6'], [.85, '#f1b9cd'], [1, '#fbdde4']]);

  window.PAINT = {
    /* 바보: 새벽, 벼랑 끝에서 꽃을 들고 한 발을 내딛는 사람 */
    m00: '<rect width="100" height="110" fill="url(#pm00a)"/>' +
      dots([[12, 8, .7, .9], [30, 14, .5, .7], [52, 6, .6, .8], [84, 10, .7, .9], [92, 24, .5, .6], [20, 26, .4, .6]], '#fff') +
      '<circle cx="70" cy="64" r="27" fill="#fff3c4" opacity=".22"/><circle cx="70" cy="64" r="15" fill="#fff6d6"/>' +
      '<path d="M0 80C18 70 38 76 56 72C76 67 90 74 100 70V110H0Z" fill="#b8697a" opacity=".75"/>' +
      '<path d="M0 94C26 84 54 94 100 84V110H0Z" fill="#74456f"/>' +
      '<path d="M0 58H39C44 58 46 61 44 66C40 78 38 94 41 110H0Z" fill="#1f274a"/>' +
      '<path d="M0 58H39" stroke="#7fc99a" stroke-width="1.6" stroke-linecap="round"/>' +
      '<path d="M6 58v-3M12 58v-4M20 58v-3M27 58v-4" stroke="#7fc99a" stroke-width="1" stroke-linecap="round"/>' +
      '<g stroke-linecap="round" stroke-linejoin="round" fill="none">' +
      '<path d="M35 44C30 42 28 46 23 43" stroke="#f2c230" stroke-width="1.6"/>' +
      '<path d="M36 47L29 41" stroke="#1f274a" stroke-width="1.2"/>' +
      '<path d="M35.500 54V58M39 54L45.500 55.500" stroke="#1f274a" stroke-width="1.8"/>' +
      '<path d="M38.500 46.500L45.500 43.500" stroke="#f3ecdc" stroke-width="1.5"/></g>' +
      '<circle cx="28" cy="40" r="2.800" fill="#f2c230"/>' +
      '<path d="M37 42.500L32.500 55H41.500Z" fill="#e0566a"/><circle cx="37" cy="39.500" r="3.200" fill="#f3ecdc"/>' +
      '<path d="M34 39C34 35 40 35 40.300 38.500C38 37.500 36 37.800 34 39Z" fill="#1f274a"/>' +
      '<circle cx="46.800" cy="42.800" r="2" fill="#fff"/><circle cx="46.800" cy="42.800" r=".8" fill="#f2c230"/>' +
      '<path d="M76 30q3-3 6 0q3-3 6 0M62 22q2-2 4 0q2-2 4 0" fill="none" stroke="#1f274a" stroke-width="1" stroke-linecap="round"/>',

    /* 용기: 바위틈을 뚫고 빛을 향해 핀 꽃 */
    m08: '<rect width="100" height="110" fill="url(#pm08a)"/>' +
      '<path d="M36 0H72L61 84H45Z" fill="#fff7d6" opacity=".2"/><path d="M45 0H63L57 84H49Z" fill="#fff7d6" opacity=".18"/>' +
      '<path d="M0 110V60L18 48L40 57L48 82L44 110Z" fill="#4a5173"/><path d="M18 48L40 57L30 73L9 66Z" fill="#69719a"/>' +
      '<path d="M0 60L9 66L30 73L24 110H0Z" fill="#3b4162"/>' +
      '<path d="M100 110V54L80 44L60 60L54 84L58 110Z" fill="#434a6e"/><path d="M80 44L60 60L72 75L93 62Z" fill="#5d658e"/>' +
      '<path d="M100 54L93 62L72 75L78 110H100Z" fill="#343a5a"/>' +
      '<path d="M44 110L48 82L51 94L54 84L58 110Z" fill="#141831"/>' +
      '<path d="M51 94C50 82 53.500 72 52 58" fill="none" stroke="#5fae7a" stroke-width="2" stroke-linecap="round"/>' +
      '<path d="M51.300 78C45 76 43 71 42 67C48 68 51 72 51.300 78Z" fill="#6fc08a"/><path d="M52.400 69C58 67 60 62 61 58C56 60 53 63 52.400 69Z" fill="#4f9c6c"/>' +
      `<g transform="translate(52 50)">${petals(7, 'M0 0C-3.500 -3 -3.500 -9 0 -12C3.500 -9 3.500 -3 0 0Z', '#f26a4b')}` +
      `<g transform="rotate(25)">${petals(7, 'M0 0C-2 -2 -2 -6 0 -8C2 -6 2 -2 0 0Z', '#f9a25c')}</g><circle r="2.600" fill="#f2c230"/></g>` +
      dots([[40, 30, .8, .8], [64, 22, .6, .7], [58, 38, .5, .6], [46, 16, .5, .6]], '#fff7d6'),

    /* 침묵: 보름달이 잔잔한 호수에 비치는 밤 */
    m17: '<rect width="100" height="64" fill="url(#pm17a)"/>' +
      dots([[10, 10, .7, .9], [22, 28, .5, .7], [34, 8, .5, .6], [70, 12, .7, .9], [86, 30, .5, .7], [92, 8, .5, .6], [78, 44, .4, .6], [14, 44, .4, .6], [62, 4, .4, .5]], '#fff') +
      '<circle cx="50" cy="30" r="23" fill="#fdf6d8" opacity=".12"/><circle cx="50" cy="30" r="14" fill="#fdf6d8"/>' +
      '<circle cx="45" cy="26" r="2.600" fill="#efe4b4"/><circle cx="54" cy="34" r="3.400" fill="#efe4b4"/><circle cx="55" cy="23" r="1.500" fill="#efe4b4"/>' +
      '<path d="M0 64L16 48L28 57L44 42L58 58L74 49L100 64Z" fill="#131935"/><path d="M44 42L50 49L46 52L52 58H58Z" fill="#1d2550"/>' +
      '<rect y="64" width="100" height="46" fill="url(#pm17b)"/>' +
      '<g fill="#fdf6d8"><ellipse cx="50" cy="70" rx="11" ry="1.500" opacity=".75"/><ellipse cx="50" cy="75" rx="9" ry="1.300" opacity=".55"/>' +
      '<ellipse cx="50" cy="80" rx="6.500" ry="1.100" opacity=".4"/><ellipse cx="50" cy="85" rx="4" ry=".9" opacity=".28"/></g>' +
      '<path d="M8 72H28M70 76H94M14 84H30M66 88H86" stroke="#7fb9ee" stroke-width=".7" stroke-linecap="round" opacity=".35"/>' +
      '<ellipse cx="38" cy="101" rx="13" ry="3" fill="#2f6b5a"/><ellipse cx="64" cy="103" rx="11" ry="2.600" fill="#27594c"/>' +
      '<g transform="translate(50 102)"><path d="M0 0C-9 1 -15 -2 -16 -5C-10 -6 -4 -4 0 0ZM0 0C9 1 15 -2 16 -5C10 -6 4 -4 0 0Z" fill="#ef9fb8"/>' +
      '<path d="M0 0C-7 -1 -11 -6 -11 -10C-6 -10 -2 -6 0 0ZM0 0C7 -1 11 -6 11 -10C6 -10 2 -6 0 0Z" fill="#f6c1d0"/>' +
      '<path d="M0 0C-4 -4 -4 -10 0 -14C4 -10 4 -4 0 0Z" fill="#fff"/></g>',

    /* 신뢰: 두 팔을 벌리고 구름 위 하늘로 몸을 던진 사람 */
    w12: '<rect width="100" height="110" fill="url(#pw12a)"/>' +
      dots([[10, 8, .6, .8], [26, 16, .4, .6], [90, 12, .6, .8], [70, 6, .4, .6]], '#fff') +
      '<circle cx="80" cy="22" r="22" fill="#fff" opacity=".14"/><circle cx="80" cy="22" r="9" fill="#fff8e0" opacity=".9"/>' +
      '<path d="M14 40q3-3 6 0q3-3 6 0M24 30q2-2 4 0q2-2 4 0" fill="none" stroke="#fff" stroke-width="1" stroke-linecap="round" opacity=".8"/>' +
      '<g transform="translate(48 46) rotate(18)" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M1 -9C9 -20 17 -15 24 -26" fill="none" stroke="#e0566a" stroke-width="1.8"/>' +
      '<path d="M0 -6L-17 -13M0 -6L17 -12" fill="none" stroke="#f3ecdc" stroke-width="2.2"/>' +
      '<path d="M-3 17L-5 27M3 17L6 26" fill="none" stroke="#f3ecdc" stroke-width="2.2"/>' +
      '<path d="M0 -9C-4 -2 -6 8 -10 19C-3 16 3 16 10 19C6 8 4 -2 0 -9Z" fill="#fff"/>' +
      '<circle cy="-13" r="3.600" fill="#f3ecdc"/><path d="M-3.600 -13C-4 -18 4 -18.500 3.800 -13.500C1.500 -15.500 -1.500 -15.500 -3.600 -13ZM-3.500 -13.500C-6 -12 -6.500 -8 -8.500 -6C-5 -6.500 -3.500 -9.500 -3.200 -12Z" fill="#1f274a"/></g>' +
      '<g fill="#f6c3d3"><circle cx="8" cy="96" r="14"/><circle cx="28" cy="90" r="13"/><circle cx="50" cy="98" r="15"/><circle cx="74" cy="90" r="14"/><circle cx="94" cy="98" r="13"/></g>' +
      '<g fill="#fde6ec"><circle cx="16" cy="104" r="12"/><circle cx="38" cy="102" r="11"/><circle cx="62" cy="106" r="12"/><circle cx="84" cy="103" r="12"/><circle cx="100" cy="108" r="9"/></g>' +
      '<g fill="#fff" opacity=".7"><circle cx="26" cy="84" r="4"/><circle cx="72" cy="83" r="4.500"/><circle cx="48" cy="90" r="4"/></g>'
  };

  /* ── 장면을 짜는 조각들 ─────────────── */
  const SK = '#f3ecdc', INK = '#1f274a', GOLD = '#f2c230', RED = '#e0566a', WH = '#fff';
  const RB = ['#d2543c', '#d9a21b', '#4a9e6b', '#3f86c9', '#8a5cc7'];
  const GR = {
    night: ['#090c1c', '#1a2758', '#34508f'], deep: ['#070914', '#141a36', '#241f4f'],
    dusk: ['#2a1f55', '#7a3f7a', '#e98a6b'], dawn: ['#2b2a5e', '#b05a7a', '#f0a06a', '#f8dc8c'],
    fire: ['#3a0f1e', '#a8322e', '#f08a3c', '#f8d27a'], ember: ['#160b18', '#4a1a2a', '#b2402e'],
    rose: ['#5a1f4a', '#c85a7a', '#f8c0b0'], gold: ['#6a3f12', '#d09a2a', '#f8e6a8'],
    sea: ['#0f2a5a', '#2f6fb0', '#8fd0e8'], aqua: ['#1a4a7a', '#4f9fd0', '#c8ecf4'],
    day: ['#4a8fd8', '#a8d8f0', '#eef6ea'], ice: ['#3a5a8a', '#9cc4e4', '#eef8fc'],
    grey: ['#2a2f45', '#5d6480', '#a9b0cf'], mist: ['#7c84a2', '#b5bcd4', '#e4e6ee'], storm: ['#14172a', '#3b4162', '#6a7191'],
    violet: ['#2a1f5a', '#6a4aa8', '#e8a8c8'], lilac: ['#5a4aa0', '#b89ae0', '#fbe0ea'], green: ['#173a3a', '#2f7a5a', '#b8dca0']
  };
  window.PAINT_DEFS += Object.keys(GR).map((k) => grad(`g-${k}`, GR[k].map((c, i, a) => [i / (a.length - 1), c]))).join('');

  const op = (o) => (o ? ` opacity="${o}"` : '');
  const P = (d, f, x) => `<path d="${d}" fill="${f}"${x ? ' ' + x : ''}/>`;
  const L = (d, s, w, x) => `<path d="${d}" fill="none" stroke="${s}" stroke-width="${w || 1.5}" stroke-linecap="round" stroke-linejoin="round"${x ? ' ' + x : ''}/>`;
  const C = (x, y, r, f, o) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"${op(o)}/>`;
  const E = (x, y, rx, ry, f, o) => `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}"${op(o)}/>`;
  const R = (x, y, w, h, f, rx, o) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${f}"${rx ? ` rx="${rx}"` : ''}${op(o)}/>`;
  const ring = (x, y, r, s, w, x2) => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${s}" stroke-width="${w || 1}"${x2 ? ' ' + x2 : ''}/>`;
  const T = (x, y, s, inner, rot, flip) => `<g transform="translate(${x} ${y})${rot ? ` rotate(${rot})` : ''} scale(${flip ? -s : s} ${s})">${inner}</g>`;
  const fade = (o, inner) => `<g opacity="${o}">${inner}</g>`;
  const mirror = (inner) => inner + T(100, 0, 1, inner, 0, 1);
  const orbit = (x, y, r, n, fn, off) => Array.from({ length: n }, (_, i) => {
    const a = (off || 0) + i * 360 / n, t = a * Math.PI / 180;
    return fn(+(x + r * Math.cos(t)).toFixed(1), +(y + r * Math.sin(t)).toFixed(1), i, a);
  }).join('');
  const rays = (x, y, r1, r2, n, c, w, o) => L(orbit(0, 0, 1, n, (cx, cy) => `M${(x + r1 * cx).toFixed(1)} ${(y + r1 * cy).toFixed(1)}L${(x + r2 * cx).toFixed(1)} ${(y + r2 * cy).toFixed(1)}`), c, w || 1, o ? `opacity="${o}"` : '');

  const bg = (n) => R(0, 0, 100, 110, `url(#g-${n})`);
  const STARS = [
    [[10, 10, .7, .9], [22, 28, .5, .7], [34, 8, .5, .6], [70, 12, .7, .9], [86, 30, .5, .7], [92, 8, .5, .6], [62, 4, .4, .5], [48, 20, .4, .6]],
    [[16, 6, .5, .8], [6, 34, .4, .6], [28, 18, .6, .8], [78, 6, .5, .7], [94, 20, .6, .9], [84, 42, .4, .6], [58, 10, .4, .6], [40, 30, .3, .5]]
  ];
  const stars = (k) => dots(STARS[k], WH);
  const glow = (x, y, r, f, o) => C(x, y, r, f, o || .2);
  const sun = (x, y, r, f) => C(x, y, r * 1.8, f || '#fff6d6', .2) + C(x, y, r, f || '#fff6d6');
  const cres = (x, y, s, f, rot) => T(x, y, s, P('M6 -16A16 16 0 1 0 6 16A12 12 0 0 1 6 -16Z', f || '#fdf6d8'), rot);
  const hill = (y, f, a, o) => { a = a === undefined ? 8 : a; return P(`M0 ${y}C25 ${y - a} 45 ${y + a / 2} 60 ${y - a / 2}C80 ${y - a} 90 ${y} 100 ${y - a / 2}V110H0Z`, f, o ? `opacity="${o}"` : ''); };
  const mount = (y, f) => P(`M0 ${y}L16 ${y - 16}L28 ${y - 7}L44 ${y - 22}L58 ${y - 6}L74 ${y - 15}L100 ${y}V110H0Z`, f);
  const water = (y, f) => R(0, y, 100, 110 - y, f) + L(`M8 ${y + 6}H28M70 ${y + 9}H94M14 ${y + 15}H30M60 ${y + 20}H84`, '#bfe0ff', .7, 'opacity=".35"');
  const wave = (y, f) => P(`M0 ${y}q12.500 -6 25 0t25 0t25 0t25 0V110H0Z`, f);
  const cloud = (x, y, s, f, o) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${f || WH}"${op(o)}><circle cx="-10" cy="2" r="7"/><circle cx="-1" cy="-3" r="9"/><circle cx="10" cy="1" r="7"/><rect x="-16" y="1" width="32" height="8" rx="4"/></g>`;
  const rain = (c) => L('M12 6l-3 10M30 2l-3 10M48 8l-3 10M66 2l-3 10M84 6l-3 10M20 24l-3 10M58 26l-3 10M92 22l-3 10M40 22l-3 10M76 20l-3 10M8 40l-3 10M70 42l-3 10', c, 1, 'opacity=".65"');
  const rainbow = (x, y, r, w, o) => RB.map((c, i) => L(`M${x - r + i * w} ${y}A${r - i * w} ${r - i * w} 0 0 1 ${x + r - i * w} ${y}`, c, w, o ? `opacity="${o}"` : '')).join('');

  const ARMS = {
    down: 'M-2 -9L-7 3M2 -9L7 3', up: 'M-2 -9L-11 -20M2 -9L11 -20', out: 'M-2 -9L-14 -10M2 -9L14 -10',
    reach: 'M2 -9L13 -12M-2 -9L-7 3', one: 'M2 -9L9 -21M-2 -9L-7 3', hug: 'M-2 -8L4 -1M2 -8L-4 -1'
  };
  const stand = (x, y, s, robe, pose, o) => {
    o = o || {};
    return T(x, y, s, L(ARMS[pose || 'down'], o.skin || SK, 2) + L('M-2.500 11V20M2.500 11V20', o.skin || SK, 2) +
      P('M0 -14C-3 -13 -4 -8 -7 12H7C4 -8 3 -13 0 -14Z', robe) + C(0, -18, 4, o.skin || SK) +
      P('M-4 -18C-4.500 -24 4.500 -24 4 -18.500C1.500 -21 -1.500 -21 -4 -18Z', o.hair || INK), o.rot, o.flip);
  };
  const sit = (x, y, s, robe, o) => {
    o = o || {};
    return T(x, y, s, P('M0 -10C-9 -8 -12 2 -16 11C-8 15 8 15 16 11C12 2 9 -8 0 -10Z', robe) + E(0, 12, 16, 4, o.lap || robe) +
      E(0, 8, 5, 2, o.skin || SK) + C(0, -15, 4.500, o.skin || SK) +
      P('M-4.500 -15C-5 -22 5 -22 4.500 -15.500C2 -18.500 -2 -18.500 -4.500 -15Z', o.hair || INK), o.rot, o.flip);
  };
  const tree = (x, y, s, leaf, trunk, leaf2) => T(x, y, s, P('M-2.500 22C-2 12 -2 6 -3 0H3C2 6 2 12 2.500 22Z', trunk || '#5a3a2a') +
    C(-7, -4, 9, leaf) + C(7, -5, 9, leaf) + C(0, -12, 10, leaf2 || leaf) + C(0, -3, 8, leaf2 || leaf));
  const flower = (x, y, s, pet, cen, n) => T(x, y, s, petals(n || 6, 'M0 0C-3.500 -3 -3.500 -9 0 -12C3.500 -9 3.500 -3 0 0Z', pet) + C(0, 0, 2.600, cen || GOLD));
  const lotus = (x, y, s) => T(x, y, s, P('M0 0C-9 1 -15 -2 -16 -5C-10 -6 -4 -4 0 0ZM0 0C9 1 15 -2 16 -5C10 -6 4 -4 0 0Z', '#ef9fb8') +
    P('M0 0C-7 -1 -11 -6 -11 -10C-6 -10 -2 -6 0 0ZM0 0C7 -1 11 -6 11 -10C6 -10 2 -6 0 0Z', '#f6c1d0') + P('M0 0C-4 -4 -4 -10 0 -14C4 -10 4 -4 0 0Z', WH));
  const flame = (x, y, s, c1, c2) => T(x, y, s, P('M0 -22C12 -8 16 2 12 12C9 22 -9 22 -12 12C-15 4 -6 0 -5 -10C-2 -5 0 -6 0 -22Z', c1 || '#f26a4b') +
    P('M0 -6C6 2 8 8 6 13C4 18 -4 18 -6 13C-7 9 -3 7 -2 2C-1 4 0 3 0 -6Z', c2 || '#f8d27a'));
  const drop = (x, y, s, f) => T(x, y, s, P('M0 -20C10 -6 14 2 14 8A14 14 0 0 1 -14 8C-14 2 -10 -6 0 -20Z', f));
  const heart = (x, y, s, f) => T(x, y, s, P('M0 14C-18 0 -14 -16 0 -6C14 -16 18 0 0 14Z', f));
  const star4 = (x, y, s, f) => T(x, y, s, P('M0 -12L3 -3L12 0L3 3L0 12L-3 3L-12 0L-3 -3Z', f || GOLD));
  const bird = (x, y, s, c) => T(x, y, s, L('M-6 0q3-3 6 0q3-3 6 0', c || INK, 1));
  const tweet = (x, y, s, c, flip) => T(x, y, s, P('M-5 0L-11 -3L-10 3Z', c) + E(0, 0, 5, 4, c) + C(4, -3, 2.800, c) + P('M6.500 -3L10 -2.200L6.500 -1Z', GOLD) + C(4.800, -3.500, .6, WH), 0, flip);
  const wing = P('M0 -4C-8 -18 -24 -14 -20 -2C-18 6 -8 4 0 2C-10 6 -14 12 -12 18C-8 24 -1 16 0 8Z', '{1}') + C(-12, -5, 3, '{2}');
  const butterfly = (x, y, s, c1, c2) => { const w = wing.replace('{1}', c1).replace('{2}', c2); return T(x, y, s, w + `<g transform="scale(-1 1)">${w}</g>` + L('M0 -8V12M0 -8l-4-6M0 -8l4-6', INK, 1.4)); };
  const gear = (x, y, r, c) => ring(x, y, r, c, r * .4, `stroke-dasharray="${(r * .393).toFixed(2)} ${(r * .393).toFixed(2)}"`) + C(x, y, r * .86, c) + C(x, y, r * .3, '#14172a');
  const crown = (x, y, s) => T(x, y, s, P('M-5 0V-5L-2.500 -2L0 -6L2.500 -2L5 -5V0Z', GOLD));

  const veil = P('M0 0H32C24 18 36 34 27 52C20 70 31 90 22 110H0Z', '#0b0e1e') + L('M32 0C24 18 36 34 27 52C20 70 31 90 22 110', '#f08a3c', 1.6);
  const feather = P('M44 46C30 30 16 30 6 16C10 34 16 44 26 50C18 50 14 52 10 54C22 60 36 58 44 54Z', WH, 'opacity=".9"');
  const puzzle = (() => {
    const cols = ['#e0566a', '#f08a3c', '#f2c230', '#7fc99a', '#3f86c9', '#8a5cc7', '#f6c1d0', '#bfe8ff', '#b9a4ec'];
    let s = '';
    for (let i = 0; i < 9; i += 1) {
      const x = 23 + (i % 3) * 18, y = 40 + Math.floor(i / 3) * 18;
      s += i === 1 ? R(x, y, 17, 17, '#5a3a12', 2, .7) : R(x, y, 17, 17, cols[i], 2) + (i % 3 < 2 && i ? C(x + 17.500, y + 8.500, 3, cols[i]) : '');
    }
    return s + glow(54, 22, 14, WH, .35) + T(54, 22, 1, R(-8.500, -8.500, 17, 17, '#f08a3c', 2) + C(9, 0, 3, '#f08a3c'), -12);
  })();
  const phases = [205, 237, 270, 303, 335].map((a, i) => {
    const t = a * Math.PI / 180, x = +(50 + 44 * Math.cos(t)).toFixed(1), y = +(62 + 44 * Math.sin(t)).toFixed(1);
    const lit = i === 2 ? C(x, y, 6, '#fdf6d8') : i === 1 ? P(`M${x} ${y - 6}A6 6 0 0 1 ${x} ${y + 6}Z`, '#fdf6d8') : i === 3 ? P(`M${x} ${y - 6}A6 6 0 0 0 ${x} ${y + 6}Z`, '#fdf6d8') : cres(x, y, .37, '#fdf6d8', i ? 0 : 180);
    return C(x, y, 6, '#2a3a70') + lit;
  }).join('');
  const bamboo = [16, 25, 34].map((x, i) => L(`M${x} 102V${14 + i * 10}`, '#5fae7a', 3) +
    L([30, 48, 66, 84].map((y) => `M${x - 2} ${y + i * 4}H${x + 2}`).join(''), '#2f6b5a', 1) +
    P(`M${x} ${32 + i * 8}C${x + 8} ${26 + i * 8} ${x + 12} ${28 + i * 8} ${x + 14} ${32 + i * 8}C${x + 9} ${34 + i * 8} ${x + 4} ${34 + i * 8} ${x} ${32 + i * 8}Z`, '#6fc08a')).join('');
  const palm = L('M12 110C10 80 14 50 18 30', '#7a4a2a', 3) + L('M18 30C8 24 2 28 0 34M18 30C26 22 34 24 38 30M18 30C14 18 6 16 2 18M18 30C24 18 32 16 36 18', '#3c8a6e', 2.5);
  const finger = P('M-4 0H4L1.500 22H-1.500Z', '#5a1f2e') + C(0, 0, 5, '#5a1f2e');
  const confetti = dots([[14, 16, 1.6], [28, 40, 1.3], [84, 14, 1.6], [90, 44, 1.3], [72, 24, 1.2], [20, 62, 1.4]], RED) + dots([[22, 26, 1.4], [78, 36, 1.6], [10, 46, 1.2], [88, 62, 1.4]], '#3f86c9') + dots([[34, 14, 1.4], [66, 12, 1.3], [80, 52, 1.3]], WH);

  Object.assign(window.PAINT, {
    /* ── 메이저 ── */
    m01: bg('night') + stars(0) + stars(1) + star4(72, 18, .5) + water(80, '#14204a') + E(50, 94, 34, 7, '#27594c') + E(50, 93, 28, 5, '#3c8a6e') + sit(50, 76, 1.100, '#e8d9f5'),
    m02: bg('deep') + stars(1) + cres(50, 18, .6) + ring(50, 66, 26, '#7fb9ee', .7, 'opacity=".5"') + ring(50, 66, 35, '#7fb9ee', .6, 'opacity=".3"') + ring(50, 66, 44, '#7fb9ee', .5, 'opacity=".18"') +
      sit(50, 68, 1.600, '#3f4f9a', { lap: '#34428a' }) + glow(50, 73, 9, '#bfe8ff', .35) + P('M50 64L55 72L50 82L45 72Z', '#dff4ff') + P('M50 64L55 72H45Z', WH),
    m03: bg('dusk') + stars(0) + flame(30, 62, 1.700) + P('M54 84C56 56 78 52 84 30C94 52 98 80 84 96C72 106 54 100 54 84Z', '#3f86c9') + P('M62 86C64 68 76 64 82 50C88 66 90 82 80 92C72 98 62 96 62 86Z', '#8fd0e8') +
      C(50, 24, 3, GOLD) + C(18, 26, 2, '#7fc99a') + C(64, 16, 2, RED) + C(40, 12, 1.500, '#bfe8ff') + C(88, 18, 1.500, '#f9a25c') + star4(50, 42, .7) + stand(50, 88, .9, WH, 'up'),
    m04: bg('dawn') + sun(50, 74, 14) + hill(86, '#74456f') + hill(96, '#3a2a5a', 6) + bird(24, 24, 1.600) + bird(34, 34, 1) + stand(50, 70, 1.500, 'url(#rb)', 'one') +
      L('M63.500 39V29', '#5a3a2a', 2) + glow(63.500, 22, 9, '#f8d27a', .35) + flame(63.500, 21, .45) + L('M20 98a4 3 0 1 1 6 3M30 101a4 3 0 1 0 6 -2M70 100a4 3 0 1 1 6 2', '#c9cfe6', 1.6),
    m05: R(0, 0, 100, 110, '#05060c') + ring(50, 55, 30, '#3b4162', .6, 'opacity=".5" stroke-dasharray="1 5"'),
    m06: bg('rose') + stars(0) + sun(50, 46, 16, '#ffe6c8') + heart(50, 22, .5, WH) + hill(90, '#7a3058') + stand(37, 70, 1.300, RED, 'reach') + stand(63, 70, 1.300, '#3f86c9', 'reach', { flip: 1, hair: '#5a3a2a' }),
    m07: bg('night') + glow(50, 58, 36, '#f8d27a', .22) + glow(50, 58, 24, '#f8d27a', .3) + sit(50, 72, 1.700, GOLD, { lap: '#d9a21b', skin: '#fbeecb', hair: '#c98a1e' }) + mirror(veil) +
      dots([[34, 20, 1, .9], [66, 30, .8, .8], [30, 60, .8, .7], [70, 78, 1, .8]], '#f9a25c'),
    m09: bg('deep') + stars(0) + cres(78, 20, .6) + hill(84, '#141a36') + hill(98, '#0b0e1e', 5) + glow(63, 54, 13, GOLD, .22) + stand(46, 66, 1.300, '#8a93b8', 'reach') + L('M63 49V51', '#c98a1e', 1) + C(63, 54, 3, '#ffe9a0'),
    m10: bg('deep') + stars(1) + ring(50, 55, 36, GOLD, 1.2) + ring(50, 55, 28, '#7fb9ee', .6, 'stroke-dasharray="2 4"') + rays(50, 55, 11, 28, 8, GOLD, 1) +
      orbit(50, 55, 36, 12, (x, y, i) => C(x, y, i % 3 ? 1.500 : 2.600, i % 3 ? '#7fb9ee' : GOLD)) + C(50, 55, 10, '#fdf6d8') + P('M50 45A10 10 0 0 1 50 65A5 5 0 0 1 50 55A5 5 0 0 0 50 45Z', INK) + C(50, 50, 1.400, INK) + C(50, 60, 1.400, '#fdf6d8'),
    m11: bg('fire') + glow(50, 56, 32, '#fff6d6', .35) + rays(50, 56, 22, 50, 12, '#fff6d6', 1.2, .8) +
      P('M10 14L24 20L16 32ZM82 10L92 24L76 26ZM6 62L18 56L16 72ZM88 58L96 72L82 70ZM22 90L34 84L30 100ZM70 88L84 92L72 102ZM40 8L48 14L38 20ZM60 18L70 12L68 26Z', '#2a0d18') + stand(50, 62, 1.600, '#fff6d6', 'up', { hair: '#a8322e' }),
    m12: bg('dusk') + stars(0) + L('M50 8L82 50L50 92L18 50Z', '#f8d27a', .8, 'opacity=".5"') + L('M50 22L72 50L50 78L28 50Z', '#f8d27a', .8, 'opacity=".4"') + R(0, 84, 100, 26, '#2a1a2e') +
      L('M50 84C46 92 40 94 34 106M50 84C54 92 60 96 68 108M50 86V110M46 94C40 94 36 98 28 98M56 96C62 96 66 100 74 100', '#b07a4a', 1.4) + mirror(feather) + stand(50, 62, 1.300, GOLD, 'out'),
    m13: bg('ember') + ring(50, 56, 33, '#f08a3c', 2, 'opacity=".8"') + ring(50, 56, 39, '#f8d27a', .8, 'stroke-dasharray="1 4"') + butterfly(80, 20, .45, '#f8d27a', WH) + lotus(50, 94, 1.800) + sit(50, 64, 1.500, WH, { lap: '#e8d9f5' }),
    m14: R(0, 0, 50, 110, 'url(#g-fire)') + R(50, 0, 50, 110, 'url(#g-sea)') + sun(24, 18, 7) + cres(76, 18, .5) + C(50, 60, 27, GOLD) + C(50, 60, 25, '#d2543c') +
      P('M50 35A25 25 0 0 1 50 85A12.500 12.500 0 0 1 50 60A12.500 12.500 0 0 0 50 35Z', '#3f86c9') + C(50, 47.500, 4, '#3f86c9') + C(50, 72.500, 4, '#d2543c'),
    m15: bg('day') + sun(84, 16, 7) + hill(88, '#6fc08a') + hill(98, '#4f9c6c', 5) + L('M38 88V99M62 88V99', INK, 3) + cloud(50, 76, 2.200, WH) + C(38, 34, 4.500, '#d9902a') + C(62, 34, 4.500, '#d9902a') + C(50, 48, 17, '#d9902a') +
      C(50, 50, 12, '#f2c26a') + C(45, 47, 1.500, INK) + C(55, 47, 1.500, INK) + P('M47 52H53L50 56Z', '#7a3f1a') + L('M46 59q4 3 8 0', INK, 1) + cloud(50, 31, 1.100, WH) + flower(18, 94, .3, RED) + flower(84, 96, .3, GOLD, WH),
    m16: bg('storm') + cloud(22, 16, 1.400, '#2a2f45') + cloud(78, 12, 1.600, '#2a2f45') + P('M76 12L58 44H68L54 72L80 38H69L82 12Z', GOLD) + P('M36 110V48H64V110Z', '#1b1f38') +
      T(53, 37, 1, P('M-16 8V-6H-10V0H-4V-6H4V0H10V-6H16V8Z', '#1b1f38'), 14) + flame(43, 46, .5) + flame(59, 50, .4) + R(46, 62, 8, 11, '#f08a3c', 4) +
      P('M24 60l5 2-2 5-5-2ZM72 66l5-1 1 5-5 1ZM28 78l4 3-3 4-4-3Z', '#1b1f38') + glow(50, 98, 13, '#fdf6d8', .3) + sit(50, 97, .7, '#fdf6d8'),
    m18: bg('deep') + stars(1) + L('M50 55c0-5 7-5 7 0c0 9-14 9-14 0c0-14 21-14 21 0c0 19-28 19-28 0c0-24 35-24 35 0c0 29-42 29-42 0c0-34 49-34 49 0', '#b9a4ec', .9, 'opacity=".6"') +
      fade(.28, stand(26, 40, .35, '#b9a4ec', 'down', { skin: '#b9a4ec', hair: '#b9a4ec' })) + fade(.4, stand(16, 58, .45, '#b9a4ec', 'down', { skin: '#b9a4ec', hair: '#b9a4ec' })) +
      fade(.55, stand(20, 76, .6, '#b9a4ec', 'down', { skin: '#b9a4ec', hair: '#b9a4ec' })) + fade(.75, stand(32, 90, .75, '#d4c4f4', 'down', { skin: '#d4c4f4', hair: '#d4c4f4' })) + stand(52, 90, .95, WH, 'down'),
    m19: bg('green') + glow(46, 52, 42, '#fff6d6', .25) + P('M10 110C14 90 28 82 46 84C64 82 78 90 82 110Z', WH) + C(46, 52, 20, SK) + P('M27 56C28 88 64 88 65 56C58 66 34 66 27 56Z', WH) +
      L('M34 44q5-4 9 0M49 44q5-4 9 0', WH, 2.2) + L('M35 50q4-3 8 0M50 50q4-3 8 0', INK, 1.2) + C(32, 57, 3, '#f6c1d0', .7) + C(60, 57, 3, '#f6c1d0', .7) + L('M39 62q7 6 14 0', '#c85a7a', 1.4) +
      C(84, 84, 6, SK) + L('M84 82V62', SK, 4) + butterfly(84, 52, .45, '#f9a25c', WH),
    m20: bg('violet') + stars(0) + glow(50, 46, 32, WH, .14) + butterfly(50, 44, 1.700, GOLD, RED) + C(50, 118, 32, SK) + L('M36 100q5 4 10 0M54 100q5 4 10 0', INK, 1.3) + C(50, 92, 1.500, GOLD),
    m21: bg('gold') + glow(50, 66, 42, WH, .2) + puzzle,
    m22: bg('night') + stars(0) + rays(50, 48, 31, 50, 24, '#f8d27a', .7, .8) + C(50, 48, 29, '#f8d27a', .22) + ring(50, 48, 29, GOLD, 1) + ring(50, 48, 23, '#fff6d6', .6) + lotus(50, 100, 1.700) + sit(50, 72, 1.700, WH, { lap: '#e8e0f0', hair: '#a9b0cf' }),

    /* ── 불 ── */
    f01: bg('ember') + rays(50, 55, 18, 54, 24, '#f8d27a', 1, .8) + rays(50, 55, 16, 40, 12, '#f08a3c', 2.4) + C(50, 55, 20, '#f08a3c') + C(50, 55, 15, '#f8d27a') + C(50, 55, 9, '#fff6d6') + dots([[16, 20, 1.2], [84, 26, 1], [12, 90, 1], [88, 92, 1.3]], '#f9a25c'),
    f02: bg('dawn') + sun(72, 58, 12) + mount(82, '#8a4a6a') + hill(96, '#4a2a50', 6) + P('M50 30C40 22 26 20 10 26C22 28 30 32 36 38C30 38 26 40 22 42C32 44 42 42 50 38C58 42 68 44 78 42C74 40 70 38 64 38C70 32 78 28 90 26C74 20 60 22 50 30Z', '#2a1a2e') + P('M48 28L52 25L50 33Z', GOLD),
    f03: bg('green') + glow(70, 30, 32, '#fff6d6', .2) + hill(96, '#1f4a3a', 5) + P('M62 110C64 80 62 50 58 20H86C82 50 80 80 84 110Z', '#5a3a2a') + L('M68 30C70 50 68 80 70 104M78 26C76 50 78 76 76 100', '#3a2418', 1) +
      C(50, 12, 16, '#3c8a6e') + C(72, 6, 18, '#2f7a5a') + C(92, 14, 14, '#3c8a6e') + stand(40, 74, 1.500, '#f08a3c', 'reach') + glow(60, 56, 7, GOLD, .55) + star4(60, 56, .3, WH),
    f04: bg('fire') + glow(50, 55, 26, '#fff6d6', .3) + [RED, '#3f86c9', '#4a9e6b', '#8a5cc7'].map((c, i) => T(50, 55, 1, R(14, -4.500, 44, 9, c, 4) + C(13, 0, 5.500, SK), 45 + i * 90)).join('') + star4(50, 55, .8),
    f05: bg('ember') + P('M22 0L50 78L78 0Z', '#fff6d6', 'opacity=".12"') + L('M16 0V30M30 0V30M70 0V46M84 0V46', '#f8d27a', .8) + L('M14 30H32M68 46H86', '#f8d27a', 2.2) +
      stand(48, 46, 1.300, WH, 'up', { rot: 68 }) + L('M0 96H100M0 103H100M10 92V110M30 92V110M50 92V110M70 92V110M90 92V110', '#f8d27a', .7, 'opacity=".4"'),
    f06: bg('gold') + rays(50, 30, 20, 46, 16, WH, .8, .7) + sun(50, 30, 13, WH) + P('M8 110L50 58L92 110Z', '#a8322e') + P('M50 58L60 72L52 70L46 78L40 71Z', '#fff6d6') + stand(50, 40, 1, RED, 'up') + L('M61 20V8', '#5a3a12', 1) + P('M61 8L72 11L61 14Z', RED) + confetti,
    f07: bg('ember') + C(50, 97, 10, '#3f86c9') + stand(50, 66, 1.200, '#f08a3c', 'up') + C(20, 42, 5, RED) + R(28, 18, 9, 9, '#f8d27a', 2) + C(50, 10, 5, '#7fc99a') + R(63, 18, 9, 9, '#b9a4ec', 2) + C(80, 42, 5, WH) +
      ring(14, 68, 6, WH, 1.2) + L('M14 68V64M14 68H17', WH, 1) + C(86, 74, 9, RED) + L('M86 83V98', WH, .7) + L('M70 64L77 69', WH, 1.2) + drop(36, 46, .12, '#bfe8ff') + drop(64, 44, .12, '#bfe8ff'),
    f08: bg('dawn') + sun(64, 34, 10) + hill(60, '#b8697a', 8, .8) + hill(74, '#8a4a6a') + hill(92, '#4a2a50', 6) +
      P('M30 110C50 98 40 92 52 84C62 78 54 72 60 66C64 62 62 58 63 54L65 54C65 58 68 62 64 68C60 74 70 80 60 88C52 96 66 100 56 110Z', '#f8dc8c', 'opacity=".85"') + stand(47, 84, .6, RED, 'reach') + bird(24, 24, 1.400) + bird(36, 18, 1),
    f09: bg('storm') + gear(24, 30, 14, '#4a5173') + gear(78, 24, 10, '#4a5173') + gear(82, 66, 16, '#3b4162') + cloud(58, 46, .7, '#8a93b8', .6) + cloud(66, 34, .5, '#8a93b8', .4) +
      sit(46, 86, 1.500, '#6a7191', { skin: '#a9b0cf', lap: '#5d6480', rot: 7 }) + L('M62 82H71', '#a9b0cf', 2) + ring(75, 82, 4, '#a9b0cf', 1.5) + L('M36 10H58V21H36Z', WH, 1.2) + R(58.500, 13, 3, 5, WH) + R(38, 12, 4, 7, RED),
    f10: bg('ember') + glow(50, 66, 32, '#f26a4b', .35) + L('M50 14l-4 8 6 4-4 8M16 38l8 4-2 8M84 38l-8 4 2 8M12 92l10-4M88 92l-10-4', '#f8d27a', 1.4) + sit(50, 70, 1.800, '#3b4162', { lap: '#2a2f45', skin: '#c9b6a8' }) +
      L('M31 54C42 51 58 51 69 54M27 66C40 62 60 62 73 66M23 80C40 75 60 75 77 80', '#d9c08a', 2),
    f11: bg('rose') + hill(94, '#5a1f4a', 3) + stand(50, 68, 1.500, GOLD, 'up') + P('M44 39C36 28 42 24 47 34C48 24 53 24 54 34C59 24 65 29 57 40Z', RED) + C(40, 27, 1.800, GOLD) + C(50.500, 25, 1.800, GOLD) + C(61, 28, 1.800, GOLD) +
      star4(20, 30, .5) + star4(80, 26, .5, WH) + star4(86, 56, .4, '#7fc99a') + star4(14, 60, .4, '#bfe8ff') + C(30, 14, 2, WH) + C(70, 12, 2, '#f9a25c'),
    f12: bg('fire') + C(80, 22, 12, WH) + C(80, 22, 8, RED) + C(80, 22, 4, WH) + P('M0 110L10 84L52 48L60 56L22 106Z', '#f8d27a', 'opacity=".55"') + P('M0 102L46 52L54 60Z', '#fff6d6', 'opacity=".7"') +
      stand(58, 48, 1.200, WH, 'up', { rot: 45 }) + L('M8 40L30 18M40 96L62 74', '#fff6d6', 1, 'opacity=".6"'),
    f13: bg('dusk') + glow(50, 48, 36, '#f8d27a', .3) + stand(50, 52, 1.600, RED, 'out', { hair: '#5a3a2a' }) + crown(50, 16, 1) + flower(27, 32, .5, WH) + C(73, 32, 4.500, '#f9a25c') +
      P('M26 92C26 108 74 108 74 92Z', '#c98a1e') + C(38, 90, 6, '#f26a4b') + C(62, 90, 6, '#7fc99a') + C(50, 87, 7, GOLD) + C(44, 83, 4, '#b9a4ec') + heart(14, 62, .25, WH) + heart(86, 66, .3, '#f6c1d0'),
    f14: bg('ember') + ring(50, 60, 36, '#f08a3c', 1.5) + rays(50, 60, 38, 46, 16, '#f8d27a', 1) + sit(50, 80, 1.700, '#f08a3c', { lap: '#c2472f' }) + glow(50, 30, 14, '#f8d27a', .3) + flame(50, 30, .75),

    /* ── 물 ── */
    w01: bg('aqua') + sun(80, 18, 8) + wave(50, '#6fb3e0') + C(30, 58, 4.500, SK) + P('M26 57C27 52 33 52 34 56C31 55 28 55 26 57Z', INK) + L('M46 58L40 49M58 58L66 50M72 59L84 57', SK, 2) + P('M35 56C48 52 62 54 74 58C62 63 48 63 35 60Z', WH) +
      wave(70, '#4f9fd0') + wave(88, '#2f6fb0') + E(18, 96, 9, 2.600, '#3c8a6e') + lotus(18, 95, .5) + E(78, 100, 8, 2.400, '#3c8a6e'),
    w02: bg('day') + sun(18, 18, 8) + cloud(78, 20, 1, WH, .8) + hill(90, '#6fc08a') + tree(38, 64, 1.700, '#3c8a6e', '#5a3a2a', '#4f9c6c') + tree(62, 64, 1.700, '#4f9c6c', '#5a3a2a', '#6fc08a') + heart(50, 26, .3, WH) + bird(70, 34, 1.200) + bird(26, 30, 1),
    w03: bg('sea') + rain('#dff4ff') + hill(96, '#1a3a6a', 3) + E(50, 100, 34, 3, '#8fd0e8', .45) + stand(26, 72, 1.100, RED, 'up') + stand(74, 72, 1.100, '#b9a4ec', 'up') + stand(50, 68, 1.200, GOLD, 'up', { hair: '#5a3a2a' }),
    w04: bg('deep') + orbit(50, 56, 38, 8, (x, y) => fade(.6, C(x, y, 6.500, '#6a7191') + E(x, y + 2.500, 2, 2.600, '#14172a') + C(x - 2.200, y - 1.500, .8, '#14172a') + C(x + 2.200, y - 1.500, .8, '#14172a')), 22) +
      glow(50, 56, 28, '#7fb9ee', .18) + C(50, 56, 21, SK) + P('M29 54C28 30 72 30 71 54C64 40 36 40 29 54Z', INK) + L('M39 58q4 4 8 0M53 58q4 4 8 0', INK, 1.3) + L('M43 67q7 5 14 0', '#c85a7a', 1.3) + glow(50, 49, 5, '#7fb9ee', .4) + C(50, 49, 1.800, '#bfe8ff'),
    w05: bg('grey') + hill(100, '#2a2f45', 3) + T(18, 26, 1, R(-9, -11, 18, 22, '#c9a878', 1) + R(-6, -8, 12, 13, '#8a6a48'), -8) + T(36, 40, 1, R(-7, -9, 14, 18, '#c9a878', 1) + R(-5, -7, 10, 11, '#8a6a48'), 10) + T(14, 54, 1, R(-7, -8, 14, 16, '#c9a878', 1) + R(-5, -6, 10, 9, '#8a6a48'), 5) +
      sit(40, 82, 1.400, '#6a7aa8', { flip: 1, lap: '#5a6a98' }) + R(32, 82, 16, 12, '#7a4a2a', 2) + R(32, 82, 16, 4.500, '#5a3418', 2) + C(40, 88, 1.300, GOLD) + glow(80, 72, 17, '#fff6d6', .35) + L('M80 100V78', '#5fae7a', 1.5) + flower(80, 74, .7, '#f6c1d0'),
    w06: bg('night') + stars(0) + cres(22, 24, 1) + cloud(48, 92, 2.400, '#b9c4ee') + C(30, 80, 4.500, SK) + P('M26 79C27 74 33 74 34 78C31 77 28 77 26 79Z', INK) + P('M34 82C44 72 64 74 72 84C60 88 44 88 34 82Z', '#3f86c9') +
      C(40, 64, 1.500, WH, .8) + C(46, 56, 2.500, WH, .8) + C(66, 36, 18, WH, .92) + heart(66, 31, .5, RED) + P('M57 46V40H60V43H63.500V38H68.500V43H72V40H75V46Z', '#b9a4ec'),
    w07: bg('deep') + stars(1) + P('M2 110C2 78 12 68 20 68C30 68 38 78 38 110Z', '#c2472f') + C(20, 50, 13, '#f0a06a') + P('M62 110C62 78 72 68 80 68C90 68 98 78 98 110Z', '#2f6fb0') + C(80, 50, 13, '#7fb9ee') +
      P('M30 48L70 34V66Z', '#fff6d6', 'opacity=".25"') + P('M70 48L30 34V66Z', '#bfe8ff', 'opacity=".25"') + heart(80, 50, .4, '#f0a06a') + star4(20, 50, .55, '#7fb9ee') + C(28, 47, 1.200, INK) + C(72, 47, 1.200, INK),
    w08: bg('aqua') + R(0, 72, 100, 38, '#2f6fb0') + P('M0 22C20 6 50 10 66 34C46 40 20 38 0 30Z', '#3c8a6e') + L('M0 26C24 22 46 26 66 34', '#27594c', 1) + drop(64, 39, .14, '#dff4ff') + drop(66, 54, .32, '#dff4ff') +
      [8, 18, 30].map((r) => `<ellipse cx="66" cy="88" rx="${r}" ry="${(r * .3).toFixed(1)}" fill="none" stroke="#dff4ff" stroke-width="1" opacity="${(.9 - r / 50).toFixed(2)}"/>`).join('') + E(20, 96, 10, 3, '#3c8a6e') + lotus(20, 95, .5),
    w09: bg('day') + sun(52, 16, 9) + hill(100, '#f0d8a0', 3) + mirror(palm) + P('M16 56C36 88 64 88 84 56C64 76 36 76 16 56Z', RED) + P('M38 66C48 76 60 76 72 64C60 69 48 71 38 66Z', WH) + C(34, 62, 4.500, SK) + R(30.500, 60.300, 7.500, 2.600, INK, 1) +
      R(47, 92, 6, 9, '#f8d27a', 1) + L('M50 92L53 85', RED, 1) + L('M40 44h7l-7 7h7M52 34h5l-5 5h5', '#3f86c9', 1.2),
    w10: bg('sea') + sun(50, 14, 7) + heart(50, 64, 2.700, '#8fd0e8') + heart(50, 64, 2.300, '#2f6fb0') + P('M50 46C60 48 64 58 58 66C56 60 52 56 46 56C44 52 46 48 50 46Z', '#f08a3c') + P('M50 82C40 80 36 70 42 62C44 68 48 72 54 72C56 76 54 80 50 82Z', WH) +
      C(51, 50, 1, INK) + C(49, 78, 1, INK) + ring(50, 64, 21, '#dff4ff', .6, 'opacity=".5" stroke-dasharray="2 4"'),
    w11: bg('day') + cloud(18, 22, 1, WH, .8) + cloud(82, 14, 1.200, WH, .8) + L('M46 12V24', GOLD, 1.2) + L('M26 50C26 20 66 20 66 50V92H26ZM26 50H66M34 50V92M42 50V92M50 50V92M58 50V92', GOLD, 1.4) + L('M36 28C34 36 34 44 34 50M46 24V50M56 28C58 36 58 44 58 50', GOLD, 1) +
      R(58, 62, 8, 22, '#a8d8f0') + L('M66 62H82V84H66', GOLD, 1.2) + tweet(64, 78, 1, '#3f86c9') + L('M54 84H74', GOLD, 1.4) + bird(84, 40, 1.400) + bird(90, 52, 1) + bird(76, 32, 1),
    w13: bg('night') + stars(1) + cres(50, 14, .8, '#fdf6d8', -90) + P('M40 22H60L72 110H28Z', '#bfe8ff', 'opacity=".18"') + drop(50, 36, .12, '#dff4ff') + drop(41, 46, .1, '#dff4ff') + drop(59, 44, .1, '#dff4ff') +
      water(92, '#14204a') + lotus(50, 100, 1.500) + stand(50, 68, 1.500, '#bfe8ff', 'up', { hair: '#5a3a2a' }),
    w14: bg('sea') + glow(50, 62, 38, WH, .15) + L('M18 86C10 62 18 42 34 32M82 86C90 62 82 42 66 32', '#dff4ff', 3, 'opacity=".6"') + L('M10 78C6 60 12 46 22 38M90 78C94 60 88 46 78 38', '#dff4ff', 1.5, 'opacity=".35"') +
      lotus(50, 100, 1.700) + sit(50, 72, 1.700, WH, { lap: '#dff4ff' }) + glow(50, 66, 8, RED, .35) + heart(50, 67, .3, RED) + star4(20, 22, .3, WH) + star4(82, 18, .4, WH),

    /* ── 구름 ── */
    c01: bg('night') + stars(0) + stars(1) + ring(50, 21, 16, '#fdf6d8', .8, 'opacity=".6"') + sit(50, 60, 2.600, '#141a36', { skin: '#141a36', hair: '#141a36', lap: '#141a36' }) +
      dots([[44, 56, .8], [57, 66, .6], [50, 80, .7], [36, 78, .5], [63, 82, .6], [46, 68, .4]], WH) + C(50, 21, 1.100, GOLD) + cloud(20, 100, 2, '#a9b0cf') + cloud(86, 100, 2, '#a9b0cf') + cloud(54, 106, 2.400, '#d4d8ea'),
    c02: R(0, 0, 50, 110, 'url(#g-ember)') + R(50, 0, 50, 110, 'url(#g-storm)') + L('M50 0l-3 12 5 8-4 10', '#f8d27a', 1) + P('M28 110L32 60H68L72 110Z', '#05060c', 'opacity=".55"') + P('M0 50H30L26 110H0Z', '#1b1f38') + P('M100 50H70L74 110H100Z', '#1b1f38') +
      L('M45 48L30 50M55 48L70 50M47 62L31 58M53 62L69 58', SK, 2.2) + P('M44 46H56L54 63H46Z', '#a9b0cf') + C(50, 40, 4.500, SK) + P('M45.500 40C45 33 55 33 54.500 39.500C52 36.500 48 36.500 45.500 40Z', INK),
    c03: bg('ice') + dots([[12, 14, 1.2], [84, 10, 1], [90, 50, 1.2], [10, 60, 1], [20, 96, 1.2], [82, 94, 1]], WH) + star4(16, 34, .35, WH) + star4(86, 28, .4, WH) + star4(84, 76, .3, WH) +
      stand(50, 64, 1.400, '#7c9cc8', 'hug', { skin: '#cfe0f0', hair: '#5d6480' }) + P('M50 12L76 32V86L50 106L24 86V32Z', '#dff4ff', 'opacity=".5"') + P('M50 12L76 32L50 46L24 32Z', WH, 'opacity=".45"') + L('M50 46V106M24 32L50 46L76 32', WH, .8) + C(47, 42, .9, WH) + C(53, 43, .9, WH),
    c04: R(0, 0, 100, 110, '#4a4f66') + R(0, 92, 100, 18, '#3b4056') + R(38, 14, 50, 58, '#2a2f45', 2) + R(41, 17, 44, 52, 'url(#g-day)') + C(74, 30, 6, '#fff6d6') + rainbow(60, 58, 14, 1.2) + P('M41 58C52 50 64 56 85 50V69H41Z', '#6fc08a') +
      L('M63 17V69M41 43H85', '#2a2f45', 1.5) + ring(18, 28, 7, '#a9b0cf', 1.2) + L('M18 28V23M18 28H22', '#a9b0cf', 1) + sit(22, 84, 1.300, '#6a7191', { skin: '#a9b0cf', hair: '#3b4056', lap: '#5d6480' }),
    c05: bg('mist') + sun(50, 18, 8, WH) + hill(96, '#7c9a7a', 4) + bamboo + tree(70, 60, 2.200, '#3c6a4a', '#5a3a2a', '#4f8a5c'),
    c06: bg('storm') + P('M0 110L100 62V110Z', '#2a2f45') + P('M92 66V54L99 57L92 60', RED) + L('M92 66V54', '#a9b0cf', 1) + stand(40, 74, 1.200, '#8a93b8', 'reach', { rot: 20 }) +
      T(30, 44, 1, R(-11, -6, 22, 13, '#7a5a3a', 2) + R(-13, -20, 22, 13, '#5d6480', 2) + R(-8, -32, 17, 11, '#a8322e', 2) + C(2, -40, 6.500, '#3b4162') + L('M0 -6V-46', '#d9c08a', .8), 14),
    c07: bg('grey') + P('M14 110C16 86 32 76 50 76C68 76 84 86 86 110Z', '#2a2f45') + P('M47 78H53L52 96L50 100L48 96Z', RED) + C(50, 52, 20, '#c9b6a8') + L('M56 46l7-2', INK, 1.4) + C(60, 51, 1.500, INK) + L('M55 64q4-3 8 0', INK, 1.3) +
      L('M38 74V98', '#c9b08a', 2) + P('M26 52C26 34 40 30 52 32V74C40 76 26 70 26 52Z', WH) + L('M33 48q4-4 8 0', INK, 1.4) + L('M32 60q8 8 18 2', RED, 1.6) + C(31, 57, 3, '#f6c1d0', .7) + C(38, 98, 4, '#c9b6a8'),
    c08: bg('storm') + glow(50, 72, 24, '#a8322e', .3) + orbit(50, 68, 46, 7, (x, y, i, a) => T(x, y, 1, finger, a + 90), 12) + sit(50, 80, 1.500, '#6a7191', { skin: '#c9b6a8', lap: '#5d6480' }) + L('M42 62L46 54M58 62L54 54', '#c9b6a8', 2.2),
    c09: bg('grey') + rain('#dfe4f4') + L('M84 110C82 80 80 50 70 30', '#3b4056', 4) + L('M70 30C56 30 46 44 44 66M70 30C60 24 40 30 32 58M70 30C62 20 36 20 22 48M70 30C74 40 72 56 70 72M70 30C82 34 88 50 90 66', '#8fae9c', 1.4) +
      E(46, 104, 22, 3, '#8a93b8', .5) + sit(46, 88, 1.300, '#5d6480', { skin: '#c9b6a8', lap: '#4a5173', rot: 10 }) + drop(40, 76, .08, '#dff4ff'),
    c10: bg('dawn') + sun(78, 28, 12) + P('M0 96C30 92 60 76 100 44V110H0Z', '#4a2a50') + T(18, 82, 1, L('M-5 4V10M5 4V10', INK, 1.8) + L('M7 -2L11 -10', INK, 2.5) + E(0, 0, 9, 5, INK) + P('M-4 -4C-3 -10 3 -10 4 -4Z', INK) + C(12, -11, 2.200, INK)) +
      T(47, 71, 1, L('M-5 4V9M4 4V9', '#c98a1e', 1.8) + L('M-8 -1C-12 -4 -12 -8 -10 -10', '#c98a1e', 1.2) + E(0, 0, 8, 4.500, '#c98a1e') + C(8, -4, 5.500, '#d9902a') + C(8, -4, 3.200, '#f2c26a')) + stand(75, 47, .8, WH, 'up'),
    c11: bg('grey') + R(4, 8, 22, 13, WH, 4, .8) + dots([[10, 14.500, 1.200], [15, 14.500, 1.200], [20, 14.500, 1.200]], '#5d6480') + R(76, 16, 20, 12, WH, 4, .6) + L('M80 22H92', '#5d6480', 1) +
      P('M36 70H64V110H36Z', '#1b1f38') + C(50, 50, 30, '#1b1f38') + gear(40, 42, 9, '#a9b0cf') + gear(60, 54, 11, GOLD) + gear(42, 63, 6, '#7fb9ee') + L('M70 30l8-6M74 38l10-2', GOLD, 1),
    c12: bg('storm') + glow(50, 60, 32, '#a8322e', .3) + P('M18 8L10 26H16L10 40L24 22H17Z', GOLD) + stand(50, 64, 1.700, '#8a93b8', 'one', { skin: '#a9b0cf', hair: '#5d6480' }) + L('M44 33.500H56', INK, 1.5) + P('M50 23C54 16 60 16 62 20C58 20 54 22 52 26Z', RED) +
      L('M65 30L74 6', '#dfe4f4', 2.2) + L('M61 27L69 31', '#c98a1e', 2) + P('M28 58H46V72C46 80 37 84 37 84C37 84 28 80 28 72Z', '#a8322e') + L('M37 60V82M30 68H44', '#f8d27a', 1),
    c13: bg('mist') + L('M0 20H100M0 40H100M0 60H100M0 80H100M20 0V110M40 0V110M60 0V110M80 0V110', WH, .6, 'opacity=".5"') + P('M18 110C20 90 34 82 50 82C66 82 80 90 82 110Z', '#3b4162') + R(43, 70, 14, 16, WH, 1) + C(50, 32, 7, '#5d6480') + C(50, 54, 18, SK) +
      P('M32 54C30 34 70 34 68 54C62 42 38 42 32 54Z', '#5d6480') + L('M40 50l7 2M60 50l-7 2', INK, 1.4) + C(44, 55, 1.300, INK) + C(56, 55, 1.300, INK) + L('M46 64H54', '#a8322e', 1.6) +
      dots([[38, 86, 2], [42, 90, 2], [46, 92.500, 2], [50, 93.500, 2], [54, 92.500, 2], [58, 90, 2], [62, 86, 2]], WH) + L('M86 100V72', SK, 4),
    c14: bg('grey') + L('M10 12H90V102H10ZM20 24H80V96H20ZM30 36H70V90H30Z', '#1b1f38', 1.2) + L('M31 61V84M69 61V84', '#1b1f38', .8) + R(27, 84, 8, 8, '#a9b0cf', 1) + R(65, 84, 8, 8, '#a9b0cf', 1) + R(43, 78, 6, 14, '#2a2f45') + R(51, 78, 6, 14, '#2a2f45') +
      R(32, 54, 36, 6, '#3b4162') + R(42, 52, 16, 27, '#3b4162', 1) + R(28, 53, 6, 8, '#c9b6a8', 1) + R(66, 53, 6, 8, '#c9b6a8', 1) + R(44, 40, 12, 12, '#c9b6a8', 1) + P('M44 40V33L47 37L50 32L53 37L56 33V40Z', GOLD) + R(46, 44, 2, 2, INK) + R(52, 44, 2, 2, INK) + L('M47 49H53', INK, 1.2),

    /* ── 무지개 ── */
    r01: bg('lilac') + hill(102, '#7a5ab0', 3) + glow(50, 58, 36, WH, .18) + ring(50, 58, 41, 'url(#rb)', 2.5, 'opacity=".85"') + stand(50, 62, 1.800, WH, 'down', { hair: '#a9b0cf' }) +
      flower(50, 54, .36, RED) + flower(46, 68, .3, GOLD, WH) + flower(55, 76, .3, '#8a5cc7') + flower(48, 82, .26, '#3f86c9'),
    r02: bg('lilac') + sun(80, 16, 7, WH) + R(0, 56, 100, 54, '#5a6ac0') + L('M6 64H24M70 62H92M60 98H84M4 82H16', '#dfe4ff', .7, 'opacity=".4"') + E(16, 98, 12, 4, '#a9b0cf') + glow(38, 85, 14, GOLD, .3) + E(38, 86, 11, 3.600, '#f8d27a') + E(60, 76, 10, 3.200, '#a9b0cf') + E(80, 67, 9, 3, '#a9b0cf') +
      stand(38, 64, 1, RED, 'out', { rot: -6 }) + E(84, 96, 8, 2.400, '#3c8a6e') + lotus(84, 95, .45),
    r03: bg('violet') + stars(0) + hill(94, '#2a1f5a', 4) + glow(64, 30, 20, WH, .22) + P('M60 30C46 18 34 20 24 32C36 32 44 36 54 42Z', 'url(#rb)', 'opacity=".9"') + T(128, 0, 1, P('M60 30C46 18 34 20 24 32C36 32 44 36 54 42Z', 'url(#rb)', 'opacity=".9"'), 0, 1) + star4(64, 30, 1, WH) +
      L('M36 82C44 70 54 56 62 44', WH, .8, 'stroke-dasharray="1 4" opacity=".7"') + stand(28, 76, .9, GOLD, 'reach'),
    r04: bg('deep') + R(0, 0, 100, 110, '#3a3058', 0, .6) + L('M0 20H100M0 40H100M0 60H100M0 80H100M20 0V20M60 0V20M40 20V40M80 20V40M20 40V60M60 40V60M40 60V80M80 60V80M20 80V110M60 80V110', '#14102a', 1) +
      L('M0 0L18 18M0 10C6 10 10 6 10 0M0 18C10 18 18 10 18 0M9 0L4 16M0 9L16 4', '#a9b0cf', .5, 'opacity=".6"') + sit(50, 74, 1.600, '#5a4a8a', { lap: '#4a3a7a' }) + L('M45.500 49l3 1M54.500 49l-3 1', INK, 1) +
      C(40, 76, 2.800, RED) + C(50, 73, 3.200, '#7fb9ee') + C(60, 76, 2.800, '#7fc99a') + R(34, 80, 32, 18, '#7a4a2a', 2) + P('M34 86C34 74 66 74 66 86Z', '#5a3418') + R(47, 83, 6, 7, GOLD, 1) + L('M38 64L33 86M62 64L67 86', SK, 2.4),
    r05: bg('night') + glow(50, 52, 36, '#f8d27a', .35) + hill(84, '#3c6a4a', 4) + tree(50, 46, 1.300, '#7fc99a', '#5a3a2a') + flower(30, 78, .3, RED) + flower(70, 80, .3, GOLD, WH) +
      L('M10 110V36C10 6 90 6 90 36V110', '#0b0e1e', 3) + L('M22 110V22M34 110V15M46 110V12M58 110V13M70 110V18M82 110V27M10 50H90M10 94H90', '#0b0e1e', 2) + L('M47 62a4 4 0 0 1 8 0', GOLD, 1.4) + R(45, 64, 10, 8, GOLD, 1.5) +
      stand(28, 96, .7, '#8a5cc7', 'down', { hair: '#5a3a2a' }),
    r06: bg('lilac') + hill(96, '#7a5ab0', 3) + L('M50 6V20M36 16L64 11', GOLD, 1.2) + L('M36 16L30 25M36 16L42 25M64 11L58 20M64 11L70 20', GOLD, .7) + P('M29 25C29 31 43 31 43 25Z', GOLD) + P('M57 20C57 26 71 26 71 20Z', GOLD) +
      stand(32, 70, 1.400, '#8a5cc7', 'reach', { rot: 8 }) + stand(68, 70, 1.400, '#4a9e6b', 'reach', { flip: 1, rot: -8, hair: '#5a3a2a' }) + L('M20 70l-5 3M19 73l-4-2M80 70l5 3M81 73l4-2', SK, 1.3),
    r07: bg('night') + stars(1) + phases + hill(100, '#141a36', 3) + sit(50, 84, 1.600, '#b9a4ec', { lap: '#8a5cc7', hair: '#5a3a2a' }) + C(50, 87, 7.500, '#d4c4f4') + R(78, 94, 10, 8, '#c2472f', 1) + L('M83 94V86', '#5fae7a', 1.4) + P('M83 88C87 84 90 85 91 87C88 89 85 89 83 88Z', '#5fae7a'),
    r08: bg('day') + sun(18, 16, 7) + cloud(82, 40, .5, WH, .7) + hill(78, '#8fd0a0', 6) + hill(94, '#6fc08a', 4) + R(64, 56, 20, 16, SK) + P('M61 57L74 46L87 57Z', '#c2472f') + R(71, 63, 5, 9, '#7a4a2a') +
      P('M30 110C40 96 56 86 68 74L72 74C62 88 50 98 46 110Z', '#f0d8a0') + stand(36, 82, 1.200, '#8a5cc7', 'down', { hair: '#5a3a2a' }) + L('M24 70H48', '#7a4a2a', 1.6) + L('M25 70V80M47 70V80', '#7a4a2a', .8) + R(21, 80, 8, 7, '#a9b0cf', 1) + R(43, 80, 8, 7, '#a9b0cf', 1) +
      flower(82, 98, .28, RED) + flower(12, 96, .28, GOLD, WH),
    r09: bg('green') + glow(58, 58, 34, '#fff6d6', .28) + L('M0 14C30 8 60 16 100 6', '#5a3a2a', 3.5) + L('M58 13V32', '#5a3a2a', 1.6) + P('M58 22C48 16 40 20 36 26C46 30 54 28 58 22Z', '#3c8a6e') + P('M58 20C66 12 76 14 80 20C72 26 64 26 58 20Z', '#4f9c6c') +
      C(58, 56, 22, '#f08a3c') + C(66, 64, 13, RED, .45) + C(50, 47, 7, '#f8d27a', .6) + drop(58, 92, .2, '#f8d27a') + tweet(22, 7, .9, '#8a5cc7'),
    r10: bg('deep') + stars(0) + rainbow(50, 60, 47, 2.4, .8) + C(50, 62, 19, '#3f86c9') + P('M38 52C44 48 50 52 48 58C46 64 40 62 36 58ZM54 62C60 58 66 62 64 70C60 76 54 72 54 62Z', '#4a9e6b') +
      orbit(50, 62, 29, 10, (x, y, i, a) => stand(x, y, .42, RB[i % 5], 'out', { rot: a + 90 })),
    r11: R(0, 0, 100, 110, '#141a36') + P('M28 110C28 50 38 18 50 12C62 18 72 50 72 110Z', 'url(#g-lilac)') + rainbow(50, 66, 20, 2.2) + glow(50, 60, 20, WH, .25) + P('M40 110L47 78H53L60 110Z', '#f8dc8c', 'opacity=".55"') +
      R(0, 0, 14, 110, '#0b0e1e') + R(18, 0, 8, 110, '#10142c') + R(86, 0, 14, 110, '#0b0e1e') + R(74, 0, 8, 110, '#10142c') + C(10, 6, 18, '#0b0e1e') + C(90, 6, 18, '#0b0e1e') + C(30, 0, 12, '#10142c') + C(70, 0, 12, '#10142c') +
      R(46.500, 82, 7, 8, '#7a4a2a', 2) + stand(50, 92, .7, RED, 'down'),
    r12: bg('day') + cloud(20, 18, 1, WH, .8) + hill(94, '#6fc08a', 4) + R(30, 86, 9, 10, '#7fc99a', 3) + R(64, 86, 9, 10, '#7fc99a', 3) + P('M20 86L12 90L22 90Z', '#7fc99a') + P('M82 82C90 72 99 76 97 84C95 89 86 89 82 87Z', '#7fc99a') + C(92, 79, 1, INK) +
      P('M22 86C22 54 82 54 82 86Z', '#4a9e6b') + L('M40 86L44 68H60L64 86M44 68L38 62M60 68L66 62M52 68V59', '#27594c', 1.2) + R(19, 85, 66, 4, '#27594c', 2) + L('M66 32V60', '#7a4a2a', 1.2) + P('M66 32L76 35L66 38Z', '#8a5cc7') +
      sit(52, 48, 1, '#a9b0cf', { lap: '#8a93b8' }) + flower(10, 100, .28, RED) + flower(90, 102, .28, '#8a5cc7'),
    r13: bg('lilac') + glow(50, 56, 38, WH, .2) + T(50, 94, 1, petals(9, 'M0 0C-10 -8 -10 -28 0 -36C10 -28 10 -8 0 0Z', '#e0669a')) + stand(50, 52, 1.500, WH, 'out', { hair: '#5a3a2a' }) +
      T(50, 94, 1, `<g transform="rotate(20)">${petals(9, 'M0 0C-7 -6 -7 -18 0 -24C7 -18 7 -6 0 0Z', '#f6a8c8')}</g>`) + flower(45, 19, .25, GOLD, WH) + flower(50, 17, .28, RED) + flower(55, 19, .25, '#8a5cc7') +
      E(16, 30, 2.500, 1.300, '#f6a8c8') + E(84, 24, 2.500, 1.300, '#e0669a') + E(88, 58, 2.500, 1.300, '#f6a8c8') + E(12, 62, 2.500, 1.300, '#e0669a'),
    r14: bg('gold') + hill(94, '#7fae5a', 3) + tree(50, 34, 2.600, '#3c8a6e', '#5a3a2a', '#4f9c6c') + C(36, 22, 3.500, RED) + C(62, 14, 3.500, '#f08a3c') + C(54, 30, 3.500, GOLD) + C(44, 36, 3.500, '#f08a3c') + C(68, 30, 3.500, RED) + C(46, 8, 3.500, GOLD) +
      ring(50, 61, 9, WH, 1, 'opacity=".8"') + sit(50, 84, 1.400, '#8a5cc7', { lap: '#6a4aa8' }) + crown(50, 55.500, .9) + C(20, 98, 5, RED) + C(28, 101, 4, '#f08a3c') + C(14, 102, 3, '#8a5cc7') + P('M72 92H82L80 102H74Z', WH) + E(88, 102, 7, 3.500, '#d9a05a')
  });
})();
