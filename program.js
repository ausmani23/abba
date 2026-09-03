/* ============================================================
   PROGRAM — the dated training block.

   In this app the sessions are routines (routines.js) scheduled on fixed
   weekdays, so there is no dated calendar and no logged workouts: the block
   below is a label and a note. If a gym version ever happens, it goes here
   as a workout with `cat:"strength"` and the lift engine does the rest — see
   the routines repo's program.js for the full field reference.
   ============================================================ */
const PROGRAM = {
  block: "Home — strength & balance",
  week: 1,
  weeks: 8,
  start: "2026-09-07",
  focus: "Three sessions a week, one level at a time.",
  note: "The plan is simple on purpose: the same session three days a week, and a two-minute balance top-up whenever the kettle is on. For the first four weeks do ONE set of each strength move (tap through the second) and stay on level 1 of everything. From week five, two sets. Move a single exercise up a level when it has felt easy two sessions running — never the whole session at once.\n\nTwo rules that matter more than any exercise: leave two or three reps in the tank, and progress balance by taking a hand off the counter, not by holding for longer and longer. Stop for chest pain or pressure, dizziness, or breathlessness that doesn't settle within a minute — and say so.\n\nDo the progress check in week 1, then every eight weeks, and put the numbers in a note. Expect to see the chair-stand count move by week eight.",
  schedule: [],
  workouts: []
};

const PROGRAM_ARCHIVE = [];
