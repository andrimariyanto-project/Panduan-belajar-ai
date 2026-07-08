document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('glossary-search');
  const entries = document.querySelectorAll('#glossary-list .entry');
  const countEl = document.getElementById('glossary-count');
  const noResults = document.getElementById('glossary-no-results');

  function updateCount() {
    if (!countEl) return;
    countEl.textContent = `${entries.length} istilah`;
  }

  function applySearch() {
    const q = input.value.trim().toLowerCase();
    let visible = 0;

    entries.forEach(entry => {
      const haystack = (entry.dataset.term + ' ' + entry.textContent).toLowerCase();
      const match = q === '' || haystack.includes(q);
      entry.style.display = match ? '' : 'none';
      if (match) visible += 1;
    });

    if (countEl) {
      countEl.textContent = q === '' ? `${entries.length} istilah` : `${visible} istilah ditemukan`;
    }
    if (noResults) {
      noResults.style.display = visible === 0 ? '' : 'none';
    }
  }

  if (input) {
    input.addEventListener('input', applySearch);
  }

  updateCount();
});
