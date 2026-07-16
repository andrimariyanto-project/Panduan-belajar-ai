# Changelog

Semua perubahan penting ke andremedia.ai dicatat di sini. Setiap kali versi baru
sudah lolos `python scripts/smoke_test.py` dan sudah dites manual, buat entri baru
di atas lalu **lock** dengan git tag (lihat panduan di README bagian
"Alur update yang aman").

Format versi: `vMAJOR.MINOR.PATCH` — MAJOR untuk perubahan besar/struktural,
MINOR untuk fitur baru, PATCH untuk perbaikan kecil/typo.

## [Unreleased]

## [1.3.0] — 2026-07-16
### Ditambahkan
- Prompt Library diperluas dari 36 menjadi 48 prompt: kategori baru **AI/LLM Engineering**
  (4 prompt: evaluasi output LLM, desain pipeline RAG, optimasi biaya LLM, pemilihan model),
  plus 2 prompt tambahan masing-masing di kategori QA, Docs, Karier, dan Security.
- Filter pill "AI/LLM" di halaman `/prompts`.
- Fitur **export favorit** di halaman `/tersimpan`: unduh daftar tersimpan sebagai PDF, .txt,
  atau .json (`static/js/export.js`). Konten prompt lengkap ikut tersimpan di data favorit
  (`favorites.js` kini menyimpan `content` dari elemen `<pre>` terdekat) sehingga hasil export
  prompt tidak hanya berisi judul, tapi juga isi promptnya.
- Penanda smoke test baru untuk elemen export (`fav-export-bar`, `export-pdf`, `export-txt`,
  `export-json`) dan `export.js`; batas minimum jumlah prompt dinaikkan ke 48.

## [1.2.0] — 2026-07-12
### Ditambahkan
- Prompt Library diperluas dari 6 menjadi 36 prompt, dikelompokkan ke 10 kategori
  (coding, data, database, network, devops, security, qa, docs, karier, umum).
- Filter kategori + pencarian teks live di halaman Prompts (`prompt-filter.js`).
- Script `scripts/smoke_test.py` untuk memastikan fitur lama tidak hilang saat update.
- GitHub Actions CI (`.github/workflows/smoke-test.yml`) menjalankan smoke test otomatis.

## [1.1.0] — 2026-07-12
### Ditambahkan
- Command palette / pencarian global (`Ctrl+K`).
- Sistem favorit/bookmark untuk tools, prompts, dan courses + halaman `/tersimpan`.
- Prompt Builder interaktif (`/prompt-builder`).
- Roadmap progress tracker (checklist + progress bar, disimpan di localStorage).
- Kamus AI mode flashcard.
- Tools live search (tambahan dari filter kategori yang sudah ada).
- Skill Check: progress bar, tombol kembali, riwayat 5 hasil terakhir.
- Navigasi mobile (hamburger menu), scroll progress bar, notifikasi toast.

## [1.0.0] — rilis awal
### Ditambahkan
- Struktur dasar: Beranda, Roadmap, Courses, Tools, Prompts, Workflows,
  Use Cases, Projects, Monetize, Kamus AI, Skill Check.
- Desain "circuit trace" navy/amber/teal.
