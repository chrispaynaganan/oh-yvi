"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ArticleCard } from "@/components/articles/ArticleParts";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

const VISIBLE = 4;

export default function LoungeCarousel({ articles }: { articles: Article[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(articles.length <= VISIBLE);
  const scrollable = articles.length > VISIBLE;

  function update() {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }

  function step(direction: 1 | -1) {
    const el = trackRef.current;
    const card = el?.firstElementChild as HTMLElement | null;
    if (!el || !card) return;
    el.scrollBy({ left: direction * (card.offsetWidth + 20), behavior: "smooth" });
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
    <section className="mt-10">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-2xl text-ink">Creator’s Lounge</h2>
        {scrollable && (
          <div className="flex items-center gap-4">
            {arrow(-1, atStart)}
            {arrow(1, atEnd)}
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        onScroll={update}
        className="scrollbar-none mt-4.25 flex snap-x snap-mandatory gap-5 overflow-x-auto"
      >
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} className="w-83.25 shrink-0 snap-start" />
        ))}
      </div>
    </section>
  );
}