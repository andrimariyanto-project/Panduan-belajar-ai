// andremedia.ai — export favorit (tools/prompts/courses) ke file .txt, .json, atau .pdf
(function () {
  const typeLabel = { tool: 'Tools', prompt: 'Prompts', course: 'Courses', item: 'Lainnya' };

  function timestampSlug() {
    const d = new Date();
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
  }

  function downloadBlob(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  function groupByType(items) {
    const groups = {};
    items.forEach((item) => {
      const t = item.type || 'item';
      if (!groups[t]) groups[t] = [];
      groups[t].push(item);
    });
    return groups;
  }

  function buildTextReport(items) {
    const groups = groupByType(items);
    let out = `andremedia.ai — Daftar Tersimpan\nDiekspor: ${new Date().toLocaleString('id-ID')}\nTotal item: ${items.length}\n`;
    Object.keys(groups).forEach((type) => {
      out += `\n${'='.repeat(50)}\n${(typeLabel[type] || type).toUpperCase()} (${groups[type].length})\n${'='.repeat(50)}\n`;
      groups[type].forEach((item, i) => {
        out += `\n${i + 1}. ${item.title}\n`;
        if (item.desc) out += `   ${item.desc}\n`;
        if (item.content) out += `\n${item.content}\n`;
        out += `   Link: ${location.origin}${item.url}\n`;
      });
    });
    return out;
  }

  function exportAsText(items) {
    if (!items.length) return;
    downloadBlob(buildTextReport(items), `andremedia-tersimpan-${timestampSlug()}.txt`, 'text/plain;charset=utf-8');
  }

  function exportAsJson(items) {
    if (!items.length) return;
    const payload = {
      exported_at: new Date().toISOString(),
      source: 'andremedia.ai',
      total: items.length,
      items,
    };
    downloadBlob(JSON.stringify(payload, null, 2), `andremedia-tersimpan-${timestampSlug()}.json`, 'application/json');
  }

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

  function exportAsPdf(items) {
    if (!items.length) return Promise.resolve();
    return loadJsPDF()
      .then((JsPDF) => {
        const doc = new JsPDF({ unit: 'pt', format: 'a4' });
        const pageWidth = doc.internal.pageSize.getWidth();
        const marginX = 48;
        const maxWidth = pageWidth - marginX * 2;
        let y = 56;

        function ensureSpace(lineHeight) {
          if (y + lineHeight > doc.internal.pageSize.getHeight() - 48) {
            doc.addPage();
            y = 56;
          }
        }

        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('andremedia.ai — Daftar Tersimpan', marginX, y);
        y += 20;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(110);
        doc.text(`Diekspor: ${new Date().toLocaleString('id-ID')}  •  Total item: ${items.length}`, marginX, y);
        doc.setTextColor(20);
        y += 24;

        const groups = groupByType(items);
        Object.keys(groups).forEach((type) => {
          ensureSpace(28);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(13);
          doc.text(`${typeLabel[type] || type} (${groups[type].length})`, marginX, y);
          y += 18;

          groups[type].forEach((item, i) => {
            ensureSpace(16);
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10.5);
            const titleLines = doc.splitTextToSize(`${i + 1}. ${item.title}`, maxWidth);
            titleLines.forEach((line) => {
              ensureSpace(14);
              doc.text(line, marginX, y);
              y += 14;
            });

            if (item.desc) {
              doc.setFont('helvetica', 'italic');
              doc.setFontSize(9.5);
              doc.setTextColor(90);
              const descLines = doc.splitTextToSize(item.desc, maxWidth);
              descLines.forEach((line) => {
                ensureSpace(12);
                doc.text(line, marginX, y);
                y += 12;
              });
              doc.setTextColor(20);
            }

            if (item.content) {
              doc.setFont('courier', 'normal');
              doc.setFontSize(8.5);
              const contentLines = doc.splitTextToSize(item.content, maxWidth);
              contentLines.forEach((line) => {
                ensureSpace(11);
                doc.text(line, marginX, y);
                y += 11;
              });
            }

            doc.setFont('helvetica', 'normal');
            doc.setFontSize(8.5);
            doc.setTextColor(140);
            ensureSpace(14);
            doc.text(`${location.origin}${item.url}`, marginX, y);
            doc.setTextColor(20);
            y += 18;
          });
          y += 6;
        });

        doc.save(`andremedia-tersimpan-${timestampSlug()}.pdf`);
      })
      .catch((err) => {
        if (window.andreToast) window.andreToast(err.message || 'Gagal membuat PDF', 'error');
        else alert(err.message || 'Gagal membuat PDF');
      });
  }

  window.AndreExport = { exportAsText, exportAsJson, exportAsPdf };
})();
