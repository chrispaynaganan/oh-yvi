"use client";

import { useNowSeconds } from "@/lib/clock";

const UNITS = [
  ["days", 86400],
  ["hours", 3600],
  ["minutes", 60],
  ["seconds", 1],
] as const;

export default function Countdown({ endsAt }: { endsAt: string }) {
  const now = useNowSeconds();
  const end = Math.floor(new Date(endsAt).getTime() / 1000);
  const left = now === null ? 0 : Math.max(0, end - now);

  // Each unit = what's left within the next-larger unit
  const parts = UNITS.map(([label, size], i) => {
    const within = i === 0 ? Infinity : UNITS[i - 1][1];
    return { label, value: Math.floor((left % within) / size) };
  });

  return (
    <div role="timer" aria-label="Time left in the sale" className="flex items-center gap-4">
      {parts.map(({ label, value }) => (
        <div
          key={label}
          className="flex size-15 flex-col items-center justify-center gap-2.5 rounded-full border border-line-strong text-center text-muted-3"
        >
          <span className="trim block font-serif text-25">
            {now === null ? "--" : String(value).padStart(2, "0")}
          </span>
          <span className="trim block font-mono text-8 uppercase">{label}</span>
        </div>
      ))}
    </div>
  );
}