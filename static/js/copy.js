document.addEventListener('DOMContentLoaded', () => {
  function fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (e) {
      ok = false;
    }
    document.body.removeChild(textarea);
    return ok;
  }

  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const block = btn.closest('.prompt-block');
      const text = block.querySelector('pre').innerText;
      const original = btn.textContent;
      let success = false;

      if (navigator.clipboard && window.isSecureContext) {
        try {
          await navigator.clipboard.writeText(text);
          success = true;
        } catch (e) {
          success = false;
        }
      }

      if (!success) {
        success = fallbackCopy(text);
      }

      if (success) {
        btn.textContent = 'Tersalin';
        btn.classList.add('copied');
      } else {
        btn.textContent = 'Gagal salin';
        btn.classList.add('copy-failed');
      }

      setTimeout(() => {
        btn.textContent = original;
        btn.classList.remove('copied', 'copy-failed');
      }, 1800);
    });
  });
});
