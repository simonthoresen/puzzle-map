# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`puzzle-map` is a QR-code puzzle platform with a puzzle-trail generator. Each puzzle is a JavaScript snippet base64-encoded into a URL (`index.html?p=<base64>`). Scanning the QR code opens the viewer, which decodes and `eval`s the snippet.

## Web platform

- `index.html` — viewer (runs puzzle code; exposes `root` div)
- `generate.html` — generator (editor + QR output via qrcodejs CDN)
- `.github/workflows/pages.yml` — deploys to GitHub Pages on push to main

## Puzzle generation

The `generate-puzzles` skill creates puzzle-trail treasure hunts for multiple players.

### Repo structure

```
puzzle-map/
├── hunts/                        # Gitignored — personal/private content
│   ├── locations.md              # Available hiding spots, grouped by zone
│   ├── players.md                # Game setup + player profiles
│   ├── puzzles-{name}.md         # Generated: per-player puzzle files
│   ├── puzzles-{name}-simple.md  # Generated: accessible variants
│   └── trails.md                 # Generated: combined placement trail
└── generate-puzzles/             # Skill (agentskills.io spec)
    ├── SKILL.md                  # Skill definition and generation instructions
    ├── assets/
    │   ├── puzzle-template.md
    │   └── trail-template.md
    └── references/
        └── puzzle-design.md      # Non-negotiable puzzle design rules
```

### How to generate a hunt

Use the `generate-puzzles` skill. It reads `hunts/locations.md` and `hunts/players.md`, then outputs puzzle files and a trail file into `hunts/`. See `generate-puzzles/SKILL.md` for full instructions.

### Key rules

- The decoded answer of every puzzle must BE the location (no wrapper text).
- No method hints, no zone giveaways, no fill-in-the-blank giveaways.
- See `generate-puzzles/references/puzzle-design.md` for the complete list.
