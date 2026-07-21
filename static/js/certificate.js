// andremedia.ai — generate PDF "Learning Passport" / sertifikat progres dari data localStorage.
// Memakai jsPDF (CDN) dengan pola loading yang sama seperti export.js, supaya tidak
// menambah dependency baru dan tetap konsisten dengan pendekatan "tanpa backend".
(function () {
  function loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(window.jspdf.jsPDF);
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script.onload = () => {
        if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
        else reject(new Error('jsPDF gagal dimuat'));
      };
      script.onerror = () => reject(new Error('Gagal memuat pustaka PDF. Periksa koneksi internet.'));
      document.head.appendChild(script);
    });
  }

  function timestampSlug() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  function generateCertificate(name, stats, badges, totalModules) {
    return loadJsPDF().then((JsPDF) => {
      const doc = new JsPDF({ unit: 'pt', format: 'a4', orientation: 'landscape' });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 56;
      let y = 0;

      const pct = Math.round((stats.doneCount / totalModules) * 100);
      const isComplete = pct >= 100;

      // ---- Border dekoratif sederhana (dua garis, tanpa gambar/gambar eksternal) ----
      doc.setDrawColor(180, 150, 90);
      doc.setLineWidth(1.4);
      doc.rect(24, 24, pageWidth - 48, pageHeight - 48);
      doc.setLineWidth(0.6);
      doc.rect(32, 32, pageWidth - 64, pageHeight - 64);

      // ---- Header ----
      y = 84;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text('andremedia.ai — platform belajar AI terapan', pageWidth / 2, y, { align: 'center' });

      y += 34;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(24);
      doc.setTextColor(30);
      const title = isComplete ? 'SERTIFIKAT PENYELESAIAN ROADMAP' : 'LEARNING PASSPORT — RINGKASAN PROGRES';
      doc.text(title, pageWidth / 2, y, { align: 'center' });

      y += 40;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);
      doc.setTextColor(90);
      doc.text('Diberikan kepada / dicatat atas nama:', pageWidth / 2, y, { align: 'center' });

      y += 30;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(20);
      doc.setTextColor(20);
      doc.text(name || 'Pembelajar andremedia.ai', pageWidth / 2, y, { align: 'center' });

      y += 26;
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      doc.setTextColor(120);
      doc.text(`Dicetak pada ${new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}`, pageWidth / 2, y, { align: 'center' });

      // ---- Ringkasan statistik (dua kolom) ----
      y += 44;
      const colLeftX = marginX + 20;
      const colRightX = pageWidth / 2 + 20;
      const rowH = 20;
      let yl = y;
      let yr = y;

      function statLine(x, yy, label, value) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.setTextColor(110);
        doc.text(label, x, yy);
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(25);
        doc.text(String(value), x, yy + 14);
      }

      statLine(colLeftX, yl, 'Progress Roadmap', `${pct}% (${stats.doneCount}/${totalModules} modul)`);
      yl += rowH * 2;
      statLine(colLeftX, yl, 'Streak belajar', `${stats.streak} hari beruntun`);
      yl += rowH * 2;
      statLine(colLeftX, yl, 'Cek Pemahaman node (lolos)', `${stats.nodeQuizPassedCount} / ${stats.nodeQuizTotalNodes} node`);
      yl += rowH * 2;
      statLine(colLeftX, yl, 'Konsep terverifikasi (Feynman)', `${stats.understandingChecksCount} konsep`);

      const lastQuiz = stats.quizHistory && stats.quizHistory[0];
      statLine(colRightX, yr, 'Skill Check terakhir', lastQuiz ? `${lastQuiz.pct}% — ${lastQuiz.tier}` : 'Belum pernah diambil');
      yr += rowH * 2;
      statLine(colRightX, yr, 'Istilah Kamus AI dikuasai', `${stats.masteredCount} istilah`);
      yr += rowH * 2;
      statLine(colRightX, yr, 'Item favorit tersimpan', `${stats.favoritesCount} item`);
      yr += rowH * 2;
      const unlockedBadges = badges.filter((b) => b.unlocked);
      statLine(colRightX, yr, 'Badge pencapaian terbuka', `${unlockedBadges.length} / ${badges.length} badge`);

      // ---- Daftar badge terbuka ----
      y = Math.max(yl, yr) + 30;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(25);
      doc.text('Badge yang sudah terbuka:', marginX, y);
      y += 16;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(90);
      const badgeText = unlockedBadges.length
        ? unlockedBadges.map((b) => `[x] ${b.name}`).join('   ')
        : 'Belum ada badge terbuka — mulai dari Roadmap untuk membuka badge pertama.';
      const badgeLines = doc.splitTextToSize(badgeText, pageWidth - marginX * 2);
      badgeLines.slice(0, 4).forEach((line) => {
        doc.text(line, marginX, y);
        y += 13;
      });

      // ---- Footer ----
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8.5);
      doc.setTextColor(140);
      doc.text(
        'Dokumen ini dihasilkan otomatis dari progres belajar yang tersimpan lokal di browser pengguna (localStorage), bukan verifikasi pihak ketiga.',
        pageWidth / 2,
        pageHeight - 46,
        { align: 'center', maxWidth: pageWidth - marginX * 2 }
      );

      const prefix = isComplete ? 'sertifikat-roadmap' : 'learning-passport';
      doc.save(`andremedia-${prefix}-${timestampSlug()}.pdf`);
    });
  }

  window.AndreCertificate = { generateCertificate };
})();
