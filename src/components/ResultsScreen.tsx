import { FLOWS } from '../data';
import { DIFFICULTY_LABEL } from '../data/types';
import type { FinishResult } from './ConversationScreen';

interface Props {
  result: FinishResult;
  onRestart: () => void;
  onChangeSettings: () => void;
}

export function ResultsScreen({ result, onRestart, onChangeSettings }: Props) {
  const flow = FLOWS[result.flowId];
  const pct = Math.round(result.rapportPct);

  let headline: string;
  let verdictColor: string;
  let body: string;

  if (result.endedEarly) {
    headline = 'The conversation ended early.';
    verdictColor = 'text-amber-600 dark:text-amber-400';
    body = "Some conversations just don't go anywhere, and that's fine — the door stays open. Try the same scenario again, or pick a different one to see how it plays differently.";
  } else if (result.closeResult === 'success') {
    headline = `You landed the "${result.closeName}" close.`;
    verdictColor = 'text-emerald-600 dark:text-emerald-400';
    body = "Your choices earned enough trust for this ask to land naturally. That's the goal: match the ask to the conversation, not the other way around.";
  } else if (result.closeResult === 'overreach') {
    headline = `You reached for "${result.closeName}" — it was a stretch.`;
    verdictColor = 'text-amber-600 dark:text-amber-400';
    body = 'This ask needed more rapport than the conversation had built. Try the earlier stages\' best option each time — specific, curious, and not rushing the pitch scores highest for a reason.';
  } else {
    headline = `You landed "${result.closeName}" — but you may have undersold it.`;
    verdictColor = 'text-amber-600 dark:text-amber-400';
    body = 'They said yes, but the conversation had earned more than this ask reflects. Not a failure — just worth noticing you could have asked for more.';
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-10 text-center">
      <p className="text-xs font-semibold tracking-wide text-violet-600 dark:text-violet-400 uppercase mb-2">
        {flow.title} · {DIFFICULTY_LABEL[result.difficulty]}
      </p>
      <h1 className={`text-2xl sm:text-3xl font-semibold mb-3 ${verdictColor}`}>{headline}</h1>

      <div className="mx-auto max-w-xs my-6">
        <div className="text-4xl font-bold text-slate-900 dark:text-slate-50">{pct}%</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">final rapport</div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto mb-8">{body}</p>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={onRestart}
          className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-6 text-sm transition"
        >
          Try again, same setup
        </button>
        <button
          onClick={onChangeSettings}
          className="rounded-xl border border-slate-300 dark:border-slate-600 hover:border-violet-400 text-slate-700 dark:text-slate-200 font-semibold py-3 px-6 text-sm transition"
        >
          Change scenario / difficulty
        </button>
      </div>
    </div>
  );
}
