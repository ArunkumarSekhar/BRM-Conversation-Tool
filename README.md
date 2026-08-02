# CCF Conversation Trainer

A mobile-friendly web app for practicing Blue Ribbon Movement's Community
Connect Fellowship outreach conversations, built from the internal
"Conversation Flow Guide" document (v3.2).

## What it does

- Pick a flow: **Direct** (pitching a young changemaker) or **Partners**
  (pitching an org/SPO lead who manages volunteers).
- Pick how the conversation starts: **Online/Cold** (DM, email, LinkedIn) or
  **Offline/Warm** (event, coffee, a scheduled call). For online, pick who
  started it and which real-world situation applies (friend referral, they
  already applied, met at an event, etc.) — each has its own branching
  dialogue tree straight from the doc.
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
different, deeper mode: a full six-phase call against a live clock.

- **The clock is real.** Each choice costs minutes, and the budget is
  randomised — 10, 30, or 60 minutes, with harder difficulties far more
  likely to hand you the squeezed 10-minute call. If you burn the budget on
  small talk and a full deck walkthrough, they drop off before you ever
  make an ask. A 10-minute call is winnable, but only with radical
  compression; 30 minutes lets you ask three or four discovery questions,
  not all six.
- **You know almost nothing going in.** Each run picks one of five partner
  organisations. You see the org name and sector; their size, cadence,
  existing training, what happens to volunteers after a year, whether
  someone comes to mind to nominate, who actually decides, and any past
  partnership baggage are all hidden until you ask. A strip at the top
  tracks what you have learned.
- **Six phases**: opening, agenda (where the time constraint lands),
  explaining BRM/CCF — gated by what they already know, so checking first
  saves you five minutes — their programme, your programme, the ask, and
  the close.
- **The ask is a ladder.** Turned-away applicants cost them nothing, past
  volunteers cost a little, currently-active volunteers are the real ask.
  Laddering upward scores; going straight for their active people does not.
  If you ask for a number, the size is checked against their actual
  volunteer count — and naming a number without having asked their size
  reads exactly as badly as it would on a real call.
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
  "initiated by us" and "initiated by them".
- `src/data/discovery/{direct,partners}.ts` — the Discovery Routing tables
  and Discovery Checklists.
- `src/data/scoring.ts` — difficulty tuning (rapport deltas, objection
  count per difficulty).
- `src/game/engine.ts` — builds a run's step sequence: resolves the entry
  branch, samples objections, wires up discovery→pitch routing, evaluates
  close bands.
- `src/game/random.ts` — weighted pick / shuffle / sample helpers.
- `src/data/partnersCall/persona.ts` — the five partner organisations, their
  hidden attributes, and the three time budgets.
- `src/data/partnersCall/beats.ts` — the six-phase call content, with a
  minute cost and a rapport quality on every option (plus `rushedQuality`
  overrides, so the right answer changes when the clock is against you).
- `src/game/callEngine.ts` — the call state machine: time budget, fact
  discovery, ask-size calibration, authority-aware close evaluation.

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
