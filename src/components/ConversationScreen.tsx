import { useEffect, useMemo, useRef, useState } from 'react';
import { FLOWS } from '../data';
import type { CloseBlock, Difficulty, FlowId, PitchVariant, Quality } from '../data/types';
import { QUALITY_DELTA } from '../data/scoring';
import { buildRun, rapportPercent, evaluateClose, type Step, type RunConfig, type CloseResult } from '../game/engine';
import { RapportMeter } from './RapportMeter';
import { ChatBubble } from './ChatBubble';
import { TofillText } from './TofillText';

interface Props {
  flowId: FlowId;
  config: RunConfig;
  onExit: () => void;
  onFinish: (result: FinishResult) => void;
}

export interface FinishResult {
  flowId: FlowId;
  difficulty: Difficulty;
  rapportPct: number;
  endedEarly: boolean;
  endText?: string;
  closeName?: string;
  closeResult?: CloseResult;
}

type TranscriptEntry = { who: 'prospect' | 'player' | 'coach'; text: string; key: string; tofillNotes?: string[] };

interface DiscoveryPick {
  routesTo: PitchVariant;
  framingNote: string;
}

export function ConversationScreen({ flowId, config, onExit, onFinish }: Props) {
  const flow = FLOWS[flowId];
  const runPlan = useMemo(() => buildRun(flow, config), [flow, config]);
  const [stepIndex, setStepIndex] = useState(0);
  const [rapport, setRapport] = useState(0);
  const [transcript, setTranscript] = useState<TranscriptEntry[]>([]);
  const [resolved, setResolved] = useState(false);
  const [discoveryPick, setDiscoveryPick] = useState<DiscoveryPick | null>(null);
  const [closeOutcome, setCloseOutcome] = useState<{ name: string; result: CloseResult } | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const seenStepRef = useRef(-1);

  const step: Step | undefined = runPlan.steps[stepIndex];
  const pct = rapportPercent(rapport, runPlan.maxRapport);

  function addEntries(entries: TranscriptEntry[]) {
    setTranscript((t) => [...t, ...entries]);
  }

  useEffect(() => {
    if (!step) return;
    if (seenStepRef.current === stepIndex) return;
    seenStepRef.current = stepIndex;
    setResolved(false);

    if (step.kind === 'entry') {
      const entries: TranscriptEntry[] = [
        { who: 'coach', text: step.context ?? step.scenarioLabel, key: `${stepIndex}-coach` },
        { who: 'player', text: step.usOpening, key: `${stepIndex}-us` },
      ];
      if (step.themLine) entries.push({ who: 'prospect', text: step.themLine, key: `${stepIndex}-them` });
      addEntries(entries);
      if (step.options.length === 0) setResolved(true);
    } else if (step.kind === 'discovery') {
      addEntries([
        { who: 'coach', text: 'Ask before you pitch. Which question fits where the conversation is right now?', key: `${stepIndex}-coach` },
      ]);
    } else if (step.kind === 'pitch') {
      const variant = discoveryPick?.routesTo ?? step.variant;
      const text = flow.library.pitches[variant].text;
      const entries: TranscriptEntry[] = [];
      if (discoveryPick?.framingNote) {
        entries.push({ who: 'coach', text: discoveryPick.framingNote, key: `${stepIndex}-coach` });
      }
      entries.push({ who: 'player', text, key: `${stepIndex}-pitch` });
      addEntries(entries);
      setResolved(true);
    } else if (step.kind === 'objection') {
      addEntries([
        { who: 'coach', text: "Handle it well. If they go quiet after, don't fill it — they're thinking, not leaving.", key: `${stepIndex}-coach` },
        { who: 'prospect', text: step.trigger, key: `${stepIndex}-them`, tofillNotes: step.tofillNotes },
      ]);
    } else if (step.kind === 'close') {
      addEntries([
        { who: 'coach', text: 'Match the ask to how the conversation has actually gone. Not every conversation should end in an application.', key: `${stepIndex}-coach` },
      ]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepIndex, step]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [transcript, resolved]);

  function applyDelta(quality: Quality) {
    setRapport((r) => r + QUALITY_DELTA[config.difficulty][quality]);
  }

  function handleEntryChoice(optionText: string, quality: Quality) {
    if (resolved || step?.kind !== 'entry') return;
    applyDelta(quality);
    const entries: TranscriptEntry[] = [
      { who: 'player', text: optionText, key: `${stepIndex}-resp-a` },
      { who: 'prospect', text: step.reactions[quality], key: `${stepIndex}-resp-b` },
    ];
    if (step.endsRun && step.endText) {
      entries.push({ who: 'coach', text: step.endText, key: `${stepIndex}-resp-c` });
    }
    addEntries(entries);
    setResolved(true);
  }

  function handleDiscoveryChoice(opt: { id: string; text: string; quality: Quality; answerText: string; framingNote: string; routesTo: PitchVariant }) {
    if (resolved || step?.kind !== 'discovery') return;
    applyDelta(opt.quality);
    addEntries([
      { who: 'player', text: opt.text, key: `${stepIndex}-resp-a` },
      { who: 'prospect', text: opt.answerText, key: `${stepIndex}-resp-b` },
    ]);
    setDiscoveryPick({ routesTo: opt.routesTo, framingNote: opt.framingNote });
    setResolved(true);
  }

  function handleObjectionChoice(optionText: string, quality: Quality) {
    if (resolved || step?.kind !== 'objection') return;
    applyDelta(quality);
    addEntries([
      { who: 'player', text: optionText, key: `${stepIndex}-resp-a` },
      { who: 'prospect', text: step.reactions[quality], key: `${stepIndex}-resp-b` },
    ]);
    setResolved(true);
  }

  function handleClose(close: CloseBlock) {
    if (resolved || step?.kind !== 'close') return;
    const result = evaluateClose(pct, close);
    const reaction =
      result === 'success'
        ? close.successText
        : result === 'overreach'
          ? "...I mean, sure. (That felt like a stretch — you asked for more than this conversation earned.)"
          : "Sure, that works. (Though from how this went, you probably could have asked for more.)";
    addEntries([
      { who: 'player', text: close.text, key: `${stepIndex}-resp-a` },
      { who: 'prospect', text: reaction, key: `${stepIndex}-resp-b` },
    ]);
    setCloseOutcome({ name: close.name, result });
    setResolved(true);
  }

  function handleNext() {
    const isEntryEnd = step?.kind === 'entry' && step.endsRun;
    if (isEntryEnd || stepIndex + 1 >= runPlan.steps.length) {
      onFinish({
        flowId,
        difficulty: config.difficulty,
        rapportPct: pct,
        endedEarly: !!isEntryEnd,
        endText: isEntryEnd && step?.kind === 'entry' ? step.endText : undefined,
        closeName: closeOutcome?.name,
        closeResult: closeOutcome?.result,
      });
    } else {
      setStepIndex((i) => i + 1);
    }
  }

  if (!step) return null;

  return (
    <div className="flex flex-col h-[100svh] max-w-2xl mx-auto w-full bg-white dark:bg-slate-900">
      <header className="shrink-0 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onExit} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            ← Exit
          </button>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">{step.progressLabel}</span>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 capitalize">{config.difficulty}</span>
        </div>
        <RapportMeter percent={pct} />
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {transcript.map((entry) => (
          <div key={entry.key}>
            <ChatBubble who={entry.who}>
              <TofillText text={entry.text} />
            </ChatBubble>
            {entry.tofillNotes && entry.tofillNotes.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1 justify-start">
                {entry.tofillNotes.map((note, i) => (
                  <span
                    key={i}
                    className="inline-block rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs px-2 py-0.5"
                  >
                    ⚠ {note}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </main>

      <footer className="shrink-0 border-t border-slate-200 dark:border-slate-700 p-4">
        {step.kind === 'entry' &&
          (resolved ? (
            <NextButton onClick={handleNext} isLast={step.endsRun || stepIndex + 1 >= runPlan.steps.length} />
          ) : (
            <ChoiceList
              options={step.options}
              onPick={(opt) => handleEntryChoice(opt.text, opt.quality)}
            />
          ))}

        {step.kind === 'discovery' &&
          (resolved ? (
            <NextButton onClick={handleNext} isLast={stepIndex + 1 >= runPlan.steps.length} />
          ) : (
            <div className="flex flex-col gap-2">
              {step.rowOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleDiscoveryChoice(opt)}
                  className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          ))}

        {step.kind === 'pitch' && <NextButton onClick={handleNext} isLast={stepIndex + 1 >= runPlan.steps.length} />}

        {step.kind === 'objection' &&
          (resolved ? (
            <NextButton onClick={handleNext} isLast={stepIndex + 1 >= runPlan.steps.length} />
          ) : (
            <ChoiceList
              options={step.options}
              onPick={(opt) => handleObjectionChoice(opt.text, opt.quality)}
            />
          ))}

        {step.kind === 'close' &&
          (resolved ? (
            <NextButton onClick={handleNext} isLast={stepIndex + 1 >= runPlan.steps.length} />
          ) : (
            <div className="flex flex-col gap-2">
              {step.closes.map((close) => (
                <button
                  key={close.id}
                  onClick={() => handleClose(close)}
                  className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm transition"
                >
                  <div className="font-semibold text-xs text-violet-600 dark:text-violet-400 mb-0.5">{close.name}</div>
                  <div className="text-slate-800 dark:text-slate-100">
                    <TofillText text={close.text} />
                  </div>
                </button>
              ))}
            </div>
          ))}
      </footer>
    </div>
  );
}

function ChoiceList({
  options,
  onPick,
}: {
  options: { id: string; text: string; quality: Quality }[];
  onPick: (opt: { id: string; text: string; quality: Quality }) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => onPick(opt)}
          className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition"
        >
          {opt.text}
        </button>
      ))}
    </div>
  );
}

function NextButton({ onClick, isLast }: { onClick: () => void; isLast: boolean }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 text-sm transition"
    >
      {isLast ? 'See results' : 'Next'}
    </button>
  );
}
