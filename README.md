# andremedia.ai

Platform belajar AI terapan untuk praktisi teknis — engineer, programmer, data analyst,
database expert, dan network integrator. Dibangun dengan **Python (Flask)**, multi-page,
tanpa backend/database (murni frontend server-rendered). **v2.1.0** menambahkan lapisan
*validasi pemahaman* di atas fondasi v2.0.0 (200 prompt, Referensi, Dashboard): micro-quiz
per node roadmap, halaman Cek Pemahaman bergaya teknik Feynman, dan sertifikat PDF —
supaya belajar di sini bukan cuma checklist pasif, tapi benar-benar teruji.

## Struktur halaman

- `/` — Beranda
- `/roadmap` — Roadmap belajar 5 tahap (node_00 – node_04), dengan **checklist progress
  interaktif**, tombol **"Lanjutkan belajar"**, **streak harian**, **catatan per node**,
  link cepat ke **prompt terkait**, dan **micro-quiz "Cek Pemahaman"** (3 soal/node)
- `/courses` — Daftar course per node/peran (bisa difavoritkan)
- `/tools` — Direktori tools AI (filter kategori + **pencarian teks live** + favorit)
- `/prompts` — Prompt library siap salin, **200 prompt** (bisa difavoritkan)
- `/prompt-builder` — susun prompt custom secara interaktif dengan preview langsung
- `/workflows` — Workflow AI langkah-per-langkah
- `/use-cases` — Use case per bidang teknis
- `/projects` — Ide project latihan
- `/monetize` — Cara memonetisasi skill AI
- `/glossary` — Kamus istilah AI (34 istilah), dengan pencarian **dan mode flashcard
  dengan spaced repetition (Leitner box)**
- `/skill-check` — Kuis interaktif penentu level, dengan progress bar, tombol kembali, dan riwayat hasil
- `/cek-pemahaman` — **Baru:** teknik Feynman — jelaskan konsep AI dengan bahasamu sendiri,
  nilai keyakinanmu sendiri, tersimpan sebagai riwayat konsep terverifikasi
- `/tersimpan` — daftar tools/prompt/course yang sudah kamu favoritkan, dengan **export ke PDF/.txt/.json**
- `/referensi` — kurasi sumber belajar AI eksternal resmi (Anthropic, OpenAI, Hugging
  Face, Google, MCP, dst) + **"Jalur Kilat 30-60-90 Hari"**
- `/dashboard` — ringkasan progres belajar lintas halaman + **14 badge pencapaian** +
  **unduh Sertifikat/Learning Passport PDF**

## Fitur interaktif

- **Command palette / pencarian global** — tekan `Ctrl+K` (atau klik ikon cari di navbar) untuk mencari
  ke semua halaman, tools, prompt, istilah kamus, dan course sekaligus, lengkap dengan navigasi keyboard.
- **Sistem favorit/bookmark** — tandai tool, prompt, atau course dengan ikon bintang; tersimpan di
  `localStorage` browser, terlihat di halaman `/tersimpan` dan lencana penghitung di navbar.
- **Roadmap progress tracker** — centang modul yang sudah dipelajari, progress bar otomatis
  terisi, node berubah status "selesai", dan bisa direset kapan saja.
- **Roadmap companion — "Lanjutkan belajar"** — tombol yang meloncat & menyorot modul
  berikutnya yang belum dicentang, indikator sisa modul ("X dari Y selesai"), dan **streak
  harian** (🔥 hari beruntun belajar) yang dihitung dari riwayat centang tersimpan di browser.
- **Catatan per node roadmap** — tiap node roadmap punya kotak catatan pribadi yang bisa
  dibuka/tutup, tersimpan otomatis (debounced) ke `localStorage`, terpisah untuk tiap node.
- **Prompt terkait di tiap node roadmap** — link cepat dari tiap node roadmap ke Prompt
  Library yang sudah **terfilter otomatis** ke kategori yang relevan (mis. node "Spesialisasi
  Peran" → tombol Coding/Data/Database/Network/DevOps), lewat deep-link `/prompts?cat=...`.
- **Banner "Lanjutkan belajar" di beranda** — kalau kamu sudah punya progress roadmap
  tersimpan, beranda otomatis menampilkan ringkasan persentase & tombol lanjut ke roadmap.
- **Prompt Builder** — form interaktif dengan preset per peran (programmer/data/database/network/devops)
  yang menyusun prompt custom secara live, siap disalin.
- **Kamus AI mode flashcard** — beralih dari mode daftar ke mode kartu flip, tandai istilah yang
  sudah dihafal, dan acak urutan kartu.
- **Tools live search** — cari tool berdasarkan nama/deskripsi selain filter kategori, dengan pesan
  kosong jika tidak ada hasil.
- **Skill Check yang lebih kaya** — progress bar per pertanyaan, tombol kembali ke soal sebelumnya,
  serta riwayat 5 hasil terakhir yang tersimpan otomatis.
- **Navigasi mobile & scroll progress bar** — menu hamburger responsif dan indikator progres scroll
  tipis di bagian atas halaman.
- **Notifikasi toast** — konfirmasi visual singkat untuk aksi seperti menambah favorit atau menyalin prompt.
- **Prompt Library 200 prompt** — mencakup 12 kategori: 11 kategori peran/teknis (Coding, Data,
  Database, Network, DevOps, Security, QA, Docs, Karier, Umum, AI/LLM Engineering) plus kategori
  baru **🎓 Pembelajaran** (100 "prompt tutor" — bukan prompt tugas, tapi prompt yang mengubah AI
  jadi pembimbing pribadi lewat pola analogi → penjelasan → contoh → latihan → feedback, dibagi 10
  sub-topik: Fondasi AI, Teknik Prompting, Prompting Lanjutan, RAG, AI Agent & MCP, Evaluasi &
  Anti-Halusinasi, Etika & Keamanan, Pembelajaran per Peran, Karier AI, Project Praktik). 34 prompt
  di kategori non-pembelajaran ditandai badge **Lanjutan** untuk kebutuhan kompleks (ADR, audit
  IAM, cutover jaringan, SLO/SLI, zero trust, data governance, dst).
- **Filter pill dengan jumlah live** — tiap kategori di halaman `/prompts` menampilkan jumlah prompt-nya
  secara otomatis (dihitung dari DOM), jadi tidak akan pernah basi walau kontennya terus bertambah.
- **Deep-link filter Prompts** (`/prompts?cat=coding&q=review`) — halaman Prompts otomatis
  memilih filter kategori/kata kunci dari parameter URL, dipakai oleh link "Prompt terkait" di
  Roadmap supaya lompatannya langsung terfilter, bukan cuma membuka halaman kosong.
- **Tombol "🎲 Acak"** — loncat ke satu prompt acak dari hasil filter/pencarian yang sedang tampil,
  lengkap dengan highlight visual dan notifikasi toast; membantu eksplorasi 200 prompt yang tersedia.
- **Command palette terindeks penuh** — seluruh 200 prompt (bukan cuma sebagian) kini muncul di
  hasil pencarian global (`Ctrl+K`), sinkron dengan isi halaman `/prompts`.
- **Export favorit** — di halaman `/tersimpan`, unduh semua tools/prompt/course yang disimpan sebagai
  file **PDF**, **.txt**, atau **.json** (isi prompt lengkap ikut disertakan, bukan cuma judul).
- **Halaman Referensi** (`/referensi`) — kurasi manual sumber belajar resmi (dokumentasi vendor,
  course gratis, roadmap komunitas) yang dikelompokkan per kategori, plus **Jalur Kilat 30-60-90
  Hari** yang memetakan sumber eksternal itu ke node roadmap di platform ini.
- **Dashboard progres & badge** (`/dashboard`) — agregasi otomatis dari seluruh data localStorage
  yang sudah ada (progress roadmap, streak, hasil Skill Check, kartu Kamus AI dikuasai, favorit,
  catatan roadmap) ke satu ringkasan, plus **14 badge pencapaian** yang terbuka berdasarkan
  aktivitas nyata (`static/js/badges.js`) dan tombol reset semua data lokal dari satu tempat.
- **Spaced repetition di Kamus AI** — mode flashcard kini memakai sistem Leitner box sederhana
  (interval 1/3/7 hari) untuk menjadwalkan istilah mana yang perlu diulang, ditampilkan sebagai
  indikator "perlu diulang hari ini" tanpa mengubah alur kartu yang sudah ada.
- **Roadmap 5 node** — node baru `node_04 // pendalaman & referensi` menutup roadmap dengan
  menghubungkan ke `/referensi` dan prompt kategori 🎓 Pembelajaran, supaya belajar tidak berhenti
  begitu 4 node sebelumnya selesai.
- **Micro-quiz "Cek Pemahaman" per node roadmap** — 3 soal pilihan ganda per node (15 soal
  total), dirender inline lewat tombol **🧪 Cek Pemahaman**, tanpa reload halaman. Hasil
  (skor & status lolos) tersimpan dan ditampilkan langsung di tombolnya sendiri — validasi
  pemahaman lewat *active recall*, bukan cuma checklist manual.
- **Halaman Cek Pemahaman** (`/cek-pemahaman`) — penerapan teknik Feynman: tulis penjelasan
  konsep AI dengan bahasamu sendiri, nilai keyakinanmu (1-5), simpan sebagai riwayat konsep
  terverifikasi yang bisa dilihat/dihapus kapan saja.
- **Sertifikat / Learning Passport (PDF)** di `/dashboard` — satu tombol merangkum seluruh
  progres (roadmap, streak, Cek Pemahaman node, konsep Feynman, Skill Check, Kamus AI,
  badge) jadi PDF landscape yang bisa diunduh kapan saja, judulnya otomatis berubah jadi
  "Sertifikat Penyelesaian Roadmap" begitu progress mencapai 100%.

## Alur update yang aman (biar fitur lama tidak pernah hilang)

Setiap kali menambah/mengubah fitur, ikuti urutan ini:

**1. Kerjakan di branch terpisah (bukan langsung di `main`)**
```bash
git checkout -b fitur/nama-fitur-baru
# ...edit kode...
```

**2. Jalankan smoke test sebelum commit**
```bash
python scripts/smoke_test.py
```
Script ini otomatis membuka semua halaman dan mengecek penanda-penanda fitur
(search box, filter, tombol favorit, checklist roadmap, dst). Kalau ada yang
hilang karena editan baru, script akan **gagal dan sebutkan persis** halaman +
fitur mana yang bermasalah — jangan commit dulu sebelum ini hijau ✅.

**3. Commit & push branch, buka Pull Request ke `main`**
```bash
git add -A
git commit -m "Deskripsi singkat perubahan"
git push origin fitur/nama-fitur-baru
```
GitHub Actions (`.github/workflows/smoke-test.yml`) otomatis menjalankan
`smoke_test.py` lagi di server GitHub. Aktifkan **branch protection**
(Settings → Branches → Add rule → `main` → centang "Require status checks
to pass before merging" → pilih job *Smoke Test*) supaya PR **tidak bisa
di-merge** kalau smoke test gagal.

**4. Merge ke `main`, lalu catat di CHANGELOG.md**

Tambahkan entri baru di `CHANGELOG.md` (lihat format yang sudah ada) yang
menjelaskan apa yang berubah di versi ini.

**5. "Lock" versi dengan git tag**
```bash
git checkout main
git pull
git tag -a v1.2.0 -m "Ringkasan singkat rilis ini"
git push origin v1.2.0
```
Tag ini jadi titik aman yang bisa selalu kamu kembali ke sana kalau suatu
saat versi terbaru ternyata bermasalah:
```bash
# lihat semua versi yang pernah di-lock
git tag -l

# rollback penuh ke versi tertentu (hati-hati, ini menimpa main)
git reset --hard v1.1.0
git push --force origin main
```

**6. Deploy ke PythonAnywhere seperti biasa**
```bash
cd ~/Panduan-belajar-ai
git pull origin main
```
lalu klik **Reload** di tab **Web**.



```bash
# 1. Buat virtual environment (opsional tapi disarankan)
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate

# 2. Install dependency
pip install -r requirements.txt

# 3. Jalankan
python app.py
```

Buka `http://127.0.0.1:5000` di browser.

## Struktur folder

```
andremedia/
├── app.py                  # Routing Flask (tanpa database)
├── requirements.txt
├── CHANGELOG.md            # Riwayat versi — isi tiap kali "lock" versi baru
├── scripts/
│   └── smoke_test.py       # Cek otomatis semua fitur lama masih ada
├── .github/workflows/
│   └── smoke-test.yml      # CI: jalankan smoke test otomatis tiap push/PR
├── templates/
│   ├── base.html           # Layout dasar: nav, footer, command palette, toast host
│   ├── index.html
│   ├── roadmap.html        # + checklist progress
│   ├── courses.html        # + tombol favorit
│   ├── tools.html          # + live search + favorit
│   ├── prompts.html        # + tombol favorit
│   ├── prompt_builder.html # Baru: prompt builder interaktif
│   ├── workflows.html
│   ├── usecases.html
│   ├── projects.html
│   ├── monetize.html
│   ├── glossary.html       # + mode flashcard + spaced repetition
│   ├── skillcheck.html     # + riwayat hasil
│   ├── tersimpan.html      # halaman favorit
│   ├── referensi.html      # Baru v2.0: kurasi sumber belajar eksternal + jalur kilat
│   ├── dashboard.html      # ringkasan progres + badge pencapaian + sertifikat PDF
│   └── cek_pemahaman.html  # Baru v2.1: teknik Feynman self-explanation
└── static/
    ├── css/style.css       # Design system (warna, tipografi, komponen)
    └── js/
        ├── main.js
        ├── filter.js           # Filter kategori + pencarian di halaman Tools
        ├── copy.js             # Tombol salin di halaman Prompts
        ├── glossary.js         # Pencarian mode-list di halaman Kamus AI
        ├── flashcards.js       # Mode flashcard + spaced repetition (Leitner box)
        ├── quiz.js             # Logika kuis Skill Check + riwayat
        ├── roadmap-progress.js # Checklist & progress bar Roadmap
        ├── roadmap-companion.js # resume, streak, sisa modul, catatan & prompt terkait per node
        ├── prompt-builder.js   # Logika Prompt Builder
        ├── favorites.js        # Sistem favorit/bookmark (shared)
        ├── tersimpan.js        # Render halaman Tersimpan
        ├── search-data.js      # Index data untuk command palette
        ├── command-palette.js  # Command palette (Ctrl+K)
        ├── mobile-nav.js       # Toggle menu mobile
        ├── scroll-progress.js  # Progress bar scroll
        ├── toast.js            # Notifikasi toast (shared)
        ├── badges.js           # definisi & kalkulasi 14 badge pencapaian
        ├── dashboard.js        # render halaman /dashboard
        ├── node-quiz.js        # Baru v2.1: micro-quiz "Cek Pemahaman" per node roadmap
        ├── understanding-check.js # Baru v2.1: teknik Feynman di /cek-pemahaman
        └── certificate.js      # Baru v2.1: generate PDF Sertifikat/Learning Passport
```

## Konsep desain

- **Palet warna**: navy gelap (`#0B1220`) dengan aksen amber (`#F2A93B`) dan teal (`#4FD1C5`).
- **Tipografi**: Space Grotesk (judul), Inter (body), IBM Plex Mono (label teknis/data).
- **Elemen khas**: "circuit trace" — garis putus-putus bertitik yang menghubungkan tahapan
  roadmap dan workflow, terinspirasi dari diagram jaringan/sirkuit sesuai audiens teknis.

## Konten

Semua konten (roadmap, course, tools, prompt, workflow, use case, glossary, kuis, referensi)
adalah **draf awal** yang bisa langsung diedit di masing-masing file `templates/*.html` — tidak
ada database, jadi mengubah konten cukup dengan mengedit HTML/teks di template. Tautan di halaman
`/referensi` diverifikasi manual saat ditulis (Juli 2026); cek berkala tetap disarankan karena URL
eksternal bisa berubah seiring waktu.

## Status v2.0.0

Versi ini adalah **update final** yang menyatukan seluruh fitur sebelumnya (roadmap, favorit,
command palette, prompt builder, skill check, glossary) dengan tiga lapisan baru: (1) 100 prompt
pembelajaran khusus, (2) referensi eksternal terkurasi dengan jalur belajar 30-60-90 hari, dan
(3) dashboard progres + badge yang menjahit semua data localStorage yang sudah ada jadi satu
ringkasan. Tidak ada fitur lama yang dihapus — `python scripts/smoke_test.py` memverifikasi ini
otomatis (196 pengecekan, lihat bagian "Alur update yang aman" di atas).

## Langkah lanjutan yang bisa ditambahkan

- Autentikasi & sinkronisasi favorit/progress lintas perangkat (saat ini semua state — favorit,
  progress roadmap, riwayat skill check, kartu dikuasai, badge — tersimpan lokal di `localStorage`
  browser, sehingga dashboard hanya menampilkan data dari perangkat yang sama)
- CMS sederhana agar non-developer bisa mengubah konten tanpa edit kode
- Integrasi API AI sungguhan di halaman Skill Check & Prompt Builder untuk hasil yang lebih personal
- Analytics untuk melihat halaman/mata pelajaran yang paling banyak diakses
- Endpoint `/api/search-index` di backend agar index command palette tidak perlu di-hardcode di JS
- Job berkala (mis. GitHub Actions terjadwal) untuk mengecek tautan di `/referensi` masih hidup
