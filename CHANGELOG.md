# Changelog

Semua perubahan penting ke andremedia.ai dicatat di sini. Setiap kali versi baru
sudah lolos `python scripts/smoke_test.py` dan sudah dites manual, buat entri baru
di atas lalu **lock** dengan git tag (lihat panduan di README bagian
"Alur update yang aman").

Format versi: `vMAJOR.MINOR.PATCH` — MAJOR untuk perubahan besar/struktural,
MINOR untuk fitur baru, PATCH untuk perbaikan kecil/typo.

## [Unreleased]

## [1.5.0] — 2026-07-19
### Ditambahkan
- Prompt Library diperluas dari 70 menjadi **100 prompt**: 30 prompt baru tersebar di
  seluruh 11 kategori (coding, data, database, network, devops, security, qa, writing,
  career, umum, ai) — 12 di antaranya seri **Lanjutan** (mis. zero trust architecture,
  data governance policy, prompt injection defense, cost optimization cloud, network
  segmentation plan) dan 18 seri dasar untuk kebutuhan sehari-hari yang lebih spesifik
  (git commit helper, SQL query explainer, deployment checklist, accessibility test,
  changelog writer, dst). Total badge "Lanjutan" naik dari 22 menjadi 34.
- **Roadmap companion** (`static/js/roadmap-companion.js`, baru) — tiga fitur yang saling
  terhubung di halaman `/roadmap` untuk memandu pengguna mengikuti instruksi roadmap
  sampai tuntas:
  - Tombol **"Lanjutkan ke modul berikutnya"** yang otomatis meloncat & menyorot modul
    pertama yang belum dicentang, plus indikator sisa modul ("X dari Y selesai").
  - **Streak harian** (🔥 hari beruntun) dihitung dari riwayat centang modul yang
    tersimpan terpisah di `localStorage` (`andre_roadmap_history_v1`).
  - **Catatan per node** — kotak catatan yang bisa dibuka/tutup per node roadmap,
    autosave (debounced 500ms) ke `localStorage` (`andre_roadmap_notes_v1`), lengkap
    dengan label "Tersimpan otomatis · HH:MM".
- **Prompt terkait di tiap node roadmap** — baris link di tiap node yang mengarah ke
  Prompt Library dengan kategori sudah terfilter (mis. node "Spesialisasi Peran" →
  Coding/Data/Database/Network/DevOps), lewat deep-link `/prompts?cat=...`.
- **Deep-link filter di `/prompts`** (`prompt-filter.js`) — membaca parameter URL
  `?cat=` dan `?q=` saat halaman dimuat untuk otomatis memilih filter pill/mengisi kotak
  pencarian, dipakai oleh link "Prompt terkait" di Roadmap.
- **Banner "Lanjutkan belajar" di beranda** (`main.js`) — kalau ada progress roadmap
  tersimpan, beranda menampilkan ringkasan persentase & tautan langsung ke `/roadmap`,
  tanpa perlu login/database.
- **Command palette disinkronkan penuh** — `search-data.js` sekarang mengindeks seluruh
  100 prompt (sebelumnya hanya ~32 yang terdaftar), jadi pencarian global (`Ctrl+K`)
  benar-benar mencakup semua isi `/prompts`.
- Statistik jumlah prompt di beranda & header `/prompts` disinkronkan ke 100+.
- Penanda smoke test baru untuk `/roadmap` (`roadmap-meta`, `roadmap-remaining`,
  `roadmap-resume`, `node-actions`, `node-notes-area`, `node-prompt-link`) dan `/`
  (`home-resume-banner`); batas minimum jumlah prompt dinaikkan dari 70 ke 100;
  `roadmap-companion.js` ditambahkan ke daftar static file wajib.

## [1.4.0] — 2026-07-19
### Ditambahkan
- Prompt Library diperluas dari 48 menjadi **70 prompt**: 22 prompt baru seri **Lanjutan**
  (2 per kategori di 11 kategori yang ada — coding, data, database, network, devops, security,
  qa, writing, career, umum, ai) untuk kebutuhan yang lebih kompleks, mis. Architecture Decision
  Record, audit IAM/firewall, rencana disaster recovery, definisi SLO/SLI, desain AI agent, dan
  checklist mitigasi halusinasi LLM.
- Badge visual **"Lanjutan"** (`class="lvl lvl-adv"`) di header tiap prompt baru, membedakannya
  dari prompt dasar sekaligus jadi penanda tingkat kompleksitas prompt tersebut.
- **Filter pill dengan jumlah live** di halaman `/prompts` — tiap pill kategori kini menampilkan
  `(n)` yang dihitung otomatis dari DOM (`renderPillCounts()` di `prompt-filter.js`), sehingga
  jumlahnya selalu akurat tanpa perlu diperbarui manual tiap kali konten berubah.
- Tombol **"🎲 Acak"** di halaman `/prompts` — meloncat ke satu prompt acak dari hasil
  filter/pencarian yang sedang tampil, dengan highlight visual sementara dan notifikasi toast
  berisi judul prompt yang terpilih.
- Statistik jumlah prompt di beranda (`index.html`) disinkronkan ke 70+ (sebelumnya nilainya
  basi, masih menunjukkan 16+).
- Penanda smoke test baru untuk `/prompts` (`id="prompts-random-btn"`, `lvl-adv`); batas minimum
  jumlah prompt dinaikkan dari 48 ke 70.

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
