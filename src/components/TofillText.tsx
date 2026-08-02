const TOFILL_RE = /\[\[TOFILL:([^\]]+)\]\]/g;

/** Renders block text, turning [[TOFILL:label]] markers into a visible "BRM to confirm" badge
 * instead of inventing the missing specifics. */
export function TofillText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  TOFILL_RE.lastIndex = 0;
  while ((match = TOFILL_RE.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    parts.push(
      <span
        key={`tofill-${key++}`}
        className="inline-block rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-[0.8em] font-medium px-1.5 py-0.5 mx-0.5 align-baseline"
      >
        ⚠ {match[1]} — BRM to confirm
      </span>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));
  return <>{parts}</>;
}
