document.addEventListener('DOMContentLoaded', () => {
  const pills = document.querySelectorAll('#prompt-filters .filter-pill');
  const blocks = document.querySelectorAll('#prompt-grid .prompt-block');
  const searchInput = document.getElementById('prompts-search');
  const emptyState = document.getElementById('prompts-empty');
  const randomBtn = document.getElementById('prompts-random-btn');

  if (!blocks.length) return;

  let activeFilter = 'all';

  // ---- Deep-link dari halaman lain (mis. Roadmap) lewat ?cat=xxx&q=yyy ----
  // Contoh: /prompts?cat=coding membuka Prompts sudah terfilter ke kategori "coding",
  // supaya lompatan dari roadmap/course langsung ke prompt yang relevan, tanpa
  // pengguna perlu klik filter manual.
  function applyUrlParams() {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    const q = params.get('q');

    if (cat) {
      const match = Array.from(pills).find((p) => p.dataset.filter === cat);
      if (match) {
        pills.forEach((p) => p.classList.remove('active'));
        match.classList.add('active');
        activeFilter = cat;
      }
    }
    if (q && searchInput) {
      searchInput.value = q;
    }
  }

  // ---- Live category counts di tiap filter pill (dihitung dari DOM,
  // jadi otomatis akurat walau jumlah/kategori prompt berubah nanti) ----
  function renderPillCounts() {
    pills.forEach((pill) => {
      const filter = pill.dataset.filter;
      const count = filter === 'all'
        ? blocks.length
        : Array.from(blocks).filter((b) => b.dataset.cat === filter).length;

      let countEl = pill.querySelector('.pill-count');
      if (!countEl) {
        countEl = document.createElement('span');
        countEl.className = 'pill-count';
        pill.appendChild(countEl);
      }
      countEl.textContent = `(${count})`;
    });
  }

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

  // ---- Tombol "Acak": loncat ke prompt acak dari hasil yang sedang tampil ----
  if (randomBtn) {
    randomBtn.addEventListener('click', () => {
      const visible = Array.from(blocks).filter((b) => b.style.display !== 'none');
      if (!visible.length) {
        if (window.andreToast) window.andreToast('Tidak ada prompt untuk diacak dari filter ini', 'info');
        return;
      }
      blocks.forEach((b) => b.classList.remove('prompt-highlight'));
      const pick = visible[Math.floor(Math.random() * visible.length)];
      // trigger reflow supaya animasi bisa diputar ulang meski elemen sama terpilih lagi
      void pick.offsetWidth;
      pick.classList.add('prompt-highlight');
      pick.scrollIntoView({ behavior: 'smooth', block: 'center' });

      const titleEl = pick.querySelector('.ph > span');
      const title = titleEl ? titleEl.childNodes[0].textContent.trim() : 'Prompt';
      if (window.andreToast) window.andreToast(`Prompt acak: ${title}`, 'success');

      setTimeout(() => pick.classList.remove('prompt-highlight'), 1900);
    });
  }

  applyUrlParams();
  renderPillCounts();
  applyFilters();

  if (window.location.search.includes('cat=') || window.location.search.includes('q=')) {
    const grid = document.getElementById('prompt-grid');
    if (grid) setTimeout(() => grid.scrollIntoView({ behavior: 'smooth', block: 'start' }), 150);
  }
});
