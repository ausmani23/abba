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
       → none → eyes closed → a soft surface), never by holding longer and
       longer.
     - Strength progresses reps first, then load, one thing at a time, and
       always with two or three reps left in the tank.

   Every strength and balance move has SIX levels. Start everything at L1.
   Move ONE exercise up a level when it has felt easy two sessions running —
   never the whole session at once. L6 is genuinely hard; nobody is expected
   to get there quickly, and there is no prize for skipping rungs.

   Pictures: the NHS pages linked from each move show the basic version with
   photographs; the illustrated Otago manual (ACC, New Zealand) covers the
   balance moves and the support-removal progression:
     https://www.nhs.uk/live-well/exercise/strength-exercises/
     https://www.nhs.uk/live-well/exercise/balance-exercises/
     https://www.nhs.uk/live-well/exercise/flexibility-exercises/
     https://www.livestronger.org.nz/assets/Uploads/acc1162-otago-exercise-manual.pdf

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
                 PER MOVE: tap L1…L6 on the detail screen
     cue         the italic line: form, safety, what it is for
     link        {label, url} — pictures for the move, on the detail screen
     variant     0 = Day A only, 1 = Day B only, omit = both
   ============================================================ */
const NHS_STRENGTH = "https://www.nhs.uk/live-well/exercise/strength-exercises/";
const NHS_BALANCE  = "https://www.nhs.uk/live-well/exercise/balance-exercises/";
const NHS_FLEX     = "https://www.nhs.uk/live-well/exercise/flexibility-exercises/";
const OTAGO        = "https://www.livestronger.org.nz/assets/Uploads/acc1162-otago-exercise-manual.pdf";

const ROUTINES = [
{
  id: "session",
  name: "Strength & balance",
  short: "Session",
  accent: "#E5A33C",
  sub: "About twenty minutes, three days a week, at the kitchen counter. Warm up, six strength moves, three balance moves, stretch. Day A and Day B swap the arm exercise and the walking drill; everything else is the same. Every move has six levels — start at L1 and move one exercise up when it has felt easy twice in a row. Stop and sit down for chest pain or pressure, dizziness, or breathlessness that doesn't settle in a minute — and tell someone.",
  variants: ["Day A", "Day B"],
  variantTags: ["wall press-up · heel-to-toe walk", "band row · sideways walk"],
  variantMode: "alternate",
  sched: { freq:"weekly", days:[1,3,5] },
  blocks: [
    /* ---- warm-up ---- */
    {group:"Warm-up — standing at the counter", name:"Head turns", mode:"time", sec:30,
     dose:"30 sec · slow",
     detail:"Stand tall with your feet hip-width apart and one hand resting lightly on the counter. Keep your shoulders down and your chin level. Slowly turn your head to look over your right shoulder — take about three seconds to get there — pause, then turn to look over your left shoulder. Do that four or five times. Then, keeping your face forward, tip your right ear toward your right shoulder, pause, and tip your left ear to your left shoulder, four or five times. Breathe normally throughout.",
     cue:"Small and slow. Nothing here should pull or pinch — if it does, make the movement smaller. Don't roll the head in circles, and don't tip it backwards.",
     link:{label:"Pictures — NHS neck rotation & neck stretch", url:NHS_FLEX}},
    {name:"Trunk rotations", mode:"time", sec:30,
     dose:"30 sec · slow",
     detail:"Feet a little wider than your hips, knees slightly bent, so you feel planted. Cross your arms over your chest, hands on opposite shoulders. Keeping your hips and knees facing the front, turn your chest and shoulders gently to the right as far as is comfortable, pause for a breath, then turn to the left. Keep going, slowly, for the thirty seconds — about eight turns each way. Let your eyes follow your chest.",
     cue:"A loosening, not a stretch. Turn only as far as is easy; the hips stay still and the movement comes from the middle of the back. If your lower back complains, make it smaller.",
     link:{label:"Pictures — NHS sideways bend & rotation", url:NHS_FLEX}},
    {name:"Ankle circles", mode:"time", sec:20, sides:2,
     dose:"20 sec each foot",
     detail:"One hand on the counter. Shift your weight onto one leg and lift the other foot an inch or two off the floor — or rest the toes on the floor if that is steadier. Draw slow circles with the toes: five circles one way, then five the other way. Make the circles as big as the ankle allows. The app will tell you when to swap to the other foot.",
     cue:"Wakes up the ankles before the balance work later. If lifting the foot feels wobbly, keep the toes touching the floor and circle the heel instead.",
     link:{label:"Pictures — Otago manual, ankle movements", url:OTAGO}},
    {name:"Heel-toe rocks", mode:"time", sec:30,
     dose:"30 sec · both hands on the counter",
     detail:"Both hands on the counter, feet hip-width apart. Rise up onto the balls of both feet so your heels leave the floor, pause a second at the top, then lower and keep going: rock back onto your heels so your toes lift off the floor, pause, and rise onto your toes again. Slow and even — about two seconds each way — for the thirty seconds.",
     cue:"Feel the calves working on the way up and the shins on the way back. Keep the ankles straight rather than rolling out onto the outside of the foot.",
     link:{label:"Pictures — Otago manual, calf & toe raises", url:OTAGO}},
    {name:"Easy sit-to-stands", mode:"reps", target:"5 easy reps", est:40,
     dose:"5 reps · half effort, hands on thighs",
     detail:"A sturdy chair with its back against the wall so it cannot slide. Sit toward the front of the seat, feet flat on the floor and slightly behind your knees, shoulder-width apart. Put your hands on your thighs. Lean your chest forward over your toes, push down through your feet and stand all the way up. Then sit back down slowly, reaching for the seat with your bottom rather than dropping. Five easy ones — this is a rehearsal for the real thing in a minute, not the exercise itself. Tap the dial when you're done.",
     cue:"The chair against the wall is not optional. If you need to push on your thighs to get up, do — that's fine here.",
     link:{label:"Pictures — NHS sit-to-stand", url:NHS_STRENGTH}},

    /* ---- strength ---- */
    {group:"Strength — leave two or three reps in the tank", name:"Sit-to-stand", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:45,
     dose:"2 sets of 8–10 · 45 sec rest between",
     levels:[
       "L1 — hands on thighs, slow. Sit toward the front of the chair (back against the wall), feet flat and shoulder-width, slightly behind the knees. Hands on your thighs. Lean the chest forward over the toes, push through the feet and stand fully upright — hips straight, tall. Then bend at the hips first and lower yourself slowly, reaching for the seat, and sit with control. Even pace both ways, breathing out as you stand. If you need to push on your thighs, that IS this level — no shame in it.",
       "L2 — arms crossed. Same chair, same feet. Cross your arms over your chest, hands on opposite shoulders, so the legs do all the work. Lean forward, stand tall, sit slowly. Aim for the same even pace as L1. If you can't stand without the hands yet, stay on L1 another week.",
       "L3 — fast up, slow down. Arms crossed. Lean forward and stand up as QUICKLY as you safely can — drive hard through the feet — then sit down SLOWLY, counting one-two-three on the way down, and land softly. The fast stand is the power part; it is what keeps you quick on your feet when you trip. Rest a breath between reps if you need to.",
       "L4 — holding a weight. Hold something heavy against your chest with both hands: a 2–3 kg bag of rice or flour, a big book, a full 2-litre bottle. Fast up, slow down, exactly as L3. Feet flat throughout, chest forward before you push.",
       "L5 — lower seat. Take a cushion off, or use a lower chair (a sofa or a bed is fine if it doesn't sag), still holding the weight. Lower seat means a deeper knee bend and more work. Fast up, three seconds down.",
       "L6 — one leg does most of the work. Arms crossed, ordinary chair. Slide one foot forward a little so it can only help, and stand mostly through the other leg; lower slowly the same way. Five on the right leg, then five on the left. This is close to a single-leg squat — hand near the counter the first few times."],
     cue:"The most important move in the whole session. Feet flat, chest forward over the toes before you push, knees pointing the same way as the toes and never falling inward. Never drop into the seat — land it softly. Breathe out as you stand.",
     link:{label:"Pictures — NHS sit-to-stand", url:NHS_STRENGTH}},
    {name:"Counter mini-squat", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:40,
     dose:"2 sets of 8–10 · 45 sec rest",
     levels:[
       "L1 — both hands, a quarter of the way. Face the counter with both hands resting on it, feet hip-width apart and pointing straight ahead. Stand tall. Bend the knees and push the hips back a little — a quarter of the way down, as if you were about to sit but changed your mind — keeping your heels flat and your back straight. Pause, then push through the feet to stand tall again. Slow both ways: two seconds down, two up.",
       "L2 — fingertips, halfway. Only your fingertips on the counter, for balance rather than support. Bend to about halfway to a chair — thighs at maybe 45° — hold for one second, then stand. Heels stay flat on the floor; if they lift, don't go as deep.",
       "L3 — no hands. Hands hovering just above the counter, or held out in front of you. Same halfway depth, same slow control, one-second pause at the bottom.",
       "L4 — holding a weight. Hold the bag of rice or the bottle against your chest with both hands. Halfway depth, slow and controlled, pause at the bottom. Hands near the counter can't happen with a weight, so make sure the counter is still within a step.",
       "L5 — slower, deeper. With the weight: take three seconds to lower to chair height (thighs nearly level, only if the knees are happy), pause for two seconds at the bottom, then stand. The pause is the hard part.",
       "L6 — split stance. One foot a step ahead of the other, weight even between them, hands hovering by the counter. Bend both knees so the back knee drops toward the floor and the front thigh comes toward level, then push back up. Eight to ten on one side, then swap the front foot. Add the weight at the chest once that is steady."],
     cue:"Back straight, chest up, heels down, knees tracking over the toes and never collapsing inward. Only as deep as is comfortable — the knees should never complain, and a small clean squat beats a deep messy one.",
     link:{label:"Pictures — NHS mini-squats", url:NHS_STRENGTH}},
    {name:"Calf raise", mode:"reps", target:"10–12 reps", sets:2, rest:30, est:40,
     dose:"2 sets of 10–12 · 30 sec rest",
     levels:[
       "L1 — both feet, both hands. Both hands on the counter, feet hip-width, standing tall. Push through the balls of the feet and rise up as high as you can onto your toes, keeping the ankles straight (don't roll outward). Pause for a second at the top, then lower slowly — two seconds — until the heels touch. Keep the knees straight but not locked.",
       "L2 — one hand, slower. One hand on the counter. Rise up, hold the top position for two full seconds, then take three seconds to lower. The slow lowering is what builds the muscle.",
       "L3 — one leg at a time. One hand on the counter. Lift one foot off the floor (tuck it behind the other ankle) and do all the reps on the standing leg: rise, pause, lower slowly. Ten to twelve on the right, then ten to twelve on the left. This is a big jump — it's fine to do fewer reps at first.",
       "L4 — one leg, fingertips. Same single-leg raise, fingertips only on the counter for balance. Full height at the top, two-second pause, slow lowering.",
       "L5 — one leg, holding a weight. Hold the bag or bottle in the hand away from the counter, fingertips of the other hand on the counter. Single-leg raise, slow and full.",
       "L6 — off a step. Stand with the ball of one foot on the bottom stair (rail in reach) and let the heel drop below the step so the calf stretches, then rise up as high as you can, pause, and lower slowly through the full range — four seconds down. One leg at a time, holding the rail lightly."],
     cue:"Slow up, slower down. Strong calves are what make walking, stairs and catching a stumble feel easy. If you feel it in the Achilles tendon at the back of the heel rather than the calf muscle, do fewer and stop before it aches.",
     link:{label:"Pictures — NHS calf raises", url:NHS_STRENGTH}},
    {name:"Standing hip abduction", mode:"reps", target:"8–10 per side", sides:2, sets:2, rest:30, est:30,
     dose:"2 sets of 8–10 each leg · 30 sec rest",
     levels:[
       "L1 — holding on with both hands. Stand tall behind a chair or side-on to the counter, both hands holding on. Keeping your body upright and the knee straight, lift one leg out to the side a few inches — toes pointing forward, not up — then bring it back to the middle with control. Don't swing it: lift, pause, lower. All the reps on one side, then the other. The standing leg's hip stays still; if you feel yourself leaning away, the leg is going too high.",
       "L2 — fingertips, higher. Fingertips only on the counter. Lift a little higher — as far as you can WITHOUT leaning — and pause for one full second out to the side before lowering.",
       "L3 — a band or an ankle weight. A loop band around both ankles, or a light ankle weight (1–2 kg), fingertips on the counter. Same slow lift-pause-lower against the resistance.",
       "L4 — no hands. Band on, hands off the counter (hovering near it). Now the standing leg has to balance as well as the moving leg has to lift. Slow and small beats big and wobbly.",
       "L5 — stronger band, longer pause. The next-stronger band or a heavier ankle weight, no hands. Two-second pause out to the side, three seconds to bring the leg back in.",
       "L6 — twelve reps, then hold. Strong band, no hands, twelve slow reps each side, and on the last rep hold the leg out for ten seconds before lowering. The standing hip is doing as much work as the moving one."],
     cue:"Don't lean away from the lifting leg — the body stays upright and the movement is small. This is the muscle that keeps your pelvis level when you walk, which is the muscle that stops sideways falls.",
     link:{label:"Pictures — NHS sideways leg lift", url:NHS_STRENGTH}},
    {variant:0, name:"Wall press-up", mode:"reps", target:"8–10 reps", sets:2, rest:45, est:40,
     dose:"2 sets of 8–10 · 45 sec rest · Day A",
     levels:[
       "L1 — on the wall. Stand facing a wall, about an arm's length away, feet hip-width. Put your palms flat on the wall at chest height, a little wider than your shoulders, fingers pointing up. Keeping your body in one straight line from head to heels, bend the elbows and let your chest come toward the wall — elbows pointing down-and-back, not out to the sides — until your nose is near the wall. Then push back to straight arms. Two seconds in, two seconds out. Breathe in going toward the wall, out pushing away.",
       "L2 — feet further back. Take a step back so your body leans further into the wall and more of your weight is on your hands. Same straight line, same elbow path.",
       "L3 — hands on the counter. Stand facing the kitchen counter, hands on its edge shoulder-width apart, feet back so your body is a straight diagonal. Lower your chest toward the counter, elbows tucked, then push back up. A steeper angle, so noticeably more work.",
       "L4 — counter, slow. Same position; take three seconds to lower, pause an inch from the counter, then push up briskly.",
       "L5 — hands on a lower surface. A sturdy chair seat pushed against the wall, or the second stair: hands on it, body straight, lower and push. The lower the hands, the harder it is. Someone nearby the first time.",
       "L6 — press-ups on the knees. On a mat or carpet: hands under the shoulders, knees on the floor, body straight from head to knees. Lower the chest to a fist's height from the floor, push back up. Eight to ten. From here, straight-leg press-ups are the next step if you ever want them."],
     cue:"Elbows tucked toward your sides rather than flared out. Body in one straight line — no sagging at the hips, no sticking the bottom out. Neck long, eyes on the wall not the floor.",
     link:{label:"Pictures — NHS wall press-up", url:NHS_STRENGTH}},
    {variant:1, name:"Band row", mode:"reps", target:"10–12 reps", sets:2, rest:45, est:45,
     dose:"2 sets of 10–12 · 45 sec rest · Day B",
     levels:[
       "L1 — seated, band around the feet. Sit tall on the chair with your legs straight out in front and the middle of the band looped around the soles of both feet. Hold one end in each hand, arms straight, palms facing each other. Sit up tall — imagine a string pulling the top of your head to the ceiling. Pull both hands back toward your ribs, elbows brushing past your sides, and squeeze the shoulder blades together at the end. Pause for a second, then let the arms straighten slowly over two or three seconds. Keep the shoulders down away from the ears.",
       "L2 — shorter band. Hold the band further along so there is more tension from the start, or use the next-stronger band. Same tall posture, same squeeze and slow release.",
       "L3 — one arm, with a weight. Stand beside the counter with one hand flat on it, feet apart, then hinge forward from the hips (back flat, like a tabletop) with a dumbbell or a full bottle hanging from the other hand. Pull the weight up to your hip, elbow going straight back past your ribs, squeeze, and lower slowly. Ten each side.",
       "L4 — heavier, with a pause. Same single-arm row with a heavier weight (a 2–4 kg dumbbell or a bag of rice in a strong carrier bag). Pause for one full second at the top of every rep.",
       "L5 — standing bent-over band row. Stand on the middle of the band, feet hip-width, hinge forward from the hips with a flat back and soft knees, an end of the band in each hand. Row both hands to the hips, squeeze, lower slowly. Twelve reps. The back stays flat throughout — if it rounds, stand taller.",
       "L6 — heavy single-arm, slow. The heaviest weight you can row with a still body: pull up briskly, hold one second, then take three seconds to lower. Ten each side, hand on the counter, no twisting."],
     cue:"Squeeze the shoulder blades, don't shrug the shoulders toward the ears. Long neck, chest open, back flat. This is the posture muscle — it fights the forward stoop.",
     link:{label:"Pictures — NHS bicep curls (same seated setup)", url:NHS_STRENGTH}},

    /* ---- balance ---- */
    {group:"Balance — within reach of the counter, eyes on a fixed spot", name:"Tandem stance", mode:"time", sec:20, sides:2, sets:2,
     dose:"20 sec each way × 2 · heel to toe",
     levels:[
       "L1 — both hands on the counter. Stand side-on to the counter with both hands resting on it. Put one foot directly in front of the other so the heel of the front foot touches the toes of the back foot, as if standing on a tightrope. Stand tall, look straight ahead at one fixed spot on the wall, and hold still for the count. The app will tell you to swap which foot is in front.",
       "L2 — one hand. Same heel-to-toe line, one hand on the counter, the other relaxed by your side.",
       "L3 — fingertips. Just the fingertips of one hand resting on the counter — enough to steady, not to lean on. Then hovering an inch above the counter when that is easy.",
       "L4 — no hands. Hands at your sides or out like a tightrope walker, an inch from the counter so you can grab it. Eyes on the fixed spot; breathe normally — people hold their breath here.",
       "L5 — eyes closed, hand back on. Put your fingertips back on the counter and CLOSE YOUR EYES for the hold. The balance now has to come from the feet and the inner ear alone. Open your eyes the moment you feel unsure.",
       "L6 — eyes closed, no hands — or on a folded towel. Either: eyes closed with hands hovering by the counter; or, eyes open, heel-to-toe on a folded bath towel so the ground gives under you. Both are hard. Someone nearby the first time you try either."],
     cue:"Look straight ahead at one spot, not down at your feet. Stand tall. If you wobble, that's the exercise working — take the hand back to the counter and carry on. Never let go entirely until it is truly easy.",
     link:{label:"Pictures — Otago manual, tandem stance (p. 34)", url:OTAGO}},
    {name:"Single-leg stand", mode:"time", sec:15, sides:2, sets:2,
     dose:"15 sec each leg × 2",
     levels:[
       "L1 — fingertips on the counter. Stand tall side-on to the counter, fingertips of one hand resting on it. Shift your weight onto one leg, keep that knee soft (not locked), and lift the other foot a few inches off the floor — bend the knee so the foot hangs behind you. Hold for the count, looking at a fixed spot ahead. Put the foot down; the app will tell you to swap legs.",
       "L2 — one finger. The same, with just one fingertip touching the counter. Keep the hips level — don't let the standing hip stick out sideways.",
       "L3 — no hands. Hands relaxed at your sides, an inch from the counter. Tall, still, breathing.",
       "L4 — no hands, head turns. Standing on one leg without hands, turn your head slowly to the right, then to the left, then look up and down, while keeping the balance. Each turn takes a couple of seconds.",
       "L5 — eyes closed, fingertips on. Fingertips back on the counter, eyes closed, standing on one leg for the count. Open the eyes and grab the counter if you start to tip.",
       "L6 — on a folded towel, no hands. Stand on a folded bath towel on the floor (a soft surface makes the ankle work much harder), lift one foot, no hands, eyes open. Then the head turns on the towel, if that ever becomes easy."],
     cue:"Hips level — don't let the standing hip stick out to the side. A wobble is fine; a grab is fine. Never let go entirely until it is truly easy.",
     link:{label:"Pictures — NHS one-leg stand", url:NHS_BALANCE}},
    {variant:0, name:"Heel-to-toe walk", mode:"time", sec:40,
     dose:"40 sec · along the counter and back · Day A",
     levels:[
       "L1 — one hand trailing along the counter. Stand at one end of the counter with one hand resting on it. Walk forward slowly, placing the heel of one foot directly in front of the toes of the other so they touch, as if along a line on the floor. Look ahead, not down. Take about six to eight steps, turn round carefully (small steps, hand on the counter), and come back the other way with the other hand trailing. Keep going for the forty seconds.",
       "L2 — fingertips only. Same walk, fingertips brushing the counter rather than resting on it.",
       "L3 — no hands. Arms out to the sides like a tightrope walker — that is exactly right. Stay within a step of the counter.",
       "L4 — backwards, hand on the counter. Walk heel-to-toe BACKWARDS: the toes of the stepping foot go behind the heel of the standing foot. Hand on the counter the whole way; this is much harder than it sounds.",
       "L5 — backwards, fingertips. Backwards heel-to-toe with fingertips only, then with hands hovering.",
       "L6 — forwards, no hands, with a task. No hands, heel-to-toe, while turning your head left and right, or while carrying a cup of water without spilling it. Someone near the first time."],
     cue:"Eyes forward, not down. Arms out like a tightrope walker is exactly right. Slow — speed is not the point, control is.",
     link:{label:"Pictures — NHS heel-to-toe walk", url:NHS_BALANCE}},
    {variant:1, name:"Sideways walk", mode:"time", sec:40,
     dose:"40 sec · along the counter and back · Day B",
     levels:[
       "L1 — hand on the counter. Face the counter with one hand resting on it, feet together, knees slightly bent. Step sideways with one foot, then bring the other foot to meet it — step, together, step, together — about ten steps along the counter, then ten steps back the other way. Stay facing the counter; hips level; don't let the feet cross.",
       "L2 — fingertips, bigger steps. Fingertips only, slightly bigger steps, knees a little more bent so you are lower and steadier.",
       "L3 — no hands, then the grapevine. Hands hovering by the counter for the plain sideways walk. Then the grapevine: step sideways, and bring the trailing foot across in FRONT of the leading foot; step sideways again, and bring it across BEHIND. Five each way, with a hand back on the counter for this part.",
       "L4 — grapevine, no hands. The crossing steps with hands hovering. Slow. Turn carefully at the ends.",
       "L5 — sideways walk with a band. A loop band around both ankles, hand on the counter: the plain step-together sideways walk against the band's pull, ten each way. The band makes the outer hip work on every step.",
       "L6 — grapevine with the band, no hands. The crossing steps against the band, hands hovering. Hard on the hips and the balance at once; keep it slow."],
     cue:"Stay facing the counter, hips level, no leaning. Sideways stepping is the balance nobody practises and the one falls test first.",
     link:{label:"Pictures — NHS sideways walking & grapevine", url:NHS_BALANCE}},
    {name:"Step-ups on the bottom stair", badge:"opt", mode:"reps", target:"5 each leg", sides:2, est:30,
     dose:"5 each leg · optional, if there is a stair with a rail",
     levels:[
       "L1 — bottom stair, hand on the rail. Stand facing the stairs with a hand on the rail. Step up onto the bottom stair with the right foot, then bring the left foot up beside it. Step back down with the right foot first, then the left, slowly. Five leading with the right, then five leading with the left.",
       "L2 — fingertips on the rail. Same, with the hand only brushing the rail.",
       "L3 — no hands. Hands by your sides, rail within reach. Slow and controlled, especially coming down.",
       "L4 — two stairs. Step up onto the second stair (a bigger knee bend), hand on the rail. Five each leg.",
       "L5 — bottom stair, holding a weight. The bag of rice or the bottle held at your chest, one hand free for the rail. Five each leg, then eight.",
       "L6 — slow lowering. Step up onto the bottom stair, then lower the trailing foot back to the floor over three slow seconds, touching down softly. The slow lowering is the hardest part of stairs and the part that protects the knees. Eight each leg."],
     cue:"Slow and controlled, especially coming down. Skip it if there's no rail.",
     link:{label:"Pictures — NHS step-up", url:NHS_BALANCE}},

    /* ---- cool-down ---- */
    {group:"Cool-down", name:"Calf stretch at the wall", mode:"time", sec:30, sides:2,
     dose:"30 sec each leg",
     detail:"Stand facing the wall, both hands flat on it at shoulder height. Step one foot back about a stride, keeping that back leg straight, the heel flat on the floor and the toes pointing at the wall. Bend the front knee and lean your hips toward the wall until you feel a gentle pull in the calf of the back leg. Hold still and breathe slowly — the app counts the thirty seconds — then swap legs. If you feel nothing, step the back foot a little further away; if it's sharp, come forward a little.",
     cue:"A comfortable pull, never a sharp one. Breathe slowly. Keep the back heel down — the stretch disappears the moment it lifts.",
     link:{label:"Pictures — NHS calf stretch", url:NHS_FLEX}},
    {name:"Standing hamstring stretch", mode:"time", sec:30, sides:2,
     dose:"30 sec each leg",
     detail:"Stand side-on to the counter with one hand on it. Put one heel forward on the floor about a foot in front of you, toes pointing up, that leg straight. Bend the other knee a little, then push your hips backwards and tip forward from the hips — chest tall, back flat, as if you were bowing — until you feel the pull along the back of the front thigh. Rest your free hand on the bent thigh. Hold and breathe; then swap legs.",
     cue:"Three slow breaths, and that's the session. Well done. Tip from the hips, not the shoulders — rounding the back doesn't stretch the hamstring.",
     link:{label:"Pictures — Otago manual, flexibility exercises", url:OTAGO}}
  ]
},

{
  id: "moments",
  name: "Balance minute",
  short: "Balance",
  accent: "#5BC9BC",
  sub: "Two minutes at the counter for the days in between — while the kettle boils is perfect. The same two holds as the session, with the same six levels, so what you practise here shows up there.",
  sched: { freq:"onDemand" },
  blocks: [
    {name:"Tandem stance", mode:"time", sec:30, sides:2,
     dose:"30 sec each way · heel to toe",
     levels:[
       "L1 — both hands on the counter. Side-on to the counter, one foot directly in front of the other, heel touching toe. Stand tall, eyes on one spot ahead, and hold. Swap which foot is in front when the app says.",
       "L2 — one hand on the counter.",
       "L3 — fingertips only, then hovering an inch above the counter.",
       "L4 — no hands, arms out to the sides.",
       "L5 — eyes closed, fingertips back on the counter.",
       "L6 — eyes closed with hands hovering, or eyes open on a folded towel."],
     cue:"Eyes on one spot ahead. A hand back to the counter the moment you need it.",
     link:{label:"Pictures — Otago manual, tandem stance", url:OTAGO}},
    {name:"Single-leg stand", mode:"time", sec:20, sides:2,
     dose:"20 sec each leg",
     levels:[
       "L1 — fingertips on the counter. Weight on one leg, knee soft, the other foot lifted a few inches and hanging behind you. Hold, eyes ahead.",
       "L2 — one finger on the counter.",
       "L3 — no hands, hips level.",
       "L4 — no hands, with slow head turns left and right.",
       "L5 — eyes closed, fingertips on the counter.",
       "L6 — on a folded towel, no hands."],
     cue:"Hips level, stand tall.",
     link:{label:"Pictures — NHS one-leg stand", url:NHS_BALANCE}}
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
     detail:"A sturdy armless chair with its back against the wall. Sit in the middle of the seat, feet flat on the floor about shoulder-width apart, arms crossed over your chest with hands on opposite shoulders. On the beep, stand fully up (hips and knees straight) and sit fully back down, and keep going as fast as you safely can for 30 seconds. Count the full stands; if you are more than halfway up when the time ends, count that one too. If you need to push with your arms to get up, the score is 0 — write that down, it's the starting point, and it will change.",
     cue:"Average for 65–69: men 12–18, women 11–16. For 70–74: men 12–17, women 10–15. A change of one is noise; two or three is real."},
    {group:"2 · Timed up-and-go", name:"Up, walk, turn, back, sit", mode:"reps", target:"time it", est:40,
     dose:"one go · someone times it",
     detail:"Put a mark on the floor (a strip of tape, a slipper) 3 metres — about 10 feet, or four big strides — from the front of the chair. Sit with your back against the chair. On 'go', without using your arms: stand up, walk at your normal everyday pace to the mark, turn round, walk back, and sit down. The stopwatch runs from the word 'go' until you are sitting again. Tap the dial when it's done and write the seconds in a note.",
     cue:"Typical for 60–69 is about 8 seconds, 70–79 about 9. Over 12 seconds is the level clinics take seriously. Compare with your own last number more than with the table."},
    {group:"3 · Four-stage balance — 10 seconds each, stop at the first you can't hold", name:"Feet together", mode:"time", sec:10,
     dose:"10 sec · feet side by side",
     detail:"Stand with your feet together, side by side and touching, hands off the counter but close enough to grab it. Hold still for the count.",
     cue:"Moving the feet or grabbing the counter ends the stage."},
    {name:"Semi-tandem", mode:"time", sec:10,
     dose:"10 sec · one foot half a step ahead",
     detail:"Move one foot half a step forward so that the instep (the inside arch) of the front foot is touching the big toe of the back foot. Hands off, close to the counter. Hold.",
     cue:"Hands off, close to the counter."},
    {name:"Tandem", mode:"time", sec:10,
     dose:"10 sec · heel to toe",
     detail:"One foot directly in front of the other, the heel of the front foot touching the toes of the back foot. Hands off. Hold for the count.",
     cue:"Not managing this one for 10 seconds is the finding clinics act on — it means the balance work is exactly the right thing to be doing."},
    {name:"One leg", mode:"time", sec:10,
     dose:"10 sec · standing on one foot",
     detail:"Lift one foot clear of the floor and stand on the other. Hands off, close to the counter. Hold.",
     cue:"Write down the highest stage you held for the full 10 seconds."},
    {group:"4 · Single-leg stance — how long?", name:"One leg, as long as you can", mode:"reps", target:"time it", sides:2, est:40,
     dose:"one go each leg · someone times it",
     detail:"Eyes open, hands off the counter, arms relaxed at your sides. Lift one foot and stand on the other for as long as you can, up to 30 seconds. The clock stops when the lifted foot touches down, the standing foot hops or shifts, or a hand touches the counter. Tap the dial when done and write the seconds down; then the other leg.",
     cue:"Typical for 60–69 is around 25 seconds, 70–79 around 17. Use the same shoes and the same spot every time and compare with yourself."}
  ]
}
];
