// andremedia.ai — Kamus AI flashcard mode
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('glossary-list');
  const searchEl = document.getElementById('glossary-search');
  const flashWrap = document.getElementById('flash-wrap');
  const modeButtons = document.querySelectorAll('.mode-switch button');
  if (!listEl || !flashWrap) return;

  const KEY = 'andre_glossary_mastered_v1';
  const LEITNER_KEY = 'andre_glossary_leitner_v1'; // { [id]: { box: 0-3, due: 'YYYY-MM-DD' } }
  const BOX_INTERVAL_DAYS = [0, 1, 3, 7]; // box 0=hari ini, 1=+1 hari, 2=+3 hari, 3=+7 hari (box 3 = dianggap dikuasai)

  const deckSource = Array.from(listEl.querySelectorAll('.entry')).map((entry, i) => ({
    id: 'g-' + i,
    term: entry.querySelector('dt').textContent.trim(),
    def: entry.querySelector('dd').textContent.trim(),
  }));

  function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }
  function getLeitner() {
    try {
      return JSON.parse(localStorage.getItem(LEITNER_KEY)) || {};
    } catch (e) {
      return {};
    }
  }
  function saveLeitner(state) {
    localStorage.setItem(LEITNER_KEY, JSON.stringify(state));
  }
  function addDays(dateStr, days) {
    const d = new Date(dateStr + 'T00:00:00');
    d.setDate(d.getDate() + days);
    return d.toISOString().slice(0, 10);
  }
  function dueTodayCount() {
    const state = getLeitner();
    const today = todayStr();
    return deckSource.filter((item) => {
      const entry = state[item.id];
      if (!entry) return true; // kartu belum pernah direview = perlu direview
      return entry.due <= today;
    }).length;
  }

  let deck = deckSource.slice();
  let idx = 0;
  let flipped = false;

  const cardEl = document.getElementById('flashcard');
  const termEl = document.getElementById('flash-term');
  const defEl = document.getElementById('flash-def');
  const progressEl = document.getElementById('flash-progress');
  const prevBtn = document.getElementById('flash-prev');
  const nextBtn = document.getElementById('flash-next');
  const shuffleBtn = document.getElementById('flash-shuffle');
  const masteredBtn = document.getElementById('flash-mastered');
  const againBtn = document.getElementById('flash-again');

  function getMastered() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveMastered(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function render() {
    if (!deck.length) return;
    const item = deck[idx];
    termEl.textContent = item.term;
    defEl.textContent = item.def;
    cardEl.classList.toggle('flipped', flipped);
    const mastered = getMastered();
    const due = dueTodayCount();
    progressEl.textContent = `Kartu ${idx + 1} / ${deck.length} · dikuasai ${mastered.length}/${deckSource.length} · perlu diulang hari ini: ${due}`;
  }

  function go(delta) {
    flipped = false;
    idx = (idx + delta + deck.length) % deck.length;
    render();
  }

  function shuffle() {
    for (let i = deck.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    idx = 0;
    flipped = false;
    render();
    if (window.andreToast) window.andreToast('Kartu diacak', 'info');
  }

  cardEl.addEventListener('click', () => {
    flipped = !flipped;
    render();
  });
  prevBtn.addEventListener('click', () => go(-1));
  nextBtn.addEventListener('click', () => go(1));
  shuffleBtn.addEventListener('click', shuffle);

  masteredBtn.addEventListener('click', () => {
    const item = deck[idx];
    const leitner = getLeitner();
    const current = leitner[item.id] || { box: 0 };
    const nextBox = Math.min(current.box + 1, BOX_INTERVAL_DAYS.length - 1);
    leitner[item.id] = { box: nextBox, due: addDays(todayStr(), BOX_INTERVAL_DAYS[nextBox]) };
    saveLeitner(leitner);

    const mastered = getMastered();
    if (nextBox >= BOX_INTERVAL_DAYS.length - 1 && !mastered.includes(item.id)) {
      mastered.push(item.id);
      saveMastered(mastered);
    }
    if (window.andreToast) {
      window.andreToast(
        nextBox >= BOX_INTERVAL_DAYS.length - 1 ? 'Ditandai sudah hafal' : `Bagus — diulang lagi dalam ${BOX_INTERVAL_DAYS[nextBox]} hari`,
        'success'
      );
    }
    go(1);
  });

  againBtn.addEventListener('click', () => {
    const item = deck[idx];
    const leitner = getLeitner();
    leitner[item.id] = { box: 0, due: todayStr() };
    saveLeitner(leitner);

    const mastered = getMastered().filter((id) => id !== item.id);
    saveMastered(mastered);
    go(1);
  });

  modeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      modeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const mode = btn.dataset.mode;
      const isFlash = mode === 'flash';
      flashWrap.classList.toggle('active', isFlash);
      listEl.style.display = isFlash ? 'none' : '';
      if (searchEl) searchEl.closest('.glossary-toolbar').querySelector('#glossary-search').style.visibility = isFlash ? 'hidden' : 'visible';
      if (isFlash) {
        idx = 0;
        flipped = false;
        render();
      }
    });
  });

  render();
});
