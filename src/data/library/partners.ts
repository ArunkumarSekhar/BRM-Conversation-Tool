import type { ContentLibrary } from '../types';
import { tofill } from '../types';

export const partnersLibrary: ContentLibrary = {
  pitches: {
    full: {
      id: 'PITCH-PARTNERS-FULL',
      variant: 'full',
      text: "CCF runs for three months. It is for young people across Mumbai who already have a year or two of experience, volunteering, field work, that kind of thing. What we want to build with orgs like yours is basically a shared pipeline. The people you send us go through the cohort, work on something real in their own neighbourhood, and come back to you stronger than when they left, with better network, and increased confidence in an actual thing they finished. And this is not us taking your people away. It goes both ways, we send our own fellows and alumni to help out at your events or programs whenever you are short on hands. It is meant to be an exchange, not just us asking something of you.",
    },
    short: {
      id: 'PITCH-PARTNERS-SHORT',
      variant: 'short',
      text: 'CCF is three months for young people who already have some sector experience. You send us people, they come back stronger, and we send support your way too. It runs both ways.',
    },
    written: {
      id: 'PITCH-PARTNERS-WRITTEN',
      variant: 'written',
      text: 'CCF is a structured cohort for young people with some sector experience who want to go deeper. Fellows do a real civic project over three months and come out more capable, while also making real change in the neighbourhood they live in. We are trying to build a pipeline of serious young changemakers in Mumbai, and we think organisations like yours and BRM should be building that together.',
    },
  },
  objections: [
    {
      id: 'OBJ-PARTNERS-POACHING',
      trigger: "I don't want you taking our volunteers away from us.",
      response: 'I understand why it seems that way. It is weekends only, so your volunteers stay connected to you the whole time. There is a higher chance they will come back and contribute more, not less. And it will run both ways, cos we send our people to help with your stuff too when you need extra hands. We are not trying to take anyone off your hands, we just want to help them get better at what they are already doing with you.',
      distractors: [
        "Don't worry, we'll give them back eventually.",
        "It's really not that big a commitment, you're overthinking it.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-EXISTING-PROGRAM',
      trigger: 'We already have our own training or volunteer program.',
      response: 'Of course. Think of it as something extra on top of what you are already doing, not us trying to replace it. CCF gives the volunteers a network outside your org, a look at how things work across the city through the eyes of a different organisation, and they will return with an increased confidence of something real they would have finished by the end.',
      distractors: [
        'Sure, but ours is probably more structured than what you have.',
        'Internal training rarely works as well as people think.',
      ],
    },
    {
      id: 'OBJ-PARTNERS-LOGISTICS',
      trigger: "What's the commitment on our side, and what if someone drops out?",
      response: 'Nominating someone takes maybe ten minutes on your end. We run the cohort with clear week by week modules and that would mean we will have an understanding on how things are progressing for them over the course of the three months. You can check in with us over the three months just to see how things are going. And if someone you put forward cannot continue, we will let you know of the same and we will see if we can get them back into the program. If not, we will figure out for the next cohort.',
      distractors: [
        "It's pretty low effort on your end, don't worry about it.",
        "If someone drops out that's kind of between them and us.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-EXCLUSIVITY',
      trigger: 'Can we still send volunteers to other similar programs?',
      response: 'Of course, this is not exclusive at all. If your volunteers are doing other programs too, that is completely fine with us. We are not trying to be the only place your people grow. We just want to be one of the good ones you can trust with for the long term.',
      distractors: [
        "Sure, though we think you'll like us best.",
        "We'd prefer if we were your main partner, honestly.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-ROI',
      trigger: 'What do we get that we can show our funders or board?',
      response: 'Good question, people ask this a lot. We can send you updates on whoever you nominate through the cohort, plus a short summary at the end of what they worked on and what actually changed. And if it helps, we are happy to be named as a partner wherever you are sharing this with your own funders or board, or even speak to them directly if that would be useful.',
      distractors: [
        'We can probably put something together if you need it.',
        "That's more of a you problem to figure out internally.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-SELECTION',
      trigger: 'How do you select fellows?',
      response: `Good question, and fair to ask if you are putting your people forward. ${tofill('selection process')} We are not just taking whoever applies. If your volunteers are going to spend twelve weekends on this, we want the room to be worth their time.`,
      distractors: [
        'We just take whoever seems interested, honestly.',
        "We don't really have a formal process for that.",
      ],
      tofillNotes: ['Actual selection process: application review, interview stage, what you screen for, rough pass rate'],
    },
    {
      id: 'OBJ-PARTNERS-WHO-ELSE',
      trigger: 'Who else partners with you?',
      response: `We work with ${tofill('partner org names')}. Happy to connect you directly with someone at ${tofill('a reference org')} if you would rather hear how it has actually gone from their side than from mine.`,
      distractors: [
        "A few orgs around the city, I'd have to check the exact list.",
        "I'm not really sure I can share that.",
      ],
      tofillNotes: ['Real partner organisation names, and which are willing to take a reference call'],
    },
    {
      id: 'OBJ-PARTNERS-BAD-EXPERIENCE',
      trigger: "We've had bad experiences with collaborations before.",
      response: 'That is fair, and a lot of orgs have been burnt by something that promised more than it delivered. What went wrong last time? That will help me be straight with you about whether this actually solves for it or whether we would be repeating the same thing.',
      distractors: [
        "That's unfortunate, but we're pretty different, I promise.",
        'That sounds like it was probably a bad fit on their end.',
      ],
    },
    {
      id: 'OBJ-PARTNERS-CUSTOMISE',
      trigger: 'Can we customise this for our org?',
      response: 'Depends what you have in mind, tell me what you are thinking. Some things we can flex on, when someone starts, how we frame their civic project, how often we check in with you. Some things stay fixed, mainly the twelve weekend structure, because that is what makes the cohort actually work as a cohort rather than a set of individuals.',
      distractors: [
        "Not really, it's a pretty fixed program.",
        "We don't usually do that, but I guess we could try.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-NO-ONE-SUITABLE',
      trigger: "We don't have anyone suitable this year.",
      response: 'Totally fine, no point forcing a name. Would it be alright if I checked back in a few months, sometimes someone comes up later who did not come to mind straight away? And if anyone outside your own volunteers comes to mind, we would love to hear about them too.',
      distractors: [
        'No worries, maybe next year then.',
        'That\'s surprising, are you sure about that?',
      ],
    },
    {
      id: 'OBJ-PARTNERS-AGE-MISMATCH',
      trigger: 'Our volunteers are younger than that.',
      response: 'That makes sense, CCF is built specifically for 18 to 25. If anyone in your group has just crossed into that range or is about to, we would genuinely love to hear about them. And if your base skews younger across the board, let\'s stay in touch anyway, there may be a lighter version of this worth building together down the line.',
      distractors: [
        "That's okay, we might be able to make an exception.",
        "Unfortunately there's not much we can do about that.",
      ],
    },
    {
      id: 'OBJ-PARTNERS-AFTER-FELLOWSHIP',
      trigger: 'What happens to them after the fellowship?',
      response: 'Fellows who want to stay involved usually do. Some come back as mentors for the next cohort, some move into more active roles with us. And from your side, they come back into your org with everything they picked up, so it is not pulling them out of your pipeline, if anything it feeds back into it.',
      distractors: [
        'They just go back to normal life, I suppose.',
        "That's kind of up to them at that point."],
    },
    {
      id: 'OBJ-PARTNERS-DATA-PRIVACY',
      trigger: "How do you handle our volunteers' data?",
      response: `Fair thing to check, especially with a shared list. ${tofill('data handling policy')} Nothing gets shared beyond what we need to run the cohort, and nothing goes to any third party.`,
      distractors: [
        'We keep it pretty secure, standard stuff.',
        "I'd have to check on the specifics of that.",
      ],
      tofillNotes: ['Real data-handling position: what is collected, where stored, who has access, retention, consent flow'],
    },
    {
      id: 'OBJ-PARTNERS-LIABILITY',
      trigger: 'Who is responsible if something happens to our volunteer?',
      response: `Important question. ${tofill('liability position')} Fellows are never doing fieldwork alone, and we go through how to approach it before anyone starts.`,
      distractors: [
        "We'd handle it if something came up, don't worry.",
        "That's probably more of a shared responsibility thing.",
      ],
      tofillNotes: ['Real liability / duty-of-care position for fieldwork, including any insurance'],
    },
    {
      id: 'OBJ-PARTNERS-PAPERWORK',
      trigger: "We'll need something formal in place before we can commit.",
      response: `Of course, happy to do that. ${tofill('MOU process')} Tell me what your org usually needs and we will work to that rather than making you fit into ours.`,
      distractors: [
        'Sure, we can put something together eventually.',
        "We don't usually do formal paperwork for this.",
      ],
      tofillNotes: ['Whether BRM has a standard MOU/partnership agreement, who signs it, typical turnaround'],
    },
  ],
  closes: [
    {
      id: 'ASK-PARTNERS-NOMINATION',
      name: 'Nomination',
      text: 'Given everything we have talked about, would you be up for putting forward 10 to 20 volunteers from your org for this next cohort? We would genuinely love to have [org name] in this group.',
      successText: 'Yes — let me talk to a couple of people internally and get you names by next week.',
      band: { min: 60, max: 100 },
    },
    {
      id: 'ASK-PARTNERS-DATABASE',
      name: 'Shared database',
      text: 'We would love to set up a shared list we can both work off. You can put forward anyone you have had a great relationship with already who you think would be a strong fit. You can also put forward people you had to turn away before, not because they were not good, just because you did not have room for them at the time. And if you have other ideas for how this could work that we have not thought of, we would love to hear them.',
      successText: "That's actually a good way to structure it. Let's set that up.",
      band: { min: 40, max: 75 },
    },
    {
      id: 'ASK-PARTNERS-SOFT',
      name: 'Long game',
      text: `Would it be okay if I stayed in touch and checked back in closer to the next cohort and/or next quarter, whichever is earlier? And we would love to have you at ${tofill('next event name')} on ${tofill('date')} in the meantime, just to stay connected even before there is anything to decide.`,
      successText: "That would be genuinely helpful, actually. Let's stay in touch.",
      band: { min: 15, max: 45 },
    },
    {
      id: 'ASK-PARTNERS-EVENT',
      name: 'Come to an event',
      text: `Come to ${tofill('next event name')} on ${tofill('date')}. Meet a few of our fellows, see what they are actually working on. Much easier to decide whether to put your people forward after seeing it than off a call.`,
      successText: "That I can do — send me the details and I'll try to be there.",
      band: { min: 30, max: 60 },
      tofillNotes: ['Next BRM event name, date, venue'],
    },
    {
      id: 'ASK-PARTNERS-FUTURE-COHORT',
      name: 'Next cohort',
      text: `Sounds like this cycle is not the right moment for you, which is completely fine. Next cohort opens around ${tofill('next cohort month')}. Can I come back to you closer to then, when you have a clearer sense of who might be ready?`,
      successText: 'That works better for us. Yes, come back to me closer to then.',
      band: { min: 30, max: 65 },
      tofillNotes: ['Next cohort start month and application window'],
    },
    {
      id: 'ASK-PARTNERS-NOT-FIT',
      name: 'Not a fit',
      text: 'Being honest, from what you have described this may not be the right fit for your org right now, and that is completely okay. Thank you for the time though. If things shift, or if you come across someone who would benefit even outside a formal partnership, do send them our way.',
      successText: 'Appreciate the honesty. We\'ll keep you in mind if that changes.',
      band: { min: 0, max: 30 },
    },
  ],
};
