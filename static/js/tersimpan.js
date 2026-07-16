// andremedia.ai — render saved favorites page from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('fav-container');
  if (!container || !window.AndreFavorites) return;

  const typeLabel = { tool: 'Tools', prompt: 'Prompts', course: 'Courses', item: 'Lainnya' };

  function render() {
    const items = window.AndreFavorites.getFavorites();
    const exportBar = document.getElementById('fav-export-bar');
    if (exportBar) exportBar.hidden = items.length === 0;

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

  function bindExportButtons() {
    const pdfBtn = document.getElementById('export-pdf');
    const txtBtn = document.getElementById('export-txt');
    const jsonBtn = document.getElementById('export-json');
    if (!window.AndreExport) return;

    if (pdfBtn) {
      pdfBtn.addEventListener('click', () => {
        const items = window.AndreFavorites.getFavorites();
        pdfBtn.disabled = true;
        pdfBtn.textContent = '... membuat PDF';
        Promise.resolve(window.AndreExport.exportAsPdf(items)).finally(() => {
          pdfBtn.disabled = false;
          pdfBtn.textContent = '↓ PDF';
        });
        if (window.andreToast) window.andreToast('Menyiapkan file PDF...', 'info');
      });
    }
    if (txtBtn) {
      txtBtn.addEventListener('click', () => {
        window.AndreExport.exportAsText(window.AndreFavorites.getFavorites());
        if (window.andreToast) window.andreToast('File .txt diunduh', 'success');
      });
    }
    if (jsonBtn) {
      jsonBtn.addEventListener('click', () => {
        window.AndreExport.exportAsJson(window.AndreFavorites.getFavorites());
        if (window.andreToast) window.andreToast('File .json diunduh', 'success');
      });
    }
  }

  bindExportButtons();
  render();
});
