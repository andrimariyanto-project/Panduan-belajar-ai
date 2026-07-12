document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#prompt-filters .filter-pill');
  const blocks = document.querySelectorAll('#prompt-grid .prompt-block');
  const searchInput = document.getElementById('prompts-search');
  const emptyState = document.getElementById('prompts-empty');

  if (!blocks.length) return;

  let activeFilter = 'all';

  function applyFilters() {
    const q = (searchInput ? searchInput.value : '').trim().toLowerCase();
    let visibleCount = 0;

    blocks.forEach((block) => {
      const catMatch = activeFilter === 'all' || block.dataset.cat === activeFilter;
      const haystack = (block.dataset.name || block.textContent).toLowerCase();
      const textMatch = !q || haystack.includes(q);
      const match = catMatch && textMatch;
      block.style.display = match ? '' : 'none';
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
