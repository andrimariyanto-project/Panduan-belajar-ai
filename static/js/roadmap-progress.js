// andremedia.ai — roadmap checklist progress, persisted in localStorage
document.addEventListener('DOMContentLoaded', () => {
  const KEY = 'andre_roadmap_progress_v1';
  const checkboxes = document.querySelectorAll('.modules input[type="checkbox"]');
  const bar = document.getElementById('roadmap-bar');
  const pctLabel = document.getElementById('roadmap-pct');
  const resetBtn = document.getElementById('roadmap-reset');
  const nodes = document.querySelectorAll('.trace-node[data-node]');

  if (!checkboxes.length) return;

  function getDone() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function saveDone(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }

  function render() {
    const state = getDone();
    let doneCount = 0;
    checkboxes.forEach((cb) => {
      const checked = !!state[cb.dataset.mid];
      cb.checked = checked;
      if (checked) doneCount += 1;
    });

    const pct = Math.round((doneCount / checkboxes.length) * 100);
    if (bar) bar.style.width = pct + '%';
    if (pctLabel) pctLabel.textContent = pct + '%';

    nodes.forEach((node) => {
      const nodeChecks = node.querySelectorAll('.modules input[type="checkbox"]');
      const allDone = nodeChecks.length > 0 && Array.from(nodeChecks).every((c) => c.checked);
      node.classList.toggle('done', allDone);
    });
  }

  checkboxes.forEach((cb) => {
    cb.addEventListener('change', () => {
      const state = getDone();
      state[cb.dataset.mid] = cb.checked;
      saveDone(state);
      render();
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      localStorage.removeItem(KEY);
      render();
      if (window.andreToast) window.andreToast('Progress roadmap direset', 'info');
    });
  }

  render();
});
