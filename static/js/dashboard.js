// andremedia.ai — render halaman /dashboard dari data localStorage
document.addEventListener('DOMContentLoaded', () => {
  if (!window.AndreBadges) return;
  const TOTAL_MODULES = 23; // total data-mid di /roadmap (5+5+5+4+4) — update jika roadmap berubah

  const { getStats, getBadgeStatus } = window.AndreBadges;
  const stats = getStats();

  const pctEl = document.getElementById('dash-roadmap-pct');
  const pctSubEl = document.getElementById('dash-roadmap-sub');
  const streakEl = document.getElementById('dash-streak');
  const streakSubEl = document.getElementById('dash-streak-sub');
  const quizEl = document.getElementById('dash-quiz');
  const quizSubEl = document.getElementById('dash-quiz-sub');
  const cardsEl = document.getElementById('dash-cards');
  const favEl = document.getElementById('dash-fav');
  const badgesCountEl = document.getElementById('dash-badges');
  const notesEl = document.getElementById('dash-notes');
  const nextEl = document.getElementById('dash-next');
  const nextSubEl = document.getElementById('dash-next-sub');
  const badgeGrid = document.getElementById('badge-grid');
  const emptyWrap = document.getElementById('dash-empty-wrap');
  const nodeQuizEl = document.getElementById('dash-node-quiz');
  const nodeQuizSubEl = document.getElementById('dash-node-quiz-sub');
  const understandingEl = document.getElementById('dash-understanding');

  const pct = Math.round((stats.doneCount / TOTAL_MODULES) * 100);
  if (pctEl) pctEl.textContent = `${pct}%`;
  if (pctSubEl) pctSubEl.textContent = `${stats.doneCount} / ${TOTAL_MODULES} modul`;

  if (streakEl) streakEl.textContent = `${stats.streak}🔥`;
  if (streakSubEl) streakSubEl.textContent = stats.streak > 0 ? 'hari beruntun — jangan putus!' : 'belum ada streak aktif';

  if (stats.quizHistory.length) {
    const last = stats.quizHistory[0];
    if (quizEl) quizEl.textContent = `${last.pct}%`;
    if (quizSubEl) quizSubEl.textContent = `${last.tier} · ${last.date}`;
  }

  if (cardsEl) cardsEl.textContent = stats.masteredCount;
  if (favEl) favEl.textContent = stats.favoritesCount;
  if (notesEl) notesEl.textContent = stats.notesCount;

  if (nodeQuizEl) nodeQuizEl.textContent = `${stats.nodeQuizPassedCount} / ${stats.nodeQuizTotalNodes}`;
  if (nodeQuizSubEl) {
    nodeQuizSubEl.textContent =
      stats.nodeQuizPassedCount >= stats.nodeQuizTotalNodes
        ? 'semua node terverifikasi 🎉'
        : 'coba di halaman Roadmap';
  }
  if (understandingEl) understandingEl.textContent = stats.understandingChecksCount;

  const badges = getBadgeStatus();
  const unlockedCount = badges.filter((b) => b.unlocked).length;
  if (badgesCountEl) badgesCountEl.textContent = `${unlockedCount} / ${badges.length}`;

  if (badgeGrid) {
    badgeGrid.innerHTML = badges
      .map(
        (b) => `
      <div class="badge-card${b.unlocked ? ' unlocked' : ''}" title="${b.unlocked ? 'Terbuka' : 'Terkunci'}">
        <span class="icon">${b.icon}</span>
        <div class="name">${b.name}</div>
        <div class="desc">${b.desc}</div>
      </div>`
      )
      .join('');
  }

  // ---- Rekomendasi langkah berikutnya ----
  let nextLabel = 'Mulai Roadmap';
  let nextSub = 'belum ada progres tersimpan';
  if (stats.doneCount === 0) {
    nextLabel = 'Mulai node_00';
    nextSub = 'buka Roadmap dan centang modul pertama';
  } else if (pct < 100) {
    nextLabel = 'Lanjutkan Roadmap';
    nextSub = `${TOTAL_MODULES - stats.doneCount} modul tersisa`;
  } else if (stats.quizHistory.length === 0) {
    nextLabel = 'Coba Skill Check';
    nextSub = 'validasi levelmu sekarang';
  } else {
    nextLabel = 'Bangun Portofolio';
    nextSub = 'lihat halaman Monetize & Projects';
  }
  if (nextEl) nextEl.textContent = nextLabel;
  if (nextSubEl) nextSubEl.textContent = nextSub;

  const hasAnyActivity =
    stats.doneCount > 0 || stats.quizHistory.length > 0 || stats.masteredCount > 0 || stats.favoritesCount > 0;
  if (emptyWrap) emptyWrap.hidden = hasAnyActivity;

  // ---- Unduh Sertifikat / Learning Passport (PDF) ----
  const certNameEl = document.getElementById('cert-name');
  const certBtn = document.getElementById('cert-download');
  const certHint = document.getElementById('cert-hint');
  if (certBtn && window.AndreCertificate) {
    certBtn.addEventListener('click', () => {
      certBtn.disabled = true;
      const original = certBtn.textContent;
      certBtn.textContent = 'Menyusun PDF...';
      window.AndreCertificate.generateCertificate(certNameEl ? certNameEl.value.trim() : '', stats, badges, TOTAL_MODULES)
        .then(() => {
          if (window.andreToast) window.andreToast('Sertifikat berhasil diunduh', 'success');
        })
        .catch((err) => {
          if (certHint) certHint.textContent = err.message || 'Gagal membuat PDF, coba lagi.';
          if (window.andreToast) window.andreToast(err.message || 'Gagal membuat PDF', 'error');
        })
        .finally(() => {
          certBtn.disabled = false;
          certBtn.textContent = original;
        });
    });
  }

  const resetBtn = document.getElementById('dash-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      const keys = [
        'andre_roadmap_progress_v1',
        'andre_roadmap_history_v1',
        'andre_roadmap_notes_v1',
        'andre_skillcheck_history_v1',
        'andre_glossary_mastered_v1',
        'andre_glossary_leitner_v1',
        'andre_favorites_v1',
        'andre_node_quiz_v1',
        'andre_understanding_checks_v1',
      ];
      if (!window.confirm('Yakin reset SEMUA data lokal (roadmap, streak, catatan, skill check, kamus, favorit, cek pemahaman)? Aksi ini tidak bisa dibatalkan.')) return;
      keys.forEach((k) => localStorage.removeItem(k));
      if (window.andreToast) window.andreToast('Semua data lokal direset', 'info');
      setTimeout(() => window.location.reload(), 600);
    });
  }
});
