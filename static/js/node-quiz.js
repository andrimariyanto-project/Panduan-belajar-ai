// andremedia.ai — micro-quiz "Cek Pemahaman" per node roadmap (3 soal pilihan ganda).
// Tujuannya active recall: memverifikasi pemahaman, bukan cuma checklist manual.
document.addEventListener('DOMContentLoaded', () => {
  const dataEl = document.getElementById('node-quiz-data');
  const toggles = document.querySelectorAll('.node-quiz-toggle');
  if (!dataEl || !toggles.length) return;

  let QUIZ_DATA = {};
  try {
    QUIZ_DATA = JSON.parse(dataEl.textContent);
  } catch (e) {
    return;
  }

  const RESULT_KEY = 'andre_node_quiz_v1'; // { [nodeId]: { score, total, date, passed } }

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

  function badgeLabel(nodeId) {
    const results = readJSON(RESULT_KEY, {});
    const r = results[nodeId];
    if (!r) return '🧪 Cek Pemahaman';
    return r.passed ? `🧪 Cek Pemahaman ✓ ${r.score}/${r.total}` : `🧪 Cek Pemahaman (${r.score}/${r.total})`;
  }

  function refreshToggleLabel(nodeId) {
    const btn = document.querySelector(`[data-node-quiz-toggle="${nodeId}"]`);
    if (btn) btn.textContent = badgeLabel(nodeId);
  }

  function renderQuiz(nodeId, panel) {
    const questions = QUIZ_DATA[nodeId];
    if (!questions || !questions.length) {
      panel.innerHTML = '<p class="node-quiz-empty">Belum ada soal untuk node ini.</p>';
      return;
    }

    let current = 0;
    const answers = new Array(questions.length).fill(null);

    function renderQuestion() {
      const item = questions[current];
      panel.innerHTML = `
        <div class="node-quiz-progress">Cek Pemahaman — soal ${current + 1} / ${questions.length}</div>
        <div class="node-quiz-q">${item.q}</div>
        <div class="node-quiz-opts">
          ${item.options
            .map(
              (opt, i) =>
                `<button type="button" class="node-quiz-opt" data-i="${i}">${opt.t}</button>`
            )
            .join('')}
        </div>
      `;
      panel.querySelectorAll('.node-quiz-opt').forEach((btn) => {
        btn.addEventListener('click', () => {
          const i = parseInt(btn.dataset.i, 10);
          const isCorrect = !!item.options[i].correct;
          answers[current] = isCorrect ? 1 : 0;

          panel.querySelectorAll('.node-quiz-opt').forEach((b, bi) => {
            b.disabled = true;
            if (item.options[bi].correct) b.classList.add('quiz-correct');
            else if (bi === i) b.classList.add('quiz-wrong');
          });

          setTimeout(() => {
            current += 1;
            if (current < questions.length) {
              renderQuestion();
            } else {
              renderResult();
            }
          }, 700);
        });
      });
    }

    function renderResult() {
      const score = answers.reduce((sum, v) => sum + (v || 0), 0);
      const total = questions.length;
      const passed = score / total >= 0.66;
      const results = readJSON(RESULT_KEY, {});
      results[nodeId] = { score, total, date: new Date().toLocaleDateString('id-ID'), passed };
      writeJSON(RESULT_KEY, results);
      refreshToggleLabel(nodeId);

      panel.innerHTML = `
        <div class="node-quiz-result ${passed ? 'passed' : ''}">
          <div class="node-quiz-score">${score} / ${total} benar</div>
          <p>${
            passed
              ? 'Pemahamanmu di node ini sudah cukup solid.'
              : 'Belum semua benar — tidak apa, coba tinjau ulang modul di node ini lalu ulangi.'
          }</p>
          <button type="button" class="node-notes-toggle" data-node-quiz-retry="${nodeId}">↻ Ulangi</button>
        </div>
      `;
      const retryBtn = panel.querySelector('[data-node-quiz-retry]');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => renderQuiz(nodeId, panel));
      }
      if (window.andreToast) {
        window.andreToast(passed ? `Cek Pemahaman lolos: ${score}/${total}` : `Hasil: ${score}/${total}, coba lagi nanti`, passed ? 'success' : 'info');
      }
    }

    renderQuestion();
  }

  toggles.forEach((btn) => {
    const nodeId = btn.dataset.nodeQuizToggle;
    refreshToggleLabel(nodeId);

    btn.addEventListener('click', () => {
      const panel = document.querySelector(`[data-node-quiz-panel="${nodeId}"]`);
      if (!panel) return;
      const willOpen = panel.hidden;
      panel.hidden = !willOpen;
      btn.classList.toggle('active', willOpen);
      if (willOpen && !panel.dataset.rendered) {
        panel.dataset.rendered = '1';
        renderQuiz(nodeId, panel);
      }
      if (willOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});
