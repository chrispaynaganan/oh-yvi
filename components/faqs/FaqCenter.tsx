"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import FilterChip from "@/components/ui/FilterChip";
import type { Faq, FaqCategory } from "@/data/faqs";
import { cn } from "@/lib/utils";

const VISIBLE_CATEGORIES = 3;

function AnswerPanel({
  faq,
  categoryLabel,
  feedback,
  onFeedback,
}: {
  faq: Faq;
  categoryLabel: string;
  feedback?: "yes" | "no";
  onFeedback: (value: "yes" | "no") => void;
}) {
  return (
    <article className="col-span-8 col-start-5 flex flex-col gap-7.75 rounded-2xl border border-line-soft p-6">
      <div className="flex flex-col gap-9">
        <div className="flex flex-col gap-3.5">
          <p className="font-mono text-sm text-muted">{categoryLabel.toLowerCase()}</p>
          <div className="flex flex-col gap-4">
            <h3 className="font-serif text-28 text-black">{faq.question}</h3>
            <p className="font-mono text-sm text-muted">{faq.answer}</p>
          </div>
        </div>

        {faq.steps && (
          <ol className="grid grid-cols-4 gap-4">
            {faq.steps.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-4 rounded-lg border border-line-soft p-4">
                <span className="flex size-6.25 items-center justify-center rounded-full border border-line-soft">
                  <span className="trim block font-serif text-xs text-black">{i + 1}</span>
                </span>
                <div className="flex flex-col gap-2.5">
                  <p className="font-serif text-sm text-black">{step.title}</p>
                  <p className="font-mono text-xs text-muted">{step.note}</p>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>

      <div className="flex items-center gap-6.5" aria-live="polite">
        {feedback ? (
          <p className="font-mono text-sm text-muted">Thanks for letting us know.</p>
        ) : (
          <>
            <p className="font-mono text-sm text-muted">was this helpful?</p>
            <div className="flex items-center gap-3">
              {(["yes", "no"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => onFeedback(value)}
                  className="flex items-center gap-2.5 rounded-full border border-line-strong p-2 transition-colors hover:border-brand"
                >
                  <Image
                    src={value === "yes" ? "/icons/thumb-up.svg" : "/icons/thumb-down.svg"}
                    alt=""
                    width={18}
                    height={20}
                    className="h-5 w-4.5"
                    unoptimized
                  />
                  <span className="trim block font-mono text-sm text-black">{value}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </article>
  );
}

export default function FaqCenter({ faqs, categories }: { faqs: Faq[]; categories: FaqCategory[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [selectedId, setSelectedId] = useState(faqs[0]?.id);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [feedback, setFeedback] = useState<Record<string, "yes" | "no">>({});
  const browseRef = useRef<HTMLElement>(null);

  const q = query.trim().toLowerCase();
  const list = faqs.filter(
    (faq) =>
      (category === "all" || faq.categoryId === category) &&
      (!q || `${faq.question} ${faq.answer}`.toLowerCase().includes(q)),
  );
  const selected = list.find((faq) => faq.id === selectedId) ?? list[0];
  const mostAsked = faqs.filter((faq) => faq.mostAsked);
  const visibleCategories = showAllCategories ? categories : categories.slice(0, VISIBLE_CATEGORIES);
  const labelOf = (id: string) => categories.find((c) => c.id === id)?.label ?? "";

  function openQuestion(id: string) {
    setCategory("all");
    setQuery("");
    setSelectedId(id);
    browseRef.current?.scrollIntoView({ block: "start" });
  }

  return (
    <>
      <div className="mt-19.75 grid grid-cols-12 gap-x-5">
        <label className="col-span-4 col-start-9 flex items-center gap-3 rounded-full bg-surface-muted p-4">
          <Image src="/icons/search-dark.svg" alt="" width={17} height={17} className="size-4.25 shrink-0" unoptimized />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search questions and answers"
            aria-label="Search questions and answers"
            className="w-full bg-transparent font-mono text-15 text-ink outline-none placeholder:text-muted-2"
          />
        </label>
      </div>

      <section className="mt-8.75">
        <h2 className="font-serif text-28 text-ink">Most asked</h2>
        <div className="mt-11 grid grid-cols-3 gap-5">
          {mostAsked.map((faq) => (
            <article key={faq.id} className="flex flex-col items-start gap-6 rounded-2xl border border-line p-5">
              <div className="flex flex-col gap-4">
                <h3 className="font-serif text-xl text-ink">{faq.question}</h3>
                <p className="no-trim line-clamp-3 font-mono text-15 text-muted">{faq.answer}</p>
              </div>
              <button
                type="button"
                onClick={() => openQuestion(faq.id)}
                className="rounded-full border border-brand px-4 py-3 text-brand transition-colors hover:bg-brand/5"
              >
                <span className="trim block font-serif text-sm">more details</span>
              </button>
            </article>
          ))}
        </div>
      </section>

      <section ref={browseRef} className="mt-39 scroll-mt-50">
        <div className="flex items-center justify-between gap-6">
          <h2 className="font-serif text-28 text-ink">Browse by Category</h2>
          <div className="flex flex-wrap items-center justify-end gap-3">
            <FilterChip label="All" active={category === "all"} onClick={() => setCategory("all")} />
            {visibleCategories.map((c) => (
              <FilterChip key={c.id} label={c.label} active={category === c.id} onClick={() => setCategory(c.id)} />
            ))}
            {!showAllCategories && categories.length > VISIBLE_CATEGORIES && (
              <FilterChip label="More…" active={false} onClick={() => setShowAllCategories(true)} />
            )}
          </div>
        </div>

        <div className="mt-12.5 grid grid-cols-12 items-start gap-x-5">
          <ul className="col-span-4 flex flex-col gap-2 rounded-4xl border border-line-soft p-4">
            {list.map((faq) => {
              const active = selected?.id === faq.id;
              return (
                <li key={faq.id}>
                  <button
                    type="button"
                    aria-current={active}
                    onClick={() => setSelectedId(faq.id)}
                    className={cn(
                      "flex w-full items-center justify-between gap-4 rounded-3xl px-6 py-4 text-left transition-colors",
                      active ? "bg-surface-sand" : "hover:bg-surface",
                    )}
                  >
                    <span className="trim block font-serif text-lg text-ink">{faq.question}</span>
                    <Image src="/icons/chevron-right.svg" alt="" width={11} height={20} className="h-5 w-2.75 shrink-0" unoptimized />
                  </button>
                </li>
              );
            })}
            {list.length === 0 && (
              <li className="px-6 py-4 font-mono text-sm text-muted">
                No questions match “{query}”. Try another word, or ask us below.
              </li>
            )}
          </ul>

          {selected && (
            <AnswerPanel
              faq={selected}
              categoryLabel={labelOf(selected.categoryId)}
              feedback={feedback[selected.id]}
              onFeedback={(value) => setFeedback({ ...feedback, [selected.id]: value })}
            />
          )}
        </div>
      </section>
    </>
  );
}