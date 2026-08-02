import type { ContentLibrary } from '../types';
import { tofill } from '../types';

export const directLibrary: ContentLibrary = {
  pitches: {
    full: {
      id: 'PITCH-DIRECT-FULL',
      variant: 'full',
      text: "CCF runs for three months, twelve weekends. You will be in a cohort with people your age, all figuring out the same kind of stuff you are probably already thinking about. You also pick something real in your own neighbourhood, something that has actually been bothering you, and spend the fellowship doing something about it, two small actions, nothing abstract. By the end you have done something people can actually see, and you walk away understanding a lot more about how things around you work.",
    },
    short: {
      id: 'PITCH-DIRECT-SHORT',
      variant: 'short',
      text: 'CCF is three months with a cohort of people your age, working on something real in your own neighbourhood, something that actually bothers you. We help you figure out how, alongside college or work.',
    },
    written: {
      id: 'PITCH-DIRECT-WRITTEN',
      variant: 'written',
      text: "BRM's Community Connect Fellowship works on real civic problems in your own neighbourhood. You do this with a cohort of young people like you, across the city. You choose what you want to change within your neighbourhood, and we help you understand how to do that alongside college or work.",
    },
  },
  objections: [
    {
      id: 'OBJ-DIRECT-BUSY',
      trigger: "I don't have time or bandwidth.",
      response: "It is twelve weekends over three months, that will sit alongside whatever else you have going on, not replace it. Most fellows are juggling college or work at the same time. Every week, there is a clear thing to do that will help you too. And three months later, you would be grateful to yourself that you spent this time on the fellowship.",
      distractors: [
        "Don't worry, it's not that much extra work, you'll be fine.",
        "I mean, if you don't have time, that's kind of on you to figure out.",
      ],
    },
    {
      id: 'OBJ-DIRECT-KNOW-ALREADY',
      trigger: 'I feel like I probably already know this.',
      response: 'Honestly that is part of why we want you in the room. People who already have experience end up pushing the learning standards for everyone else. Almost everyone who has been through it tells us they were surprised by what they did not know, especially how things work once you are inside the system, which is hard to see clearly when you are already doing the work.',
      distractors: [
        "There's still definitely stuff you don't know, trust me.",
        'Sure, but the certificate still looks good, right?',
      ],
    },
    {
      id: 'OBJ-DIRECT-PAID',
      trigger: "I'm looking for something paid.",
      response: 'This one is not a paid fellowship. But if you love working with us and we love working with you, there is a real chance we look at working together full time down the line. Does that change things for you, or would you rather wait and keep an eye on our page for paid openings instead?',
      distractors: [
        "It's unpaid, but the experience is worth more than money.",
        "Everything meaningful in life isn't really about money.",
      ],
    },
    {
      id: 'OBJ-DIRECT-NOT-QUALIFIED',
      trigger: "I don't think I'm qualified enough.",
      response: 'Honestly, most fellows do not walk in feeling ready. That is sort of the point, the fellowship exists because people are not finished products yet. We care a lot more about whether you are curious and whether you will actually show up than how much you have already done.',
      distractors: [
        "You'll pick it up as you go, don't overthink it.",
        'Honestly most people feel that way, just apply and see.',
      ],
    },
    {
      id: 'OBJ-DIRECT-NO-CIVIC-KNOWLEDGE',
      trigger: "I don't know anything about civic issues.",
      response: 'That is really common. Most people do not join because they already understand how any of it works. They join because something around them has been bothering them enough that they want to figure it out. This is not really about politics, it is closer to just paying attention to your own street.',
      distractors: [
        "That's fine, we'll teach you everything you need to know.",
        "You don't really need to know anything going in.",
      ],
    },
    {
      id: 'OBJ-DIRECT-FIT-IN',
      trigger: 'Will I fit in? Everyone else sounds impressive.',
      response: 'A lot of fellows feel exactly that walking in. Shravani was hesitant even about talking to people when she started, and she ended up doing two fellowships with us. Everyone comes in from a completely different starting point. That is kind of the whole point of a cohort, it is not a room full of people who already have it sorted.',
      distractors: [
        "Don't worry about that, everyone's really nice.",
        'Honestly some fellows are pretty impressive, but you\'ll manage.',
      ],
    },
    {
      id: 'OBJ-DIRECT-PARENTS',
      trigger: "My parents won't let me, or they want me to focus on studies.",
      response: 'Totally get it, and that is a fair thing for them to want to know. Would it help if I sent you something you could show them, what it actually involves, timings, all of that? Most parents feel a lot better once they see it is structured and not just some random thing on weekends.',
      distractors: [
        'Just tell them it looks good for college applications.',
        "You're an adult, you don't really need their permission.",
      ],
      tofillNotes: ['Parent-facing one-pager: what it involves, weekend timings, safety, what their child gets out of it'],
    },
    {
      id: 'OBJ-DIRECT-EXAMS',
      trigger: "I'm preparing for exams.",
      response: "That makes sense, exams need real focus and this is not the time to split it. When are you done with them? Let's stay in touch and I will loop you in for the next cohort instead of trying to squeeze this one in.",
      distractors: [
        'You could probably still fit it in around exams.',
        "Twelve weekends isn't even that much study time lost.",
      ],
    },
    {
      id: 'OBJ-DIRECT-ALREADY-DOING',
      trigger: "I'm already doing something similar.",
      response: 'That is good to hear, means you already care about this stuff. What are you doing right now? A lot of fellows come in already doing something and use CCF to go deeper on one specific thing, with structure and a group around them instead of doing it alone. It is less about replacing what you have and more about giving it a shape.',
      distractors: [
        "CCF is probably more structured than what you're doing now.",
        'Then this should be easy for you.',
      ],
    },
    {
      id: 'OBJ-DIRECT-CAREER',
      trigger: 'Will this actually help my career?',
      response: 'Yes, and in a real way, not just as a line on your CV. You come out having actually led something start to finish, which stands out a lot more than another certificate. The network helps too, some fellows have moved into full time roles with us or with partner orgs off the back of it.',
      distractors: [
        'It looks great on a resume.',
        'Depends what you want to do, but probably, sure.',
      ],
    },
    {
      id: 'OBJ-DIRECT-COMMITMENT-FEAR',
      trigger: 'Twelve weekends feels like a lot to commit to.',
      response: 'That is an honest thing to say and a lot of people feel it before starting something new. It is not forever, it is twelve weekends, and you can always talk to us if it stops working for you. Most people say the first two or three weekends are what settle the nerves. After that it stops feeling like a commitment and starts feeling like just showing up for something you are already part of.',
      distractors: [
        "It's really not that much when you break it down.",
        "You can always just not do it if it's too much.",
      ],
    },
    {
      id: 'OBJ-DIRECT-SAFETY',
      trigger: 'Is the fieldwork safe? (often the real question behind the parent objection)',
      response: `Fair question and worth asking. ${tofill('safety protocol')} Fellows are never doing fieldwork completely alone, you are always working with people from your cohort and we go through how to approach it before anyone starts. You choose your own neighbourhood too, so it is somewhere you already know.`,
      distractors: [
        "Yeah it's totally fine, nothing's ever happened.",
        "You'll be fine, don't overthink it.",
      ],
      tofillNotes: ['Actual safety protocol: pairing rules, check-ins, escalation contact, provisions for women fellows'],
    },
    {
      id: 'OBJ-DIRECT-LANGUAGE',
      trigger: "My English isn't great.",
      response: 'Not a problem at all. Fellows work in whatever language they are comfortable in, and honestly for most of this work, Hindi or Marathi is more useful than English anyway. The people you will be talking to in your own area are not speaking English either.',
      distractors: [
        'Your English is probably better than you think.',
        "Honestly most of the important stuff is in English, but you'll manage.",
      ],
    },
    {
      id: 'OBJ-DIRECT-DROP-OUT',
      trigger: "What if I start and can't finish?",
      response: 'Then you tell us and we figure it out. It is not held against you and it does not mean you cannot come back later. Vrushabh did not finish his cohort and still says the door to door surveys changed how he handles conversations with people who think nothing like him. What you take from it is yours either way.',
      distractors: [
        'That almost never happens once people start.',
        "Then you just wasted a spot someone else could've used.",
      ],
    },
    {
      id: 'OBJ-DIRECT-COST',
      trigger: 'Will this cost me anything?',
      response: `There is no fee to apply or take part. ${tofill('incidental costs position')}`,
      distractors: [
        'Nope, totally free, no catches.',
        'There might be small costs here and there but nothing major.',
      ],
      tofillNotes: ['BRM position on incidental costs: travel to fieldwork sites, printing, data'],
    },
  ],
  closes: [
    {
      id: 'ASK-DIRECT-WARM',
      name: 'Apply now',
      text: 'Can I send you the link right now? And if anything comes up after you look at it, happy to jump on a quick ten minute call or finish this up over texts.',
      successText: "Yeah, send it over — I'll take a proper look this week. Thanks for this, honestly.",
      band: { min: 65, max: 100 },
    },
    {
      id: 'ASK-DIRECT-SOFT',
      name: 'Apply later',
      text: 'No pressure to decide right now. I will send you our page. It has alumni stories, real people like you and I, someone who might have had the same misgivings as you. Go through it. You will get an answer from them directly and maybe that will help you out. And, this chat is open for you if you decide to change your mind.',
      successText: "Yeah, that works — send it over, I'll go through it properly when things calm down.",
      band: { min: 40, max: 75 },
    },
    {
      id: 'ASK-DIRECT-REFERRAL',
      name: 'Refer someone else',
      text: 'It is a bit sad that the timing is not right for you. Is there someone in your circle who would be perfect for this? You probably already have someone in mind. You can have a chat with them, or you can let them know that I will have a chat with them and you can share their contact details with me.',
      successText: "Actually, yeah — I know someone who'd be perfect for this. Let me connect you.",
      band: { min: 15, max: 55 },
    },
    {
      id: 'ASK-DIRECT-EVENT',
      name: 'Come to an event',
      text: `No rush on deciding. We have ${tofill('next event name')} coming up on ${tofill('date')}, come by and meet a few people who have actually been through it. Much easier to figure out if it is for you after that than from a chat.`,
      successText: "Yeah, that I can do — send me the details and I'll try to make it.",
      band: { min: 30, max: 60 },
      tofillNotes: ['Next BRM event name, date, and venue'],
    },
    {
      id: 'ASK-DIRECT-FUTURE-COHORT',
      name: 'Next cohort',
      text: `Sounds like this is just not the right window for you, which is completely fine. Next cohort starts around ${tofill('next cohort month')}. Can I message you closer to then? Would rather have you properly in it than half in it now.`,
      successText: "That actually works better for me. Yeah, message me closer to then.",
      band: { min: 30, max: 65 },
      tofillNotes: ['Next cohort start month and application window dates'],
    },
    {
      id: 'ASK-DIRECT-STAY-CONNECTED',
      name: 'Stay connected',
      text: 'No pressure at all. Sending our page, follow along and see what people are actually doing. If something clicks later, this chat is always open.',
      successText: 'Sure, that works for me — send it over.',
      band: { min: 15, max: 50 },
    },
    {
      id: 'ASK-DIRECT-NOT-FIT',
      name: 'Not a fit',
      text: 'Being honest, from what you have told me this probably is not the right thing for you right now, and that is completely okay. Thank you for taking the time though, genuinely. If things change, or you just want to talk something through, you know where to find me.',
      successText: 'Yeah, fair enough. Appreciate you being straight about it — thanks for the chat.',
      band: { min: 0, max: 30 },
    },
  ],
};
