import type { DiscoveryRow } from '../types';

export const partnersDiscoveryRouting: DiscoveryRow[] = [
  {
    id: 'program-gaps',
    question: 'What does your volunteer program look like right now, and what do you wish it did that it does not?',
    why: 'They have people but cannot grow them, or they cannot get enough people — either way, this tells you which half of the pitch to lead with.',
    priority: 3,
    answers: [
      {
        id: 'retention-skills',
        text: 'Struggles with retention or deepening skills.',
        routesTo: 'full',
        framingNote: 'Lead with skills and network — that half of CCF is worth leading with.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
      {
        id: 'supply',
        text: 'Struggles with volunteer numbers or supply.',
        routesTo: 'full',
        framingNote: 'Lead with the exchange — the reciprocal half matters more to them than development.',
        weight: { easy: 1, medium: 2, hard: 2 },
      },
      {
        id: 'fine',
        text: 'Program is running fine, mild curiosity only.',
        routesTo: 'short',
        framingNote: 'No pain surfaced yet. Pitching hard into no pain is how you lose the room — ask again.',
        weight: { easy: 1, medium: 1, hard: 2 },
      },
    ],
  },
  {
    id: 'named-person',
    question: 'Is there someone in your org right now who feels ready for the next level but does not have a vehicle for it?',
    why: 'A named person turns an abstract partnership into a decision about someone real. This is the single most useful question in the call.',
    priority: 3,
    answers: [
      {
        id: 'named',
        text: 'They name a specific person.',
        routesTo: 'full',
        framingNote: 'Frame the pitch around that person, then go straight for the nomination ask.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
      {
        id: 'no-one',
        text: 'No one comes to mind.',
        routesTo: 'short',
        framingNote: 'Ask what would make them confident recommending someone — that tells you what they screen for.',
        weight: { easy: 1, medium: 2, hard: 3 },
      },
    ],
  },
  {
    id: 'decide-worth-time',
    question: 'How do you decide which partnerships are worth your time?',
    why: 'Answering the effort or proof question before they raise it removes the main reason people stall.',
    priority: 2,
    answers: [
      {
        id: 'budget-time',
        text: 'Budget or time concerns.',
        routesTo: 'short',
        framingNote: 'Pre-empt with the logistics objection before they raise it.',
        weight: { easy: 1, medium: 2, hard: 2 },
      },
      {
        id: 'proof',
        text: 'Wants proof or a track record.',
        routesTo: 'short',
        framingNote: 'Pre-empt with ROI or who-else-partners — social proof lands better offered than extracted.',
        weight: { easy: 1, medium: 2, hard: 2 },
      },
      {
        id: 'stretched',
        text: 'Already stretched across many partners.',
        routesTo: 'short',
        framingNote: 'Pre-empt with the exclusivity objection — say early this is not exclusive.',
        weight: { easy: 2, medium: 1, hard: 2 },
      },
    ],
  },
  {
    id: 'past-partnerships',
    question: 'Have you partnered with other orgs on something like this before?',
    why: 'Everything you say is being filtered through a past bad experience if there is one. Surface it or it quietly sinks the call.',
    priority: 2,
    answers: [
      {
        id: 'bad-experience',
        text: 'Mentions a past collaboration that went badly.',
        routesTo: 'short',
        framingNote: 'Surface it directly — expect the bad-experience objection to matter here.',
        weight: { easy: 1, medium: 1, hard: 2 },
      },
      {
        id: 'fine',
        text: 'No major concerns.',
        routesTo: 'full',
        framingNote: 'Clear to proceed with the full pitch.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
    ],
  },
];

export const partnersDiscoveryChecklist = [
  { item: 'What their volunteer program currently looks like', why: 'You cannot position CCF as complementary until you know what it is sitting next to.' },
  { item: 'The specific gap they are trying to solve', why: 'Retention, supply, and skills each need a different version of the same pitch.' },
  { item: 'Whether a name comes to mind to nominate', why: 'A named person converts an abstract partnership into a decision about someone real. Highest value thing you can leave the call with.' },
  { item: 'How they decide whether a partnership is worth their time', why: 'Tells you which objection to pre-empt rather than waiting for it to surface.' },
  { item: 'Roughly how many volunteers they could realistically put forward', why: 'Calibrates the ask. Asking for 10 to 20 from an org with 8 volunteers total reads as not having listened.' },
  { item: 'Any past partnership experience shaping how they are hearing you', why: 'If a previous collaboration went badly, everything you say is being filtered through it. Surface it or it quietly sinks the call.' },
];
