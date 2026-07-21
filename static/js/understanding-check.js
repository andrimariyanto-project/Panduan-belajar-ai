// andremedia.ai — Cek Pemahaman (teknik Feynman self-explanation)
document.addEventListener('DOMContentLoaded', () => {
  const topicEl = document.getElementById('uc-topic');
  const noteEl = document.getElementById('uc-note');
  const ratingBtns = document.getElementById('uc-rating-btns');
  const saveBtn = document.getElementById('uc-save');
  const listEl = document.getElementById('uc-list');
  const summaryEl = document.getElementById('uc-summary');
  if (!topicEl || !saveBtn) return;

  const KEY = 'andre_understanding_checks_v1';
  let rating = 0;

  function readList() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function saveList(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }

  function updateSaveState() {
    const ready = topicEl.value.trim().length > 0 && noteEl.value.trim().length >= 15 && rating > 0;
    saveBtn.disabled = !ready;
  }

  topicEl.addEventListener('input', updateSaveState);
  noteEl.addEventListener('input', updateSaveState);

  ratingBtns.querySelectorAll('button').forEach((btn) => {
    btn.addEventListener('click', () => {
      rating = parseInt(btn.dataset.r, 10);
      ratingBtns.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      updateSaveState();
    });
  });

  function renderList() {
    const list = readList();
    if (!list.length) {
      summaryEl.textContent = 'Belum ada konsep yang disimpan.';
      listEl.innerHTML = '';
      return;
    }
    const avgRating = (list.reduce((s, i) => s + i.rating, 0) / list.length).toFixed(1);
    summaryEl.textContent = `${list.length} konsep tersimpan · rata-rata keyakinan ${avgRating}/5`;

    listEl.innerHTML = list
      .map(
        (item, idx) => `
      <div class="uc-item">
        <div class="uc-item-top">
          <h3>${escapeHtml(item.topic)}</h3>
          <span class="uc-item-rating">${'★'.repeat(item.rating)}${'☆'.repeat(5 - item.rating)}</span>
        </div>
        <p>${escapeHtml(item.note)}</p>
        <div class="uc-item-foot">
          <span>${item.date}</span>
          <button type="button" class="fav-remove" data-remove="${idx}">Hapus</button>
        </div>
      </div>`
      )
      .join('');

    listEl.querySelectorAll('[data-remove]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.dataset.remove, 10);
        const current = readList();
        current.splice(idx, 1);
        saveList(current);
        renderList();
        if (window.andreToast) window.andreToast('Konsep dihapus', 'info');
      });
    });
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  saveBtn.addEventListener('click', () => {
    const list = readList();
    list.unshift({
      id: 'uc-' + Date.now(),
      topic: topicEl.value.trim(),
      note: noteEl.value.trim(),
      rating,
      date: new Date().toLocaleDateString('id-ID'),
    });
    saveList(list);

    topicEl.value = '';
    noteEl.value = '';
    rating = 0;
    ratingBtns.querySelectorAll('button').forEach((b) => b.classList.remove('active'));
    updateSaveState();
    renderList();
    if (window.andreToast) window.andreToast('Konsep disimpan sebagai terverifikasi', 'success');
  });

  renderList();
});
