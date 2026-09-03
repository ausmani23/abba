/* ============================================================ CONFIG ============================================================
   The one file that makes this copy of the app Abba's. Everything else in
   the shell (app.js, lift.js, schedule.js, drag.js, styles.css, index.html,
   sw.js) is byte-identical across the sibling apps and is synced from the
   routines repo with its claude_workspace/sync-shell.sh — never edited here.

   dbKey and the CACHE name in sw.js must differ from every sibling: all the
   apps are served from ausmani23.github.io, and localStorage is per-origin,
   so a shared key would merge two people's logs. Never rename either. */
const APP = {
  name: "Abba",
  dbKey: "abba.v1",
  exportTitle: "Abba export",
  exportFile:  "abba-export",
  exportHint:  "send it to Adaner",
  notesLabel:  "To send",
  notesIntro:  "Anything worth telling Adaner — what felt easy, what was hard, what you skipped, " +
               "and the numbers from the progress check. Kept on this phone until you tap " +
               "<strong>Copy everything</strong> and send it to him.",
  areas: {
    mobility: { label:"Strength & balance", cap:"three days a week" },
    cardio:   { label:"Cardio",             cap:"" }
  },
  history: false,                            // no lift history import
  textScale: 1.15                            // larger type throughout
};
