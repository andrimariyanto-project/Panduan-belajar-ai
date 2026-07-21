// andremedia.ai — sistem badge pencapaian (achievement)
// Semua dihitung dari localStorage yang SUDAH ADA (tidak menambah key baru
// yang mengganggu fitur lain), supaya badge selalu sinkron dengan progres nyata.
(function () {
  function readJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch (e) {
      return fallback;
    }
  }

  // Node roadmap -> daftar prefix data-mid miliknya, dipakai untuk cek "node selesai semua"
  const NODE_MIDS = {
    '00': ['00-0', '00-1', '00-2', '00-3', '00-4'],
    '01': ['01-0', '01-1', '01-2', '01-3', '01-4'],
    '02': ['02-0', '02-1', '02-2', '02-3', '02-4'],
    '03': ['03-0', '03-1', '03-2', '03-3'],
    '04': ['04-0', '04-1', '04-2', '04-3'],
  };

  function nodeComplete(progress, node) {
    const mids = NODE_MIDS[node] || [];
    return mids.length > 0 && mids.every((m) => !!progress[m]);
  }

  function computeStreak() {
    const history = readJSON('andre_roadmap_history_v1', []);
    if (!history.length) return 0;
    const dates = Array.from(new Set(history)).sort().reverse();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let streak = 0;
    let cursor = new Date(today);
    const cursorStr = () => cursor.toISOString().slice(0, 10);
    if (dates[0] !== cursorStr()) {
      cursor.setDate(cursor.getDate() - 1);
      if (dates[0] !== cursorStr()) return 0;
    }
    for (const d of dates) {
      if (d === cursorStr()) {
        streak += 1;
        cursor.setDate(cursor.getDate() - 1);
      } else break;
    }
    return streak;
  }

  function getStats() {
    const progress = readJSON('andre_roadmap_progress_v1', {});
    const notes = readJSON('andre_roadmap_notes_v1', {});
    const quizHistory = readJSON('andre_skillcheck_history_v1', []);
    const mastered = readJSON('andre_glossary_mastered_v1', []);
    const favorites = readJSON('andre_favorites_v1', []);
    const nodeQuizResults = readJSON('andre_node_quiz_v1', {});
    const understandingChecks = readJSON('andre_understanding_checks_v1', []);
    const doneCount = Object.values(progress).filter(Boolean).length;
    const notesCount = Object.values(notes).filter((v) => (v || '').trim().length > 0).length;
    const nodeQuizPassedCount = Object.values(nodeQuizResults).filter((r) => r && r.passed).length;
    const nodeQuizTotalNodes = 5; // 00-04

    return {
      progress,
      doneCount,
      streak: computeStreak(),
      quizHistory,
      masteredCount: mastered.length,
      favoritesCount: favorites.length,
      notesCount,
      nodeQuizResults,
      nodeQuizPassedCount,
      nodeQuizTotalNodes,
      understandingChecksCount: understandingChecks.length,
    };
  }

  // Definisi 12 badge. `test(stats)` mengembalikan true/false apakah terbuka.
  const BADGES = [
    { id: 'mulai', icon: '🚀', name: 'Mulai Melangkah', desc: '1 modul roadmap dicentang', test: (s) => s.doneCount >= 1 },
    { id: 'fondasi', icon: '🧩', name: 'Fondasi Kuat', desc: 'node_00 tuntas', test: (s) => nodeComplete(s.progress, '00') },
    { id: 'spesialis', icon: '🎯', name: 'Spesialis', desc: 'node_01 tuntas', test: (s) => nodeComplete(s.progress, '01') },
    { id: 'pembangun', icon: '🛠️', name: 'Pembangun Sistem', desc: 'node_02 tuntas', test: (s) => nodeComplete(s.progress, '02') },
    { id: 'produksi', icon: '💼', name: 'Siap Produksi', desc: 'node_03 tuntas', test: (s) => nodeComplete(s.progress, '03') },
    { id: 'pelajar', icon: '📚', name: 'Pelajar Sejati', desc: 'node_04 tuntas', test: (s) => nodeComplete(s.progress, '04') },
    { id: 'streak7', icon: '🔥', name: 'Konsisten 7 Hari', desc: 'streak ≥ 7 hari', test: (s) => s.streak >= 7 },
    { id: 'streak30', icon: '🔥🔥', name: 'Konsisten 30 Hari', desc: 'streak ≥ 30 hari', test: (s) => s.streak >= 30 },
    { id: 'kamus', icon: '🧠', name: 'Kamus Master', desc: '≥ 15 istilah dikuasai', test: (s) => s.masteredCount >= 15 },
    { id: 'skillcheck', icon: '✅', name: 'Skill Checked', desc: 'sudah ambil Skill Check', test: (s) => s.quizHistory.length >= 1 },
    { id: 'kolektor', icon: '🌟', name: 'Kolektor', desc: '≥ 10 item favorit', test: (s) => s.favoritesCount >= 10 },
    { id: 'pencatat', icon: '📝', name: 'Pencatat Rajin', desc: 'catatan di ≥ 2 node', test: (s) => s.notesCount >= 2 },
    { id: 'terverifikasi', icon: '🧪', name: 'Pemahaman Terverifikasi', desc: 'lolos Cek Pemahaman di semua node', test: (s) => s.nodeQuizPassedCount >= s.nodeQuizTotalNodes },
    { id: 'feynman', icon: '💡', name: 'Feynman Explainer', desc: '≥ 5 konsep dijelaskan sendiri', test: (s) => s.understandingChecksCount >= 5 },
  ];

  function getBadgeStatus() {
    const stats = getStats();
    return BADGES.map((b) => ({ ...b, unlocked: !!b.test(stats) }));
  }

  window.AndreBadges = { getBadgeStatus, getStats, BADGES };
})();
