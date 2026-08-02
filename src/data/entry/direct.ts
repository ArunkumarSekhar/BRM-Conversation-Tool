import type { EntryScenario, InitiatedBy } from '../types';

const us: EntryScenario[] = [
  {
    id: 'friend-referred',
    label: 'A friend referred them to you',
    context: "Someone you both know told them you'd love to work with BRM.",
    usOpening: "Hey [Name] — [friend] said you'd love to work with us. Do you have time to talk about it?",
    branches: [
      {
        id: 'enthusiastic-yes',
        themLine: "Yes, [friend] was right — I'd love to get the same experience they had.",
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Fantastic — want to hop on a call, or keep going over text?' },
          { id: 'b', quality: 2, text: 'Great, let me tell you everything about the fellowship right now.' },
          { id: 'c', quality: 1, text: "Perfect, I'll just send you the application link then." },
        ],
        reactions: {
          3: "Text is easier for me right now, but I'm keen — go on.",
          2: "Oh — okay, sure, go ahead I guess.",
          1: 'Oh, um, okay, sending it now I guess?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'busy-but-interested',
        themLine: "No time right now, but I'm definitely interested.",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "No worries — what's a good time for me to call or text you back?" },
          { id: 'b', quality: 2, text: "No problem, I'll just wait for you to reach out whenever." },
          { id: 'c', quality: 1, text: 'This will only take two minutes, can you talk now?' },
        ],
        reactions: {
          3: "Tomorrow evening works — I'll be free after 7.",
          2: '...Okay, sure, whenever then.',
          1: "I just said I can't right now.",
        },
        outcome: { kind: 'end', text: 'They pick a callback time — you end the conversation here with a scheduled follow-up rather than pushing.' },
      },
      {
        id: 'priorities-changed',
        themLine: 'No, I was interested but my priorities have changed.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "Oh that's sad — we'd have loved to have you spreading positivity and improving lives around you for a couple hours a week. All the best with what's next. You can always text me if your priorities change." },
          { id: 'b', quality: 2, text: 'No worries, bye!' },
          { id: 'c', quality: 1, text: "Are you sure? This is a really good opportunity you might be passing up." },
        ],
        reactions: {
          3: 'That means a lot, thank you. I might reach out again someday.',
          2: '...Okay, bye.',
          1: "Yeah, I'm sure. That's a bit pushy, honestly.",
        },
        outcome: { kind: 'end', text: 'A graceful decline — the door stays open, but the conversation ends here.' },
      },
    ],
  },
  {
    id: 'already-applied',
    label: 'They already applied',
    context: 'You noticed they submitted an application and are following up.',
    usOpening: "I see you've applied to work with us — really glad you did. Got a few minutes now?",
    branches: [
      {
        id: 'yes-has-time',
        themLine: "Yes, I do. Honestly I applied because [gives a specific reason].",
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "That's exactly it — can I ask what kind of work you're doing right now? That'll tell me which parts of the fellowship will land best for you." },
          { id: 'b', quality: 2, text: 'Great, let me walk you through the entire fellowship structure.' },
          { id: 'c', quality: 1, text: "Cool, I'll just send you the link then." },
        ],
        reactions: {
          3: "Sure — right now I'm mostly [describes their current work].",
          2: '...Okay, go ahead.',
          1: 'Oh — okay, sending it now?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-now',
        themLine: 'Not right now, can we talk later?',
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: 'Of course — should I text you tonight or tomorrow?' },
          { id: 'b', quality: 2, text: 'Sure, message me whenever works for you.' },
          { id: 'c', quality: 1, text: "It'll only take a minute, can we just do it now?" },
        ],
        reactions: {
          3: 'Tomorrow morning would be great, thanks.',
          2: 'Yeah, sure, whenever.',
          1: "I did just say not right now.",
        },
        outcome: { kind: 'end', text: 'A callback time gets set — the conversation continues another day.' },
      },
      {
        id: 'situation-changed',
        themLine: 'I applied a while ago but my situation has changed.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "That's okay, no pressure at all. We'd have loved to have you — if things change you can always reach back to this chat, and if you know someone who'd be a good fit, feel free to send them our way." },
          { id: 'b', quality: 2, text: 'Oh okay, no worries, bye.' },
          { id: 'c', quality: 1, text: "That's a shame — are you sure you can't make it work?" },
        ],
        reactions: {
          3: "Appreciate that — I'll keep it in mind, and I do know someone who might be interested.",
          2: '...Okay, bye then.',
          1: "Yeah, pretty sure. That felt a bit much.",
        },
        outcome: { kind: 'end', text: 'A graceful, low-pressure ending.' },
      },
    ],
  },
  {
    id: 'met-at-event',
    label: 'You met them at an event',
    context: 'You met at an event and they said they wanted to know more.',
    usOpening: "Hey [Name], we met at [event] — you mentioned wanting to know more about the fellowship. Good time now?",
    branches: [
      {
        id: 'yes-lets-talk',
        themLine: "Yes, let's talk.",
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "[Sends the written pitch, short and to the point] — does that sound like something that excites you?" },
          { id: 'b', quality: 2, text: '[Launches into the full spoken pitch immediately, before checking interest]' },
          { id: 'c', quality: 1, text: 'Want to just apply and see how it goes?' },
        ],
        reactions: {
          3: "Yeah, actually — that's the one. Tell me more?",
          2: "Okay... that's a lot, hang on.",
          1: '...I mean, maybe? Slow down a bit.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'has-questions',
        themLine: 'Yes I remember — I have some questions.',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "Great, go ahead — what's on your mind?" },
          { id: 'b', quality: 2, text: 'Let me just explain everything about the fellowship first.' },
          { id: 'c', quality: 1, text: 'Sure, but honestly you should just apply and see.' },
        ],
        reactions: {
          3: "Okay so — what does a typical weekend actually look like?",
          2: "...Sure, go ahead I guess.",
          1: "I did say I had questions.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'situation-changed-event',
        themLine: "My situation's changed since we met.",
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "No problem at all, things shift. If you ever want to revisit it, reach out — and if you know someone who'd be a good fit, send them our way." },
          { id: 'b', quality: 2, text: 'Oh, okay.' },
          { id: 'c', quality: 1, text: "That's too bad — are you sure?" },
        ],
        reactions: {
          3: 'Thanks for understanding — I will reach out if that changes.',
          2: '...Yeah, bye.',
          1: 'Yes, I\'m sure.',
        },
        outcome: { kind: 'end', text: 'A graceful ending, door left open.' },
      },
      {
        id: 'dont-remember',
        themLine: "I don't remember meeting you.",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "No worries, happy to start fresh — we're BRM, we run a fellowship for young people working on civic change in Mumbai. Want to hear more?" },
          { id: 'b', quality: 2, text: "Oh... okay, well anyway, want to apply?" },
          { id: 'c', quality: 1, text: "We definitely met — are you sure you don't remember?" },
        ],
        reactions: {
          3: 'Oh nice, sure, tell me more.',
          2: "Apply to what, exactly?",
          1: "I'm pretty sure I'd remember. This is a little odd.",
        },
        outcome: { kind: 'continue' },
      },
    ],
  },
  {
    id: 'found-online',
    label: 'You found their work online',
    context: 'You came across their post, profile, or work through a mutual connection.',
    usOpening: "Hey [Name], I came across [your work / your post] — I'm with Blue Ribbon Movement, we run a fellowship for young people working on civic change in Mumbai. I think you'd love it, and we'd love to have you. Got a few minutes?",
    branches: [
      {
        id: 'sure-whats-it-about',
        themLine: "Sure, what's it about?",
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: '[Short pitch] — so tell me, what kind of work are you doing right now?' },
          { id: 'b', quality: 2, text: '[Launches into the full spoken pitch, unprompted, before asking anything about them]' },
          { id: 'c', quality: 1, text: "It's basically a fellowship — want the application link?" },
        ],
        reactions: {
          3: "That sounds relevant, actually. Right now I'm [describes their work].",
          2: '...Okay, that was a lot. What do you actually want from me?',
          1: '...Maybe? What even is it.',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'heard-of-brm',
        themLine: "I've heard of BRM but don't know much.",
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Ha, hope good things! So what have you heard so far?' },
          { id: 'b', quality: 2, text: '[Launches into the full org history, unprompted]' },
          { id: 'c', quality: 1, text: "Doesn't matter, here's the link anyway." },
        ],
        reactions: {
          3: "Just that you do civic work in the city, that's about it.",
          2: "Okay... that's more than I asked for, but go on.",
          1: 'Uh, okay?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-interested-online',
        themLine: 'Not really interested, thanks.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "No problem, thanks for your time — I'll share our page so you can look whenever, and if you change your mind or know someone who'd benefit, reach out here." },
          { id: 'b', quality: 2, text: 'Okay, bye.' },
          { id: 'c', quality: 1, text: 'Are you sure? A lot of people say that at first.' },
        ],
        reactions: {
          3: 'Appreciate that, thanks — will do.',
          2: '...Bye.',
          1: "Yes, I'm sure. That came off a bit pushy.",
        },
        outcome: { kind: 'end', text: 'A respectful decline, no hard feelings.' },
      },
    ],
  },
];

const them: EntryScenario[] = [
  {
    id: 'saw-your-post',
    label: 'They saw your post or story',
    context: 'They messaged you after seeing something you posted.',
    usOpening: 'Hey! Glad it caught your eye — which part made you feel like this is something you want to do?',
    branches: [
      {
        id: 'asks-specific',
        themLine: 'What does [X] actually mean?',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: '[Answers their specific question briefly] — does that feel relevant to where you are right now? Does it excite you?' },
          { id: 'b', quality: 2, text: '[Gives a long, thorough explanation of everything, not just what was asked]' },
          { id: 'c', quality: 1, text: "Just apply and you'll figure it out." },
        ],
        reactions: {
          3: 'Oh okay, that makes sense — yeah, kind of excited actually.',
          2: "That's more detail than I needed, but okay.",
          1: "That's not really an answer.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'wants-everything',
        themLine: 'All of it, I want to know more.',
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Happy to tell you more — what kind of work are you doing right now?' },
          { id: 'b', quality: 2, text: '[Launches straight into the full pitch]' },
          { id: 'c', quality: 1, text: 'Cool, here\'s the application link.' },
        ],
        reactions: {
          3: "I'm mostly [describes current work] right now.",
          2: 'Okay... that was a lot at once.',
          1: 'Oh — okay, sending it now?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'checking-legit',
        themLine: 'I just wanted to check if this is real or legit.',
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "Completely real — BRM's been running civic programs in Mumbai for a few years, and there are plenty of success stories. What made you want to check if it's legit?" },
          { id: 'b', quality: 2, text: "Yeah it's real, don't worry about it." },
          { id: 'c', quality: 1, text: "Why would you think it's not real?" },
        ],
        reactions: {
          3: 'Fair enough, just wanted to be sure — makes sense now.',
          2: '...Okay, if you say so.',
          1: 'No offense, just being careful online.',
        },
        outcome: { kind: 'continue' },
      },
    ],
  },
  {
    id: 'friend-referred-them',
    label: 'A friend referred them',
    context: 'A mutual contact told them to reach out to you.',
    usOpening: 'Great — did they tell you anything about what we do? Are they a fellow, or were they?',
    branches: [
      {
        id: 'yes-a-bit',
        themLine: 'Yes, a bit — they said [X].',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "Glad to hear it — what's your reaction to that? Does it feel relevant to what you're doing?" },
          { id: 'b', quality: 2, text: '[Immediately confirms or denies what the friend said, without asking their reaction]' },
          { id: 'c', quality: 1, text: 'Great, want to apply then?' },
        ],
        reactions: {
          3: "Honestly, yeah, it does feel relevant to where I'm at.",
          2: '...Okay, right.',
          1: "Whoa, slow down, I just started asking.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'just-said-reach-out',
        themLine: 'Not really, they just said I should reach out.',
        difficultyWeight: { easy: 2, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "[Short pitch] — so why don't you tell me what that makes you feel?" },
          { id: 'b', quality: 2, text: '[Full pitch dump, no question back]' },
          { id: 'c', quality: 1, text: 'Okay well — are you interested or not?' },
        ],
        reactions: {
          3: 'Yeah, honestly kind of curious now.',
          2: '...Okay, that was a lot.',
          1: "I don't know yet, that's why I'm asking.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-sure-for-me',
        themLine: "They said it was great but I'm not sure it's for me.",
        difficultyWeight: { easy: 1, medium: 1, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "I'd love to hear why you think it's not for you — what made you think that?" },
          { id: 'b', quality: 2, text: "It's probably for you, don't worry." },
          { id: 'c', quality: 1, text: 'Okay, no worries then.' },
        ],
        reactions: {
          3: "Honestly, I just don't think I have the right background for it.",
          2: '...You don\'t really know that.',
          1: "Oh — okay, guess that's that then.",
        },
        outcome: { kind: 'continue' },
      },
    ],
  },
  {
    id: 'do-you-have-opening',
    label: 'They ask if you have an opening',
    context: 'They message you directly asking about openings.',
    usOpening: "We do — we're recruiting for Community Connect Fellowship right now. What made you reach out?",
    branches: [
      {
        id: 'meaningful-alongside',
        themLine: "I'm looking for something meaningful alongside college or work.",
        difficultyWeight: { easy: 3, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "That's exactly who this is for — so how does your week, and especially your weekend, look right now?" },
          { id: 'b', quality: 2, text: '[Launches into the full pitch without checking their availability]' },
          { id: 'c', quality: 1, text: "Great, here's the link." },
        ],
        reactions: {
          3: 'Weekends are usually pretty free, actually.',
          2: 'Okay... cool I guess.',
          1: 'Oh — sending it now?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'friend-mentioned',
        themLine: 'A friend told me there might be something.',
        difficultyWeight: { easy: 1, medium: 2, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: 'Did they tell you anything about what we do?' },
          { id: 'b', quality: 2, text: '[Skips straight to the full pitch]' },
          { id: 'c', quality: 1, text: 'Okay, want to apply?' },
        ],
        reactions: {
          3: 'A little, yeah — they said it was pretty structured.',
          2: '...Okay, that was a lot at once.',
          1: 'Apply to what exactly?',
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'looking-for-paid',
        themLine: "I'm looking for a paid opportunity — is this paid?",
        difficultyWeight: { easy: 1, medium: 2, hard: 2 },
        options: [
          { id: 'a', quality: 3, text: "This one isn't a paid fellowship. But if you love working with us and we love working with you, there's a real chance we look at working together full time down the line. Does that change things, or would you rather wait and watch our page for paid openings?" },
          { id: 'b', quality: 2, text: "No, it's unpaid, sorry." },
          { id: 'c', quality: 1, text: "Money shouldn't really be the reason you'd do this." },
        ],
        reactions: {
          3: 'Hm — actually, I might still be open to it, tell me more.',
          2: '...Ah, okay, thanks anyway.',
          1: "That's a bit judgmental, honestly.",
        },
        outcome: { kind: 'continue' },
      },
      {
        id: 'not-sure-just-asking',
        themLine: 'Not sure, I just wanted to ask.',
        difficultyWeight: { easy: 2, medium: 1, hard: 1 },
        options: [
          { id: 'a', quality: 3, text: "Totally fine — let me tell you what it involves, and you tell me if it feels right. What are you currently doing?" },
          { id: 'b', quality: 2, text: '[Over-explains at length before asking anything]' },
          { id: 'c', quality: 1, text: 'Well, do you want to apply or not?' },
        ],
        reactions: {
          3: 'Sure, that sounds fair — I\'m currently [describes what they do].',
          2: 'Okay... that was a lot.',
          1: "I don't know yet, that's the whole point of asking.",
        },
        outcome: { kind: 'continue' },
      },
    ],
  },
];

export const directEntry: Record<InitiatedBy, EntryScenario[]> = { us, them };

export const directOfflineOpenings = [
  {
    id: 'event',
    label: 'At an event',
    usLine: 'Hey there, did you catch the talk or session earlier? What brought you here today?',
  },
  {
    id: 'coffee',
    label: 'Over coffee or a video call',
    usLine: 'Thanks for making the time. How has your day and week been so far?',
  },
];
