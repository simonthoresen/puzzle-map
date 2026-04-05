# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`puzzle-map` is a QR-code puzzle platform with a puzzle-trail generator. Puzzles are JavaScript templates served from `js/` and loaded via URL params.

## Web platform (deployed to GitHub Pages)

- `index.html` — puzzle viewer, two modes:
  - Template mode: `?t=<template>&l=<location>&<params>` (preferred, short URLs)
  - Inline mode: `?p=<base64>` (bespoke puzzles)
- `generate.html` — puzzle editor + QR code generator
- `js/` — 30 published JS templates (20 minigames + 10 puzzle types)
- `.github/workflows/pages.yml` — deploys to GitHub Pages on push to main

## Puzzle generation

The `generate-puzzles` skill creates puzzle-trail treasure hunts for multiple players.

### Repo structure

```
puzzle-map/
├── index.html                        # Puzzle viewer
├── generate.html                     # Puzzle editor
├── js/                               # Published JS templates (minigames + puzzles)
├── hunts/                            # Gitignored — personal/private content
│   └── {hunt-name}/
│       ├── locations.md
│       ├── players.md
│       ├── puzzles-{player}.md
│       └── trails.md
└── .claude/skills/generate-puzzles/  # Skill (agentskills.io spec)
    ├── SKILL.md
    ├── assets/                       # Output templates (markdown format)
    ├── references/
    │   └── puzzle-design.md
    └── scripts/
        └── generate-qr.py
```

### How to generate a hunt

Use the `generate-puzzles` skill. It reads `hunts/{hunt-name}/locations.md` and `hunts/{hunt-name}/players.md`, picks from the `js/` templates, and outputs puzzle files with short template-reference URLs.

### Key rules

- The decoded answer of every puzzle must BE the location (no wrapper text).
- No method hints, no zone giveaways, no fill-in-the-blank giveaways.
- See `.claude/skills/generate-puzzles/references/puzzle-design.md` for the complete list.
