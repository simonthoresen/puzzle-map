# puzzle-map

QR-code puzzles that run as JavaScript in the browser.

## How it works

1. Write a JavaScript snippet (the puzzle).
2. Base64-encode it and append it to the viewer URL: `index.html?p=<base64>`.
3. Encode that URL as a QR code and print it.
4. Scanning the QR code opens the page and runs the puzzle.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Puzzle viewer — decodes `?p=` and runs the JS |
| `generate.html` | Puzzle generator — editor + live QR code output |

## GitHub Pages setup

1. Push to `main` — the Actions workflow (`.github/workflows/pages.yml`) deploys automatically.
2. On first deploy: go to **Settings → Pages → Source** and select **GitHub Actions**.
3. Your viewer will be at `https://<user>.github.io/<repo>/index.html`.
4. Open `generate.html`, set the base URL to your Pages URL, write your puzzle, and scan the QR.

## Puzzle code environment

- `root` — a `<div>` that fills the entire viewport. Style and populate it freely.
- Full DOM access, `setTimeout`/`setInterval`, `Canvas`, `fetch`, etc. are all available.
- Keep code compact — the entire snippet is URL-encoded into the QR code, so shorter is better.
