// andremedia.ai — thin scroll progress bar under the nav
document.addEventListener('DOMContentLoaded', () => {
  const bar = document.getElementById('scroll-progress');
  if (!bar) return;

  function update() {
    const h = document.documentElement;
    const scrollable = h.scrollHeight - h.clientHeight;
    const pct = scrollable > 0 ? (h.scrollTop / scrollable) * 100 : 0;
    bar.style.width = pct + '%';
  }

  document.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});
