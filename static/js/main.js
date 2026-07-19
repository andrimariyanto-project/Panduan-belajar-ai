// andremedia.ai — global small enhancements
document.addEventListener('DOMContentLoaded', () => {
  // ---- Banner "Lanjutkan belajar" di beranda ----
  // Dibaca dari localStorage yang sama dengan halaman /roadmap
  // (andre_roadmap_progress_v1), supaya beranda bisa menyapa pengguna
  // yang sudah punya progress tanpa perlu database/login.
  const banner = document.getElementById('home-resume-banner');
  const textEl = document.getElementById('home-resume-text');
  if (!banner || !textEl) return; // elemen ini cuma ada di index.html

  const TOTAL_MODULES = 19; // total data-mid di /roadmap — update jika modul roadmap berubah jumlahnya
  let state;
  try {
    state = JSON.parse(localStorage.getItem('andre_roadmap_progress_v1')) || {};
  } catch (e) {
    state = {};
  }

  const done = Object.values(state).filter(Boolean).length;
  if (done > 0 && done < TOTAL_MODULES) {
    const pct = Math.round((done / TOTAL_MODULES) * 100);
    textEl.textContent = `Progress roadmap kamu: ${pct}% (${done}/${TOTAL_MODULES} modul). Lanjutkan dari tempat kamu berhenti.`;
    banner.hidden = false;
  } else if (done >= TOTAL_MODULES) {
    textEl.textContent = `Semua modul roadmap sudah kamu selesaikan 🎉 — waktunya masuk ke node produksi & monetisasi.`;
    banner.hidden = false;
  }
});
