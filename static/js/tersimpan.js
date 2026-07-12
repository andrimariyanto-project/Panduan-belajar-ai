// andremedia.ai — render saved favorites page from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fav-container');
  if (!container || !window.AndreFavorites) return;

  const typeLabel = { tool: 'Tools', prompt: 'Prompts', course: 'Courses', item: 'Lainnya' };

  function render() {
    const items = window.AndreFavorites.getFavorites();
    if (!items.length) {
      container.innerHTML = `
        <div class="fav-empty">
          Belum ada yang disimpan. Klik ikon bintang di halaman
          <a href="/tools" style="color:var(--accent-2)">Tools</a> atau
          <a href="/prompts" style="color:var(--accent-2)">Prompts</a> untuk menandai favorit.
        </div>`;
      return;
    }

    const groups = {};
    items.forEach((item) => {
      const t = item.type || 'item';
      if (!groups[t]) groups[t] = [];
      groups[t].push(item);
    });

    container.innerHTML = Object.keys(groups)
      .map(
        (type) => `
      <div class="fav-group">
        <h2>${typeLabel[type] || type}</h2>
        <div class="grid grid-3">
          ${groups[type]
            .map(
              (item) => `
            <div class="card">
              <div class="card-top">
                <span class="tag">${typeLabel[type] || type}</span>
                <button class="fav-remove" data-id="${item.id}">Hapus</button>
              </div>
              <h3>${escapeHtml(item.title)}</h3>
              <p>${escapeHtml(item.desc)}</p>
              <div class="card-footer"><a href="${item.url}" class="role-link" style="color:var(--accent-2)">Buka halaman <span class="arrow">→</span></a></div>
            </div>`
            )
            .join('')}
        </div>
      </div>`
      )
      .join('');

    container.querySelectorAll('.fav-remove').forEach((btn) => {
      btn.addEventListener('click', () => {
        window.AndreFavorites.removeFavorite(btn.dataset.id);
        if (window.andreToast) window.andreToast('Dihapus dari Tersimpan', 'info');
        render();
      });
    });
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s || '';
    return div.innerHTML;
  }

  render();
});
