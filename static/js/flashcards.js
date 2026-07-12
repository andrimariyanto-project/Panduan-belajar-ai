// andremedia.ai — Kamus AI flashcard mode
document.addEventListener('DOMContentLoaded', () => {
  const listEl = document.getElementById('glossary-list');
  const searchEl = document.getElementById('glossary-search');
  const flashWrap = document.getElementById('flash-wrap');
  const modeButtons = document.querySelectorAll('.mode-switch button');
  if (!listEl || !flashWrap) return;

  const KEY = 'andre_glossary_mastered_v1';

  const deckSource = Array.from(listEl.querySelectorAll('.entry')).map((entry, i) => ({
    id: 'g-' + i,
    term: entry.querySelector('dt').textContent.trim(),
    def: entry.querySelector('dd').textContent.trim(),
  }));

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
    progressEl.textContent = `Kartu ${idx + 1} / ${deck.length} · dikuasai ${mastered.length}/${deckSource.length}`;
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
    const mastered = getMastered();
    const item = deck[idx];
    if (!mastered.includes(item.id)) mastered.push(item.id);
    saveMastered(mastered);
    if (window.andreToast) window.andreToast('Ditandai sudah hafal', 'success');
    go(1);
  });

  againBtn.addEventListener('click', () => {
    const mastered = getMastered().filter((id) => id !== deck[idx].id);
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
