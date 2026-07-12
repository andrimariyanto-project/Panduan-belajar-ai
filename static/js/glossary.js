document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('glossary-search');
  const entries = document.querySelectorAll('#glossary-list .entry');

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    entries.forEach(entry => {
      const haystack = entry.dataset.term.toLowerCase();
      entry.style.display = haystack.includes(q) ? '' : 'none';
    });
  });
});
