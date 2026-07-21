#!/usr/bin/env python3
"""
Smoke test andremedia.ai — memastikan fitur lama tidak hilang setelah update.

Jalankan sebelum "lock" (git tag) versi baru:
    python scripts/smoke_test.py

Exit code 0  = semua aman, boleh commit/tag.
Exit code 1  = ada fitur yang hilang/berubah, JANGAN dulu di-lock/deploy.

Cara kerja: buka tiap halaman lewat Flask test client, lalu cek beberapa
"penanda" (id/class/teks kunci) yang wajib ada. Kalau suatu saat ada
edit yang tidak sengaja menghapus fitur ini, script ini akan gagal
dan kasih tahu halaman mana + penanda apa yang hilang.

Tambahkan penanda baru di CHECKS setiap kali kamu menambah fitur baru,
supaya fitur baru itu juga ikut terlindungi ke depannya.
"""

import os
import sys

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

try:
    from app import app
except ImportError as e:
    print(f"[FATAL] Tidak bisa import app.py: {e}")
    sys.exit(1)

# route -> daftar string yang WAJIB ada di HTML halaman tersebut.
CHECKS = {
    "/": [
        "hero",
        'id="home-resume-banner"',
    ],
    "/roadmap": [
        'id="roadmap-bar"',
        'id="roadmap-reset"',
        'class="modules"',
        'data-mid=',
        'id="roadmap-meta"',
        'id="roadmap-remaining"',
        'id="roadmap-resume"',
        'class="node-actions"',
        'class="node-notes-area"',
        'node-prompt-link',
    ],
    "/courses": [
        'class="fav-btn"',
    ],
    "/tools": [
        'id="tools-search"',
        'id="filters"',
        'class="fav-btn"',
        'id="tools-empty"',
    ],
    "/prompts": [
        'id="prompts-search"',
        'id="prompt-filters"',
        'id="prompt-grid"',
        'class="fav-btn"',
        'class="copy-btn"',
        'id="prompts-random-btn"',
        'lvl-adv',
    ],
    "/prompt-builder": [
        'id="pb-output"',
        'id="pb-presets"',
        'id="pb-copy"',
    ],
    "/workflows": [
        'class="steps"',
    ],
    "/use-cases": [],
    "/projects": [],
    "/monetize": [],
    "/glossary": [
        'id="glossary-search"',
        'id="flash-wrap"',
        'class="mode-switch"',
    ],
    "/skill-check": [
        'id="quiz-root"',
        'id="quiz-history-banner"',
        'id="quiz-data"',
    ],
    "/tersimpan": [
        'id="fav-container"',
        'id="fav-export-bar"',
        'id="export-pdf"',
        'id="export-txt"',
        'id="export-json"',
    ],
    "/referensi": [
        'class="ref-toc"',
        'id="resmi"',
        'id="kursus"',
        'id="roadmap-eksternal"',
        'id="rag-agent"',
        'id="komunitas"',
        'ref-card',
    ],
    "/dashboard": [
        'id="dash-stats"',
        'id="badge-grid"',
        'id="dash-roadmap-pct"',
        'id="dash-badges"',
        'id="dash-reset"',
    ],
}

# Penanda global yang wajib ada di SEMUA halaman (lewat base.html).
GLOBAL_CHECKS = [
    'id="cmdk-overlay"',
    'id="cmdk-input"',
    'id="scroll-progress"',
    'id="toast-host"',
    'id="search-open"',
    'id="fav-count"',
    'id="nav-toggle"',
]

# File static yang wajib ada dan bisa diakses.
STATIC_FILES = [
    "/static/css/style.css",
    "/static/js/main.js",
    "/static/js/toast.js",
    "/static/js/favorites.js",
    "/static/js/search-data.js",
    "/static/js/command-palette.js",
    "/static/js/mobile-nav.js",
    "/static/js/scroll-progress.js",
    "/static/js/filter.js",
    "/static/js/prompt-filter.js",
    "/static/js/copy.js",
    "/static/js/glossary.js",
    "/static/js/flashcards.js",
    "/static/js/quiz.js",
    "/static/js/roadmap-progress.js",
    "/static/js/roadmap-companion.js",
    "/static/js/prompt-builder.js",
    "/static/js/tersimpan.js",
    "/static/js/export.js",
    "/static/js/badges.js",
    "/static/js/dashboard.js",
]

# Jumlah minimum item yang wajib ada — kalau berkurang berarti ada
# konten yang tidak sengaja terhapus.
MIN_COUNTS = {
    "/tools": ('class="card"', 12),
    "/prompts": ('class="prompt-block"', 200),
    "/courses": ('class="card"', 10),
    "/roadmap": ("data-mid=", 22),
}


def run():
    client = app.test_client()
    failures = []
    total_checks = 0

    for route, markers in CHECKS.items():
        resp = client.get(route)
        total_checks += 1
        if resp.status_code != 200:
            failures.append(f"{route} -> status {resp.status_code} (harus 200)")
            continue

        body = resp.get_data(as_text=True)

        for marker in markers + GLOBAL_CHECKS:
            total_checks += 1
            if marker not in body:
                failures.append(f'{route} -> penanda hilang: {marker!r}')

        if route in MIN_COUNTS:
            marker, min_count = MIN_COUNTS[route]
            total_checks += 1
            actual = body.count(marker)
            if actual < min_count:
                failures.append(
                    f"{route} -> jumlah {marker!r} = {actual}, minimal {min_count} "
                    f"(kemungkinan konten terhapus)"
                )

    for path in STATIC_FILES:
        total_checks += 1
        resp = client.get(path)
        if resp.status_code != 200:
            failures.append(f"{path} -> status {resp.status_code} (file hilang/salah nama?)")

    print(f"Menjalankan {total_checks} pengecekan di {len(CHECKS)} halaman + {len(STATIC_FILES)} static file...\n")

    if failures:
        print(f"❌ GAGAL — {len(failures)} masalah ditemukan:\n")
        for f in failures:
            print(f"  - {f}")
        print("\nJANGAN commit/tag/deploy dulu. Perbaiki dulu, lalu jalankan ulang script ini.")
        return 1

    print("✅ Semua fitur lama masih utuh. Aman untuk commit / tag / deploy.")
    return 0


if __name__ == "__main__":
    sys.exit(run())
