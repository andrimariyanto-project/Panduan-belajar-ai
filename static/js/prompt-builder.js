// andremedia.ai — interactive prompt builder with live preview
document.addEventListener('DOMContentLoaded', () => {
  const fields = {
    role: document.getElementById('pb-role'),
    task: document.getElementById('pb-task'),
    context: document.getElementById('pb-context'),
    format: document.getElementById('pb-format'),
    tone: document.getElementById('pb-tone'),
    constraints: document.getElementById('pb-constraints'),
  };
  const output = document.getElementById('pb-output');
  const copyBtn = document.getElementById('pb-copy');
  const presetBar = document.getElementById('pb-presets');

  if (!output) return;

  const presets = {
    programmer: {
      role: 'senior code reviewer',
      task: 'Tinjau kode berikut untuk bug potensial, masalah performa, dan pelanggaran best practice.',
      context: '[tempel kode di sini, sebutkan bahasa/framework yang dipakai]',
      format: 'poin-poin',
      tone: 'netral dan faktual',
      constraints: 'Untuk tiap temuan, jelaskan risikonya dan beri contoh perbaikan.',
    },
    data: {
      role: 'data analyst',
      task: 'Identifikasi pola/tren utama, anomali yang perlu diperiksa, dan pertanyaan lanjutan yang layak dieksplorasi.',
      context: '[deskripsikan dataset dan tempel ringkasan statistiknya]',
      format: 'poin-poin',
      tone: 'detail dan edukatif',
      constraints: 'Tulis dengan bahasa yang bisa dipahami tim non-teknis.',
    },
    database: {
      role: 'database architect',
      task: 'Tinjau schema untuk masalah normalisasi, indeks kurang optimal, dan potensi bottleneck.',
      context: '[tempel schema, sebutkan jenis database dan perkiraan skala traffic]',
      format: 'langkah bernomor',
      tone: 'netral dan faktual',
      constraints: 'Sertakan contoh DDL untuk tiap rekomendasi.',
    },
    network: {
      role: 'network engineer',
      task: 'Analisis potongan log perangkat dan kelompokkan berdasarkan tingkat urgensi.',
      context: '[tempel log perangkat di sini]',
      format: 'tabel',
      tone: 'singkat dan langsung ke poin',
      constraints: 'Jelaskan kemungkinan penyebab untuk entri kritis dan sarankan langkah investigasi awal.',
    },
    devops: {
      role: 'incident response assistant',
      task: 'Susun ringkasan post-mortem dari timeline kejadian: ringkasan, root cause, dampak, dan tindakan perbaikan.',
      context: '[tempel catatan kronologis kejadian di sini]',
      format: 'poin-poin',
      tone: 'netral dan faktual',
      constraints: 'Gunakan nada faktual, tanpa menyalahkan individu.',
    },
    clear: { role: '', task: '', context: '', format: 'poin-poin', tone: 'netral dan faktual', constraints: '' },
  };

  function applyPreset(name) {
    const p = presets[name];
    if (!p) return;
    fields.role.value = p.role;
    fields.task.value = p.task;
    fields.context.value = p.context;
    fields.format.value = p.format;
    fields.tone.value = p.tone;
    fields.constraints.value = p.constraints;
    build();
  }

  function build() {
    const role = fields.role.value.trim() || '[peran AI yang diinginkan]';
    const task = fields.task.value.trim() || '[apa yang perlu dilakukan]';
    const context = fields.context.value.trim() || '[informasi latar belakang yang relevan]';
    const format = fields.format.value;
    const tone = fields.tone.value;
    const constraints = fields.constraints.value.trim();

    let text = `Kamu adalah ${role}.\n\nTugas: ${task}\n\nKonteks:\n${context}\n\nFormat output: ${format}\nGaya bahasa: ${tone}`;
    if (constraints) {
      text += `\nBatasan tambahan: ${constraints}`;
    }
    output.textContent = text;
  }

  Object.values(fields).forEach((el) => {
    el.addEventListener('input', build);
    el.addEventListener('change', build);
  });

  if (presetBar) {
    presetBar.querySelectorAll('[data-preset]').forEach((btn) => {
      btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(output.textContent);
        const original = copyBtn.textContent;
        copyBtn.textContent = 'Tersalin';
        copyBtn.classList.add('copied');
        if (window.andreToast) window.andreToast('Prompt disalin ke clipboard', 'success');
        setTimeout(() => {
          copyBtn.textContent = original;
          copyBtn.classList.remove('copied');
        }, 1800);
      } catch (e) {
        copyBtn.textContent = 'Gagal salin';
      }
    });
  }

  build();
});
