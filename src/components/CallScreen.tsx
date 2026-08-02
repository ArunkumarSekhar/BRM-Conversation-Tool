import { useEffect, useMemo, useRef, useState } from 'react';
import type { Difficulty } from '../data/types';
import { DIFFICULTY_LABEL } from '../data/types';
import { PHASE_LABEL, ASK_LADDER, ASK_SIZES, type AskId } from '../data/partnersCall/beats';
import type { FactKey } from '../data/partnersCall/persona';
import {
  createCall,
  chooseBeatOption,
  askDiscoveryQuestion,
  finishDiscovery,
  selectAsks,
  chooseAskSize,
  chooseClose,
  minutesLeft,
  rapportPct,
  remainingQuestions,
  availableCloses,
  type CallState,
} from '../game/callEngine';
import { ChatBubble } from './ChatBubble';
import { TofillText } from './TofillText';
import { RapportMeter } from './RapportMeter';

export interface CallResult {
  difficulty: Difficulty;
  orgName: string;
  budgetMinutes: number;
  minutesUsed: number;
  rapportPct: number;
  factsFound: number;
  factsTotal: number;
  endedOnTime: boolean;
  closeLabel?: string;
  closeLanded?: boolean;
}

interface Props {
  difficulty: Difficulty;
  onExit: () => void;
  onFinish: (result: CallResult) => void;
}

const FACT_LABEL: Record<FactKey, string> = {
  ccfKnowledge: 'What they know about CCF',
  programShape: 'Program size & cadence',
  training: 'Their training setup',
  afterOneYear: 'What happens after a year',
  nameInMind: 'Someone they could nominate',
  authority: 'Who decides',
  pastPartnership: 'Past partnership history',
};

const ALL_FACTS = Object.keys(FACT_LABEL) as FactKey[];

export function CallScreen({ difficulty, onExit, onFinish }: Props) {
  const [state, setState] = useState<CallState>(() => createCall({ difficulty }));
  const [pickedAsks, setPickedAsks] = useState<AskId[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  const left = minutesLeft(state);
  const pct = rapportPct(state);
  const timePct = (left / state.minutesTotal) * 100;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [state.transcript.length, state.pending.kind]);

  const timeColor = timePct > 50 ? 'bg-emerald-500' : timePct > 20 ? 'bg-amber-500' : 'bg-rose-500';

  const finish = () =>
    onFinish({
      difficulty,
      orgName: state.persona.orgName,
      budgetMinutes: state.minutesTotal,
      minutesUsed: state.minutesUsed,
      rapportPct: pct,
      factsFound: state.discovered.size,
      factsTotal: ALL_FACTS.length,
      endedOnTime: state.endReason === 'time',
      closeLabel: state.closeLabel,
      closeLanded: state.closeLanded,
    });

  const closes = useMemo(() => availableCloses(state), [state]);
  const questions = remainingQuestions(state);

  return (
    <div className="flex flex-col h-[100svh] max-w-2xl mx-auto w-full bg-white dark:bg-slate-900">
      <header className="shrink-0 border-b border-slate-200 dark:border-slate-700 px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <button onClick={onExit} className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
            ← Exit
          </button>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {PHASE_LABEL[state.phase]}
          </span>
          <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">
            {DIFFICULTY_LABEL[difficulty]}
          </span>
        </div>

        <div className="mb-2">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span>Time left</span>
            <span className={left <= 3 ? 'font-semibold text-rose-500' : ''}>
              {left} of {state.minutesTotal} min
            </span>
          </div>
          <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className={`h-full rounded-full transition-all duration-500 ${timeColor}`} style={{ width: `${timePct}%` }} />
          </div>
        </div>

        <RapportMeter percent={pct} />

        <div className="mt-2 flex flex-wrap gap-1">
          {ALL_FACTS.map((f) => {
            const known = state.discovered.has(f);
            return (
              <span
                key={f}
                className={`text-[10px] rounded px-1.5 py-0.5 ${
                  known
                    ? 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500'
                }`}
              >
                {known ? '✓' : '○'} {FACT_LABEL[f]}
              </span>
            );
          })}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {state.transcript.map((l) =>
          l.who === 'system' ? (
            <div
              key={l.key}
              className="mx-auto max-w-[90%] text-center text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 rounded-lg px-3 py-2"
            >
              {l.text}
            </div>
          ) : (
            <ChatBubble key={l.key} who={l.who}>
              <TofillText text={l.text} />
            </ChatBubble>
          ),
        )}
        <div ref={bottomRef} />
      </main>

      <footer className="shrink-0 border-t border-slate-200 dark:border-slate-700 p-4">
        {state.ended ? (
          <button
            onClick={finish}
            className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 text-sm transition"
          >
            See results
          </button>
        ) : state.pending.kind === 'beat' ? (
          <div className="flex flex-col gap-2">
            {state.pending.beat.options.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setState(chooseBeatOption(state, opt))}
                className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition"
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-[10px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                    {opt.minutes}m
                  </span>
                  <span>
                    <TofillText text={opt.text} />
                  </span>
                </div>
              </button>
            ))}
          </div>
        ) : state.pending.kind === 'discovery' ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400">
              Ask what you need to know. Every question costs time — {left} min left.
            </p>
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => setState(askDiscoveryQuestion(state, q.id))}
                className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition"
              >
                <div className="flex items-start gap-2">
                  <span className="shrink-0 text-[10px] font-semibold text-slate-400 mt-0.5 tabular-nums">
                    {q.minutes}m
                  </span>
                  <span>{q.text}</span>
                </div>
              </button>
            ))}
            <button
              onClick={() => setState(finishDiscovery(state))}
              className="mt-1 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-medium py-2.5 text-sm transition"
            >
              Move on to your pitch
            </button>
          </div>
        ) : state.pending.kind === 'ask-select' ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400">Pick the asks you'll make, cheapest first ({pickedAsks.length} selected)</p>
            {ASK_LADDER.map((ask) => {
              const on = pickedAsks.includes(ask.id);
              return (
                <button
                  key={ask.id}
                  onClick={() =>
                    setPickedAsks((p) => (on ? p.filter((x) => x !== ask.id) : [...p, ask.id]))
                  }
                  className={`text-left rounded-xl border px-3.5 py-2.5 text-sm transition ${
                    on
                      ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 text-violet-900 dark:text-violet-200'
                      : 'border-slate-200 dark:border-slate-700 hover:border-violet-300 text-slate-800 dark:text-slate-100'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-0.5">
                    <span className="font-semibold text-xs text-violet-600 dark:text-violet-400">{ask.label}</span>
                    <span className="text-[10px] text-slate-400 tabular-nums">{ask.minutes}m</span>
                  </div>
                  <div>{ask.text}</div>
                </button>
              );
            })}
            <button
              disabled={pickedAsks.length === 0}
              onClick={() => {
                setState(selectAsks(state, pickedAsks));
                setPickedAsks([]);
              }}
              className="mt-1 rounded-xl bg-violet-600 disabled:bg-slate-200 disabled:text-slate-400 dark:disabled:bg-slate-800 hover:bg-violet-700 text-white font-medium py-2.5 text-sm transition"
            >
              Make these asks
            </button>
          </div>
        ) : state.pending.kind === 'ask-size' ? (
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400">How many are you asking for?</p>
            {ASK_SIZES.map((s) => (
              <button
                key={s.id}
                onClick={() => setState(chooseAskSize(state, s.id))}
                className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm text-slate-800 dark:text-slate-100 transition"
              >
                {s.text}
              </button>
            ))}
          </div>
        ) : state.pending.kind === 'close' ? (
          <div className="flex flex-col gap-2">
            {closes.map((c) => (
              <button
                key={c.id}
                onClick={() => setState(chooseClose(state, c.id))}
                className="text-left rounded-xl border border-slate-200 dark:border-slate-700 hover:border-violet-400 hover:bg-violet-50 dark:hover:bg-violet-950/30 px-3.5 py-2.5 text-sm transition"
              >
                <div className="font-semibold text-xs text-violet-600 dark:text-violet-400 mb-0.5">{c.label}</div>
                <div className="text-slate-800 dark:text-slate-100">
                  <TofillText text={c.text} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <button
            onClick={finish}
            className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 text-sm transition"
          >
            See results
          </button>
        )}
      </footer>
    </div>
  );
}
