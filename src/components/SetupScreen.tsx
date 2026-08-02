import { useEffect, useState } from 'react';
import { FLOWS } from '../data';
import type { Channel, Difficulty, FlowId, InitiatedBy } from '../data/types';
import { DIFFICULTY_LABEL, DIFFICULTY_TAGLINE } from '../data/types';
import type { RunConfig } from '../game/engine';

interface Props {
  onStart: (flowId: FlowId, config: RunConfig) => void;
}

const DIFFS: Difficulty[] = ['easy', 'medium', 'hard'];

function OptionGrid<T extends string>({
  options,
  selected,
  onSelect,
  columns = 2,
}: {
  options: { id: T; label: string; description?: string }[];
  selected: T;
  onSelect: (id: T) => void;
  columns?: number;
}) {
  return (
    <div className={`grid gap-3 ${columns === 2 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'}`}>
      {options.map((opt) => {
        const isSelected = opt.id === selected;
        return (
          <button
            key={opt.id}
            onClick={() => onSelect(opt.id)}
            className={`text-left rounded-xl border p-3.5 transition ${
              isSelected
                ? 'border-violet-500 bg-violet-50 dark:bg-violet-950/40 ring-2 ring-violet-500'
                : 'border-slate-200 dark:border-slate-700 hover:border-violet-300'
            }`}
          >
            <div className="font-medium text-sm text-slate-900 dark:text-slate-50">{opt.label}</div>
            {opt.description && (
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{opt.description}</div>
            )}
          </button>
        );
      })}
    </div>
  );
}

export function SetupScreen({ onStart }: Props) {
  const [flowId, setFlowId] = useState<FlowId>('direct');
  const [channel, setChannel] = useState<Channel>('online');
  const [initiatedBy, setInitiatedBy] = useState<InitiatedBy>('us');
  const [scenarioId, setScenarioId] = useState('');
  const [offlineOpeningId, setOfflineOpeningId] = useState('');
  const [diffIndex, setDiffIndex] = useState(1);
  const difficulty = DIFFS[diffIndex];
  const flow = FLOWS[flowId];

  const scenarios = flow.entry[initiatedBy];

  useEffect(() => {
    setScenarioId(scenarios[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowId, initiatedBy]);

  useEffect(() => {
    setOfflineOpeningId(flow.offlineOpenings[0]?.id ?? '');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flowId]);

  function handleStart() {
    onStart(flowId, {
      channel,
      difficulty,
      initiatedBy: channel === 'online' ? initiatedBy : undefined,
      scenarioId: channel === 'online' ? scenarioId : undefined,
      offlineOpeningId: channel === 'offline' ? offlineOpeningId : undefined,
    });
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 sm:py-12">
      <div className="text-center mb-8">
        <p className="text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-400 uppercase mb-2">
          Blue Ribbon Movement · Community Connect Fellowship
        </p>
        <h1 className="text-2xl sm:text-3xl font-semibold text-slate-900 dark:text-slate-50">
          Conversation Trainer
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-500 dark:text-slate-400">
          Practice the outreach conversation. Pick your scenario, set the difficulty, see how it plays out.
        </p>
      </div>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Who are you talking to?</h2>
        <OptionGrid
          options={(Object.keys(FLOWS) as FlowId[]).map((id) => ({
            id,
            label: FLOWS[id].title,
            description: FLOWS[id].subtitle,
          }))}
          selected={flowId}
          onSelect={setFlowId}
        />
      </section>

      <section className="mb-6">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">How does it start?</h2>
        <OptionGrid
          options={[
            { id: 'online' as Channel, label: 'Online / Cold', description: 'DM, email, LinkedIn' },
            { id: 'offline' as Channel, label: 'Offline / Warm', description: 'Event, coffee, a scheduled call' },
          ]}
          selected={channel}
          onSelect={setChannel}
        />
      </section>

      {channel === 'online' ? (
        <>
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Who started the conversation?</h2>
            <OptionGrid
              options={[
                { id: 'us' as InitiatedBy, label: 'You reached out to them' },
                { id: 'them' as InitiatedBy, label: 'They reached out to you' },
              ]}
              selected={initiatedBy}
              onSelect={setInitiatedBy}
            />
          </section>
          <section className="mb-6">
            <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">What's the situation?</h2>
            <OptionGrid
              columns={1}
              options={scenarios.map((s) => ({ id: s.id, label: s.label, description: s.context }))}
              selected={scenarioId}
              onSelect={setScenarioId}
            />
          </section>
        </>
      ) : (
        <section className="mb-6">
          <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Where's this happening?</h2>
          <OptionGrid
            options={flow.offlineOpenings.map((o) => ({
              id: o.id,
              label: o.label,
              description:
                flowId === 'partners' && o.id === 'formal-call'
                  ? 'Full call simulation — a real clock, an org you know nothing about, and six phases to get through'
                  : undefined,
            }))}
            selected={offlineOpeningId}
            onSelect={setOfflineOpeningId}
          />
        </section>
      )}

      <section className="mb-8">
        <h2 className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-3">Difficulty</h2>
        <div className="rounded-xl border border-slate-200 dark:border-slate-700 p-4">
          <input
            type="range"
            min={0}
            max={2}
            step={1}
            value={diffIndex}
            onChange={(e) => setDiffIndex(Number(e.target.value))}
            className="w-full accent-violet-600"
            aria-label="Difficulty"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1 px-0.5">
            <span>Easy</span>
            <span>Medium</span>
            <span>Hard</span>
          </div>
          <div className="mt-3 text-center">
            <span className="inline-block rounded-full bg-slate-100 dark:bg-slate-800 px-3 py-1 text-sm font-semibold text-slate-800 dark:text-slate-100">
              {DIFFICULTY_LABEL[difficulty]}
            </span>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{DIFFICULTY_TAGLINE[difficulty]}</p>
          </div>
        </div>
      </section>

      <button
        onClick={handleStart}
        className="w-full rounded-xl bg-violet-600 hover:bg-violet-700 active:bg-violet-800 text-white font-semibold py-3.5 text-base transition"
      >
        Start conversation
      </button>
      <p className="mt-3 text-center text-xs text-slate-400">Frame: {flow.frame}</p>
    </div>
  );
}
