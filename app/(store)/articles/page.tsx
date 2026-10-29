import type { Metadata } from "next";
import { Suspense } from "react";
import ArticlesBrowser from "@/components/articles/ArticlesBrowser";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { articles } from "@/data/articles";

export const metadata: Metadata = {
  title: "Articles — Oh, Yvi!",
  description: "Stories, guides, and updates from the Oh, Yvi! studio.",
};

export default function ArticlesPage() {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Articles" }]} />
      <h1 className="mt-18.5 font-serif text-38 text-ink">Stories, guides, and updates</h1>
      <Suspense fallback={<div aria-hidden className="h-200" />}>
        <ArticlesBrowser articles={articles} />
      </Suspense>
    </main>
  );
}