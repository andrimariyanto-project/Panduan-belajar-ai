document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#filters .filter-pill');
  const cards = document.querySelectorAll('#tool-grid .card');
  const searchInput = document.getElementById('tool-search');
  const countEl = document.getElementById('tool-count');
  const noResults = document.getElementById('no-results');
  let activeFilter = 'all';

  function applyFilters() {
    const q = (searchInput ? searchInput.value.trim().toLowerCase() : '');
    let visible = 0;

    cards.forEach(card => {
      const matchesCategory = activeFilter === 'all' || card.dataset.cat === activeFilter;
      const haystack = card.textContent.toLowerCase();
      const matchesSearch = q === '' || haystack.includes(q);
      const match = matchesCategory && matchesSearch;
      card.style.display = match ? '' : 'none';
      if (match) visible += 1;
    });

    if (countEl) {
      countEl.textContent = `${visible} tools ditemukan`;
    }
    if (noResults) {
      noResults.style.display = visible === 0 ? '' : 'none';
    }
  }

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      activeFilter = pill.dataset.filter;
      applyFilters();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  applyFilters();
});
