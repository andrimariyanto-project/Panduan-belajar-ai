document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('quiz-data').textContent);
  const root = document.getElementById('quiz-root');
  const banner = document.getElementById('quiz-history-banner');
  const HISTORY_KEY = 'andre_skillcheck_history_v1';

  let current = 0;
  let answers = new Array(data.length).fill(null);

  function getHistory() {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  function saveResult(pct, tier) {
    const history = getHistory();
    history.unshift({ pct, tier, date: new Date().toLocaleDateString('id-ID') });
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 5)));
  }

  function renderBanner() {
    const history = getHistory();
    if (!banner) return;
    if (!history.length) {
      banner.innerHTML = '';
      return;
    }
    const last = history[0];
    banner.innerHTML = `
      <div class="quiz-history-banner">
        <span>Hasil terakhir kamu (${last.date}): <b>${last.pct}%</b> — ${last.tier}</span>
        <button class="quiz-back" id="quiz-retake" style="padding:8px 14px">Ambil lagi</button>
      </div>`;
    const retakeBtn = document.getElementById('quiz-retake');
    if (retakeBtn) {
      retakeBtn.addEventListener('click', () => {
        current = 0;
        answers = new Array(data.length).fill(null);
        renderQuestion();
      });
    }
  }

  function score() {
    return answers.reduce((sum, v) => sum + (v || 0), 0);
  }

  function renderQuestion() {
    const item = data[current];
    const pct = Math.round(((current) / data.length) * 100);
    root.innerHTML = `
      <div class="quiz-topbar">
        <div class="quiz-progress">Pertanyaan ${current + 1} / ${data.length}</div>
        <button class="quiz-back" id="quiz-back" ${current === 0 ? 'disabled' : ''}>← Kembali</button>
      </div>
      <div class="quiz-bar"><span style="width:${pct}%"></span></div>
      <div class="quiz-card">
        <h3>${item.q}</h3>
        <div class="quiz-options">
          ${item.options
            .map(
              (opt, i) =>
                `<button class="quiz-opt${answers[current] === opt.v ? ' correct' : ''}" data-v="${opt.v}">${opt.t}</button>`
            )
            .join('')}
        </div>
      </div>
    `;
    root.querySelectorAll('.quiz-opt').forEach((btn) => {
      btn.addEventListener('click', () => {
        answers[current] = parseInt(btn.dataset.v, 10);
        current += 1;
        if (current < data.length) {
          renderQuestion();
        } else {
          renderResult();
        }
      });
    });
    const backBtn = document.getElementById('quiz-back');
    if (backBtn) {
      backBtn.addEventListener('click', () => {
        if (current > 0) {
          current -= 1;
          renderQuestion();
        }
      });
    }
  }

  function renderResult() {
    const raw = score();
    const max = data.length * 3;
    const pct = Math.round((raw / max) * 100);
    let tier, desc, node;

    if (pct < 25) {
      tier = 'Node 00 — Fondasi';
      desc = 'Mulai dari konsep dasar AI dulu: apa itu LLM, token, dan cara menyusun prompt yang baik.';
      node = '/roadmap';
    } else if (pct < 55) {
      tier = 'Node 01 — Spesialisasi Peran';
      desc = 'Fondasi kamu sudah cukup. Saatnya masuk ke jalur AI sesuai peran kerja kamu.';
      node = '/courses';
    } else if (pct < 80) {
      tier = 'Node 02 — Membangun dengan AI';
      desc = 'Kamu siap naik ke prompt engineering lanjutan, RAG, dan automasi berbasis AI agent.';
      node = '/workflows';
    } else {
      tier = 'Node 03 — Produksi & Monetisasi';
      desc = 'Skill kamu sudah solid. Fokus berikutnya: portofolio, jasa, atau produk berbasis AI.';
      node = '/monetize';
    }

    saveResult(pct, tier);
    if (banner) banner.innerHTML = '';

    root.innerHTML = `
      <div class="quiz-card quiz-result">
        <div class="score">${pct}%</div>
        <h3>${tier}</h3>
        <p>${desc}</p>
        <div class="actions">
          <a href="${node}" class="btn btn-primary">Lanjut ke rekomendasi</a>
          <button class="btn btn-outline" id="quiz-restart">Ulangi kuis</button>
        </div>
      </div>
    `;
    const restartBtn = document.getElementById('quiz-restart');
    if (restartBtn) {
      restartBtn.addEventListener('click', () => {
        current = 0;
        answers = new Array(data.length).fill(null);
        renderQuestion();
      });
    }
  }

  renderBanner();
  renderQuestion();
});
