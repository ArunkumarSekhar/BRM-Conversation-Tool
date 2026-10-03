# CCF Conversation Trainer

A mobile-friendly web app for practicing Blue Ribbon Movement's Community
Connect Fellowship outreach conversations, built from the internal
"Conversation Flow Guide" document (v3.4).

## What it does

- Pick a flow: **Direct** (pitching a young changemaker) or **Partners**
  (pitching an org/SPO lead who manages volunteers).
- Pick how the conversation starts. For Partners initiated by you, that's
  **WhatsApp** or **Email**, each with the doc's actual template message and
  its own branches — including a no-reply path that teaches the real
  48-hour / 7-day / 14-day nudge cadence. For Direct, it's the four
  real-world situations from the doc (friend referral, already applied, met
  at an event, found online).
- Set a **difficulty slider** (Easy / Medium / Hard). Harder settings score
  good answers less generously, punish weak ones more, raise more objections
  (2 / 4 / 6, sampled at random from a 15-objection pool per flow), and make
  the prospect more likely to end the conversation early during Entry.
- **Discovery** is a real skill check: pick which question to ask, hear a
  difficulty-weighted answer, and the engine routes to the pitch variant and
  framing the doc says fits that answer.
- **Handle Resistance** draws a random subset of objections each run, each
  with the doc's actual response as the best of three choices.
- **Close** offers all of the doc's legitimate endings (7 for Direct, 6 for
  Partners — apply now, apply later, refer someone, come to an event, stay
  connected, next cohort, not a fit). Picking one checks it against the
  rapport-percentage band the doc says it's appropriate for; asking for more
  than the conversation earned reads as a stretch, asking for less reads as
  underselling.
- Blocks the doc marks `[TO FILL]` (safety protocol, cost/liability
  position, parent one-pager, event dates, selection process, partner
  names, data policy, MOU process) render with a visible "BRM to confirm"
  badge instead of invented specifics.

## The Partners video-call simulation

Choosing **Partners → Offline/Warm → Over coffee or a formal call** runs a
different, deeper mode: a full seven-phase call against a live clock.

- **It opens with recording consent**, exactly as the doc requires — asked
  before anything else is said, scored on whether you ask at all versus
  diving straight into small talk.
- **The clock is real.** Each choice costs minutes, and the budget is
  randomised — 10, 30, or 60 minutes, with harder difficulties far more
  likely to hand you the squeezed 10-minute call. If you burn the budget on
  small talk and a full deck walkthrough, they drop off before you ever
  make an ask. A 10-minute call is winnable, but only with radical
  compression; 30 minutes lets you ask three or four discovery questions,
  not all six.
- **You know almost nothing going in.** Each run picks one of eleven partner
  organisations — patterned on real variety in the sector (a
  volunteer-poor school-assessor org, a peer-support centre with its own
  vocabulary, an alumni-sourced pipeline, a warm best-fit partner, a legacy
  org wary from a bad past partnership, and a deliberate non-fit consulting
  firm that tests whether you recognise when to walk away). You see the org
  name and sector; everything else — size, cadence, training, decision
  authority, who they'd nominate — is hidden until you ask. A strip at the
  top tracks what you've learned, and if a name surfaces, it reshapes both
  your pitch and your ask to be about that person specifically, not "a
  volunteer."
- **The ask is a ladder.** Turned-away applicants cost them nothing, past
  volunteers cost a little, currently-active volunteers are the real ask.
  Laddering upward scores; going straight for their active people does not.
  If you ask for a number, the size is checked against their actual
  volunteer count.
- **The close is checked twice**: against the rapport the call earned, and
  against whether this person can actually say yes. Pushing a same-call
  commitment on someone who needs board or founder sign-off fails even in a
  call that otherwise went well — the right move there is to equip them for
  the approval conversation instead.

## Code layout

- `src/data/types.ts` — the data model (content library blocks, entry
  scenario/branch trees, discovery routing rows).
- `src/data/library/{direct,partners}.ts` — the Content Library: pitches,
  objections, closes, each keyed to the doc's block IDs.
- `src/data/entry/{direct,partners}.ts` — branching entry scenarios for
  "initiated by us" (WhatsApp/Email for Partners) and "initiated by them".
- `src/data/discovery/{direct,partners}.ts` — the Discovery Routing tables
  and Discovery Checklists.
- `src/data/scoring.ts` — difficulty tuning (rapport deltas, objection
  count per difficulty).
- `src/game/engine.ts` — builds a run's step sequence: resolves the entry
  branch, samples objections (with flow-specific reaction tone — casual for
  Direct's 18-25 prospects, measured for Partners' 30-50 org contacts),
  wires up discovery→pitch routing, evaluates close bands.
- `src/game/random.ts` — weighted pick / shuffle / sample helpers.
- `src/data/partnersCall/persona.ts` — eleven partner organisations, their
  hidden attributes, and the three time budgets.
- `src/data/partnersCall/beats.ts` — the seven-phase call content
  (recording consent, opening, agenda, explainer, program, ask, close),
  with a minute cost and a rapport quality on every option (plus
  `rushedQuality` overrides, so the right answer changes when the clock is
  against you).
- `src/game/callEngine.ts` — the call state machine: time budget, fact
  discovery, named-person pitch/ask personalisation, ask-size calibration,
  authority-aware close evaluation.

## Run it

```bash
npm install
npm run dev
```

## Build for deployment

```bash
npm run build
```

Outputs a static site in `dist/` — deployable to any static host (Vercel,
Netlify, GitHub Pages, etc.), no backend required.

