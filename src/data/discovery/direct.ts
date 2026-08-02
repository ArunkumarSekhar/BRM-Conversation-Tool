import type { DiscoveryRow } from '../types';

const vagueFallback = (weight: { easy: number; medium: number; hard: number }) => ({
  id: 'vague',
  text: 'Vague interest, no strong signal either way.',
  routesTo: 'short' as const,
  framingNote: "You don't have enough to personalise yet — a short pitch buys you another question without overloading them.",
  weight,
});

export const directDiscoveryRouting: DiscoveryRow[] = [
  {
    id: 'brings-here',
    question: 'What brings you here today? What kind of work are you doing right now?',
    why: 'Their frustration is the hook. If they name something concrete, the project half of the fellowship is what will land, not the cohort half.',
    priority: 3,
    answers: [
      {
        id: 'specific-gap',
        text: 'A specific frustration or gap in their current work.',
        routesTo: 'full',
        framingNote: 'Lead with the civic project — their frustration is the hook.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
      vagueFallback({ easy: 1, medium: 2, hard: 3 }),
    ],
  },
  {
    id: 'hardest-part',
    question: "What's been the hardest part of that work?",
    why: 'Isolation is the real problem here, not capability. Lead with the room full of people, not the project.',
    priority: 3,
    answers: [
      {
        id: 'isolation',
        text: 'Doing good work but missing structure or people around them.',
        routesTo: 'full',
        framingNote: 'Lead with the cohort — isolation is the real problem, not capability.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
      vagueFallback({ easy: 1, medium: 2, hard: 3 }),
    ],
  },
  {
    id: 'unrealised-idea',
    question: 'Is there something you have wanted to do but not had the structure for?',
    why: 'They have already done the hard part, which is caring about something specific. You are only offering the scaffolding.',
    priority: 3,
    answers: [
      {
        id: 'idea',
        text: 'A specific unrealised idea.',
        routesTo: 'full',
        framingNote: 'Name their idea back to them — they already did the hard part.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
      vagueFallback({ easy: 1, medium: 2, hard: 3 }),
    ],
  },
  {
    id: 'week-weekend',
    question: 'How does your week and weekend usually look?',
    why: 'Better to surface the time problem yourself than have it kill the conversation after the pitch.',
    priority: 2,
    answers: [
      {
        id: 'heavy-commitments',
        text: 'Heavy commitments, exams, or unclear availability.',
        routesTo: 'short',
        framingNote: 'A busy or exams objection is likely coming — expect it in Handle Resistance.',
        weight: { easy: 2, medium: 2, hard: 3 },
      },
      {
        id: 'clear',
        text: 'Comfortably available, no red flags.',
        routesTo: 'full',
        framingNote: 'No timing concerns raised — safe to lead with the full pitch.',
        weight: { easy: 3, medium: 2, hard: 1 },
      },
    ],
  },
];

export const directDiscoveryChecklist = [
  { item: 'Their motivation — why this, why now', why: 'Decides which half of the pitch to lead with, the project or the cohort.' },
  { item: 'What they are currently doing — college, work, volunteering', why: 'Tells you whether this is a first step for them or a deepening of something already running.' },
  { item: 'Weekend availability across the next three months', why: 'Twelve weekends is the actual commitment. Better to find the clash now than after they have applied.' },
  { item: 'Their biggest frustration, ideally something civic and specific', why: 'This becomes their civic project. Without it, the fellowship stays abstract to them.' },
  { item: 'Current commitments that could conflict — exams, other programs, family expectations', why: 'Each of these routes to a different objection block. Exams is timing, family is the parent conversation, other programs is opportunity cost.' },
  { item: 'Any hesitation they have not said out loud yet', why: 'The unspoken hesitation is usually the real one. If you cannot name it by the end of Discovery, ask directly before you pitch.' },
];
