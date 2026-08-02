import type { EntryScenario, InitiatedBy } from '../types';

const us: EntryScenario[] = [
  {
    id: 'cold-outreach',
    label: 'Cold outreach — LinkedIn or email',
    context: "You've found an SPO/NGO manager whose org runs a youth volunteer program.",
    usOpening: `Hi [Name], I've been following what [org] has been doing in [space], particularly [specific initiative]. I'm [Name] from Blue Ribbon Movement. We run Community Connect Fellowship, a three month civic leadership program for young people in Mumbai. I think there's meaningful overlap in what we're each trying to do for young people in the sector. Would you be open to a twenty minute conversation?`,
    branches: [
      {
        id: 'happy-to-connect',
        themLine: 'Yes, happy to connect.',
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Great — would a call work, or would you rather exchange notes here first?' },
          { id: 'b', quality: 2, text: '[Sends the full spoken-style pitch straight over text]' },
          { id: 'c', quality: 1, text: 'Great — when can we schedule the nomination call?' },
        ],
        reactions: {
          3: "Let's exchange notes here first, so the call can be more specific.",
          2: 'Okay... that was a lot for a first message.',
          1: "We haven't even talked yet — slow down.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'tell-me-more-first',
        themLine: 'Tell me more here first, so we can make a call more specific.',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: '[Sends the written pitch, then waits for their response without over-explaining]' },
          { id: 'b', quality: 2, text: '[Sends the full spoken-style pitch, quite long for a text exchange]' },
          { id: 'c', quality: 1, text: "I'd rather just explain it on a call." },
        ],
        reactions: {
          3: 'Okay, that helps. How do you see this happening — any specific asks?',
          2: "That's a lot to read through, but okay.",
          1: 'I did ask for it in writing first.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'whats-in-it-for-us',
        themLine: "What's in it for us?",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "I understand why it seems that way. It's weekends only, so your volunteers stay connected to you the whole time, and there's a higher chance they come back and contribute more, not less. It runs both ways too, cos we send our people to help with your stuff when you need extra hands. And feel free to come to our next event — we'd love to collaborate for not just now, but years to come." },
          { id: 'b', quality: 2, text: 'There\'s a lot in it for you, trust me.' },
          { id: 'c', quality: 1, text: 'Well, what do you think you\'d want out of it?' },
        ],
        reactions: {
          3: 'Okay, that actually answers it. Tell me more about how this would work.',
          2: '...I\'d want specifics, not just "trust me."',
          1: "I'm asking you, not the other way around.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-interested-now',
        themLine: 'Not interested right now.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: 'Completely understand. Would it be okay if I stayed in touch and reached out again next quarter?' },
          { id: 'b', quality: 2, text: 'Okay, no worries, bye.' },
          { id: 'c', quality: 1, text: 'Are you sure? This is a great opportunity for your org.' },
        ],
        reactions: {
          3: "Sure, that's fine — reach out again then.",
          2: '...Okay, bye.',
          1: "Yes, I'm sure. That felt a bit pushy.",
        },
        outcome: { kind: 'end', text: 'Logged for a follow-up next quarter, with an invite to a BRM event in the meantime.' },
      },
    ],
  },
];

const them: EntryScenario[] = [
  {
    id: 'they-reached-out',
    label: 'They reached out asking about a partnership',
    context: "They saw BRM's post or heard about CCF and messaged you directly.",
    usOpening: "Absolutely, glad you reached out. I'd love to know what your org is working on right now, and what you wish your young people came in with more of — skills, confidence, network, framework?",
    branches: [
      {
        id: 'exposure',
        themLine: "We're mainly looking for exposure opportunities for our volunteers.",
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'CCF can do that — fellows work alongside a cohort from across Mumbai, so the cross-org network alone is valuable. What kind of exposure are you looking for specifically?' },
          { id: 'b', quality: 2, text: '[Pitches the skills-development angle instead, not quite matching what they asked]' },
          { id: 'c', quality: 1, text: 'Sure, we can probably do that, I guess.' },
        ],
        reactions: {
          3: 'Mostly exposure to how other orgs run their civic work, honestly.',
          2: "That's not really what I asked, but okay.",
          1: '...Can you be more specific about what "probably" means?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'more-skills',
        themLine: 'We want our volunteers to come back with more skills.',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "That's exactly what CCF is structured to do. The framework side of the fellowship is specifically built for people who already have field experience and want to go deeper — practical skills built across the twelve weeks." },
          { id: 'b', quality: 2, text: "We'll teach them stuff, don't worry." },
          { id: 'c', quality: 1, text: '[Pivots straight to asking for a nomination, without addressing the question]' },
        ],
        reactions: {
          3: 'Okay, that sounds like it actually maps to what we need.',
          2: '...What stuff, specifically?',
          1: "You didn't really answer what I asked.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'formal-partnership',
        themLine: "We're looking for a more formal partnership.",
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "We're open to that. Can you tell me what a formal partnership has looked like for you with other orgs, and what you're looking for with us?" },
          { id: 'b', quality: 2, text: 'Sure, we can sign whatever paperwork you need.' },
          { id: 'c', quality: 1, text: 'That depends on your budget, honestly.' },
        ],
        reactions: {
          3: "Fair — usually it's an MOU with clear terms on both sides.",
          2: "Let's slow down, I haven't told you what I need yet.",
          1: "This isn't really about budget for us.",
        },
        outcome: { kind: 'continue' },
      },
    ],
  },
];

export const partnersEntry: Record<InitiatedBy, EntryScenario[]> = { us, them };

export const partnersOfflineOpenings = [
  {
    id: 'sector-event',
    label: 'At a sector event or meetup',
    usLine: 'What kind of volunteers are you working with right now?',
  },
  {
    id: 'formal-call',
    label: 'Over coffee or a formal call',
    usLine: `Heyyy, thanks for making the time. What does your volunteer development program look like right now, and what do you wish it did that it doesn't?`,
  },
];
