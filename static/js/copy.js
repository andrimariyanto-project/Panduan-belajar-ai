document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const block = btn.closest('.prompt-block');
      const text = block.querySelector('pre').innerText;
      try {
        await navigator.clipboard.writeText(text);
        const original = btn.textContent;
        btn.textContent = 'Tersalin';
        btn.classList.add('copied');
        setTimeout(() => {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1800);
      } catch (e) {
        btn.textContent = 'Gagal salin';
      }
    });
  });
});
