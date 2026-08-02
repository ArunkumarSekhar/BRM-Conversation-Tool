import { tofill } from '../types';
import type { FactKey, PartnerPersona } from './persona';

export type Phase = 'opening' | 'agenda' | 'explainer' | 'discovery' | 'program' | 'ask' | 'close';

export const PHASE_LABEL: Record<Phase, string> = {
  opening: 'Opening',
  agenda: 'Agenda',
  explainer: 'Explaining BRM & CCF',
  discovery: 'Their program',
  program: 'Our program',
  ask: 'The ask',
  close: 'Close',
};

export interface CallOption {
  id: string;
  text: string;
  /** minutes this consumes from the call budget */
  minutes: number;
  /** rapport quality in a normal-length call */
  quality: 3 | 2 | 1;
  /** overrides quality when the call is the 10-minute rushed variant */
  rushedQuality?: 3 | 2 | 1;
  /** fact this option surfaces, for discovery questions */
  reveals?: FactKey;
  /** coach note shown after the choice resolves */
  note?: string;
}

export interface Beat {
  id: string;
  phase: Phase;
  /** narration or the prospect's line that sets up the choice */
  prompt: string;
  promptIsProspect: boolean;
  options: CallOption[];
}

// ---------------------------------------------------------------------------
// Phase 1 — Opening
// ---------------------------------------------------------------------------

export function openingBeat(persona: PartnerPersona): Beat {
  return {
    id: 'opening',
    phase: 'opening',
    prompt: `${persona.contactRole} at ${persona.orgName} joins the call. "Hi — good to finally put a face to the name."`,
    promptIsProspect: true,
    options: [
      {
        id: 'warm',
        text: "Likewise! How've you been? How's things at [org] this month — anything big on?",
        minutes: 2,
        quality: 3,
        rushedQuality: 1,
        note: 'Warmth first is right in a normal call — but with ten minutes on the clock it spends time you do not have.',
      },
      {
        id: 'brief',
        text: 'Good to meet you properly. How are things? — then, shall I jump into why I asked for the time?',
        minutes: 1,
        quality: 2,
        rushedQuality: 3,
        note: 'A brief human beat then straight in. Under time pressure this is exactly right.',
      },
      {
        id: 'skip',
        text: '[Skip the pleasantries entirely and start explaining CCF]',
        minutes: 0,
        quality: 1,
        rushedQuality: 2,
        note: 'Efficient, but cold — you have skipped the part that makes them want to help you.',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Phase 2 — Agenda (time gets revealed here)
// ---------------------------------------------------------------------------

export function agendaBeat(rushed: boolean): Beat {
  return {
    id: 'agenda',
    phase: 'agenda',
    prompt: rushed
      ? 'They have just told you the call is much shorter than planned.'
      : 'Time to set up why you asked for the call.',
    promptIsProspect: false,
    options: [
      {
        id: 'compress',
        text: "Completely fine. Let me be efficient then — the one thing I want to land is whether there's a way our fellowship and your volunteers work together. I'll keep it tight and leave you the detail in writing.",
        minutes: 1,
        quality: 2,
        rushedQuality: 3,
        note: 'Naming the compression explicitly buys you goodwill and permission to skip ahead.',
      },
      {
        id: 'full-agenda',
        text: "Here's what I'd like to cover: a bit about BRM and the fellowship, then understand how your volunteer program works, and see whether there's a fit worth building on.",
        minutes: 2,
        quality: 3,
        rushedQuality: 1,
        note: 'A clear agenda is the right move with time in hand — but laying out a four-part plan for a ten-minute call ignores what they just told you.',
      },
      {
        id: 'reschedule',
        text: "Honestly, this deserves more time than that — shall we move it rather than rush it?",
        minutes: 1,
        quality: 1,
        rushedQuality: 2,
        note: 'Respectful, and sometimes correct — but you have them on the phone now, and rescheduling costs you the momentum.',
      },
    ],
  };
}

// ---------------------------------------------------------------------------
// Phase 3 — Explainer
// ---------------------------------------------------------------------------

export const knowledgeCheckBeat: Beat = {
  id: 'knowledge-check',
  phase: 'explainer',
  prompt: 'You have a short deck on BRM and CCF ready to share.',
  promptIsProspect: false,
  options: [
    {
      id: 'ask-first',
      text: "Before I dive in — how much do you already know about BRM and the fellowship? No point me explaining what you've already got.",
      minutes: 1,
      quality: 3,
      reveals: 'ccfKnowledge',
      note: 'One question that saves you five minutes of explaining the wrong thing.',
    },
    {
      id: 'full-deck',
      text: '[Share the deck and walk through the whole thing from the top]',
      minutes: 6,
      quality: 1,
      note: 'You have just spent your most expensive minutes without checking whether any of it was needed.',
    },
    {
      id: 'send-later',
      text: "I'll send the deck after rather than screen-share — let me just tell you the shape of it.",
      minutes: 1,
      quality: 2,
      note: 'Fine, but you still have not found out what they already know.',
    },
  ],
};

export function explainerBeat(knowledge: PartnerPersona['ccfKnowledge']): Beat {
  const prompts: Record<PartnerPersona['ccfKnowledge'], string> = {
    none: 'They know nothing about CCF — this is a blank slate.',
    partial: 'They know BRM vaguely but not the fellowship itself.',
    full: 'They already know the fellowship well and have described it back to you accurately.',
  };

  const optionsByKnowledge: Record<PartnerPersona['ccfKnowledge'], CallOption[]> = {
    none: [
      {
        id: 'short-full',
        text: "CCF runs three months, twelve weekends, for young people who already have a year or two of sector experience. They work on a real civic project in their own neighbourhood while staying with whatever else they're doing. Shall I go deeper or is that enough to work with?",
        minutes: 3,
        quality: 3,
        note: 'The right amount for someone starting from zero, and you handed control back to them.',
      },
      {
        id: 'everything',
        text: '[Walk through the full programme structure, week by week, module by module]',
        minutes: 7,
        quality: 1,
        note: 'Far more than they asked for, and it eats the time you needed for their side.',
      },
      {
        id: 'one-liner',
        text: "It's a three-month fellowship for young people already working in the sector. That's the gist.",
        minutes: 1,
        quality: 2,
        rushedQuality: 3,
        note: 'Thin for a blank slate in a normal call — but exactly right when the clock is against you.',
      },
    ],
    partial: [
      {
        id: 'fill-gap',
        text: "Then let me just fill the gap — the fellowship part is three months, twelve weekends, and each fellow runs a real civic project in their own neighbourhood alongside whatever else they're doing.",
        minutes: 2,
        quality: 3,
        note: 'You built on what they had rather than starting over. That signals you were listening.',
      },
      {
        id: 'restart',
        text: '[Start from the beginning anyway — who BRM is, what we believe, the whole arc]',
        minutes: 6,
        quality: 1,
        note: 'They told you what they knew and you ignored it.',
      },
      {
        id: 'skip-ahead',
        text: "Then you've basically got it — let me get to why I think there's something here for both of us.",
        minutes: 1,
        quality: 2,
        rushedQuality: 3,
        note: 'Efficient. Slightly assumes more knowledge than they actually have.',
      },
    ],
    full: [
      {
        id: 'confirm-move',
        text: "That's exactly right — so I'll skip the explainer entirely and get to why I wanted to talk to you specifically.",
        minutes: 1,
        quality: 3,
        note: "Perfect. They told you they know it, you believed them, and you bought yourself minutes for the part that matters.",
      },
      {
        id: 'explain-anyway',
        text: '[Run through the deck regardless, to be thorough]',
        minutes: 6,
        quality: 1,
        note: 'They just described your own programme back to you accurately and you explained it anyway.',
      },
      {
        id: 'test-them',
        text: "Almost — there are a couple of things people usually get wrong about it, let me correct those.",
        minutes: 2,
        quality: 2,
        note: 'Mildly condescending when they had it right, but not fatal.',
      },
    ],
  };

  return {
    id: 'explainer',
    phase: 'explainer',
    prompt: prompts[knowledge],
    promptIsProspect: false,
    options: optionsByKnowledge[knowledge],
  };
}

export const outcomesBeat: Beat = {
  id: 'outcomes',
  phase: 'explainer',
  prompt: "Okay — and what results have you actually seen from this? I've sat through a lot of pitches about potential.",
  promptIsProspect: true,
  options: [
    {
      id: 'both',
      text: `Fair question. Quantitatively: ${tofill('cohort size, completion rate, projects delivered')}. Qualitatively — one fellow came in barely willing to speak in a group and finished having run door-to-door surveys across her ward. I'd rather show you both than pick one.`,
      minutes: 2,
      quality: 3,
      note: 'Numbers plus a specific person is the combination that survives scrutiny.',
    },
    {
      id: 'story-only',
      text: "We've had some really transformative journeys — people who came in unsure and left running their own projects.",
      minutes: 2,
      quality: 2,
      note: 'Warm, but an org lead who has "sat through a lot of pitches" wanted something harder than this.',
    },
    {
      id: 'defer-honestly',
      text: "Short version: one fellow came in barely willing to speak in a group and finished having run door-to-door surveys across her ward. I'd rather send you the actual numbers after this than quote them badly from memory.",
      minutes: 1,
      quality: 2,
      rushedQuality: 3,
      note: 'One concrete person plus an honest promise to send the data. Under time pressure this is the strongest thing you can do in a minute.',
    },
    {
      id: 'vague',
      text: "The feedback's been overwhelmingly positive across every cohort we've run.",
      minutes: 1,
      quality: 1,
      note: 'This is exactly the potential-talk they just told you they were tired of.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Phase 4 — Bridge + discovery of their programme
// ---------------------------------------------------------------------------

export const bridgeBeat: Beat = {
  id: 'bridge',
  phase: 'discovery',
  prompt: 'Time to turn the call towards them.',
  promptIsProspect: false,
  options: [
    {
      id: 'scale-bridge',
      text: "Here's why I wanted you specifically. We need volunteers at scale through the year, and the ones who do best are already in the sector with an org like yours — they're not starting cold. Which is why I'd rather understand how your program works before I ask you for anything.",
      minutes: 2,
      quality: 3,
      note: 'You earned the right to ask questions by explaining why you are asking them.',
    },
    {
      id: 'straight-ask',
      text: 'So — would you be able to put some volunteers forward for the next cohort?',
      minutes: 1,
      quality: 1,
      note: 'You asked before you listened. Whatever number they give you now will be defensive.',
    },
    {
      id: 'soft-bridge',
      text: 'Anyway — tell me a bit about your volunteer program.',
      minutes: 1,
      quality: 2,
      note: 'Gets you there, but they do not know why you are asking, so the answers will be shallower.',
    },
  ],
};

export interface DiscoveryQuestion {
  id: string;
  reveals: FactKey;
  text: string;
  minutes: number;
  quality: 3 | 2 | 1;
  why: string;
}

export const DISCOVERY_QUESTIONS: DiscoveryQuestion[] = [
  {
    id: 'shape',
    reveals: 'programShape',
    text: 'How is your volunteer program structured right now — roughly how many people, and is it year-round or around specific periods?',
    minutes: 2,
    quality: 3,
    why: 'Size calibrates your ask. Cadence tells you whether CCF competes with their peak or fills their off-season.',
  },
  {
    id: 'training',
    reveals: 'training',
    text: 'What kind of training or induction do you put them through?',
    minutes: 2,
    quality: 3,
    why: 'If they already train well, CCF has to be positioned as additive. If they do not, it is filling a gap they feel.',
  },
  {
    id: 'after-year',
    reveals: 'afterOneYear',
    text: "What tends to happen after someone's been volunteering with you for a year or so?",
    minutes: 2,
    quality: 3,
    why: 'This is where the retention pain lives. If they lose people, you are selling a solution to something that already hurts.',
  },
  {
    id: 'name',
    reveals: 'nameInMind',
    text: "Is there someone in your org right now who feels ready for the next level but doesn't quite have a vehicle for it?",
    minutes: 2,
    quality: 3,
    why: 'The single most valuable question in the call. A named person turns an abstract partnership into a decision about someone real.',
  },
  {
    id: 'authority',
    reveals: 'authority',
    text: 'And if something like this made sense — who else would need to be part of that decision?',
    minutes: 2,
    quality: 3,
    why: 'Determines whether a same-call yes is even possible. Pushing for commitment from someone who cannot give it is a misread.',
  },
  {
    id: 'past',
    reveals: 'pastPartnership',
    text: "Have you partnered with another org on something like this before? How did it go?",
    minutes: 2,
    quality: 3,
    why: 'If a past collaboration went badly, everything you say is being filtered through it. Surface it or it quietly sinks the call.',
  },
];

// ---------------------------------------------------------------------------
// Phase 5 — Your programme, framed by what you learned
// ---------------------------------------------------------------------------

export function programBeat(persona: PartnerPersona, discovered: Set<FactKey>): Beat {
  const knowsTraining = discovered.has('training');
  const knowsCadence = discovered.has('programShape');

  const options: CallOption[] = [];

  if (knowsTraining && persona.hasTraining) {
    options.push({
      id: 'complementary',
      text: `Given you've already got ${persona.trainingDetail}, I want to be clear this isn't a replacement for that. What we add is the bit that's hard to do inside one organisation — a peer group from across the city, exposure to how civic systems actually work, and a finished project of their own they can point to.`,
      minutes: 2,
      quality: 3,
      note: 'You positioned against what they actually have. That only works because you asked.',
    });
  } else if (knowsTraining && !persona.hasTraining) {
    options.push({
      id: 'fills-gap',
      text: `You mentioned you've been meaning to build something structured and haven't got to it. That's genuinely the gap we fill — twelve weekends of structure your people get without you having to build it, and they bring the frameworks back into your work.`,
      minutes: 2,
      quality: 3,
      note: 'You named their own words back to them and attached the offer to it.',
    });
  }

  if (knowsCadence && persona.cadence === 'seasonal') {
    options.push({
      id: 'off-season',
      text: `And since your work concentrates around specific periods — the fellowship can sit in the quieter stretch rather than competing with your peak. Your people stay yours, they're just not idle between drives.`,
      minutes: 2,
      quality: 3,
      note: 'Turning their seasonality into an argument for the fellowship is the strongest framing available here.',
    });
  } else if (knowsCadence && persona.cadence === 'year-round') {
    options.push({
      id: 'parallel',
      text: `I know you run year-round, so I won't pretend this is free — it's twelve weekends. But it runs alongside, not instead of, and most fellows are holding down other commitments the whole way through.`,
      minutes: 2,
      quality: 3,
      note: 'Naming the cost honestly rather than hiding it is what makes the rest of your pitch credible.',
    });
  }

  options.push({
    id: 'generic',
    text: "What fellows come out with is a stronger civic framework, a network beyond their own org, and a completed project. And it goes both ways — we send our fellows and alumni to help at your events when you're short on hands.",
    minutes: 2,
    quality: knowsTraining || knowsCadence ? 2 : 3,
    note:
      knowsTraining || knowsCadence
        ? 'Perfectly fine, but generic — you knew enough to say something sharper than this.'
        : 'Reasonable, though without knowing their setup you are pitching blind.',
  });

  options.push({
    id: 'compressed',
    text: "I'll keep this to one line: they come back with a network beyond your org and a finished project of their own — and we send our people to your events when you're short-handed. Detail in writing after.",
    minutes: 1,
    quality: 2,
    rushedQuality: 3,
    note: 'One sentence covering both directions of the exchange. Exactly what a squeezed call needs.',
  });

  options.push({
    id: 'oversell',
    text: "Honestly, it'll transform your volunteers. Everyone who goes through it comes back completely different.",
    minutes: 2,
    quality: 1,
    note: 'Unfalsifiable enthusiasm. This is the register that makes experienced org leads stop listening.',
  });

  return {
    id: 'program',
    phase: 'program',
    prompt: 'Now your side — what the fellowship actually builds, and what you send back their way.',
    promptIsProspect: false,
    options,
  };
}

export const reciprocityBeat: Beat = {
  id: 'reciprocity',
  phase: 'program',
  prompt: "You said it goes both ways — what does that actually mean in practice? How many people, how much notice?",
  promptIsProspect: true,
  options: [
    {
      id: 'specific',
      text: `Fair to pin me down on it. ${tofill('fellows/alumni available per event, notice period, type of support')} What I can commit to today is that we'd agree the shape of it in writing rather than leaving it as a nice sentence on a call.`,
      minutes: 2,
      quality: 3,
      note: 'You did not have the numbers, and you said so instead of inventing them — then offered something concrete anyway.',
    },
    {
      id: 'vague-promise',
      text: "Whenever you need hands, just reach out and we'll see who's available.",
      minutes: 1,
      quality: 2,
      note: 'This is the answer that turns reciprocity into a thing that never actually happens.',
    },
    {
      id: 'overpromise',
      text: "Any event, any time — we'll send as many people as you need.",
      minutes: 1,
      quality: 1,
      note: 'A promise you cannot keep, made to someone who will remember it.',
    },
  ],
};

// ---------------------------------------------------------------------------
// Phase 6 — The ask ladder
// ---------------------------------------------------------------------------

export type AskId = 'rejected' | 'alumni' | 'current';

export interface AskOption {
  id: AskId;
  label: string;
  text: string;
  minutes: number;
  /** how much friction this ask carries — used to explain the outcome */
  friction: 'low' | 'medium' | 'high';
}

export const ASK_LADDER: AskOption[] = [
  {
    id: 'rejected',
    label: 'Their turned-away applicants',
    friction: 'low',
    minutes: 1,
    text: "Easiest place to start — people you've had to turn away before. Not because they weren't good, just because you didn't have room. Those names cost you nothing and they'd be perfect for us.",
  },
  {
    id: 'alumni',
    label: 'Past volunteers who moved on',
    friction: 'medium',
    minutes: 1,
    text: "The other group is people who've already cycled out of your program. They're not yours to lose at this point, and if they come through CCF they come back into your orbit rather than out of the sector entirely.",
  },
  {
    id: 'current',
    label: 'Currently active volunteers',
    friction: 'high',
    minutes: 2,
    text: "And then the one that's actually a real ask — some of your current, active people. Weekends only, they stay with you throughout, and they come back to you more capable than they left.",
  },
];

export interface AskSizeOption {
  id: 'small' | 'medium' | 'large';
  text: string;
}

export const ASK_SIZES: AskSizeOption[] = [
  { id: 'small', text: 'Would you put forward two or three people?' },
  { id: 'medium', text: 'Would you put forward five to ten people?' },
  { id: 'large', text: 'Would you put forward ten to twenty people?' },
];

// ---------------------------------------------------------------------------
// Close
// ---------------------------------------------------------------------------

export interface CallClose {
  id: string;
  label: string;
  text: string;
  /** true when this close correctly handles someone who needs sign-off */
  respectsApproval: boolean;
  /** minimum rapport percent for this to land well */
  minRapport: number;
  successText: string;
}

export const CALL_CLOSES: CallClose[] = [
  {
    id: 'same-call-number',
    label: 'Commit to a number now',
    text: "Can we agree a number today, and I'll send the form straight after this call?",
    respectsApproval: false,
    minRapport: 60,
    successText: "Yes — let's say that, and send me the form. I'll have names to you by the end of next week.",
  },
  {
    id: 'equip-approver',
    label: 'Equip them for the approval conversation',
    text: "Since this goes to someone else — what would you need from me to make that conversation easy? A one-pager, numbers, someone from a partner org to speak to?",
    respectsApproval: true,
    minRapport: 40,
    successText:
      "That'd help a lot, actually. Send me a one-pager and I'll put it in front of them — and if I can say another org will vouch for you, better still.",
  },
  {
    id: 'shared-list',
    label: 'Set up a shared list',
    text: "Rather than a number today — shall we set up a shared list we both work off? You add people as they come to mind, including the ones you've turned away.",
    respectsApproval: true,
    minRapport: 35,
    successText: "That's a sensible way in. Low commitment for us, and I can start adding names this week.",
  },
  {
    id: 'event',
    label: 'Invite them to see it',
    text: `Come to ${tofill('next event name')} on ${tofill('date')} — meet a few fellows, see what they're actually working on. Easier to decide after that than off a call.`,
    respectsApproval: true,
    minRapport: 25,
    successText: "Send me the details — I'd rather see it before I put anyone's name forward.",
  },
  {
    id: 'next-cohort',
    label: 'Come back for the next cohort',
    text: `Sounds like this cycle isn't the moment. Next cohort opens around ${tofill('next cohort month')} — can I come back to you closer to then?`,
    respectsApproval: true,
    minRapport: 20,
    successText: "That works better for us. Yes, come back to me then.",
  },
  {
    id: 'not-fit',
    label: 'End it honestly',
    text: "Being straight with you — from what you've described this may not be the right fit right now, and that's completely fine. If that changes, or someone comes to mind outside a formal arrangement, send them our way.",
    respectsApproval: true,
    minRapport: 0,
    successText: "Appreciate you saying that rather than pushing. We'll keep you in mind.",
  },
];

export const NEXT_STEP_BEAT: Beat = {
  id: 'next-step',
  phase: 'close',
  prompt: 'The call is nearly done.',
  promptIsProspect: false,
  options: [
    {
      id: 'date',
      text: "Before we drop — shall I put something in the diary for [specific date] so this doesn't drift?",
      minutes: 1,
      quality: 3,
      note: 'A next step with a date attached is the difference between a good call and a call that goes nowhere.',
    },
    {
      id: 'vague',
      text: "I'll follow up soon and we can take it from there.",
      minutes: 1,
      quality: 2,
      note: '"Soon" is how warm calls quietly die.',
    },
    {
      id: 'nothing',
      text: '[End the call without agreeing a next step]',
      minutes: 0,
      quality: 1,
      note: 'Whatever goodwill you built now depends entirely on them remembering to act on it.',
    },
  ],
};
