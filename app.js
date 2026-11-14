/* MoonHongZEN — 덱의 짜임 → 도감 → 익히기(퀴즈) → 뽑아 보기
 * 배열 좌표: [이름, 설명, 열, 줄, 가로놓임?]. 줄(row) 하나가 카드 반 장이라 반 칸씩 어긋난 배열을 그릴 수 있다.
 */
(function () {
  'use strict';
  const CARDS = window.CARDS;
  const SUITS = window.SUITS;
  const ART = window.ART;
  const PAINT = window.PAINT || {};
  if (window.PAINT_DEFS) document.getElementById('sharedDefs').insertAdjacentHTML('beforeend', window.PAINT_DEFS);
  const $ = (id) => document.getElementById(id);
  const esc = (s) => String(s).replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

  const SPREADS = {
    zen1: { name: '한 장 명상', sub: '1장', blurb: '오늘 하루, 혹은 지금 이 일을 비추는 한 장.', cols: 1, max: 220,
      pos: [['지금 여기', '이 순간 내 안에서 일어나고 있는 일', 1, 1]] },
    paradox: { name: '역설', sub: '3장', blurb: '지금의 나와 지나온 영향, 그 둘을 꿰는 통찰.', cols: 3, max: 180,
      pos: [['지금 여기', '지금 내가 서 있는 자리와 마음의 상태', 1, 1], ['지나온 영향', '오래된 습관, 과거에서 건너와 지금을 물들이는 것', 3, 1],
        ['역설', '둘을 함께 볼 때 드러나는 통찰. 머리로는 풀리지 않는 지점', 2, 1]] },
    relating: { name: '관계', sub: '4장', blurb: '나와 상대, 그리고 둘이 함께 만든 것을 봅니다.', cols: 3, max: 150,
      pos: [['나', '내가 이 관계에 가져오는 것', 1, 2], ['상대', '상대가 이 관계에 가져오는 것', 3, 2],
        ['둘이 만든 것', '두 사람의 에너지가 섞여 생긴 관계 그 자체', 2, 1], ['통찰', '이 관계가 나에게 보여 주는 것', 2, 3]] },
    diamond: { name: '다이아몬드', sub: '5장', blurb: '한 가지 문제를 안과 밖에서 또렷하게.', cols: 3, max: 140,
      pos: [['주제', '지금 들여다보려는 문제', 2, 3], ['보이지 않는 안쪽', '미처 알아차리지 못한 내면의 영향', 1, 3],
        ['알고 있는 바깥', '이미 의식하고 있는 바깥의 영향', 3, 3], ['필요한 것', '풀려나기 위해 필요한 것', 2, 1], ['풀림', '이해가 찾아올 때의 모습', 2, 5]] },
    bird: { name: '날아가는 새', sub: '7장', blurb: '왼 날개는 받아들임, 오른 날개는 움직임. 새 높이로 오르는 길.', cols: 7, max: 104,
      pos: [['지금 여기', '날아오르는 자리. 지금의 나', 4, 7], ['저항', '날기를 두려워하는 마음', 3, 5], ['응답', '그 두려움에 내가 답하는 방식', 5, 5],
        ['안의 받침', '직관. 안에서 나를 받쳐 주는 것', 2, 3], ['밖의 받침', '직관을 따르는 지혜로운 행동', 6, 3],
        ['이완', '받아들이고 힘을 빼는 자리', 1, 1], ['도착', '새로운 알아차림의 높이', 7, 1]] },
    key: { name: '열쇠', sub: '8장', blurb: '눌러 둔 것을 열어 몸·가슴·존재로 들어가는 배열.', cols: 6, max: 110,
      pos: [['억눌린 것', '보지 않으려고 눌러 둔 것', 2, 1], ['음', '받아들이는 쪽, 수동적인 면', 1, 2], ['양', '움직이는 쪽, 능동적인 면', 3, 2],
        ['명상', '지금 필요한 머무름', 2, 3], ['몸', '몸이 알려 주는 것', 4, 2], ['가슴', '가슴이 알려 주는 것', 5, 2],
        ['존재', '존재의 깊은 곳이 알려 주는 것', 6, 2], ['앎', '이 모두를 꿰는 이해', 6, 4]] },
    celtic: { name: '켈틱 크로스', sub: '10장', blurb: '한 가지 문제를 열 방향에서 깊이 들여다봅니다.', cols: 4, max: 124,
      pos: [['지금', '문제의 한가운데, 지금의 나', 2, 4], ['가로막는 것', '가로질러 흐름을 막는 것', 2, 4, true], ['의식', '머리로 알고 바라는 것', 2, 2],
        ['무의식', '밑바닥에 깔린 진짜 뿌리', 2, 6], ['지나가는 것', '물러가고 있는 영향', 1, 4], ['다가오는 것', '새로 들어오는 영향', 3, 4],
        ['나의 태도', '이 일을 대하는 나', 4, 7], ['둘레', '주위 사람과 여건', 4, 5], ['바람과 두려움', '바라면서도 겁내는 것', 4, 3], ['열매', '이 흐름이 익어 닿는 곳', 4, 1]] }
  };
  const ORDER = ['zen1', 'paradox', 'relating', 'diamond', 'bird', 'key', 'celtic'];
  const GROUPS = [['all', '전체'], ['major', '메이저'], ['f', '불'], ['w', '물'], ['c', '구름'], ['r', '무지개']];

  const state = { key: 'zen1', question: '', deck: [], picks: [], flipped: new Set() };

  /* ── 그림 ─────────────────────────── */
  /* cards/<id>.jpg 가 있는 카드는 그 그림을 쓰고, 없으면 채색 그림(paint.js)을 쓴다 */
  const PHOTO = new Set('m00 m01 m02 m03 m04 m05 m06 m07 m08 m09 m10 m11 m12 m13 m14 m15 m16 m17 m18 m19 m20 m21 m22'.split(' ')
    .concat(...['f', 'w', 'c', 'r'].map((s) => Array.from({ length: 14 }, (_, i) => s + String(i + 1).padStart(2, '0')))));
  function faceHTML(c) {
    if (PHOTO.has(c.id)) {
      return `<span class="face is-photo"><img src="cards/${c.id}.jpg" alt="${esc(c.ko)} 카드" loading="lazy" decoding="async"></span>`;
    }
    const frame = c.suit === 'r' ? ' style="stroke:url(#rb)"' : '';
    return `<span class="face"><svg class="face-art s-${c.suit}" viewBox="0 0 120 200" role="img" aria-label="${esc(c.ko)} 카드">` +
      '<rect class="fg" width="120" height="200"/>' +
      `<rect class="ff" x="6" y="6" width="108" height="188" rx="5"${frame}/>` +
      `<text class="fn" x="60" y="25">${esc(c.label)}</text>` +
      (PAINT[c.id]
        ? `<g class="paint" transform="translate(10 32)" clip-path="url(#pc)">${PAINT[c.id]}</g>`
        : `<g class="art" transform="translate(10 36)">${ART[c.id] || ''}</g>`) +
      `<text class="ft${c.ko.length > 6 ? ' is-long' : ''}" x="60" y="159">${esc(c.ko)}</text>` +
      `<text class="fe" x="60" y="175">${esc(c.en.toUpperCase())}</text></svg></span>`;
  }
  const BACK_SVG = '<svg class="back-art" viewBox="0 0 100 166" preserveAspectRatio="none" aria-hidden="true">' +
    '<rect class="b-ground" width="100" height="166"/>' +
    '<rect class="b-frame" x="5" y="5" width="90" height="156" rx="4"/>' +
    '<circle class="b-ring" cx="50" cy="83" r="30"/>' +
    '<path class="b-enso" d="M62 64A22 22 0 1 0 70 78"/>' +
    '<path class="b-dot" d="M22 30l1.5 4.5 4.5 1.5-4.5 1.5-1.5 4.5-1.5-4.5-4.5-1.5 4.5-1.5zM80 128l1.2 3.6 3.6 1.2-3.6 1.2-1.2 3.6-1.2-3.6-3.6-1.2 3.6-1.2z"/>' +
    '</svg>';

  /* ── 해설 조각 ─────────────────────── */
  function tagsHTML(c) {
    const first = c.master ? '<span class="tag is-major">79번째 카드</span>'
      : c.major ? `<span class="tag is-major">메이저 아르카나 ${c.label}</span>`
        : `<span class="tag s-${c.suit}">${esc(c.label)} · ${SUITS[c.suit].el}</span>`;
    return `<div class="tags">${first}${c.court ? '<span class="tag is-court">인물 카드 · 숙달</span>' : ''}` +
      `<span class="tag">${esc(c.trad)}</span></div>`;
  }
  function bodyHTML(c) {
    return tagsHTML(c) +
      `<ul class="kw">${c.kw.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>` +
      `<p class="mean">${esc(c.mean)}</p>` +
      `<div class="counsel"><p class="adv"><b>카드가 묻는 것</b>${esc(c.ask)}</p>` +
      `<p class="scene"><b>원작 그림</b>${esc(c.scene)}</p></div>`;
  }
  function readingHTML(i, label, hint, c) {
    return `<div class="reading-card">${faceHTML(c)}</div><div class="reading-body">` +
      `<p class="pos"><b>${i + 1}</b>${esc(label)}<span>${esc(hint)}</span></p>` +
      `<h3>${esc(c.ko)} <span>${esc(c.en)}</span></h3>${bodyHTML(c)}</div>`;
  }
  function dialogHTML(c) {
    return `<div class="dialog-head"><div class="reading-card">${faceHTML(c)}</div>` +
      `<h3 id="dialogTitle">${esc(c.ko)} <span>${esc(c.en)}</span></h3></div>` +
      `<div class="dialog-sections">${bodyHTML(c)}</div>`;
  }

  /* 여러 장을 한꺼번에 볼 때: 메이저 비율, 몰린 원소, 인물 카드 */
  const SUIT_NOTE = {
    f: '불이 몰려 나왔습니다. 지금의 주제는 행동, 곧 힘을 어디에 어떻게 쓰고 있는가입니다.',
    w: '물이 몰려 나왔습니다. 지금의 주제는 감정, 느낌이 흐르고 있는지 막혀 있는지입니다.',
    c: '구름이 몰려 나왔습니다. 지금의 주제는 마음입니다. 일 자체보다 그 일에 대한 생각이 하늘을 가리고 있을 수 있습니다.',
    r: '무지개가 몰려 나왔습니다. 지금의 주제는 몸과 현실, 일상에서 실제로 사는 모습입니다.'
  };
  function togetherHTML(cards) {
    const n = cards.length;
    const cnt = { major: 0, f: 0, w: 0, c: 0, r: 0 };
    cards.forEach((c) => { cnt[c.suit] += 1; });
    const courts = cards.filter((c) => c.court).length;
    const tally = ['major', 'f', 'w', 'c', 'r'].filter((k) => cnt[k]).map((k) => `<span class="s-${k}">${SUITS[k].ko} ${cnt[k]}</span>`).join('');
    const notes = [];
    if (cards.some((c) => c.master)) notes.push('스승 카드가 나왔습니다. 이 질문의 답을 줄 이는 바깥에 없다는 뜻으로, 배열 전체를 내 안의 일로 읽으세요.');
    if (cnt.major === 0) notes.push('메이저가 한 장도 없습니다. 삶의 큰 고비라기보다 일상의 결을 살피는 자리입니다.');
    else if (cnt.major * 2 >= n) notes.push(`메이저가 ${cnt.major}장입니다. 사건 하나가 아니라 삶의 큰 주제가 걸려 있습니다.`);
    else notes.push(`메이저 ${cnt.major}장이 놓인 자리가 이 배열의 요점입니다. 그 자리부터 읽으세요.`);
    const minors = ['f', 'w', 'c', 'r'].sort((a, b) => cnt[b] - cnt[a]);
    if (cnt[minors[0]] >= 2 && cnt[minors[0]] > cnt[minors[1]]) notes.push(SUIT_NOTE[minors[0]]);
    const missing = minors.filter((k) => cnt[k] === 0);
    if (n >= 6 && missing.length === 1) notes.push(`${SUITS[missing[0]].ko}(${SUITS[missing[0]].el})가 한 장도 없습니다. 이 일에서 비어 있거나 돌보지 않는 쪽일 수 있습니다.`);
    if (courts >= 2) notes.push(`인물 카드가 ${courts}장입니다. 다른 사람이 아니라, 내가 그 원소를 얼마나 익숙하게 다루고 있는지를 보여 줍니다.`);
    return `<h3>함께 읽기</h3><p class="tally">${tally}</p><p>자리 하나하나를 보기 전에, 펼쳐진 카드 전체의 빛깔부터 봅니다.</p>` +
      `<ul>${notes.map((t) => `<li>${t}</li>`).join('')}</ul>`;
  }

  /* ── 덱의 짜임 ─────────────────────── */
  function renderSuits() {
    const sample = { major: 'm00', f: 'f01', w: 'w01', c: 'c01', r: 'r01' };
    const text = {
      major: ['메이저 23장', '바보의 여정과 스승. 깨어남의 큰 고비들.'],
      f: ['불 14장 · 행동', '완드의 자리. 힘을 어떻게 쓰는가.'],
      w: ['물 14장 · 감정', '컵의 자리. 느낌이 어떻게 흐르는가.'],
      c: ['구름 14장 · 마음', '소드의 자리. 생각이 무엇을 가리는가.'],
      r: ['무지개 14장 · 몸과 현실', '펜타클의 자리. 일상을 어떻게 사는가.']
    };
    $('suitGrid').innerHTML = Object.keys(sample).map((k) => {
      const c = CARDS.find((x) => x.id === sample[k]);
      return `<a class="suit-card s-${k}" href="#library" data-suit="${k}"><span class="suit-face">${faceHTML(c)}</span>` +
        `<span><strong>${text[k][0]}</strong><em>${text[k][1]}</em></span></a>`;
    }).join('');
  }

  /* ── 배열법 고르기 ─────────────────── */
  function miniHTML(s) {
    return `<span class="mini" style="--cols:${s.cols}" aria-hidden="true">` +
      s.pos.map((p, i) => `<i${p[4] ? ' class="is-cross"' : ''} style="--c:${p[2]};--r:${p[3]}">${i + 1}</i>`).join('') + '</span>';
  }
  function renderSetup() {
    $('spreadOptions').innerHTML = ORDER.map((k) => {
      const s = SPREADS[k];
      return `<label class="spread-option"><input type="radio" name="spread" value="${k}"${k === state.key ? ' checked' : ''}>` +
        `<span class="spread-card">${miniHTML(s)}<span><strong>${s.name} <em>${s.sub}</em></strong><p>${s.blurb}</p></span></span></label>`;
    }).join('');
  }

  /* ── 뽑기 ─────────────────────────── */
  function shuffled(n) {
    const a = Array.from({ length: n }, (_, i) => i);
    const rnd = new Uint32Array(n);
    crypto.getRandomValues(rnd);
    for (let i = n - 1; i > 0; i -= 1) {
      const j = rnd[i] % (i + 1);
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function updateStatus() {
    const n = SPREADS[state.key].pos.length;
    const k = state.picks.length;
    let t;
    if (k < n) t = `덱에서 마음이 가는 카드를 ${n}장 고르거나, 자동으로 뽑아 보세요. (${k}/${n})`;
    else if (state.flipped.size < n) t = '카드를 눌러 한 장씩 뒤집어 보세요.';
    else t = '모두 펼쳤습니다. 아래에서 자리별 풀이를 읽어 보세요.';
    $('status').textContent = t;
  }

  function startReading() {
    const s = SPREADS[state.key];
    state.deck = shuffled(CARDS.length);
    state.picks = [];
    state.flipped = new Set();

    $('table').hidden = false;
    $('spreadTitle').textContent = `${s.name} · ${s.sub}`;
    $('asked').hidden = !state.question;
    $('asked').textContent = state.question;

    $('deck').classList.remove('is-done');
    $('deck').innerHTML = state.deck.map((_, i) =>
      `<button type="button" class="deck-card" style="--i:${i}" data-i="${i}" aria-label="${i + 1}번째 카드 뽑기">${BACK_SVG}</button>`).join('');

    const lay = $('layout');
    lay.dataset.spread = state.key;
    lay.style.setProperty('--cols', s.cols);
    lay.style.setProperty('--max', `${s.max}px`);
    lay.innerHTML = s.pos.map((p, i) =>
      `<div class="slot${p[4] ? ' is-cross' : ''}" data-pos="${i}" style="--c:${p[2]};--r:${p[3]}">` +
      `<span class="badge">${i + 1}</span><div class="slot-hole"></div></div>`).join('');

    $('legend').innerHTML = s.pos.map((p, i) =>
      `<li data-pos="${i}"><b>${i + 1}</b><span><strong>${esc(p[0])}</strong> · ${esc(p[1])}</span></li>`).join('');
    $('readings').innerHTML = s.pos.map((_, i) => `<article class="reading" data-pos="${i}" id="reading-${i}" hidden></article>`).join('');
    $('together').hidden = true;
    $('tableActions').hidden = true;
    $('flipAll').hidden = false;
    $('pickActions').hidden = false;
    $('autoPick').disabled = false;
    updateStatus();
  }

  /* 남은 자리를 덱에서 무작위로 채운다. 이미 손으로 고른 카드는 그대로 둔다 */
  function autoPick() {
    const need = SPREADS[state.key].pos.length - state.picks.length;
    const left = [...$('deck').querySelectorAll('.deck-card:not(.is-taken)')];
    if (need <= 0 || !left.length) return;
    $('autoPick').disabled = true;
    const rnd = new Uint32Array(need);
    crypto.getRandomValues(rnd);
    const run = state.deck;
    for (let k = 0; k < need; k += 1) {
      const btn = left.splice(rnd[k] % left.length, 1)[0];
      setTimeout(() => { if (state.deck === run) btn.click(); }, k * 160);
    }
  }

  function pick(deckIndex) {
    const n = SPREADS[state.key].pos.length;
    if (state.picks.length >= n) return;
    const i = state.picks.length;
    const c = CARDS[state.deck[deckIndex]];
    state.picks.push(c);
    const slot = $('layout').querySelector(`.slot[data-pos="${i}"]`);
    slot.querySelector('.slot-hole').outerHTML =
      `<button type="button" class="flip" data-pos="${i}" aria-label="${i + 1}번 자리 카드 뒤집기">` +
      `<span class="flip-inner"><span class="side back">${BACK_SVG}</span><span class="side front">${faceHTML(c)}</span></span></button>`;
    if (state.picks.length === n) {
      $('deck').classList.add('is-done');
      $('pickActions').hidden = true;
      $('tableActions').hidden = false;
      $('layout').scrollIntoView({ block: 'center' });
    }
    updateStatus();
  }

  function flip(i, quiet) {
    i = Number(i);
    if (state.flipped.has(i) || !state.picks[i]) return;
    state.flipped.add(i);
    const c = state.picks[i];
    const pos = SPREADS[state.key].pos;
    const n = pos.length;
    const btn = $('layout').querySelector(`.flip[data-pos="${i}"]`);
    btn.classList.add('is-flipped');
    btn.setAttribute('aria-label', `${i + 1}번 자리 ${pos[i][0]}: ${c.ko}`);

    const li = $('legend').querySelector(`li[data-pos="${i}"]`);
    li.insertAdjacentHTML('beforeend', `<a href="#reading-${i}">${esc(c.ko)}</a>`);

    const article = $('readings').querySelector(`.reading[data-pos="${i}"]`);
    article.innerHTML = readingHTML(i, pos[i][0], pos[i][1], c);
    article.hidden = false;

    const done = state.flipped.size === n;
    if (done) $('flipAll').hidden = true;
    if (done && n > 1) {
      $('together').innerHTML = togetherHTML(state.picks);
      $('together').hidden = false;
    }
    updateStatus();
    if (!quiet && done) {
      const target = n === 1 ? article : $('together');
      setTimeout(() => target.scrollIntoView({ block: 'start' }), 700);
    }
  }

  /* ── 도감 ─────────────────────────── */
  function chipsHTML(list, attr, on) {
    return list.map(([k, ko]) => {
      const n = k === 'all' ? CARDS.length : CARDS.filter((c) => c.suit === k).length;
      return `<button type="button" class="chip${k === on ? ' is-on' : ''}" data-${attr}="${k}" aria-pressed="${k === on}">${ko} <span>${n}</span></button>`;
    }).join('');
  }
  function renderLibrary() {
    $('filters').innerHTML = chipsHTML(GROUPS, 'suit', 'all');
    $('cardGrid').innerHTML = CARDS.map((c, i) =>
      `<button type="button" class="card-tile" data-i="${i}" data-suit="${c.suit}" aria-label="${esc(c.ko)} 풀이 보기">` +
      `${faceHTML(c)}<span class="tile-name"><b>${esc(c.label)}</b>${esc(c.ko)}</span></button>`).join('');
  }
  function setChips(box, chip) {
    box.querySelectorAll('.chip').forEach((b) => {
      const on = b === chip;
      b.classList.toggle('is-on', on);
      b.setAttribute('aria-pressed', String(on));
    });
  }
  function filterLibrary(suit) {
    setChips($('filters'), $('filters').querySelector(`.chip[data-suit="${suit}"]`));
    $('cardGrid').querySelectorAll('.card-tile').forEach((t) => {
      t.hidden = suit !== 'all' && t.dataset.suit !== suit;
    });
  }

  const dialog = $('cardDialog');
  let dialogIndex = 0;
  function showCard(i) {
    dialogIndex = (i + CARDS.length) % CARDS.length;
    $('dialogBody').innerHTML = dialogHTML(CARDS[dialogIndex]);
    if (!dialog.open) dialog.showModal();
    dialog.scrollTop = 0;
  }

  /* ── 익히기 ───────────────────────── */
  const MODES = [['face', '카드 보고 뜻 고르기'], ['word', '열쇠말 보고 카드 고르기']];
  const quiz = { mode: 'face', group: 'all', card: null, opts: [], done: false, right: 0, total: 0, last: -1 };

  function nextQuestion() {
    const pool = CARDS.filter((c) => quiz.group === 'all' || c.suit === quiz.group);
    let order = shuffled(pool.length).map((i) => pool[i]);
    if (order.length > 1 && order[0].id === quiz.last) order.push(order.shift());
    quiz.card = order[0];
    quiz.last = quiz.card.id;
    const k = shuffled(4);
    quiz.opts = k.map((i) => order[i]);
    quiz.done = false;
    renderQuiz();
  }
  function renderQuiz(chosen) {
    const c = quiz.card;
    const face = quiz.mode === 'face' || quiz.done;
    const prompt = quiz.mode === 'face'
      ? '<p class="quiz-q">이 카드의 열쇠말은 어느 것일까요?</p>'
      : `<p class="quiz-q">이 열쇠말을 가진 카드는 어느 것일까요?</p><ul class="kw">${c.kw.map((k) => `<li>${esc(k)}</li>`).join('')}</ul>`;
    const opts = quiz.opts.map((o, i) => {
      let k = '';
      if (quiz.done && o === c) k = ' is-right';
      else if (quiz.done && i === chosen) k = ' is-wrong';
      const label = quiz.mode === 'face' ? o.kw.map(esc).join(' · ') : `${esc(o.ko)} <span>${esc(o.label)}</span>`;
      return `<button type="button" class="opt${k}" data-o="${i}"${quiz.done ? ' disabled' : ''}>${label}</button>`;
    }).join('');
    const after = quiz.done
      ? `<div class="quiz-after"><p class="quiz-result ${quiz.opts[chosen] === c ? 'ok' : 'no'}">${quiz.opts[chosen] === c ? '맞았습니다.' : `아쉽습니다. 답은 ‘${esc(c.ko)}’입니다.`}</p>` +
        `<p class="mean">${esc(c.mean)}</p><button type="button" class="primary" id="quizNext">다음 카드</button></div>`
      : '';
    $('quiz').innerHTML = `<div class="quiz-card">${face ? faceHTML(c) : BACK_SVG}</div>` +
      `<div class="quiz-body">${prompt}<div class="quiz-opts">${opts}</div>${after}` +
      `<p class="quiz-score" role="status">맞힌 수 <b>${quiz.right}</b> / ${quiz.total}</p></div>`;
    if (quiz.done) $('quizNext').focus({ preventScroll: true });
  }
  function renderStudy() {
    $('quizModes').innerHTML = MODES.map(([k, ko]) =>
      `<button type="button" class="chip${k === quiz.mode ? ' is-on' : ''}" data-mode="${k}" aria-pressed="${k === quiz.mode}">${ko}</button>`).join('');
    $('quizGroups').innerHTML = chipsHTML(GROUPS, 'group', 'all');
    nextQuestion();
  }

  /* ── 이벤트 ───────────────────────── */
  $('setup').addEventListener('submit', (e) => {
    e.preventDefault();
    const checked = document.querySelector('input[name="spread"]:checked');
    if (checked) state.key = checked.value;
    state.question = $('question').value.trim();
    startReading();
    $('table').scrollIntoView({ block: 'start' });
  });

  $('deck').addEventListener('click', (e) => {
    const btn = e.target.closest('.deck-card');
    if (!btn || btn.classList.contains('is-taken')) return;
    btn.classList.add('is-taken');
    btn.disabled = true;
    pick(Number(btn.dataset.i));
  });

  $('layout').addEventListener('click', (e) => {
    const btn = e.target.closest('.flip');
    if (btn) flip(btn.dataset.pos);
  });

  $('autoPick').addEventListener('click', autoPick);

  $('flipAll').addEventListener('click', () => {
    const rest = state.picks.map((_, i) => i).filter((i) => !state.flipped.has(i));
    rest.forEach((p, k) => setTimeout(() => flip(p, k < rest.length - 1), k * 240));
  });

  $('redraw').addEventListener('click', () => {
    startReading();
    $('table').scrollIntoView({ block: 'start' });
  });

  $('filters').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (chip) filterLibrary(chip.dataset.suit);
  });
  $('suitGrid').addEventListener('click', (e) => {
    const a = e.target.closest('.suit-card');
    if (a) filterLibrary(a.dataset.suit);
  });

  $('cardGrid').addEventListener('click', (e) => {
    const tile = e.target.closest('.card-tile');
    if (tile) showCard(Number(tile.dataset.i));
  });
  $('dialogPrev').addEventListener('click', () => showCard(dialogIndex - 1));
  $('dialogNext').addEventListener('click', () => showCard(dialogIndex + 1));
  $('dialogClose').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') showCard(dialogIndex - 1);
    if (e.key === 'ArrowRight') showCard(dialogIndex + 1);
  });

  $('quizModes').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    quiz.mode = chip.dataset.mode;
    setChips($('quizModes'), chip);
    nextQuestion();
  });
  $('quizGroups').addEventListener('click', (e) => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    quiz.group = chip.dataset.group;
    setChips($('quizGroups'), chip);
    nextQuestion();
  });
  $('quiz').addEventListener('click', (e) => {
    if (e.target.closest('#quizNext')) { nextQuestion(); return; }
    const opt = e.target.closest('.opt');
    if (!opt || quiz.done) return;
    const i = Number(opt.dataset.o);
    quiz.done = true;
    quiz.total += 1;
    if (quiz.opts[i] === quiz.card) quiz.right += 1;
    renderQuiz(i);
  });

  renderSuits();
  renderSetup();
  renderLibrary();
  renderStudy();
})();
