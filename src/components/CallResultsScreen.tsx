import { DIFFICULTY_LABEL } from '../data/types';
import type { CallResult } from './CallScreen';

interface Props {
  result: CallResult;
  onRestart: () => void;
  onChangeSettings: () => void;
}

export function CallResultsScreen({ result, onRestart, onChangeSettings }: Props) {
  const pct = Math.round(result.rapportPct);

  let headline: string;
  let color: string;
  let body: string;

  if (result.endedOnTime) {
    headline = 'They ran out of time on you.';
    color = 'text-rose-600 dark:text-rose-400';
    body = `You had ${result.budgetMinutes} minutes and the call ended before you landed an ask. The fix is usually upstream: cut the small talk, check what they already know before explaining, and ask fewer, better questions.`;
  } else if (result.closeLanded) {
    headline = `You landed it — ${result.closeLabel?.toLowerCase()}.`;
    color = 'text-emerald-600 dark:text-emerald-400';
    body = 'The ask matched both what the call earned and what this person could actually agree to. That combination is the whole skill.';
  } else {
    headline = `"${result.closeLabel}" didn't land.`;
    color = 'text-amber-600 dark:text-amber-400';
    body = 'Either the call had not built enough for that ask, or you asked someone who could not say yes. Check the transcript for where the rapport actually went.';
  }

  const factPct = Math.round((result.factsFound / result.factsTotal) * 100);

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 text-center">
      <p className="text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-400 uppercase mb-2">
        {result.orgName} · {DIFFICULTY_LABEL[result.difficulty]}
      </p>
      <h1 className={`text-2xl sm:text-3xl font-semibold mb-6 ${color}`}>{headline}</h1>

      <div className="grid grid-cols-3 gap-3 max-w-md mx-auto mb-8">
        <Stat value={`${pct}%`} label="rapport" />
        <Stat value={`${result.minutesUsed}/${result.budgetMinutes}`} label="minutes used" />
        <Stat value={`${result.factsFound}/${result.factsTotal}`} label="facts learned" />
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-3">{body}</p>
      {factPct < 60 && !result.endedOnTime && (
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
          You left the call without {result.factsTotal - result.factsFound} of the {result.factsTotal} things worth
          knowing. The ask is only as good as what you found out first.
        </p>
      )}

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
        <button
          onClick={onRestart}
          className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 text-sm transition"
        >
          New call, same difficulty
        </button>
        <button
          onClick={onChangeSettings}
          className="rounded-xl border border-slate-300 dark:border-slate-600 hover:border-violet-400 text-slate-700 dark:text-slate-200 font-semibold py-3 px-6 text-sm transition"
        >
          Change scenario / difficulty
        </button>
      </div>
      <p className="mt-4 text-xs text-slate-400">
        Each run picks a different organisation and a different amount of time. Try it again.
      </p>
    </div>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-700 py-3">
      <div className="text-xl font-bold text-slate-900 dark:text-slate-50 tabular-nums">{value}</div>
      <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
    </div>
  );
}
