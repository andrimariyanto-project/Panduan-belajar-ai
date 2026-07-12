# Changelog

Semua perubahan penting ke andremedia.ai dicatat di sini. Setiap kali versi baru
sudah lolos `python scripts/smoke_test.py` dan sudah dites manual, buat entri baru
di atas lalu **lock** dengan git tag (lihat panduan di README bagian
"Alur update yang aman").

Format versi: `vMAJOR.MINOR.PATCH` — MAJOR untuk perubahan besar/struktural,
MINOR untuk fitur baru, PATCH untuk perbaikan kecil/typo.

## [Unreleased]

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
