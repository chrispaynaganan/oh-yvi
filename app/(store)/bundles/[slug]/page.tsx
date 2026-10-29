import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import CardActions from "@/components/product/CardActions";
import MiniItemList from "@/components/product/MiniItemList";
import ProductCollections from "@/components/product/ProductCollections";
import ProductGallery from "@/components/product/ProductGallery";
import ProductPurchase from "@/components/product/ProductPurchase";
import Recommendations from "@/components/product/Recommendations";
import ReviewsSection from "@/components/product/ReviewsSection";
import SavePill from "@/components/product/SavePill";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { bundles } from "@/data/bundles";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import { reviews } from "@/data/reviews";
import { bundleTotals } from "@/lib/bundles";

type Params = Promise<{ slug: string }>;

function getBundle(slug: string) {
  return bundles.find((bundle) => bundle.slug === slug);
}

export function generateStaticParams() {
  return bundles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) return {};
  return {
    title: `${bundle.name} — Oh, Yvi!`,
    description: bundle.description,
  };
}

export default function BundlePage({ params }: { params: Params }) {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-10.75">
      <Suspense fallback={<BundleSkeleton />}>
        <BundleContent params={params} />
      </Suspense>
    </main>
  );
}

async function BundleContent({ params }: { params: Params }) {
  const { slug } = await params;
  const bundle = getBundle(slug);
  if (!bundle) notFound();

  const { savings, percent } = bundleTotals(bundle);
  const pill = savings > 0 ? <SavePill percent={percent} /> : undefined;
  const images = bundle.images ?? [bundle.image];

  const included = bundle.items.map((item, i) => {
    const product = products.find((p) => p.slug === item.productSlug);
    return {
      key: `${item.name}-${i}`,
      name: item.name,
      price: item.price,
      image: item.image ?? product?.images[0],
      href: product ? `/products/${product.slug}` : undefined,
      disabled: product?.status === "out_of_stock",
    };
  });

  const bundleCollections = collections.filter((c) => bundle.collectionSlugs?.includes(c.slug));
  const otherBundles = bundles.filter(
    (b) => b.id !== bundle.id && b.collectionSlugs?.some((s) => bundle.collectionSlugs?.includes(s)),
  );
  const bundleReviews = reviews.filter((r) => r.productSlug === bundle.slug);
  const recommendations = products
    .filter((p) => bundle.items.every((item) => item.productSlug !== p.slug))
    .slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Bundles", href: "/bundles" },
          { label: bundle.name },
        ]}
      />

      <div className="mt-9.25 grid grid-cols-12 items-start gap-x-5">
        <div className="col-span-6 mt-13.25">
          <ProductGallery
            images={images}
            name={bundle.name}
            badges={bundle.badge ? [bundle.badge] : []}
          />
        </div>

        <div className="col-span-5 col-start-8">
          <div className="flex items-center justify-between">
            {pill ?? <span />}
            <CardActions name={bundle.name} actions={["wishlist", "share"]} />
          </div>

          <h1 className="mt-7.75 font-serif text-product text-ink">{bundle.name}</h1>
          {(bundle.longDescription ?? bundle.description) && (
            <p className="no-trim mt-4.75 line-clamp-3 font-mono text-sm text-muted">
              {bundle.longDescription ?? bundle.description}
            </p>
          )}

          <h2 className="mt-10.5 font-serif text-lg text-ink">What’s included?</h2>
          <div className="mt-8">
            <MiniItemList items={included} />
          </div>

          <ProductPurchase
            name={bundle.name}
            image={bundle.image}
            unitPrice={bundle.price}
            ctaLabel="Buy this bundle"
            pill={pill}
          />
        </div>
      </div>

      <ProductCollections collections={bundleCollections} bundles={otherBundles} />
      <ReviewsSection productSlug={bundle.slug} initialReviews={bundleReviews} />
      <Recommendations products={recommendations} />
    </>
  );
}

function BundleSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-2.5 w-56 rounded-full bg-surface-muted" />
      <div className="mt-9.25 grid grid-cols-12 gap-x-5">
        <div className="col-span-6 mt-13.25 aspect-square rounded-3xl bg-surface-muted" />
        <div className="col-span-5 col-start-8 flex flex-col gap-6">
          <div className="h-12 w-3/4 rounded-full bg-surface-muted" />
          <div className="h-12 rounded-xs bg-surface-muted" />
          <div className="h-48 rounded-xs bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}