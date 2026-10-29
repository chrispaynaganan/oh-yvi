"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleParts";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

export default function LoungeCarousel({ articles }: { articles: Article[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [overflows, setOverflows] = useState(false);

  // Arrows appear only when the cards don't all fit (e.g. 4 cards on a tablet)
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const sync = () => {
      setOverflows(el.scrollWidth > el.clientWidth + 1);
      setAtStart(el.scrollLeft <= 1);
      setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
    };
    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    el.addEventListener("scroll", sync, { passive: true });
    return () => {
      observer.disconnect();
      el.removeEventListener("scroll", sync);
    };
  }, []);

  function step(direction: 1 | -1) {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior: "smooth" });
  }

  const arrow = (direction: 1 | -1, disabled: boolean) => (
    <button
      type="button"
      onClick={() => step(direction)}
      disabled={disabled}
      aria-label={direction === 1 ? "Next articles" : "Previous articles"}
      className={cn("relative size-12.5 transition-opacity hover:opacity-80 disabled:opacity-30", direction === 1 && "rotate-180")}
    >
      <Image src="/icons/arrow-circle-left.svg" alt="" fill unoptimized />
    </button>
  );

  return (
    <section className="mt-10 max-xl:mt-14">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Creator’s Lounge</h2>
        {overflows && (
          <div className="flex items-center gap-4">
            {arrow(-1, atStart)}
            {arrow(1, atEnd)}
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="scrollbar-none mt-4.25 flex snap-x snap-mandatory gap-5 overflow-x-auto max-xl:mt-3.75 max-xl:gap-3.75"
      >
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} className="w-83.25 shrink-0 snap-start max-xl:w-62.75" />
        ))}
      </div>
    </section>
  );
}
