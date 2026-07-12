// andremedia.ai — command palette (Ctrl/Cmd+K global search)
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('cmdk-overlay');
  const input = document.getElementById('cmdk-input');
  const results = document.getElementById('cmdk-results');
  const openBtn = document.getElementById('search-open');
  const data = window.ANDRE_SEARCH_INDEX || [];

  const typeLabel = {
    page: 'Halaman',
    tool: 'Tool',
    prompt: 'Prompt',
    glossary: 'Kamus',
    course: 'Course',
  };

  let activeIndex = -1;
  let current = [];

  function open() {
    overlay.classList.add('open');
    input.value = '';
    render(topPicks());
    setTimeout(() => input.focus(), 10);
  }

  function close() {
    overlay.classList.remove('open');
    activeIndex = -1;
  }

  function topPicks() {
    return data.filter((d) => d.type === 'page').slice(0, 8);
  }

  function search(q) {
    const query = q.trim().toLowerCase();
    if (!query) return topPicks();
    return data
      .filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.desc.toLowerCase().includes(query) ||
          d.type.toLowerCase().includes(query)
      )
      .slice(0, 20);
  }

  function render(list) {
    current = list;
    activeIndex = list.length ? 0 : -1;
    if (!list.length) {
      results.innerHTML = '<div class="cmdk-empty">Tidak ada hasil. Coba kata kunci lain.</div>';
      return;
    }
    results.innerHTML = list
      .map(
        (item, i) => `
      <a href="${item.url}" class="cmdk-item${i === 0 ? ' active' : ''}" data-idx="${i}">
        <span class="cmdk-type">${typeLabel[item.type] || item.type}</span>
        <span class="cmdk-text"><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.desc)}</small></span>
      </a>`
      )
      .join('');
  }

  function escapeHtml(s) {
    const div = document.createElement('div');
    div.textContent = s;
    return div.innerHTML;
  }

  function setActive(idx) {
    const items = results.querySelectorAll('.cmdk-item');
    items.forEach((el) => el.classList.remove('active'));
    if (items[idx]) {
      items[idx].classList.add('active');
      items[idx].scrollIntoView({ block: 'nearest' });
      activeIndex = idx;
    }
  }

  if (openBtn) openBtn.addEventListener('click', open);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) close();
  });

  document.addEventListener('keydown', (e) => {
    const isK = e.key.toLowerCase() === 'k';
    if ((e.ctrlKey || e.metaKey) && isK) {
      e.preventDefault();
      overlay.classList.contains('open') ? close() : open();
      return;
    }
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive(Math.min(activeIndex + 1, current.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive(Math.max(activeIndex - 1, 0));
    }
    if (e.key === 'Enter' && activeIndex >= 0 && current[activeIndex]) {
      window.location.href = current[activeIndex].url;
    }
  });

  input.addEventListener('input', () => render(search(input.value)));
});
