document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#filters .filter-pill');
  const cards = document.querySelectorAll('#tool-grid .card');

  pills.forEach(pill => {
    pill.addEventListener('click', () => {
      pills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const filter = pill.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.cat === filter;
        card.style.display = match ? '' : 'none';
      });
    });
  });
});
