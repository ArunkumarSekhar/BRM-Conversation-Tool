interface Props {
  percent: number;
}

export function RapportMeter({ percent }: Props) {
  const clamped = Math.max(0, Math.min(100, percent));
  const color =
    clamped >= 65 ? 'bg-emerald-500' : clamped >= 35 ? 'bg-amber-500' : 'bg-rose-500';

  return (
    <div className="w-full">
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
        <span>Rapport</span>
        <span>{Math.round(clamped)}%</span>
      </div>
      <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
