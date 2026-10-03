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
  {
    id: 'gyanshala',
    orgName: 'Gyanshala Quality Collective',
    sector: 'school quality review and assessor training',
    contactRole: 'Programs Lead',
    volunteerCount: 18,
    cadence: 'year-round',
    hasTraining: true,
    trainingDetail: "a certification process to become an assessor — it's rigorous, honestly more rigorous than most training programmes",
    afterOneYear: 'most stay on as certified assessors; a few move into consulting roles with us properly',
    authority: 'can-commit',
    pastPartnership: 'none',
    nameInMind: null,
    ccfKnowledge: 'none',
    lines: {
      ccfKnowledge: "No, can't say I have. We don't cross paths with a lot of youth fellowships, our work is fairly specific.",
      programShape: "We don't really run a 'volunteer programme' in the way you might mean — we have about eighteen people training to become assessors at any given time. It's closer to professional development than volunteering, if that makes sense.",
      training: "It's a certification process, honestly fairly rigorous. People sit through theory, do supervised reviews, get signed off. It's not a weekend thing.",
      afterOneYear: 'Most stay on as certified assessors after. A few move into consulting roles with us properly.',
      nameInMind: "Hm — honestly, not really. Our assessors tend to skew a bit older, mid-career educators mostly. I'm not sure your fellowship is aimed at the people we work with.",
      authority: "I can make this call, it's not a big commitment either way.",
      pastPartnership: "No, we haven't done anything like this before, we mostly work directly with schools.",
    },
  },
  {
    id: 'manan',
    orgName: 'Manan Community Space',
    sector: 'community mental health — a peer-support centre and therapy clinic',
    contactRole: 'Community Programs Coordinator',
    volunteerCount: 22,
    cadence: 'year-round',
    hasTraining: true,
    trainingDetail: "a structured Listener training — it's how almost everything we run gets delivered, by people who've been through it themselves",
    afterOneYear: 'a lot of our Listeners stay for years, honestly, it becomes a bit of a second home for people',
    authority: 'needs-approval',
    approverRole: 'our director',
    pastPartnership: 'none',
    nameInMind: 'Zoya',
    nameInMindDetail: "she's been a Listener with us for a year and a half, and honestly she's ready for more than we can give her right now",
    ccfKnowledge: 'partial',
    lines: {
      ccfKnowledge: "I've heard the name Blue Ribbon somewhere, can't place exactly what you do though.",
      programShape: "We don't say 'volunteers' here actually, we call them Listeners. About twenty-two right now, and it runs all year, there's no real season to it.",
      training: "It's called Listener training, and it's central to everything — almost all of what we offer is delivered by people who've been through that training themselves.",
      afterOneYear: 'Honestly a lot of them stay for years. It becomes a bit of a second home for people, which is lovely but also means we don\'t have huge turnover to work with.',
      nameInMind: "Actually — yes, Zoya. She's been with us a year and a half, and I think she's ready to take on more than we're able to give her here.",
      authority: "That one I'd need to run past our director, I can't make that call alone.",
      pastPartnership: "No, nothing formal like this before. We're a bit protective of how we work, to be honest, given what we do.",
    },
  },
  {
    id: 'disha',
    orgName: 'Disha Alumni Network',
    sector: 'alumni engagement for a network of low-income community schools',
    contactRole: 'Alumni Engagement Manager',
    volunteerCount: 40,
    cadence: 'year-round',
    hasTraining: false,
    trainingDetail: "nothing formal on our side really — once they're alumni they're not technically in our programmes anymore",
    afterOneYear: 'honestly this is the exact gap I deal with, we lose touch with a lot of them once they age out of what we offer',
    authority: 'can-commit',
    pastPartnership: 'none',
    nameInMind: 'Imran',
    nameInMindDetail: "he's one of our strongest alumni voices, does a lot of informal organising in his own area already, he just doesn't have anything formal behind him",
    ccfKnowledge: 'partial',
    lines: {
      ccfKnowledge: 'I know of BRM, vaguely, but not the fellowship specifically, no.',
      programShape: "My role is specifically alumni, so it's a bit different from a typical volunteer programme. We've got around forty alumni who stay in touch and do some community work on their own, fairly steady through the year.",
      training: "Honestly, nothing formal on our side. Once they've left our schools they're not really in a 'programme' anymore, they're just alumni who stayed in touch.",
      afterOneYear: 'This is kind of the exact gap I deal with — we lose touch with a lot of them once they age out of what we offer.',
      nameInMind: "Actually, yes — Imran. He does a lot of informal organising in his own area already, he just doesn't have anything formal behind him.",
      authority: 'I can decide this one myself, alumni engagement is my call.',
      pastPartnership: 'Not formally, no — this would be new territory for us.',
    },
  },
  {
    id: 'samaanta',
    orgName: 'Samaanta Collective',
    sector: 'gender equity and civic organising across colleges',
    contactRole: 'Program Director',
    volunteerCount: 30,
    cadence: 'year-round',
    hasTraining: true,
    trainingDetail: 'a proper training pipeline — our champions go through modules before they lead anything themselves',
    afterOneYear: "a good number move into leadership roles with us, we're actually quite good at keeping people",
    authority: 'can-commit',
    pastPartnership: 'good',
    pastPartnershipDetail: "we've partnered with a couple of other city orgs before and it went well when the roles were clear upfront",
    nameInMind: 'Priyanka',
    nameInMindDetail: "she's outgrown what we can offer her here, honestly, she needs something bigger than us",
    ccfKnowledge: 'full',
    lines: {
      ccfKnowledge: 'Yes, actually, I know CCF reasonably well. Three months, weekends, a civic project in your own area. Am I right?',
      programShape: "We run about thirty active people across the year, it's steady, not seasonal. We're fairly structured about it.",
      training: "We do, yes, a proper pipeline — modules before anyone leads anything on their own. We take that seriously.",
      afterOneYear: "A good number move into leadership with us actually. We're fairly good at keeping people, which I'm proud of.",
      nameInMind: "Priyanka, definitely. She's outgrown what we can offer her here, honestly, she needs something bigger than us.",
      authority: "I can commit to this, it's within what I decide.",
      pastPartnership: 'We have, a couple of times with other city orgs, and it went well when the roles were clear from the start.',
    },
  },
  {
    id: 'jeevan-sahayog',
    orgName: 'Jeevan Sahayog Sangh',
    sector: 'multi-decade grassroots community development — health, education, livelihoods, advocacy',
    contactRole: 'Senior Programme Officer',
    volunteerCount: 15,
    cadence: 'seasonal',
    hasTraining: true,
    trainingDetail: "an induction that's basically unchanged in years, which has its pros and cons",
    afterOneYear: "we have people who've been with us a decade, this community doesn't really let go of people, in a good way",
    authority: 'needs-approval',
    approverRole: 'our founding committee',
    pastPartnership: 'bad',
    pastPartnershipDetail: "a corporate CSR programme a few years back made a lot of promises and then just disappeared halfway through, we've been a bit guarded since",
    nameInMind: null,
    ccfKnowledge: 'none',
    lines: {
      ccfKnowledge: "No, I can't say I have, we don't get out to a lot of sector events these days.",
      programShape: 'Fifteen or so active volunteers, and it moves with our campaigns really, busier at certain times of year than others.',
      training: "We have an induction, it's basically unchanged in years if I'm honest, which has its pros and cons.",
      afterOneYear: "We have people who've been with us a decade. This community doesn't really let go of people, which I think is a good thing.",
      nameInMind: "Not off the top of my head, no, I'd have to think about it properly.",
      authority: "Anything like this would have to go to our founding committee, they're quite particular about new arrangements.",
      pastPartnership: "We have, and I'll be honest, it didn't go well. A corporate CSR programme made a lot of promises a few years back and then just disappeared halfway through. We've been a bit guarded since.",
    },
  },
  {
    id: 'greenloop',
    orgName: 'GreenLoop Sustainability Partners',
    sector: 'corporate sustainability consulting — carbon audits, emissions work',
    contactRole: 'Partnerships Manager',
    volunteerCount: 3,
    cadence: 'year-round',
    hasTraining: false,
    trainingDetail: "we don't really have a volunteer training setup, our interns just work alongside the consulting team directly",
    afterOneYear: "most of our interns are here for a semester then move on, it's not really a long-term volunteer thing on our end",
    authority: 'can-commit',
    pastPartnership: 'none',
    nameInMind: null,
    ccfKnowledge: 'none',
    lines: {
      ccfKnowledge: 'No, not familiar with it, no.',
      programShape: "I should say upfront, we're not really a volunteer organisation — we're a consulting firm. We take on a couple of interns a year, that's about it.",
      training: "Not really, no, our interns just work alongside the consulting team directly, there's no separate programme.",
      afterOneYear: "Most of them are here for a semester and then move on to other things. It's not really a long-term volunteer pipeline on our end.",
      nameInMind: "I mean — not really, we don't have anyone who'd fit what you're describing, we're a pretty small outfit.",
      authority: "I could decide this, but I'm not sure there's much to decide, honestly.",
      pastPartnership: "No, nothing like this before, we don't usually get approached for this kind of thing.",
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
