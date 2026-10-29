"use client";

import { useState } from "react";
import BundleCard from "@/components/product/BundleCard";
import { cn } from "@/lib/utils";
import type { Bundle } from "@/types";

type Filter = { label: string; collectionSlug: string };

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-xl px-3.5 py-2.5 font-serif text-base transition-colors",
        active ? "bg-brand text-white" : "border border-brand text-brand hover:bg-brand/5",
      )}
    >
      <span className="trim block whitespace-nowrap">{label}</span>
    </button>
  );
}

export default function BundleBrowser({
  bundles,
  filters,
}: {
  bundles: Bundle[];
  filters: Filter[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const shown = active ? bundles.filter((b) => b.collectionSlugs?.includes(active)) : bundles;

  return (
    <>
      <div className="mt-16.5 flex flex-wrap items-center gap-3">
        <Chip label="All" active={active === null} onClick={() => setActive(null)} />
        {filters.map((filter) => (
          <Chip
            key={filter.collectionSlug}
            label={filter.label}
            active={active === filter.collectionSlug}
            onClick={() => setActive(filter.collectionSlug)}
          />
        ))}
      </div>

      {shown.length > 0 ? (
        <div className="mt-8.5 grid grid-cols-3 gap-5">
          {shown.map((bundle) => (
            <BundleCard key={bundle.id} {...bundle} />
          ))}
        </div>
      ) : (
        <p className="mt-8.5 font-mono text-sm text-muted">
          No bundles here yet. Check back soon.
        </p>
      )}
    </>
  );
}