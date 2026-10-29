"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArticleMeta, ArticleTag } from "@/components/articles/ArticleParts";
import LoungeCarousel from "@/components/articles/LoungeCarousel";
import EmptyState from "@/components/ui/EmptyState";
import FilterChip from "@/components/ui/FilterChip";
import { articleCategories, categoryLabel } from "@/data/articles";
import type { Article, ArticleCategory } from "@/types";

type Filter = "all" | ArticleCategory;

export default function ArticlesBrowser({ articles }: { articles: Article[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const urlCategory = params.get("category");
  const category: Filter = articleCategories.some((c) => c.id === urlCategory)
    ? (urlCategory as ArticleCategory)
    : "all";
  const urlQuery = params.get("q") ?? "";

  // The box keeps what's typed; it resets when the address changes (e.g. "See all articles")
  const [query, setQuery] = useState(urlQuery);
  const [syncedQuery, setSyncedQuery] = useState(urlQuery);
  if (urlQuery !== syncedQuery) {
    setSyncedQuery(urlQuery);
    setQuery(urlQuery);
  }

  function updateUrl(nextCategory: Filter, nextQuery: string) {
    const sp = new URLSearchParams();
    if (nextCategory !== "all") sp.set("category", nextCategory);
    if (nextQuery.trim()) sp.set("q", nextQuery.trim());
    const qs = sp.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }

  const q = query.trim().toLowerCase();
  const matches = articles
    .filter(
      (a) =>
        (category === "all" || a.category === category) &&
        (!q || `${a.title} ${a.excerpt} ${a.tags.join(" ")}`.toLowerCase().includes(q)),
    )
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

  const stories = matches.filter((a) => !a.lounge);
  const featured = stories.find((a) => a.featured) ?? stories[0];
  const latest = stories.filter((a) => a !== featured).slice(0, 4);
  const lounge = matches.filter((a) => a.lounge);
  const filtering = category !== "all" || q !== "";

  return (
    <>
      <div className="mt-8 flex items-start justify-between gap-10">
        <p className="w-142 font-mono text-base text-muted">
          Tips for getting the most out of your orders, and a look at how we make them.
        </p>
        <div className="flex flex-wrap items-center justify-end gap-3">
          <FilterChip label="All" active={category === "all"} onClick={() => updateUrl("all", query)} />
          {articleCategories.map((c) => (
            <FilterChip key={c.id} label={c.label} active={category === c.id} onClick={() => updateUrl(c.id, query)} />
          ))}
        </div>
      </div>

      <div className="mt-12.25 grid grid-cols-12 gap-x-5">
        <label className="col-span-4 col-start-9 flex items-center gap-3 rounded-full bg-surface-muted p-4">
          <Image src="/icons/search-dark.svg" alt="" width={17} height={17} className="size-4.25 shrink-0" unoptimized />
          <input
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              updateUrl(category, e.target.value);
            }}
            placeholder="Search articles"
            aria-label="Search articles"
            className="w-full bg-transparent font-mono text-15 text-ink outline-none placeholder:text-muted-2"
          />
        </label>
      </div>

      {matches.length === 0 ? (
        <EmptyState
          className="mt-12.5"
          message={
            filtering
              ? "No articles match that yet. Try another topic or a different word."
              : "No articles yet. We’re writing new stories, guides and updates. Check back soon."
          }
          cta={filtering ? { label: "See all articles", href: "/articles" } : { label: "View our Collections", href: "/collections" }}
        />
      ) : (
        <>
          {featured && (
            <div className="mt-14 grid grid-cols-12 items-start gap-x-5">
              <Link
                href={`/articles/${featured.slug}`}
                className="group relative col-span-8 h-122.5 overflow-hidden rounded-2xl bg-placeholder"
              >
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  priority
                  sizes="921px"
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-3.25 bg-overlay px-7.25 pt-3.25 pb-5.5 backdrop-blur-xs">
                  <ArticleTag label={categoryLabel(featured.category).toLowerCase()} />
                  <h2 className="w-214.5 font-serif text-28 text-white">{featured.title}</h2>
                  <ArticleMeta article={featured} className="mt-0.75 text-white" />
                </div>
              </Link>

              {latest.length > 0 && (
                <aside className="col-span-4 col-start-9">
                  <h2 className="font-serif text-2xl text-ink">Latest post</h2>
                  <ul className="mt-8.25 flex flex-col gap-4">
                    {latest.map((article) => (
                      <li key={article.slug}>
                        <Link href={`/articles/${article.slug}`} className="group flex items-center gap-5">
                          <div className="relative size-24.5 shrink-0 overflow-hidden rounded-lg bg-placeholder">
                            <Image src={article.image} alt="" fill sizes="98px" className="object-cover" />
                          </div>
                          <div className="flex w-83 flex-col gap-4">
                            <p className="font-serif text-lg text-muted transition-colors group-hover:text-brand">
                              {article.title}
                            </p>
                            <ArticleMeta article={article} className="text-muted" />
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </aside>
              )}
            </div>
          )}

          {lounge.length > 0 && (
            <>
              <hr className="mt-14.75 border-line" />
              <LoungeCarousel articles={lounge} />
            </>
          )}
        </>
      )}
    </>
  );
}