// andremedia.ai — pendamping roadmap: "lanjutkan belajar", streak harian,
// sisa modul, dan catatan per node. Semua disimpan lokal di browser,
// terpisah dari andre_roadmap_progress_v1 (dipakai roadmap-progress.js)
// supaya tidak saling menimpa data satu sama lain.
document.addEventListener('DOMContentLoaded', () => {
  const HISTORY_KEY = 'andre_roadmap_history_v1';
  const NOTES_KEY = 'andre_roadmap_notes_v1';
  const PROGRESS_KEY = 'andre_roadmap_progress_v1';

  const checkboxes = document.querySelectorAll('.modules input[type="checkbox"]');
  const remainingEl = document.getElementById('roadmap-remaining');
  const streakEl = document.getElementById('roadmap-streak');
  const resumeBtn = document.getElementById('roadmap-resume');
  const nodes = document.querySelectorAll('.trace-node[data-node]');

  if (!checkboxes.length) return;

  // ---------------- Util localStorage ----------------
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }
  function writeJSON(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  function todayStr() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  }

  // ---------------- Riwayat penyelesaian modul (untuk streak) ----------------
  // Hanya mencatat TANGGAL (bukan jam) tiap kali sebuah modul baru dicentang,
  // supaya streak "hari belajar berturut-turut" bisa dihitung tanpa timezone drift.
  function logCompletionToday() {
    const history = readJSON(HISTORY_KEY, []);
    const today = todayStr();
    if (history[history.length - 1] !== today) {
      history.push(today);
      // batasi riwayat ke 90 entri terakhir supaya localStorage tidak membengkak
      writeJSON(HISTORY_KEY, history.slice(-90));
    }
  }

  function computeStreak() {
    const history = readJSON(HISTORY_KEY, []);
    if (!history.length) return 0;

    const dates = Array.from(new Set(history)).sort().reverse(); // unik, terbaru dulu
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;
    let cursor = new Date(today);

    // Streak boleh mulai dari hari ini ATAU kemarin (biar tidak "putus" hanya
    // karena belum sempat belajar hari ini), lalu harus berurutan mundur.
    const cursorStr = () => cursor.toISOString().slice(0, 10);
    if (dates[0] !== cursorStr()) {
      cursor.setDate(cursor.getDate() - 1);
      if (dates[0] !== cursorStr()) return 0;
    }

    for (const d of dates) {
      if (d === cursorStr()) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  }

  // ---------------- Sisa modul & tombol lanjutkan ----------------
  function firstUnfinished() {
    return Array.from(checkboxes).find((cb) => !cb.checked) || null;
  }

  function renderMeta() {
    const state = readJSON(PROGRESS_KEY, {});
    const total = checkboxes.length;
    const done = Array.from(checkboxes).filter((cb) => !!state[cb.dataset.mid]).length;
    const remaining = total - done;

    if (remainingEl) {
      remainingEl.textContent = remaining === 0
        ? `Semua ${total} modul selesai — kerja bagus 🎉`
        : `${done} dari ${total} modul selesai · ${remaining} lagi`;
    }

    const streak = computeStreak();
    if (streakEl) {
      if (streak > 0) {
        streakEl.hidden = false;
        streakEl.textContent = `🔥 ${streak} hari beruntun`;
      } else {
        streakEl.hidden = true;
      }
    }

    if (resumeBtn) {
      const next = firstUnfinished();
      resumeBtn.hidden = !next || done === 0;
    }
  }

  // ---------------- Tombol "Lanjutkan ke modul berikutnya" ----------------
  if (resumeBtn) {
    resumeBtn.addEventListener('click', () => {
      const next = firstUnfinished();
      if (!next) return;
      const node = next.closest('.trace-node');
      if (node) {
        node.scrollIntoView({ behavior: 'smooth', block: 'center' });
        node.classList.add('node-highlight');
        setTimeout(() => node.classList.remove('node-highlight'), 1900);
      }
      next.focus({ preventScroll: true });
    });
  }

  // Setiap kali sebuah checkbox berubah jadi tercentang, catat ke riwayat
  // streak & refresh sisa-modul/tombol lanjutkan. roadmap-progress.js sendiri
  // yang menangani penyimpanan status centang & progress bar.
  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      if (cb.checked) logCompletionToday();
      renderMeta();
    });
  });

  const resetBtn = document.getElementById('roadmap-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // reset progress juga mereset riwayat streak, supaya konsisten
      localStorage.removeItem(HISTORY_KEY);
      setTimeout(renderMeta, 0);
    });
  }

  // ---------------- Catatan per node ----------------
  const toggles = document.querySelectorAll('.node-notes-toggle');
  const notesState = readJSON(NOTES_KEY, {});

  document.querySelectorAll('.node-notes-area').forEach((area) => {
    const nid = area.dataset.midNotes;
    if (notesState[nid]) area.value = notesState[nid];

    let saveTimer = null;
    area.addEventListener('input', () => {
      clearTimeout(saveTimer);
      saveTimer = setTimeout(() => {
        const state = readJSON(NOTES_KEY, {});
        state[nid] = area.value;
        writeJSON(NOTES_KEY, state);
        const savedLabel = document.querySelector(`[data-notes-saved="${nid}"]`);
        if (savedLabel) {
          const now = new Date();
          const hh = String(now.getHours()).padStart(2, '0');
          const mm = String(now.getMinutes()).padStart(2, '0');
          savedLabel.textContent = area.value.trim()
            ? `Tersimpan otomatis · ${hh}:${mm}`
            : '';
        }
      }, 500);
    });
  });

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const nid = btn.dataset.nodeToggle;
      const panel = document.querySelector(`[data-node-notes="${nid}"]`);
      if (!panel) return;
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.classList.toggle('active', willOpen);
      if (willOpen) {
        const area = panel.querySelector('.node-notes-area');
        if (area) area.focus();
      }
    });
  });

  renderMeta();
});
