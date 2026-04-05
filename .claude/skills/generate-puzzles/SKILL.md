---
name: generate-puzzles
description: >
  Generate puzzle-trail Easter egg hunts (or similar treasure hunts) for one or
  more players. Requires locations, game setup, and player profiles as input.
  Outputs per-player puzzle files and a combined placement trail. Use when the
  user wants to create, regenerate, or extend a puzzle hunt.
allowed-tools: Read Write Edit Glob Grep Bash(ls:*) Bash(python:*) Bash(pip:*)
---

# Generate Puzzles

Create a complete puzzle-hunt experience: per-player puzzle files and a
combined trail for hiding notes.

## Inputs

The skill expects three pieces of information. They are typically stored in
files in the working directory, but the user may supply them inline.

| Input            | Typical file                      | Contents |
|------------------|-----------------------------------|----------|
| **Locations**    | `hunts/{hunt-name}/locations.md`  | All hiding spots grouped by zone, with zone map and distances |
| **Game setup**   | `hunts/{hunt-name}/players.md`    | Occasion, goal, start location, language, stair counts, and any house-specific rules |
| **Player profiles** | `hunts/{hunt-name}/players.md` | Per-player: name, age, interests, friends, schools, personal facts, Easter-egg location |

Each hunt lives in its own subdirectory under `hunts/`. Ask the user for the
hunt name if not obvious (e.g. `easter-2026`, `birthday-party`).

If any of these are missing, ask the user before proceeding.

## Generation steps

### 1. Read inputs

Read the locations file and the players file. Note:

- How many zones exist and how they connect.
- How many locations are available per zone.
- How many players there are, and what each one knows / likes.
- The game setup constraints (language, back-of-note allowance, stair counts).

### 2. Design the chains

For **each player**, design a puzzle chain:

1. **Length** — one puzzle per location assigned to this player. Split
   locations roughly equally across players, balanced across zones.
2. **Chain order** — each puzzle's decoded answer is the location where the
   *next* puzzle note is hidden. The final answer is the Easter-egg location.
3. **Puzzle-type mix** — vary types so no two consecutive puzzles use the
   same method. Draw from the catalogue below. Weight toward the player's
   interests and age.
4. **Difficulty curve** — start easy, ramp up toward the middle, give a
   breather before the final boss puzzle.
5. **Anti-AI** — sprinkle in puzzles that require personal knowledge
   (friend names, school history, physical stair counts) or physical
   interaction (flip the note, count real objects) so the trail can't be
   solved by photographing and uploading to an AI.

### 3. Write JavaScript puzzle code

Each puzzle is delivered as a **QR code** linking to `index.html`. The viewer
supports two modes:

#### Mode 1: Template reference (preferred — short URLs, simple QR codes)

```
{base-url}/index.html?t={template}&l={location}&{param}={value}...
```

The `t` param names a JS file in the published `js/` folder. The `l` param
is the location string revealed on win. Additional params are substituted
into the template's `__PARAM_{KEY}__` placeholders.

Example: `?t=caesar&l=TORKETROMMEL&a=5&text=YTWPJYWTRRJQ`

This produces URLs of ~80-250 chars — trivial for QR codes.

#### Mode 2: Inline JS (fallback for bespoke puzzles)

```
{base-url}/index.html?p={base64-encoded-js}
```

Use this only for one-off puzzles that don't fit any template.

**Base URL:** Ask the user for their GitHub Pages URL, e.g.
`https://{user}.github.io/puzzle-map`.

#### JavaScript guidelines

- Use `root` (the pre-existing `#puzzle` div) — no need to query for it.
- Prefer inline styles over stylesheets for compactness.
- Use `document.createElement` for building elements.
- For Norwegian characters (æ, ø, å), ensure they survive base64 encoding
  via the `encodeURIComponent`/`unescape` wrapper.
- For interactive puzzles (click counters, input fields), attach event
  listeners directly.
- Keep code minified where possible — every byte increases QR density.

#### Example: Caesar cipher puzzle

```javascript
root.style.cssText='display:flex;flex-direction:column;align-items:center;justify-content:center;background:#111;font-family:monospace';
const t=document.createElement('div');
t.textContent='YDVNHPDVNLQ';
t.style.cssText='color:#0f0;font-size:2.5rem;letter-spacing:0.3rem;margin-bottom:1rem';
root.appendChild(t);
const h=document.createElement('div');
h.textContent='+3';
h.style.cssText='color:#888;font-size:1.2rem';
root.appendChild(h);
```

### 4. Write puzzle files

Output one file per player, following the template in
[assets/puzzle-template.md](assets/puzzle-template.md).

File naming: `hunts/{hunt-name}/puzzles-{player-name-lowercase}.md`

Each puzzle entry in the file contains:
1. A clickable markdown link to the puzzle URL
2. An inline QR code image referencing `qr/{p}-{nn}.png`

Also write a **URLs file** at `hunts/{hunt-name}/puzzles-{player}-urls.txt`
with one line per puzzle:
```
{p}-01 {full-url}
{p}-02 {full-url}
...
```

### 5. Generate QR codes

Run the QR generation script for each player's URLs file:

```bash
python .claude/skills/generate-puzzles/scripts/generate-qr.py \
  hunts/{hunt-name}/puzzles-{player}-urls.txt \
  hunts/{hunt-name}/qr
```

This creates one PNG per puzzle in the `qr/` subfolder. The markdown files
reference these images.

Requires: `pip install qrcode[pil]`

### 6. Write the trail file

Output a single `hunts/{hunt-name}/trails.md` following the template in
[assets/trail-template.md](assets/trail-template.md). Group notes by zone,
ordered to minimise zone crossings. Interleave all players' notes by
physical location.

### 7. Review

After generating, do a self-check:

- [ ] Every puzzle's answer is a real location from the locations file.
- [ ] No two players share the same location (unless the setup allows it).
- [ ] Every chain starts with the start location and ends at the player's
      Easter-egg location.
- [ ] No chain has two consecutive puzzles of the same type.
- [ ] Back-of-note count per player does not exceed the setup limit.
- [ ] All puzzle design rules in
      [references/puzzle-design.md](references/puzzle-design.md) are met.
- [ ] Every puzzle URL is under 2000 characters (QR code scanability).
- [ ] QR code PNGs were generated for all puzzles.

## Pre-built JavaScript templates

All 30 reusable JavaScript templates live in `js/` at the repo root (published
to GitHub Pages). Each file uses `__LOCATION__` for the next clue and
`__PARAM_A__`, `__PARAM_B__`, etc. for puzzle-specific parameters.

### Minigames (20 templates)

Beat-the-game-to-reveal-location: `reaction`, `reflex`, `sequence`,
`runner`, `dodge`, `catch`, `flappy`, `pong`, `breakout`, `snake`,
`invaders`, `whack`, `memory`, `simon`, `colormatch`, `typing`, `shooter`,
`maze`, `asteroid`, `boss`.

### Puzzle templates (10 templates)

Solve-the-puzzle-to-reveal-location: `caesar`, `morse`, `crossword`,
`hangman`, `math-lock`, `jigsaw-word`, `riddle`, `number-lock`, `rebus`,
`wordsearch`.

### Personalisation via puzzle cards

Parameters in the JS are **generic** (`__PARAM_A__` becomes `6`). The
printed card next to the QR code adds the personal context:

```
┌────────────────┐
│    [QR CODE]   │
│                │
│  A = antall    │
│  trapper ÷ 2   │
└────────────────┘
```

This keeps the JS reusable while letting each hunt inject personal facts
(stair counts, sibling names, school names, etc.) through the card text.
The skill generates both the parameterised URL and the card instructions.

### Bespoke puzzles

You can also write one-off JavaScript puzzles from scratch. Use the pre-built
templates as a starting point, or create something entirely new. Just keep it
under ~1400 chars to fit in a scannable QR code.

## Puzzle-type catalogue

Pre-built templates, minigames, and bespoke puzzles. Mix and match.

| Type | Source | Description | Best for |
|------|--------|-------------|----------|
| **Minigame** | `js/*.js` | Beat a game to reveal location | All ages; active/fun |
| **Caesar cipher** | `js/caesar.js` | Decode shifted text | Ages 10+ |
| **Morse code** | `js/morse.js` | Decode dots and dashes | Ages 10+ |
| **Crossword** | `js/crossword.js` | Fill words, marked letters = answer | Ages 10+ |
| **Hangman** | `js/hangman.js` | Guess the word letter by letter | All ages |
| **Combination lock** | `js/math-lock.js` | Set a 3-digit code | Ages 8+ |
| **Letter tiles** | `js/jigsaw-word.js` | Unscramble tiles into a word | Ages 10+ |
| **Multiple choice** | `js/riddle.js` | Pick the right answer | All ages |
| **Number-to-letter** | `js/number-lock.js` | A=1 decode | All ages |
| **Emoji rebus** | `js/rebus.js` | Interpret emoji sequence | All ages |
| **Word search** | `js/wordsearch.js` | Find word in letter grid | All ages |
| **Bespoke** | (generated) | Custom one-off JS puzzle | Any |
| **Physical + QR** | card text only | Count stairs/objects → use as param | Ages 10+ |
| **Two-scan** | two QR codes | First QR gives a component needed for second | Anti-AI |
| **Personal knowledge** | card text only | Question only the player can answer | Anti-AI |

## Adapting for accessibility

If a player has specific needs (e.g. dyslexia, colour blindness, motor
difficulties), adapt the puzzle mix:

| Need | Avoid | Prefer |
|------|-------|--------|
| Dyslexia | Anagrams, backwards text, long cipher strings | Emoji rebuses, riddles, number codes with lookup card, physical tasks |
| Colour blindness | Colour-dependent puzzles | Shape/symbol-based, text-based |
| Young children (< 8) | Multi-step ciphers, long text | Picture puzzles, simple riddles, counting tasks |

When creating an accessible variant, save it as
`hunts/{hunt-name}/puzzles-{name}-simple.md` alongside the standard version.

## Important

Read and follow all rules in
[references/puzzle-design.md](references/puzzle-design.md) before writing
any puzzle. These rules are non-negotiable.
