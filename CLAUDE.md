# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

Abba's exercise app — Adaner's father's copy of the routines PWA. Plain
HTML/CSS/JS, no framework, no build step. Deployed to GitHub Pages at
https://adanerusmani.com/abba/.

It is a **sibling of `ausmani23/routines`** (Adaner's app), `ausmani23/tara`
(his wife's) and `ausmani23/amma` (his mother's). **The shell is shared and
synced, never edited here:** `app.js`, `lift.js`, `schedule.js`, `drag.js`,
`styles.css`, `index.html`, `sw.js`, `manifest.json` come from the routines
repo via its `claude_workspace/sync-shell.sh`, which also bumps `CACHE` in
`sw.js`. A fix that belongs in the shell is made in routines and synced out.
What is this app's own: `config.js` (identity), `routines.js` (the content),
`program.js` (a label; no dated block), `history.js` (empty), `icons/`, this
file, `README.md`, `claude_workspace/`.

Adaner runs the repo; Abba uses the app. There is no backend: notes stay on
the phone until **Notes & export → Copy everything** is sent to Adaner.

## Who it is for, and the standing rules

Late sixties / early seventies, no strength or balance training before this
(Sep 2026). Walks regularly already, so walking is deliberately **not** in the
app. The content is ours — built from the guidelines and programmes summarised
in `claude_workspace/RESEARCH_older_adults_2026-09.md` — not a physio's card,
so it may be edited freely, with these constraints:

1. **Keep the safety cues.** Stop for chest pain/pressure, dizziness, or
   breathlessness that doesn't settle; no sharp or joint-line pain; two or
   three reps in the tank; one progression at a time, held for two sessions.
   These stay on the routine `sub` and in the block cues.
2. **Clearance.** The ACSM pre-participation rule: an inactive adult starting
   light-to-moderate exercise needs a doctor's clearance only with known
   cardiovascular, metabolic or renal disease, or symptoms. Ask Adaner whether
   that applies before the first session, and note the answer here.
3. **Balance progresses by removing hand support** (two hands → one →
   fingertips → none), strength by reps then load. Don't write a rung that
   just makes a hold longer.
4. **Three sessions a week is the shape** — WHO's 3+ multicomponent days, the
   ambitious end of the guidelines, chosen deliberately. Adjust the content
   before you adjust the frequency.
5. **`dbKey` in `config.js` and `CACHE` in `sw.js` must stay distinct** from
   every sibling (`abba.v1`, `abba-vN`): same origin, shared localStorage.

## Structure

- `routines.js` — three routines: `session` (Strength & balance,
  `sched:{freq:"weekly", days:[1,3,5]}`, Day A/B alternating, ~18 min),
  `moments` (Balance minute, on demand), `check` (the 8-weekly progress
  check, on demand). Schema in the file header; per-move levels are the
  progression (`db.exLevels`), tapped on the detail screen.
- `program.js` — `PROGRAM` with an empty `schedule` and no `workouts`; the
  note on the Upcoming screen carries the plan's rules. A gym day would be
  added here as an ordinary lift-engine workout.
- `config.js` — `textScale:1.15` (body zoom), the area label "Strength &
  balance", export copy addressed to Adaner, `history:false`.

## Commands

No build, lint, or test step. Edit, open `index.html`, or push. Deploy is
`git push`; run the sync from routines when the shell changes. Harnesses in
`claude_workspace/tests/` — run them with the routines repo's
`claude_workspace/run-tests.sh <this dir>` after any content change:
`test.html` (schedule, durations, integrity), `overflow.html` (layout at the
1.15 zoom). Never `--screenshot` at a narrow window (see routines/CLAUDE.md).
