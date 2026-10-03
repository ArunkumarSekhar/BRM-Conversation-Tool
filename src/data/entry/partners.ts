import type { EntryScenario, InitiatedBy } from '../types';

const us: EntryScenario[] = [
  {
    id: 'whatsapp-outreach',
    label: 'WhatsApp, aiming for a phone call',
    context:
      "Before sending this, you checked with BRM — has anyone worked with this org before, is someone already talking to them, does anyone there know someone personally? Then you read their page in the Partner Org Research doc, so you already know what they actually do.",
    usOpening:
      "Hi. Good afternoon [POC name].\nMy name is [your name]. I work with Blue Ribbon Movement (BRM). We run Community Connect, a volunteer model that empowers youth with various skills, post which they play the role of bridging the gap between the community and urban local bodies to build collaborative governance systems.\nChief in this is our Community Connect Fellowship, a 3 month civic leadership program for young people in Mumbai.\nWe are currently looking to partner and collaborate with organisations in the sector whose work meaningfully overlaps with what we are trying to do for young people in the sector, and we wanted to have this conversation with you, as part of [org name].\nLet me know when is a good time to connect? 😊\nP.S: This costs zero funding from your end, in case you were apprehensive and/or thinking of that.",
    branches: [
      {
        id: 'reply-with-time',
        themLine: 'Sure — Thursday around 4 works for me.',
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "Perfect, I will call you on Thursday at 4. Speak then 😊" },
          { id: 'b', quality: 2, text: 'Great, see you then!' },
          { id: 'c', quality: 1, text: "Cool, I'll figure out a time and get back to you." },
        ],
        reactions: {
          3: 'Sounds good, talk Thursday.',
          2: '...Okay, sure.',
          1: "Wait, didn't I just give you a time?",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'positive-no-time',
        themLine: 'Sure, happy to chat sometime!',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Thank you for getting back! Would a quick phone call work? Does Tuesday at 11 or Wednesday at 3 suit you?' },
          { id: 'b', quality: 2, text: 'Great, when works for you?' },
          { id: 'c', quality: 1, text: "Cool, I'll call you sometime this week." },
        ],
        reactions: {
          3: "Wednesday at 3 works, I'll block it.",
          2: 'Hmm, let me check and get back to you.',
          1: '...When, exactly?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'what-is-this-about',
        themLine: "Hang on — what's this actually about?",
        difficultyWeight: { easy: 2, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "CCF is a structured cohort for young people with some sector experience who want to go deeper — they do a real civic project over three months and come out more capable. We think orgs like yours and BRM should be building that together. Would love to talk about it properly on a call — does Tuesday at 11 or Wednesday at 3 suit you?" },
          { id: 'b', quality: 2, text: "[Sends the full spoken-style pitch, paragraph after paragraph, over chat]" },
          { id: 'c', quality: 1, text: "I'll explain everything properly once we're on the call." },
        ],
        reactions: {
          3: 'Okay, that sounds reasonable — Wednesday at 3 works.',
          2: "That's a lot to read on WhatsApp, but okay, let me think about it.",
          1: 'I did just ask what it was about.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'points-elsewhere',
        themLine: "Honestly this isn't really my area — let me point you to our volunteer lead instead.",
        difficultyWeight: { easy: 1, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Thank you so much. Could you share their name and number? And would it be okay if I mention that you sent me their way?' },
          { id: 'b', quality: 2, text: "Sure, I'll just message them directly." },
          { id: 'c', quality: 1, text: 'Oh — okay, never mind then.' },
        ],
        reactions: {
          3: 'Of course, here you go — and yes, feel free to mention me.',
          2: "Uh, sure, here's their number I guess.",
          1: "Oh — okay. I thought you wanted to talk to someone.",
        },
        outcome: {
          kind: 'end',
          text: "Restart this conversation with the new contact, and mention who referred you in the very first line. A warm handoff is worth far more than a cold one.",
        },
      },
      {
        id: 'whats-in-it-for-us',
        themLine: "Okay but — what's actually in it for us?",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "Totally fair question. It's weekends only, so your volunteers stay connected to you the whole time, and there's a good chance they come back and contribute more, not less. It runs both ways too — we send our people to help with your stuff when you need extra hands. And feel free to come to our next event, we'd love to collaborate for years, not just this cohort." },
          { id: 'b', quality: 2, text: "There's a lot in it for you, trust me." },
          { id: 'c', quality: 1, text: 'Well, what would you want out of it?' },
        ],
        reactions: {
          3: "Okay, that actually answers it. Let's set up that call.",
          2: '...I\'d want specifics, not just "trust me."',
          1: "I'm asking you, not the other way around.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-interested-now',
        themLine: 'Not interested right now, but thanks for reaching out.',
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
      {
        id: 'no-reply',
        themLine: '[48 hours pass. No reply yet.]',
        difficultyWeight: { easy: 1, medium: 2, hard: 3 },
        options: [
          { id: 'a', quality: 3, text: 'Hi [POC name], just following up on my message from [day]. Would love to find a time to connect whenever works for you 😊' },
          { id: 'b', quality: 2, text: "Hey, did you see my message? Let me know!" },
          { id: 'c', quality: 1, text: "[Don't follow up at all]" },
        ],
        reactions: {
          3: 'Oh sorry, this got buried — let me find a time and come back to you.',
          2: '...Yeah, I saw it, just been busy.',
          1: '(Still nothing. It just sits there.)',
        },
        outcome: {
          kind: 'end',
          text: "If there's still no reply, one more nudge at 7 days, a final one at 14 days, then stop, log it, and move on. Three nudges, never more than that.",
        },
      },
    ],
  },
  {
    id: 'email-outreach',
    label: 'Email, aiming for a video call',
    context:
      "Before sending this, you checked with BRM — same questions as WhatsApp. The specific program or initiative line below has to come from the org's Research one-pager. An email that doesn't mention anything specific about them reads like a mass mailer.",
    usOpening:
      "Subject: [Org name] x Blue Ribbon Movement, working with young people in Mumbai\n\nHi [POC name],\nGood afternoon. My name is [your name] and I work with Blue Ribbon Movement (BRM).\nWe run Community Connect, a volunteer model that empowers youth with various skills, after which they play the role of bridging the gap between the community and urban local bodies to build collaborative governance systems. Chief in this is our Community Connect Fellowship, a three month civic leadership program for young people in Mumbai.\nI have been following [org name]'s work on [specific program or initiative], and there is real overlap with what we are trying to do for young people in the sector. We are looking to partner with organisations like yours and would love to have this conversation with you.\nWould you be open to a 30 minute video call sometime in the next two weeks? Happy to work around your calendar, or you can pick a slot here: [calendar link].\nLooking forward to hearing from you.\nWarmly,\n[Your name]\n[Designation], Blue Ribbon Movement\nP.S. This costs zero funding from your end, in case you were wondering about that.",
    branches: [
      {
        id: 'books-slot',
        themLine: 'Thursday at 3pm works for me, thanks.',
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Thank you! Sending across a calendar invite with the video call link for Thursday at 3. Looking forward to it.' },
          { id: 'b', quality: 2, text: "Great, I'll send an invite." },
          { id: 'c', quality: 1, text: 'Cool, talk then.' },
        ],
        reactions: {
          3: 'Perfect, see you Thursday.',
          2: '...Thanks, I guess.',
          1: 'That felt a bit casual for an email, but okay.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'tell-me-more-first',
        themLine: 'Could you share a bit more detail before we set up a call?',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "Of course. CCF is a structured cohort for young people with some sector experience who want to go deeper — they do a real civic project over three months and come out more capable, and we think organisations like yours and BRM should be building that together. Happy to go into more detail on a call whenever works." },
          { id: 'b', quality: 2, text: "[Sends the full spoken-style pitch, line by line, over email]" },
          { id: 'c', quality: 1, text: "I'd rather just explain it properly on the call." },
        ],
        reactions: {
          3: 'That helps, thanks — how do you see this happening? Are there specific asks?',
          2: "That's a lot of detail for an email, but let me read through it.",
          1: 'I did ask for it in writing first.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'points-elsewhere',
        themLine: "This isn't really my area — let me loop in the right person.",
        difficultyWeight: { easy: 1, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Thank you so much for pointing me in the right direction. Would you be able to loop them into this thread, or share their email so I can write to them directly and mention you?' },
          { id: 'b', quality: 2, text: 'Sure, send me their email.' },
          { id: 'c', quality: 1, text: 'Oh, okay, thanks anyway.' },
        ],
        reactions: {
          3: "I'll loop them in on this thread now.",
          2: "Here's their email, go ahead.",
          1: "Oh — I thought you wanted to be connected.",
        },
        outcome: {
          kind: 'end',
          text: 'If they loop the new person in, reply-all and pick up from the video-call ask. A warm handoff beats a cold one every time.',
        },
      },
      {
        id: 'whats-in-it-for-us',
        themLine: "Before I say yes to a call — what's actually in it for us?",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "Fair to ask upfront. It's weekends only, so your volunteers stay connected to you throughout, and they tend to come back contributing more, not less. It runs both ways too — we send our fellows and alumni to help at your events when you need extra hands. And you're welcome at our next event, we'd love this to be a multi-year thing, not a one-off." },
          { id: 'b', quality: 2, text: "There's a lot in it for you, I promise." },
          { id: 'c', quality: 1, text: 'What would you want it to include?' },
        ],
        reactions: {
          3: "Okay, that's a reasonable answer. Let's find a time.",
          2: '...I\'d rather hear specifics than a promise.',
          1: "I emailed you, not the other way around.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-interested-now',
        themLine: 'Not interested right now, but appreciate you reaching out.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: 'Completely understand. Would it be okay if I stayed in touch and reached out again next quarter?' },
          { id: 'b', quality: 2, text: 'Okay, no worries, bye.' },
          { id: 'c', quality: 1, text: 'Are you sure? This is a great opportunity for your org.' },
        ],
        reactions: {
          3: "Sure, that's fine — reach out again then.",
          2: '...Okay, thanks anyway.',
          1: "Yes, I'm sure. That felt a bit much.",
        },
        outcome: { kind: 'end', text: 'Logged for a follow-up next quarter, with an invite to a BRM event in the meantime.' },
      },
      {
        id: 'no-reply',
        themLine: '[48 hours since you sent the email. No reply.]',
        difficultyWeight: { easy: 1, medium: 2, hard: 3 },
        options: [
          { id: 'a', quality: 3, text: 'Hi [POC name], just following up on my email below. Would love to find 30 minutes whenever works for you. Calendar link again here: [calendar link].' },
          { id: 'b', quality: 2, text: '[Resends the entire original email again, unchanged]' },
          { id: 'c', quality: 1, text: "[Don't follow up at all]" },
        ],
        reactions: {
          3: 'Sorry, this got buried in my inbox — let me find a time this week.',
          2: "...I think I already saw this once?",
          1: '(Still nothing. It just sits there.)',
        },
        outcome: {
          kind: 'end',
          text: "If there's still no reply, one more nudge at 7 days, a final one at 14 days, then stop, log it, and move on.",
        },
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
