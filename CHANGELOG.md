# Changelog

Semua perubahan penting ke andremedia.ai dicatat di sini. Setiap kali versi baru
sudah lolos `python scripts/smoke_test.py` dan sudah dites manual, buat entri baru
di atas lalu **lock** dengan git tag (lihat panduan di README bagian
"Alur update yang aman").

Format versi: `vMAJOR.MINOR.PATCH` — MAJOR untuk perubahan besar/struktural,
MINOR untuk fitur baru, PATCH untuk perbaikan kecil/typo.

## [Unreleased]

## [2.1.0] — 2026-07-21
### Ditambahkan — "Validasi Pemahaman, Bukan Cuma Checklist"
Tiga fitur pedagogis baru yang saling terhubung, menutup celah terbesar dari v2.0.0:
belajar pasif tanpa validasi nyata.

- **Micro-quiz "Cek Pemahaman" per node roadmap** — tiap node roadmap (node_00–node_04)
  sekarang punya tombol **🧪 Cek Pemahaman** dengan 3 soal pilihan ganda (15 soal total),
  dirender inline tanpa reload halaman (`static/js/node-quiz.js`, data soal di
  `templates/roadmap.html`). Hasil (skor & status lolos, ambang 66%) tersimpan di
  `localStorage` (`andre_node_quiz_v1`) dan tombolnya menampilkan status terakhir
  (mis. "🧪 Cek Pemahaman ✓ 3/3"). Ini menerapkan *active recall* — soal singkat jauh
  lebih efektif memverifikasi pemahaman dibanding sekadar mencentang checklist manual.
- **Halaman baru `/cek-pemahaman`** — penerapan teknik Feynman: pengguna menulis
  penjelasan konsep AI dengan bahasanya sendiri, menilai keyakinannya sendiri (1-5),
  lalu menyimpannya sebagai "konsep terverifikasi" (`static/js/understanding-check.js`,
  tersimpan di `andre_understanding_checks_v1`). Riwayat konsep yang sudah dijelaskan
  ditampilkan di halaman yang sama, bisa dihapus satu per satu. Terhubung ke Prompt
  Library kategori 🎓 Pembelajaran untuk pengguna yang masih ragu sebelum mencatat.
- **Sertifikat / Learning Passport (PDF)** di halaman `/dashboard` — tombol "Unduh
  Sertifikat PDF" yang merangkum progress roadmap, streak, hasil Cek Pemahaman node,
  jumlah konsep Feynman terverifikasi, hasil Skill Check terakhir, istilah Kamus AI
  dikuasai, dan badge terbuka jadi satu dokumen PDF landscape rapi (`static/js/certificate.js`,
  memakai jsPDF dengan pola loading sama seperti export favorit yang sudah ada). Judul
  otomatis berubah jadi "SERTIFIKAT PENYELESAIAN ROADMAP" begitu progress mencapai 100%.
- **2 badge pencapaian baru** (total naik dari 12 ke 14): **🧪 Pemahaman Terverifikasi**
  (lolos Cek Pemahaman di seluruh 5 node) dan **💡 Feynman Explainer** (≥5 konsep
  dijelaskan sendiri). `static/js/badges.js` diperluas untuk membaca hasil node quiz dan
  riwayat Cek Pemahaman tanpa mengubah struktur badge lama.
- Dashboard menampilkan 2 statistik baru: **Cek Pemahaman Node** (X/5 node lolos) dan
  **Konsep Terverifikasi** (jumlah catatan Feynman tersimpan); tombol reset data lokal
  diperluas untuk turut membersihkan `andre_node_quiz_v1`, `andre_understanding_checks_v1`,
  dan `andre_glossary_leitner_v1`.
- Navigasi & footer menambahkan link **Cek Pemahaman**; `search-data.js` mengindeks
  halaman baru ini ke command palette.
- Penanda smoke test baru untuk `/roadmap` (soal Cek Pemahaman), `/dashboard` (elemen
  sertifikat & statistik baru), dan route baru `/cek-pemahaman`; tiga file JS baru
  (`node-quiz.js`, `understanding-check.js`, `certificate.js`) ditambahkan ke daftar
  static file wajib. Total pengecekan smoke test naik dari 196 ke 219.

## [2.0.0] — 2026-07-21
### Ditambahkan — "Update Final: Jalan Pintas Belajar AI Mendalam"
- **Prompt Library diperluas dari 100 menjadi 200 prompt**: 100 prompt baru di kategori
  🎓 **Pembelajaran** (`data-cat="belajar"`, prefix file `tutor_ai //`), dibagi ke **10
  sub-topik x 10 prompt**: Fondasi AI, Teknik Prompting Inti, Prompting Lanjutan
  (chain-of-thought, ReAct, self-consistency, meta-prompting, context engineering, dst),
  RAG, AI Agent & MCP, Evaluasi & Anti-Halusinasi, Etika & Keamanan AI, Pembelajaran per
  Peran (programmer/data/database/network/devops/QA/security/writer/PM/non-teknis),
  Karier & Continuous Learning AI, dan Project Praktik berjenjang. Setiap prompt
  dirancang sebagai "prompt tutor" yang mengubah AI jadi pembimbing pribadi (Socratic
  teaching: analogi → penjelasan teknis → contoh → soal latihan → feedback), bukan
  sekadar prompt tugas biasa.
- Filter pill baru **🎓 Pembelajaran** di halaman `/prompts`, terhitung otomatis lewat
  mekanisme jumlah live yang sudah ada. Command palette (`search-data.js`) disinkronkan
  penuh ke 200 prompt.
- **Halaman baru `/referensi`** — kurasi sumber belajar AI eksternal yang resmi & aktif
  diperbarui (Anthropic Prompt Engineering Docs, Anthropic Academy, OpenAI Cookbook,
  Model Context Protocol Docs, Google Cloud Generative AI Learning Path, DeepLearning.AI
  Short Courses, Hugging Face LLM/Agents Course, Microsoft Generative AI for Beginners,
  LangChain Academy, Kaggle Learn, roadmap.sh), dikelompokkan per kategori, plus blok
  **"Jalur Kilat 30-60-90 Hari"** yang memetakan sumber eksternal ke node roadmap
  andremedia.ai supaya belajar AI dari nol tetap terarah, bukan melompat-lompat.
- **Halaman baru `/dashboard`** — ringkasan progres belajar (persentase roadmap, streak,
  hasil Skill Check terakhir, jumlah istilah Kamus AI dikuasai, jumlah favorit, jumlah
  catatan roadmap aktif, rekomendasi langkah berikutnya) dan **12 badge pencapaian**
  (`static/js/badges.js`) yang terbuka otomatis dari aktivitas nyata (bukan gimmick):
  Mulai Melangkah, Fondasi Kuat, Spesialis, Pembangun Sistem, Siap Produksi, Pelajar
  Sejati, Konsisten 7/30 Hari, Kamus Master, Skill Checked, Kolektor, Pencatat Rajin.
  Tersedia tombol reset semua data lokal dari satu tempat.
- **Node roadmap baru — `node_04 // pendalaman & referensi`** (ongoing): 4 checklist
  yang menghubungkan roadmap ke halaman `/referensi` dan ke prompt kategori 🎓
  Pembelajaran, lengkap dengan catatan per node seperti node lain. Total modul roadmap
  naik dari 19 menjadi 23 (`TOTAL_MODULES` di `main.js` & `dashboard.js` disesuaikan).
- **Spaced repetition (Leitner box) di Kamus AI** — `flashcards.js` kini melacak "box"
  tiap kartu (0-3) dengan interval 1/3/7 hari, ditampilkan sebagai indikator "perlu
  diulang hari ini" di flashcard, tanpa mengubah tombol/alur yang sudah ada.
- **10 istilah baru di Kamus AI**: Chain-of-Thought, ReAct, Self-Consistency, Prompt
  Injection, Reranking, Chunking, Hybrid Search, LLM-as-Judge, Reflection (Agentic
  Pattern), Groundedness — total naik dari 24 menjadi 34 istilah.
- Navigasi (`base.html`) & footer diperbarui dengan link **Referensi** dan **Dashboard**;
  beranda (`index.html`) memperbarui statistik ke 200 prompt, menambah baris roadmap
  node_04, dan menambah kartu "Sumber resmi terkurasi" yang mengarah ke `/referensi`.
- Penanda smoke test baru untuk `/referensi` dan `/dashboard`; `badges.js` dan
  `dashboard.js` ditambahkan ke daftar static file wajib; batas minimum jumlah prompt
  dinaikkan dari 100 ke 200 dan `data-mid` roadmap dari 18 ke 22.

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
