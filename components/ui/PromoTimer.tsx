"use client";

import { useNowSeconds } from "@/lib/clock";

const pad = (n: number) => String(n).padStart(2, "0");

export default function PromoTimer({ endsAt }: { endsAt: string }) {
  const now = useNowSeconds();
  const end = Math.floor(new Date(endsAt).getTime() / 1000);
  const left = now === null ? null : Math.max(0, end - now);

  if (left === 0) return null;

  const time =
    left === null
      ? "--h --m --s"
      : `${Math.floor(left / 3600)}h ${pad(Math.floor((left % 3600) / 60))}m ${pad(left % 60)}s`;

  return (
    <span className="inline-flex items-center justify-center rounded-sm bg-promo px-2.5 py-1.5">
      <span className="trim block font-mono text-9 whitespace-nowrap text-white">
        promo ends in <span className="font-bold">{time}</span>
      </span>
    </span>
  );
}