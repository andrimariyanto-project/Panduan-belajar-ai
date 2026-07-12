# andremedia.ai

Platform belajar AI terapan untuk praktisi teknis — engineer, programmer, data analyst,
database expert, dan network integrator. Dibangun dengan **Python (Flask)**, multi-page,
tanpa backend/database (murni frontend server-rendered).

## Struktur halaman

- `/` — Beranda
- `/roadmap` — Roadmap belajar 4 tahap (node_00 – node_03), dengan **checklist progress interaktif**
- `/courses` — Daftar course per node/peran (bisa difavoritkan)
- `/tools` — Direktori tools AI (filter kategori + **pencarian teks live** + favorit)
- `/prompts` — Prompt library siap salin (bisa difavoritkan)
- `/prompt-builder` — **Baru:** susun prompt custom secara interaktif dengan preview langsung
- `/workflows` — Workflow AI langkah-per-langkah
- `/use-cases` — Use case per bidang teknis
- `/projects` — Ide project latihan
- `/monetize` — Cara memonetisasi skill AI
- `/glossary` — Kamus istilah AI, dengan pencarian **dan mode flashcard interaktif**
- `/skill-check` — Kuis interaktif penentu level, dengan progress bar, tombol kembali, dan riwayat hasil
- `/tersimpan` — **Baru:** daftar tools/prompt/course yang sudah kamu favoritkan

## Fitur interaktif

- **Command palette / pencarian global** — tekan `Ctrl+K` (atau klik ikon cari di navbar) untuk mencari
  ke semua halaman, tools, prompt, istilah kamus, dan course sekaligus, lengkap dengan navigasi keyboard.
- **Sistem favorit/bookmark** — tandai tool, prompt, atau course dengan ikon bintang; tersimpan di
  `localStorage` browser, terlihat di halaman `/tersimpan` dan lencana penghitung di navbar.
- **Roadmap progress tracker** — centang modul yang sudah dipelajari, progress bar otomatis
  terisi, node berubah status "selesai", dan bisa direset kapan saja.
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

## Menjalankan secara lokal

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
│   ├── glossary.html       # + mode flashcard
│   ├── skillcheck.html     # + riwayat hasil
│   └── tersimpan.html      # Baru: halaman favorit
└── static/
    ├── css/style.css       # Design system (warna, tipografi, komponen)
    └── js/
        ├── main.js
        ├── filter.js           # Filter kategori + pencarian di halaman Tools
        ├── copy.js             # Tombol salin di halaman Prompts
        ├── glossary.js         # Pencarian mode-list di halaman Kamus AI
        ├── flashcards.js       # Mode flashcard di halaman Kamus AI
        ├── quiz.js             # Logika kuis Skill Check + riwayat
        ├── roadmap-progress.js # Checklist & progress bar Roadmap
        ├── prompt-builder.js   # Logika Prompt Builder
        ├── favorites.js        # Sistem favorit/bookmark (shared)
        ├── tersimpan.js        # Render halaman Tersimpan
        ├── search-data.js      # Index data untuk command palette
        ├── command-palette.js  # Command palette (Ctrl+K)
        ├── mobile-nav.js       # Toggle menu mobile
        ├── scroll-progress.js  # Progress bar scroll
        └── toast.js            # Notifikasi toast (shared)
```

## Konsep desain

- **Palet warna**: navy gelap (`#0B1220`) dengan aksen amber (`#F2A93B`) dan teal (`#4FD1C5`).
- **Tipografi**: Space Grotesk (judul), Inter (body), IBM Plex Mono (label teknis/data).
- **Elemen khas**: "circuit trace" — garis putus-putus bertitik yang menghubungkan tahapan
  roadmap dan workflow, terinspirasi dari diagram jaringan/sirkuit sesuai audiens teknis.

## Konten

Semua konten (roadmap, course, tools, prompt, workflow, use case, glossary, kuis) adalah
**draf awal** yang bisa langsung diedit di masing-masing file `templates/*.html` — tidak ada
database, jadi mengubah konten cukup dengan mengedit HTML/teks di template.

## Langkah lanjutan yang bisa ditambahkan

- Autentikasi & sinkronisasi favorit/progress lintas perangkat (saat ini semua state — favorit,
  progress roadmap, riwayat skill check, kartu dikuasai — tersimpan lokal di `localStorage` browser)
- CMS sederhana agar non-developer bisa mengubah konten tanpa edit kode
- Integrasi API AI sungguhan di halaman Skill Check & Prompt Builder untuk hasil yang lebih personal
- Analytics untuk melihat halaman/mata pelajaran yang paling banyak diakses
- Endpoint `/api/search-index` di backend agar index command palette tidak perlu di-hardcode di JS
