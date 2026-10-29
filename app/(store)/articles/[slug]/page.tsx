import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ArticleActions from "@/components/articles/ArticleActions";
import ArticleBody from "@/components/articles/ArticleBody";
import ArticleComments from "@/components/articles/ArticleComments";
import { ArticleCard, ArticleMeta, ArticleTag } from "@/components/articles/ArticleParts";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { articleComments } from "@/data/articleComments";
import { articles, getArticle } from "@/data/articles";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return { title: `${article.title} — Oh, Yvi!`, description: article.excerpt };
}

export default function ArticlePage({ params }: { params: Params }) {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-36 max-xl:px-6.5 max-xl:pt-8 max-xl:pb-12">
      <Suspense fallback={<ArticleSkeleton />}>
        <ArticleContent params={params} />
      </Suspense>
    </main>
  );
}

async function ArticleContent({ params }: { params: Params }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  // Two more reads: Creator's Lounge picks first
  const others = articles.filter((a) => a.slug !== slug);
  const related = [...others.filter((a) => a.lounge), ...others.filter((a) => !a.lounge)].slice(0, 2);
  const comments = articleComments.filter((c) => c.articleSlug === slug);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/articles" },
          { label: article.title },
        ]}
      />

      <h1 className="mt-18.5 font-serif text-38 text-ink max-xl:mt-11 max-xl:text-28">{article.title}</h1>
      <p className="mt-8 w-142 font-mono text-base text-muted max-xl:mt-4 max-xl:text-sm">{article.excerpt}</p>

      <div className="mt-11.75 flex items-center justify-between gap-6 max-xl:mt-8.75">
        <div className="flex items-center gap-4">
          <Image
            src={article.author.avatar}
            alt=""
            width={46}
            height={46}
            className="size-11.5 shrink-0 rounded-full object-cover"
          />
          <div className="flex flex-col gap-3">
            <p className="font-mono text-base font-bold text-black">{article.author.name}</p>
            <ArticleMeta article={article} className="text-sm text-muted" />
          </div>
        </div>
        <ArticleActions title={article.title} />
      </div>

      <div className="relative mt-6.5 h-89.75 overflow-hidden rounded-4xl bg-placeholder max-xl:mt-12.25 max-xl:h-73.75">
        <Image src={article.image} alt="" fill priority sizes="(min-width: 1512px) 1392px, 100vw" className="object-cover" />
      </div>

      <div className="mt-9.75 grid grid-cols-12 items-start gap-x-5 max-xl:mt-8.75 max-xl:grid-cols-[480fr_282fr] max-xl:gap-x-5.5">
        <div className="col-span-8 max-xl:col-span-1">
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <ArticleTag key={tag} label={tag} />
              ))}
            </div>
          )}
          <ArticleBody blocks={article.blocks} className="mt-7.25" />
        </div>

        {related.length > 0 && (
          <aside
            aria-label="More articles"
            className="col-span-4 col-start-9 flex flex-col gap-4 xl:mt-14.75 max-xl:col-span-1 max-xl:col-start-auto max-xl:gap-2.5"
          >
            {related.map((item) => (
              <ArticleCard key={item.slug} article={item} />
            ))}
          </aside>
        )}
      </div>

      <hr className="mt-22 border-line max-xl:mt-14" />
      <ArticleComments articleSlug={article.slug} initialComments={comments} />
    </>
  );
}

function ArticleSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-2.5 w-72 rounded-full bg-surface-muted" />
      <div className="mt-18.5 h-9 w-3/4 rounded-full bg-surface-muted max-xl:mt-11" />
      <div className="mt-8 h-10 w-142 rounded-xs bg-surface-muted" />
      <div className="mt-23 h-89.75 rounded-4xl bg-surface-muted max-xl:h-73.75" />
    </div>
  );
}
