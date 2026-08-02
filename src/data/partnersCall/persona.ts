export type Cadence = 'seasonal' | 'year-round';
export type Authority = 'can-commit' | 'needs-approval';
export type CcfKnowledge = 'none' | 'partial' | 'full';
export type PastPartnership = 'none' | 'good' | 'bad';

export type FactKey =
  | 'ccfKnowledge'
  | 'programShape'
  | 'training'
  | 'afterOneYear'
  | 'nameInMind'
  | 'authority'
  | 'pastPartnership';

export interface PartnerPersona {
  id: string;
  /** Visible before the call — the little you'd know from their website. */
  orgName: string;
  sector: string;
  contactRole: string;

  /** Hidden until discovered through phase-4 questions. */
  volunteerCount: number;
  cadence: Cadence;
  hasTraining: boolean;
  trainingDetail: string;
  afterOneYear: string;
  authority: Authority;
  approverRole?: string;
  pastPartnership: PastPartnership;
  pastPartnershipDetail?: string;
  nameInMind: string | null;
  nameInMindDetail?: string;
  ccfKnowledge: CcfKnowledge;

  /** Lines the persona uses when a given fact is surfaced. */
  lines: Record<FactKey, string>;
}

export const PARTNER_PERSONAS: PartnerPersona[] = [
  {
    id: 'saathi',
    orgName: 'Saathi Foundation',
    sector: 'after-school education, M-East ward',
    contactRole: 'Volunteer Coordinator',
    volunteerCount: 8,
    cadence: 'seasonal',
    hasTraining: false,
    trainingDetail: 'nothing formal — a half-day orientation and then they shadow someone',
    afterOneYear: 'most drift once their college term picks up; two have stayed on for years',
    authority: 'needs-approval',
    approverRole: 'our founder',
    pastPartnership: 'none',
    nameInMind: 'Rehan',
    nameInMindDetail: "he's been with us two years, basically runs our Saturday sessions now, and I know he wants more than we can give him",
    ccfKnowledge: 'none',
    lines: {
      ccfKnowledge: "Honestly, no — I've seen the name Blue Ribbon somewhere but I couldn't tell you what you do.",
      programShape: "We're small. About eight volunteers, and it's really concentrated around the school term — we go quiet through the exam months and the summer.",
      training: "Nothing formal, I'll be honest. Half-day orientation, then they shadow someone for a couple of weeks and we hope for the best.",
      afterOneYear: "Most of them drift once college gets serious. Two have stayed on for years, but that's the exception, not the pattern.",
      nameInMind: "Actually — yes. Rehan. He's been with us two years, basically runs our Saturday sessions now, and I know he wants more than we can give him.",
      authority: "I'd have to run it past our founder. I can bring it to her, but I can't sign off on something like this myself.",
      pastPartnership: "No, we haven't done anything like that before. We're usually too small to be on anyone's radar.",
    },
  },
  {
    id: 'ujjwal',
    orgName: 'Ujjwal Collective',
    sector: 'urban sanitation and waste, city-wide',
    contactRole: 'Programs Manager',
    volunteerCount: 120,
    cadence: 'year-round',
    hasTraining: true,
    trainingDetail: 'a structured six-week onboarding with modules and a mentor',
    afterOneYear: 'we promote the strong ones into team-lead roles; the rest cycle out',
    authority: 'can-commit',
    pastPartnership: 'bad',
    pastPartnershipDetail:
      "we did a thing with a corporate CSR team two years ago — they wanted photos and a report, our volunteers got nothing out of it and I spent three months managing it",
    nameInMind: null,
    ccfKnowledge: 'partial',
    lines: {
      ccfKnowledge: "I know of Blue Ribbon — civic stuff, Mumbai. I don't know the fellowship specifically, though.",
      programShape: "We run about a hundred and twenty volunteers, and it's year-round — we don't really have an off-season, the work doesn't stop.",
      training: "We do, yes. Six-week structured onboarding, modules, each person gets a mentor. We've put real work into it.",
      afterOneYear: "The strong ones we promote into team-lead roles. The rest cycle out, which is fine, that's the nature of it.",
      nameInMind: "Not off the top of my head, honestly. There are a few good people but nobody where I'd say 'yes, them, definitely.'",
      authority: "I can make that call. I don't need to check with anyone for something this size.",
      pastPartnership:
        "We have, and it wasn't great. Corporate CSR team, two years ago — they wanted photos and a report, our volunteers got nothing out of it, and I spent three months managing it. So I'm a bit cautious now.",
    },
  },
  {
    id: 'pragati',
    orgName: 'Pragati Youth Network',
    sector: 'livelihoods and skilling, eastern suburbs',
    contactRole: 'Head of Community',
    volunteerCount: 35,
    cadence: 'year-round',
    hasTraining: false,
    trainingDetail: 'we keep meaning to build something and never get to it',
    afterOneYear: "honestly, we lose them — that's the thing that bothers me most",
    authority: 'can-commit',
    pastPartnership: 'none',
    nameInMind: 'Fatima and maybe Sagar',
    nameInMindDetail: "Fatima definitely — she's outgrown what we can offer. Sagar maybe, he's newer but sharp",
    ccfKnowledge: 'partial',
    lines: {
      ccfKnowledge: "I've heard the name and I think someone on my team mentioned the fellowship, but I couldn't tell you what's actually in it.",
      programShape: "Around thirty-five active volunteers, and we run through the year. It's steady rather than seasonal.",
      training: "That's a sore point. We keep meaning to build something structured and we never get to it. Right now it's learning on the job.",
      afterOneYear: "Honestly? We lose them. That's the thing that bothers me most about how we're set up.",
      nameInMind: "Fatima, definitely — she's outgrown what we can offer. And maybe Sagar, he's newer but he's sharp.",
      authority: "That'd be my decision. I'd loop my director in but I don't need permission.",
      pastPartnership: "Not formally, no. We've shared volunteers informally with one other org but nothing structured.",
    },
  },
  {
    id: 'meher',
    orgName: 'Meher Trust',
    sector: 'child nutrition and health, Dharavi',
    contactRole: 'Volunteer Lead',
    volunteerCount: 12,
    cadence: 'seasonal',
    hasTraining: true,
    trainingDetail: 'a proper two-day induction, we take it seriously',
    afterOneYear: 'a good number stay on — we have people who have been with us four, five years',
    authority: 'needs-approval',
    approverRole: 'our trustees',
    pastPartnership: 'good',
    pastPartnershipDetail: "we did a joint drive with another org last year and it went well — clear roles, everyone knew what they were doing",
    nameInMind: 'Anjali',
    nameInMindDetail: "she's ready for something bigger, and I'd rather she grow with us than leave to find it",
    ccfKnowledge: 'full',
    lines: {
      ccfKnowledge:
        "Yes, actually — I know CCF. One of our trustees mentioned it, and I looked it up. Three months, weekends, the fellows do a project in their own area. Have I got that right?",
      programShape: "We're twelve volunteers, and it's seasonal — heaviest around our nutrition drives, quieter in between.",
      training: "We do a proper two-day induction. We take that part seriously.",
      afterOneYear: "A good number stay. We've got people who've been with us four, five years — we're lucky that way.",
      nameInMind: "Anjali. She's ready for something bigger, and frankly I'd rather she grow with us than leave to go find it somewhere else.",
      authority: "I'd need to take it to our trustees. They meet monthly. I can put it on the agenda but I can't commit today.",
      pastPartnership: "We did a joint drive with another org last year and it went well. Clear roles, everyone knew what they were doing.",
    },
  },
  {
    id: 'aarambh',
    orgName: 'Aarambh Mumbai',
    sector: 'civic tech and open data',
    contactRole: 'Director of Programs',
    volunteerCount: 200,
    cadence: 'year-round',
    hasTraining: true,
    trainingDetail: 'a full internal academy — we take it very seriously',
    afterOneYear: 'we hire the best of them; several of our staff started as volunteers',
    authority: 'needs-approval',
    approverRole: 'our board',
    pastPartnership: 'good',
    pastPartnershipDetail: 'we run three active partnerships and they mostly work well',
    nameInMind: null,
    ccfKnowledge: 'none',
    lines: {
      ccfKnowledge: "I don't know it, no. Give me the short version.",
      programShape: "We're around two hundred volunteers, year-round, across four programs. It's a fairly large operation.",
      training: "We have a full internal academy. We take development very seriously — it's part of why people come to us.",
      afterOneYear: "We hire the best of them. Several of our current staff started as volunteers.",
      nameInMind: "Not a specific name, no. At our size it's more that I'd need to ask my program leads to put names forward.",
      authority: "Something structural like this would go to our board. I'd shape the proposal but they'd approve it.",
      pastPartnership: "We run three active partnerships. They mostly work well — we've learnt what to ask for upfront.",
    },
  },
];

export type TimeBudgetId = 'rushed' | 'standard' | 'generous';

export interface TimeBudget {
  id: TimeBudgetId;
  minutes: number;
  /** What they say at the top of the call about how long they have. */
  revealLine: string;
}

export const TIME_BUDGETS: Record<TimeBudgetId, TimeBudget> = {
  rushed: {
    id: 'rushed',
    minutes: 10,
    revealLine:
      "Before we get going — I'm really sorry, something's come up and I've got about ten minutes rather than the half hour. Can we still do something useful with that?",
  },
  standard: {
    id: 'standard',
    minutes: 30,
    revealLine: "I've got the full half hour blocked, so we're fine for time.",
  },
  generous: {
    id: 'generous',
    minutes: 60,
    revealLine: "My next thing got moved, so I've actually got a full hour if we need it. No rush.",
  },
};

/** Recommended nomination ask size for an org of this size. */
export function askSizeFor(volunteerCount: number): 'small' | 'medium' | 'large' {
  if (volunteerCount < 15) return 'small';
  if (volunteerCount <= 60) return 'medium';
  return 'large';
}
