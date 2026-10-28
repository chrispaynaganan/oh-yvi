import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BundleCard from "@/components/product/BundleCard";
import ProductGrid from "@/components/product/ProductGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { bundles } from "@/data/bundles";
import { collections } from "@/data/collections";
import { products } from "@/data/products";

type Props = { params: Promise<{ slug: string }> };

function getCollection(slug: string) {
  return collections.find((collection) => collection.slug === slug);
}

// Pre-builds a page for every collection
export function generateStaticParams() {
  return collections.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) return {};
  return {
    title: `${collection.name} — Oh, Yvi!`,
    description: collection.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { slug } = await params;
  const collection = getCollection(slug);
  if (!collection) notFound();

  const collectionProducts = products.filter((p) => p.collectionSlugs.includes(slug));
  const collectionBundles = bundles.filter((b) => collection.bundleIds?.includes(b.id));

  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-14.75">
      <Breadcrumbs
        items={[
          { label: "Collections", href: "/collections" },
          { label: collection.shortName ?? collection.name },
        ]}
      />

      <h1 className="mt-7.75 font-serif text-collection whitespace-nowrap text-accent">
        {collection.heading ?? collection.name}
      </h1>

      <div className="mt-8.25 grid grid-cols-12 gap-x-5">
        <p className="col-span-4 font-mono text-sm text-muted">
          {collection.intro ?? collection.description}
        </p>
        {collection.aside && (
          <p className="col-span-4 col-start-6 font-mono text-sm text-muted">
            {collection.aside}
          </p>
        )}
      </div>

      <section aria-label="Products" className="mt-18">
        {collectionProducts.length > 0 ? (
          <ProductGrid products={collectionProducts} />
        ) : (
          <p className="font-mono text-sm text-muted">
            New pieces are on their way. Check back soon.
          </p>
        )}
      </section>

      {collectionBundles.length > 0 && (
        <section className="mt-25.5">
          <h2 className="font-serif text-38 text-ink">Bundles that fit this collection</h2>
          <div className="mt-7.5 grid grid-cols-3 gap-5">
            {collectionBundles.map((bundle) => (
              <BundleCard key={bundle.id} {...bundle} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}