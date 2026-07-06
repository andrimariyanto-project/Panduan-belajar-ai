document.addEventListener('DOMContentLoaded', () => {
  const data = JSON.parse(document.getElementById('quiz-data').textContent);
  const root = document.getElementById('quiz-root');
  let current = 0;
  let score = 0;

  function renderQuestion() {
    const item = data[current];
    root.innerHTML = `
      <div class="quiz-progress">Pertanyaan ${current + 1} / ${data.length}</div>
      <div class="quiz-card">
        <h3>${item.q}</h3>
        <div class="quiz-options">
          ${item.options.map((opt, i) => `<button class="quiz-opt" data-v="${opt.v}">${opt.t}</button>`).join('')}
        </div>
      </div>
    `;
    root.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => {
        score += parseInt(btn.dataset.v, 10);
        current += 1;
        if (current < data.length) {
          renderQuestion();
        } else {
          renderResult();
        }
      });
    });
  }

  function renderResult() {
    const max = data.length * 3;
    const pct = Math.round((score / max) * 100);
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

    root.innerHTML = `
      <div class="quiz-card quiz-result">
        <div class="score">${pct}%</div>
        <h3>${tier}</h3>
        <p>${desc}</p>
        <a href="${node}" class="btn btn-primary" style="margin-top:8px">Lanjut ke rekomendasi</a>
      </div>
    `;
  }

  renderQuestion();
});
