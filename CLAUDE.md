# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`puzzle-map` is a QR-code puzzle platform. Each puzzle is a JavaScript snippet base64-encoded into a URL (`index.html?p=<base64>`). Scanning the QR code opens the viewer, which decodes and `eval`s the snippet.

- `index.html` — viewer (runs puzzle code; exposes `root` div)
- `generate.html` — generator (editor + QR output via qrcodejs CDN)
- `.github/workflows/pages.yml` — deploys to GitHub Pages on push to main
