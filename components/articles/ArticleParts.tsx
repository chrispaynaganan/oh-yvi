import Image from "next/image";
import Link from "next/link";
import { categoryLabel } from "@/data/articles";
import { formatLongDate } from "@/lib/dates";
import { cn } from "@/lib/utils";
import type { Article } from "@/types";

export function ArticleTag({ label, className }: { label: string; className?: string }) {
  return (
    <span className={cn("inline-flex rounded-xl bg-chip px-4 py-2.5", className)}>
      <span className="trim block font-mono text-sm font-bold text-chip-text">{label}</span>
    </span>
  );
}

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  return (
    <p className={cn("flex items-center gap-2 font-mono text-xs", className)}>
      <span className="trim block">{formatLongDate(article.publishedAt)}</span>
      <span aria-hidden className="size-0.75 rounded-full bg-current" />
      <span className="trim block">{article.readMinutes} min read</span>
    </p>
  );
}

/** Card used in the Creator's Lounge and in "related" lists */
export function ArticleCard({ article, className }: { article: Article; className?: string }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className={cn("group flex flex-col overflow-hidden rounded-2xl border border-line-strong p-1.5", className)}
    >
      <div className="relative h-40.25 overflow-hidden rounded-lg bg-placeholder">
        <Image
          src={article.image}
          alt=""
          fill
          sizes="450px"
          className="object-cover transition-transform duration-500 group-hover:scale-102"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-3.5 px-1.5 py-4">
        <ArticleTag label={categoryLabel(article.category).toLowerCase()} />
        <div className="flex flex-1 flex-col justify-between gap-4 text-muted">
          <div className="flex flex-col gap-4">
            <h3 className="font-mono text-lg font-bold transition-colors group-hover:text-brand">{article.title}</h3>
            <p className="font-mono text-sm">{article.excerpt}</p>
          </div>
          <p className="font-mono text-xs">{article.readMinutes} min read</p>
        </div>
      </div>
    </Link>
  );
}