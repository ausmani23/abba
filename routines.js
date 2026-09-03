/* ============================================================ ROUTINES ============================================================
   The content of this app: a strength-and-balance session three days a week,
   a two-minute balance top-up for the days between, and an eight-weekly
   progress check. Written for someone in their late sixties or early
   seventies who has not done strength or balance work before — built from
   the WHO 2020 guidelines, the NSCA/ACSM position stands, the Otago
   programme's progression rule and the NHS lists (see
   claude_workspace/RESEARCH_older_adults_2026-09.md). It is OUR content, not a
   physio's card: edit it freely, but keep the safety cues.

   Two rules the whole thing rests on:
     - Balance progresses by taking a hand away (two hands → one → fingertips
       → none), never by holding longer and longer.
     - Strength progresses reps first, then load, one thing at a time, and
       always with two or three reps left in the tank.

   Routine fields:
     id          stable key — completions, levels and variants are stored against it
     name        shown on the card and the detail screen
     short       compact name for the one-line daily summary on Upcoming
     accent      card colour
     sub         one-paragraph description under the name
     variants    optional: names of the A/B days. Blocks filter by their
                 `variant` field; a block WITHOUT one runs every day.
     variantTags one-line caption under each variant button
     variantMode "alternate" → the app defaults to the day you did NOT do last
     sched       {freq:"weekly", days:[1,3,5]} → Mon/Wed/Fri (0 = Sunday)
                 {freq:"daily"} → every day · {freq:"onDemand"} → Browse only
     blocks      the moves, in order

   Block fields:
     group       section header shown above this block
     name        display name; also the progression key (same-named blocks
                 share a level)
     badge       "opt" → optional, not counted in the routine's time
     mode        "time" counts down and moves on by itself; "reps" waits for a tap
     sec         seconds (time blocks)
     target      what the dial says in reps mode ("8–10 reps")
     sides       2 → left, then right
     sets        repeat the block this many times
     rest        seconds of rest between sets (a real countdown, "Breathe")
     est         rough seconds per set (reps blocks) for the time estimate
     dose        the one-line prescription under the name
     detail      what to do — or `levels`, one text per rung, progression is
                 PER MOVE: tap L1/L2/L3 on the detail screen
     cue         the italic line: form, safety, what it is for
     variant     0 = Day A only, 1 = Day B only, omit = both
   ============================================================ */
const ROUTINES = [
{
  id: "session",
  name: "Strength & balance",
  short: "Session",
  accent: "#E5A33C",
  sub: "About twenty minutes, three days a week, at the kitchen counter. Warm up, six strength moves, three balance moves, stretch. Day A and Day B swap the arm exercise and the walking drill; everything else is the same. Stop and sit down for chest pain or pressure, dizziness, or breathlessness that doesn't settle in a minute — and tell someone.",
  variants: ["Day A", "Day B"],
  variantTags: ["wall press-up · heel-to-toe walk", "band row · sideways walk"],
  variantMode: "alternate",
  sched: { freq:"weekly", days:[1,3,5] },
  blocks: [
    /* ---- warm-up ---- */
    {group:"Warm-up — standing at the counter", name:"Head turns", mode:"time", sec:30,
     dose:"30 sec · slow",
     detail:"Stand tall, one hand resting on the counter. Turn your head slowly to look over one shoulder, then the other. Then tip one ear toward a shoulder, then the other. Keep breathing.",
     cue:"Small and slow. Nothing here should pull or pinch — if it does, make the movement smaller."},
    {name:"Trunk rotations", mode:"time", sec:30,
     dose:"30 sec · slow",
     detail:"Feet a little wider than your hips, knees soft. Cross your arms over your chest and turn your whole upper body gently to one side, then the other. Let the hips stay facing forward.",
     cue:"A loosening, not a stretch. Turn only as far as is easy."},
    {name:"Ankle circles", mode:"time", sec:20, sides:2,
     dose:"20 sec each foot",
     detail:"Hand on the counter. Lift one foot a little and draw slow circles with the toes — five one way, five the other. Then the other foot.",
     cue:"Wakes up the ankles before the balance work later."},
    {name:"Heel-toe rocks", mode:"time", sec:30,
     dose:"30 sec · both hands on the counter",
     detail:"Both hands on the counter. Rise up onto your toes, then rock back onto your heels with the toes lifted. Rock slowly between the two.",
     cue:"Feel the calves working on the way up and the shins on the way back."},
    {name:"Easy sit-to-stands", mode:"reps", target:"5 easy reps", est:40,
     dose:"5 reps · half effort, hands on thighs",
     detail:"Sit toward the front of a sturdy chair, feet flat and under your knees. Lean forward, push through your feet and stand up; sit back down slowly. Hands on your thighs are fine here — this is the rehearsal, not the exercise.",
     cue:"The chair goes against a wall so it can't slide."},

    /* ---- strength ---- */
    {group:"Strength — leave two or three reps in the tank", name:"Sit-to-stand", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:45,
     dose:"2 sets of 8–10 · 45 sec rest between",
     levels:["Arms crossed over your chest. Stand up and sit down at an easy, even pace. If you need your hands to get up, use them — and count that as the level for now.",
             "Arms crossed. Stand up FAST — drive through the feet — then sit down SLOWLY, counting three on the way down. The fast part is what keeps you quick on your feet.",
             "Stand up fast, sit down slow, holding something in your arms: a bag of rice, a big book, a water jug. Or use a lower chair or a cushion removed."],
     cue:"The most important move in the whole session. Feet flat, lean your chest forward over your toes before you push, knees pointing the same way as your toes. Never drop into the seat — land it softly."},
    {name:"Counter mini-squat", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:40,
     dose:"2 sets of 8–10 · 45 sec rest",
     levels:["Both hands on the counter, feet hip-width. Bend the knees a little — a quarter of the way down, like you're about to sit but change your mind — then stand tall. Slow both ways.",
             "Fingertips only on the counter. Bend halfway to a chair height, hold one second, stand. Heels stay flat on the floor.",
             "No hands, or holding a light weight at your chest. Same halfway depth, same slow control."],
     cue:"Back straight, chest up, heels down, knees over the toes and never collapsing inward. Only as deep as is comfortable — the knees should never complain."},
    {name:"Calf raise", mode:"reps", target:"10–12 reps", sets:2, rest:30, est:40,
     dose:"2 sets of 10–12 · 30 sec rest",
     levels:["Both hands on the counter. Rise up onto the balls of both feet as high as you can, pause a second at the top, lower slowly.",
             "One hand on the counter. Same rise, a two-second pause at the top, three seconds coming down.",
             "One leg at a time, one hand on the counter: 10 on the right, then 10 on the left."],
     cue:"Slow up, slower down. Strong calves are what make walking, stairs and catching a stumble feel easy."},
    {name:"Standing hip abduction", mode:"reps", target:"8–10 per side", sides:2, sets:2, rest:30, est:30,
     dose:"2 sets of 8–10 each leg · 30 sec rest",
     levels:["Hold the back of a chair or the counter with both hands. Stand tall and lift one leg straight out to the side a few inches, toes pointing forward, then bring it back with control. All reps on one side, then the other.",
             "Fingertips on the counter. Lift a little higher, and pause one second out to the side.",
             "A loop band around the ankles, or a light ankle weight. Same slow control."],
     cue:"Don't lean away from the lifting leg — the body stays upright and the movement is small. This is the muscle that keeps your pelvis level when you walk, which is the muscle that stops sideways falls."},
    {variant:0, name:"Wall press-up", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:40,
     dose:"2 sets of 8–10 · 45 sec rest · Day A",
     levels:["Stand an arm's length from a wall, hands flat on it at chest height, a little wider than your shoulders. Bend the elbows to bring your chest toward the wall, then push back. Feet stay planted.",
             "Feet a step further from the wall, so more of your weight is on your hands.",
             "Hands on the kitchen counter instead of the wall — a steeper angle, more work."],
     cue:"Elbows tucked toward your sides rather than flared out. Body in one straight line from head to heels — no sagging at the hips."},
    {variant:1, name:"Band row", mode:"reps", target:"10–12 reps", sets:2, rest:45, est:45,
     dose:"2 sets of 10–12 · 45 sec rest · Day B",
     levels:["Sit tall on the chair with the band looped around both feet, legs out in front, one end in each hand. Pull the hands back toward your ribs, squeezing the shoulder blades together, then let the arms straighten slowly.",
             "Shorten the band — hold it further along — or use the next-stronger band.",
             "One arm at a time with a dumbbell or a full bottle: hand on the counter, hinge forward, pull the weight up to your hip, lower slowly. 10 each side."],
     cue:"Squeeze the shoulder blades, don't shrug the shoulders toward the ears. Long neck, chest open. This is the posture muscle — it fights the forward stoop."},

    /* ---- balance ---- */
    {group:"Balance — within reach of the counter, eyes on a fixed spot", name:"Tandem stance", mode:"time", sec:20, sides:2, sets:2,
     dose:"20 sec each way × 2 · heel to toe",
     levels:["Both hands on the counter. Put one foot directly in front of the other, heel touching toe, as if on a tightrope. Hold. Then swap which foot is in front.",
             "One hand on the counter. Same heel-to-toe line.",
             "Fingertips only — then hovering just above the counter. When that is easy, hands resting on the counter again but EYES CLOSED."],
     cue:"Look straight ahead at one spot, not down at your feet. Stand tall. If you wobble, that's the exercise working — take the hand back to the counter and carry on."},
    {name:"Single-leg stand", mode:"time", sec:15, sides:2, sets:2,
     dose:"15 sec each leg × 2",
     levels:["Fingertips on the counter. Lift one foot a few inches off the floor and hold. Put it down, then the other leg.",
             "One finger on the counter — just enough to steady, not to lean on.",
             "No hands. When that is steady, add a slow head turn left and right while you hold."],
     cue:"Hips level — don't let the standing hip stick out to the side. A wobble is fine; a grab is fine. Never let go entirely until it is truly easy."},
    {variant:0, name:"Heel-to-toe walk", mode:"time", sec:40,
     dose:"40 sec · along the counter and back · Day A",
     levels:["One hand trailing along the counter. Walk forward placing the heel of one foot directly in front of the toes of the other, slowly, for the length of the counter. Turn carefully and come back.",
             "Fingertips only on the counter.",
             "No hands, arms out to the side for balance. When that is easy: heel-to-toe BACKWARDS, hand on the counter again."],
     cue:"Eyes forward, not down. Arms out like a tightrope walker is exactly right."},
    {variant:1, name:"Sideways walk", mode:"time", sec:40,
     dose:"40 sec · along the counter and back · Day B",
     levels:["Facing the counter, one hand on it. Step sideways with one foot, bring the other to meet it, ten steps along; then ten steps back the other way.",
             "Fingertips only. Slightly bigger steps, knees a little bent.",
             "No hands. Then the grapevine: cross one foot in FRONT of the other as you step sideways, five each way — the hand goes back to the counter for that one."],
     cue:"Stay facing the counter, hips level, no leaning. Sideways stepping is the balance nobody practises and the one falls test first."},
    {name:"Step-ups on the bottom stair", badge:"opt", mode:"reps", target:"5 each leg", sides:2, est:30,
     dose:"5 each leg · optional, if there is a stair with a rail",
     detail:"Hand on the rail. Step up onto the bottom stair with one foot, bring the other up to join it, step back down slowly, same foot first. Five leading with the right, five leading with the left.",
     cue:"Slow and controlled, especially coming down. Skip it if there's no rail."},

    /* ---- cool-down ---- */
    {group:"Cool-down", name:"Calf stretch at the wall", mode:"time", sec:30, sides:2,
     dose:"30 sec each leg",
     detail:"Hands on the wall, one foot back with the heel on the floor and the knee straight, the front knee bent. Lean in gently until you feel the back calf stretch. Swap legs.",
     cue:"A comfortable pull, never a sharp one. Breathe slowly."},
    {name:"Standing hamstring stretch", mode:"time", sec:30, sides:2,
     dose:"30 sec each leg",
     detail:"Hand on the counter. Put one heel forward on the floor, toes up, leg straight. Push the hips back and tip forward from the hips — chest tall — until you feel the back of the thigh. Swap legs.",
     cue:"Three slow breaths, and that's the session. Well done."}
  ]
},

{
  id: "moments",
  name: "Balance minute",
  short: "Balance",
  accent: "#5BC9BC",
  sub: "Two minutes at the counter for the days in between — while the kettle boils is perfect. Same two holds as the session, so what you practise here shows up there.",
  sched: { freq:"onDemand" },
  blocks: [
    {name:"Tandem stance", mode:"time", sec:30, sides:2,
     dose:"30 sec each way · heel to toe",
     levels:["Both hands on the counter, one foot directly in front of the other, heel to toe. Hold, then swap feet.",
             "One hand on the counter.",
             "Fingertips only, then hovering. Eyes closed with hands back on."],
     cue:"Eyes on one spot ahead. A hand back to the counter the moment you need it."},
    {name:"Single-leg stand", mode:"time", sec:20, sides:2,
     dose:"20 sec each leg",
     levels:["Fingertips on the counter, one foot lifted a few inches.",
             "One finger.",
             "No hands; then add a slow head turn."],
     cue:"Hips level, stand tall."}
  ]
},

{
  id: "check",
  name: "Progress check — every 8 weeks",
  short: "Check",
  accent: "#8DA2B3",
  sub: "Four quick tests, the same ones clinics use. Do them in week 1, then every eight weeks, and write the numbers in a note afterwards. Someone else in the room, please — and everything within reach of the counter. Expect real change by week 8, not week 2.",
  sched: { freq:"onDemand" },
  blocks: [
    {group:"1 · 30-second chair stand", name:"Chair stands — count them", mode:"time", sec:30,
     dose:"30 sec · count full stands, arms crossed",
     detail:"A sturdy armless chair against the wall. Sit in the middle, feet flat, arms crossed over your chest. On the beep, stand fully up and sit back down as many times as you can in 30 seconds. Count the full stands. If you need your arms to get up, the score is 0 — write that down, it's the starting point.",
     cue:"Average for 65–69: men 12–18, women 11–16. For 70–74: men 12–17, women 10–15. A change of one is noise; two or three is real."},
    {group:"2 · Timed up-and-go", name:"Up, walk, turn, back, sit", mode:"reps", target:"time it", est:40,
     dose:"one go · someone times it",
     detail:"Mark a spot 3 metres (10 feet) from the chair. From sitting, without using your arms: stand, walk at your normal pace to the mark, turn, walk back and sit down. The stopwatch runs from the word 'go' until you are sitting again. Tap the dial when done.",
     cue:"Typical for 60–69 is about 8 seconds, 70–79 about 9. Over 12 seconds is the level clinics take seriously. Compare with your own last number more than with the table."},
    {group:"3 · Four-stage balance — 10 seconds each, stop at the first you can't hold", name:"Feet together", mode:"time", sec:10,
     dose:"10 sec · feet side by side",
     detail:"Stand with feet together, hands off the counter but close to it. Hold for the count.",
     cue:"Moving the feet or grabbing the counter ends the stage."},
    {name:"Semi-tandem", mode:"time", sec:10,
     dose:"10 sec · one foot half a step ahead",
     detail:"The instep of one foot touching the big toe of the other. Hold.",
     cue:"Hands off, close to the counter."},
    {name:"Tandem", mode:"time", sec:10,
     dose:"10 sec · heel to toe",
     detail:"One foot directly in front of the other, heel touching toe. Hold.",
     cue:"Not managing this one for 10 seconds is the finding clinics act on — it means the balance work is exactly the right thing to be doing."},
    {name:"One leg", mode:"time", sec:10,
     dose:"10 sec · standing on one foot",
     detail:"Lift one foot and hold on the other. Hands off, close to the counter.",
     cue:"Write down the highest stage you held for the full 10 seconds."},
    {group:"4 · Single-leg stance — how long?", name:"One leg, as long as you can", mode:"reps", target:"time it", sides:2, est:40,
     dose:"one go each leg · someone times it",
     detail:"Eyes open, hands off the counter. Stand on one leg for as long as you can, up to 30 seconds. The clock stops when the other foot touches down or a hand touches the counter. Tap the dial when done; then the other leg.",
     cue:"Typical for 60–69 is around 25 seconds, 70–79 around 17. Use the same shoes and the same spot every time and compare with yourself."}
  ]
}
];
