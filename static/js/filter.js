document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#filters .filter-pill');
  const cards = document.querySelectorAll('#tool-grid .card');
  const searchInput = document.getElementById('tools-search');
  const emptyState = document.getElementById('tools-empty');

  let activeFilter = 'all';

  function applyFilters() {
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach((card) => {
      const catMatch = activeFilter === 'all' || card.dataset.cat === activeFilter;
      const haystack = (card.dataset.name || card.textContent).toLowerCase();
      const textMatch = !q || haystack.includes(q);
      const match = catMatch && textMatch;
      card.style.display = match ? '' : 'none';
      if (match) visibleCount += 1;
    });

    if (emptyState) emptyState.style.display = visibleCount === 0 ? 'block' : 'none';
  }

  pills.forEach((pill) => {
    pill.addEventListener('click', () => {
      pills.forEach((p) => p.classList.remove('active'));
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
