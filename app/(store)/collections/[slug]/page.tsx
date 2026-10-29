import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import BundleCard from "@/components/product/BundleCard";
import ExpandableProductGrid from "@/components/product/ExpandableProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { bundles } from "@/data/bundles";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import EmptyState from "@/components/ui/EmptyState";

type Params = Promise<{ slug: string }>;

function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

// Pre-builds a page for every collection
export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} — Oh, Yvi!`,
    description: collection.description,
  };
}

/* The shared "pad": the same for every collection, so it can be prefetched once */
export default function CollectionPage({ params }: { params: Params }) {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-14.75 max-xl:px-6 max-xl:pt-8 max-xl:pb-0">
      <Suspense fallback={<CollectionSkeleton />}>
        <CollectionContent params={params} />
      </Suspense>
    </main>
  );
}

/* The collection-specific content, filled in from the URL */
async function CollectionContent({ params }: { params: Params }) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.collectionSlugs.includes(slug));
  const collectionBundles = bundles.filter((b) => collection.bundleIds?.includes(b.id));

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Collections", href: "/collections" },
          { label: collection.shortName ?? collection.name },
        ]}
      />

      <h1 className="mt-7.75 font-serif text-collection whitespace-nowrap text-accent">
        {collection.heading ?? collection.name}
      </h1>

      <div className="mt-8.25 grid grid-cols-12 gap-x-5 max-xl:mt-8">
        <p className="col-span-4 font-mono text-sm text-muted max-xl:col-span-6">
          {collection.intro ?? collection.description}
        </p>
        {collection.aside && (
          <p className="col-span-4 col-start-6 font-mono text-sm text-muted max-xl:col-span-6 max-xl:col-start-7">
            {collection.aside}
          </p>
        )}
      </div>

      <section aria-label="Products" className="mt-18 max-xl:mt-13.75">
        {collectionProducts.length > 0 ? (
          <ExpandableProductGrid products={collectionProducts} />
        ) : (
            <EmptyState
            className="mt-10.5"
            message="New pieces for this collection are on their way. In the meantime, our bundles pair a few favorites together."
            cta={{ label: "See Bundles", href: "/bundles" }}
          />
        )}
      </section>

      {collectionBundles.length > 0 && (
        <section className="mt-25.5 max-xl:mt-18.25">
          <h2 className="font-serif text-38 text-ink max-xl:text-32">Bundles that fit this collection</h2>
          <div className="mt-7.5 grid grid-cols-3 gap-5 max-xl:mt-7.25 max-xl:grid-cols-2">
            {collectionBundles.map((bundle) => (
              <BundleCard key={bundle.id} {...bundle} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

/* Placeholder with the same layout, shown for a split second while content loads */
function CollectionSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-2.5 w-56 rounded-full bg-surface-muted" />
      <div className="mt-7.75 h-12 w-120 rounded-full bg-surface-muted" />
      <div className="mt-8.25 grid grid-cols-12 gap-x-5">
        <div className="col-span-4 h-22.5 rounded-xs bg-surface-muted" />
        <div className="col-span-4 col-start-6 h-18.5 rounded-xs bg-surface-muted" />
      </div>
      <div className="mt-18 grid grid-cols-4 gap-5 max-xl:mt-13.75 max-xl:grid-cols-3 max-xl:gap-x-3.75">
        {Array.from({ length: 4 }, (_, i) => (
          <div key={i} className="aspect-square rounded-2xl bg-surface-muted" />
        ))}
      </div>
    </div>
  );
}