# andremedia.ai

Platform belajar AI terapan untuk praktisi teknis — engineer, programmer, data analyst,
database expert, dan network integrator. Dibangun dengan **Python (Flask)**, multi-page,
tanpa backend/database (murni frontend server-rendered).

## Struktur halaman

- `/` — Beranda
- `/roadmap` — Roadmap belajar 4 tahap (node_00 – node_03)
- `/courses` — Daftar course per node/peran
- `/tools` — Direktori tools AI (dengan filter kategori)
- `/prompts` — Prompt library siap salin
- `/workflows` — Workflow AI langkah-per-langkah
- `/use-cases` — Use case per bidang teknis
- `/projects` — Ide project latihan
- `/monetize` — Cara memonetisasi skill AI
- `/glossary` — Kamus istilah AI (dengan pencarian)
- `/skill-check` — Kuis interaktif penentu level (klien-side, tanpa server)

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

Buka `http://127.0.0.1:3005` di browser.

## Struktur folder

```
andremedia/
├── app.py                  # Routing Flask (tanpa database)
├── requirements.txt
├── templates/
│   ├── base.html           # Layout dasar: nav, footer, font
│   ├── index.html
│   ├── roadmap.html
│   ├── courses.html
│   ├── tools.html
│   ├── prompts.html
│   ├── workflows.html
│   ├── usecases.html
│   ├── projects.html
│   ├── monetize.html
│   ├── glossary.html
│   └── skillcheck.html
└── static/
    ├── css/style.css       # Design system (warna, tipografi, komponen)
    └── js/
        ├── main.js
        ├── filter.js       # Filter kategori di halaman Tools
        ├── copy.js         # Tombol salin di halaman Prompts
        ├── glossary.js     # Pencarian di halaman Kamus AI
        └── quiz.js         # Logika kuis Skill Check
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

- Autentikasi & progress tracking per user (butuh database — misalnya PostgreSQL + SQLAlchemy)
- CMS sederhana agar non-developer bisa mengubah konten tanpa edit kode
- Integrasi API AI sungguhan di halaman Skill Check untuk rekomendasi yang lebih personal
- Analytics untuk melihat halaman/mata pelajaran yang paling banyak diakses
