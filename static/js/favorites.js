// andremedia.ai — favorites / bookmark system (persisted in localStorage)
(function () {
  const KEY = 'andre_favorites_v1';

  function getFavorites() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveFavorites(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
    updateBadge();
  }

  function isFavorited(id) {
    return getFavorites().some((f) => f.id === id);
  }

  function toggleFavorite(item) {
    const list = getFavorites();
    const idx = list.findIndex((f) => f.id === item.id);
    let added;
    if (idx >= 0) {
      list.splice(idx, 1);
      added = false;
    } else {
      list.unshift(item);
      added = true;
    }
    saveFavorites(list);
    return added;
  }

  function removeFavorite(id) {
    saveFavorites(getFavorites().filter((f) => f.id !== id));
  }

  function updateBadge() {
    const badge = document.getElementById('fav-count');
    if (!badge) return;
    const n = getFavorites().length;
    badge.textContent = n;
    badge.hidden = n === 0;
  }

  function bindButtons() {
    document.querySelectorAll('.fav-btn').forEach((btn) => {
      const block = btn.closest('.prompt-block, .tool-card, .card');
      const preEl = block ? block.querySelector('pre') : null;
      const item = {
        id: btn.dataset.favId,
        type: btn.dataset.favType || 'item',
        title: btn.dataset.favTitle || '',
        desc: btn.dataset.favDesc || '',
        url: btn.dataset.favUrl || '#',
        content: preEl ? preEl.textContent.trim() : '',
      };
      if (!item.id) return;
      if (isFavorited(item.id)) btn.classList.add('active');

      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const added = toggleFavorite(item);
        btn.classList.toggle('active', added);
        if (window.andreToast) {
          window.andreToast(
            added ? 'Ditambahkan ke Tersimpan' : 'Dihapus dari Tersimpan',
            added ? 'success' : 'info'
          );
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    updateBadge();
    bindButtons();
  });

  window.AndreFavorites = {
    getFavorites,
    saveFavorites,
    isFavorited,
    toggleFavorite,
    removeFavorite,
    updateBadge,
  };
})();
