interface Props {
  who: 'prospect' | 'player' | 'coach';
  children: React.ReactNode;
}

export function ChatBubble({ who, children }: Props) {
  if (who === 'coach') {
    return (
      <div className="mx-auto max-w-[90%] text-center text-xs sm:text-sm italic text-slate-500 dark:text-slate-400 px-3 py-2">
        {children}
      </div>
    );
  }

  const isPlayer = who === 'player';
  return (
    <div className={`flex w-full ${isPlayer ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[85%] sm:max-w-[75%] rounded-2xl px-4 py-2.5 text-sm sm:text-base leading-snug whitespace-pre-wrap shadow-sm ${
          isPlayer
            ? 'bg-violet-600 text-white rounded-br-sm'
            : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-slate-100 rounded-bl-sm'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
