---
name: generate-puzzles
description: >
  Generate puzzle-trail Easter egg hunts (or similar treasure hunts) for one or
  more players. Requires locations, game setup, and player profiles as input.
  Outputs per-player puzzle files and a combined placement trail. Use when the
  user wants to create, regenerate, or extend a puzzle hunt.
allowed-tools: Read Write Edit Glob Grep Bash(ls:*)
---

# Generate Puzzles

Create a complete puzzle-hunt experience: per-player puzzle files and a
combined trail for hiding notes.

## Inputs

The skill expects three pieces of information. They are typically stored in
files in the working directory, but the user may supply them inline.

| Input            | Typical file      | Contents |
|------------------|-------------------|----------|
| **Locations**    | `locations.md`    | All hiding spots grouped by zone, with zone map and distances |
| **Game setup**   | `players.md`      | Occasion, goal, start location, language, stair counts, and any house-specific rules |
| **Player profiles** | `players.md`  | Per-player: name, age, interests, friends, schools, personal facts, Easter-egg location |

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

### 3. Write puzzle files

Output one file per player, following the template in
[assets/puzzle-template.md](assets/puzzle-template.md).

File naming: `puzzles-{player-name-lowercase}.md`

### 4. Write the trail file

Output a single `trails.md` following the template in
[assets/trail-template.md](assets/trail-template.md). Group notes by zone,
ordered to minimise zone crossings. Interleave all players' notes by
physical location.

### 5. Review

After generating, do a self-check:

- [ ] Every puzzle's answer is a real location from the locations file.
- [ ] No two players share the same location (unless the setup allows it).
- [ ] Every chain starts with the start location and ends at the player's
      Easter-egg location.
- [ ] No chain has two consecutive puzzles of the same type.
- [ ] Back-of-note count per player does not exceed the setup limit.
- [ ] All puzzle design rules in
      [references/puzzle-design.md](references/puzzle-design.md) are met.

## Puzzle-type catalogue

Use these types and invent new ones as appropriate. Each entry shows the
canonical name, a short description, and when it works best.

| Type | Description | Best for |
|------|-------------|----------|
| **Emoji rebus** | Emoji sequence that spells a word/phrase | All ages; visual thinkers |
| **Caesar cipher** | Shift each letter by N; key given on note or derived | Ages 10+; number-savvy |
| **Atbash cipher** | A↔Z mirror substitution | Ages 12+; code-breakers |
| **Backwards text** | Text reversed letter-by-letter or word-by-word | All ages; quick solve |
| **Anagram** | Letters of the answer scrambled | Ages 12+; word lovers |
| **Number-to-letter** | A=1 code, optionally with math layer | All ages with lookup card |
| **Riddle** | Descriptive clue whose answer IS the location | All ages |
| **Crossword / acrostic** | Grid where marked letters spell the answer | Ages 10+; themed to interests |
| **Trivia acrostic** | Trivia questions whose answers' Nth letters spell answer | Ages 10+; interest-themed |
| **Physical + cipher** | Count stairs/objects → use count as cipher key | Ages 10+; active players |
| **Word search grid** | Find a word hidden in a letter grid | All ages |
| **Back-of-note** | Key/image/component on reverse side of the note | All ages; anti-AI |
| **Personal knowledge** | Requires facts only the player knows | All ages; anti-AI |
| **Math decode** | Solve equations → map results to letters | Ages 10+; math lovers |
| **Branching** | Different paths based on a computed value | Ages 12+; advanced |

## Adapting for accessibility

If a player has specific needs (e.g. dyslexia, colour blindness, motor
difficulties), adapt the puzzle mix:

| Need | Avoid | Prefer |
|------|-------|--------|
| Dyslexia | Anagrams, backwards text, long cipher strings | Emoji rebuses, riddles, number codes with lookup card, physical tasks |
| Colour blindness | Colour-dependent puzzles | Shape/symbol-based, text-based |
| Young children (< 8) | Multi-step ciphers, long text | Picture puzzles, simple riddles, counting tasks |

When creating an accessible variant, save it as
`puzzles-{name}-simple.md` alongside the standard version.

## Important

Read and follow all rules in
[references/puzzle-design.md](references/puzzle-design.md) before writing
any puzzle. These rules are non-negotiable.
