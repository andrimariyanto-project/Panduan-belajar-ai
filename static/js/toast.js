// andremedia.ai — small toast notification utility
// Usage: window.andreToast('Pesan singkat', 'success' | 'info')
(function () {
  function showToast(message, kind) {
    const host = document.getElementById('toast-host');
    if (!host) return;
    const el = document.createElement('div');
    el.className = 'toast' + (kind ? ' toast-' + kind : '');
    el.textContent = message;
    host.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    setTimeout(() => {
      el.classList.remove('show');
      setTimeout(() => el.remove(), 250);
    }, 2400);
  }
  window.andreToast = showToast;
})();
