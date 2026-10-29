import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import ProductDetails from "@/components/product/ProductDetails";
import ProductGallery from "@/components/product/ProductGallery";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { collections } from "@/data/collections";
import { products } from "@/data/products";
import Recommendations from "@/components/product/Recommendations";
import ProductCollections from "@/components/product/ProductCollections";
import ReviewsSection from "@/components/product/ReviewsSection";
import { bundles } from "@/data/bundles";
import { reviews } from "@/data/reviews";

type Params = Promise<{ slug: string }>;

function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: `${product.name} — Oh, Yvi!`,
    description: product.description,
  };
}

export default function ProductPage({ params }: { params: Params }) {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 pb-10.75">
      <Suspense fallback={<ProductSkeleton />}>
        <ProductContent params={params} />
      </Suspense>
    </main>
  );
}

async function ProductContent({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

    const category = collections.find(
    (c) => c.kind === "category" && product.collectionSlugs.includes(c.slug),
  );
  const boughtWith = products.filter((p) => product.boughtWithSlugs?.includes(p.slug));
  const badges = [product.badge, product.type === "digital" ? "digital" : undefined].filter(
    (badge): badge is string => Boolean(badge),
  );
  const productCollections = collections.filter((c) => product.collectionSlugs.includes(c.slug));
  const productBundles = bundles.filter((b) => product.bundleIds?.includes(b.id));
  const productReviews = reviews.filter((r) => r.productSlug === product.slug);
  const recommendations = products.filter((p) => p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          ...(category ? [{ label: category.name, href: `/collections/${category.slug}` }] : []),
          { label: product.name },
        ]}
      />

      <div data-fly-scope className="mt-9.25 grid grid-cols-12 items-start gap-x-5">
        <div className="col-span-6 mt-13.25">
          <ProductGallery images={product.images} name={product.name} badges={badges} />
        </div>
        <ProductDetails product={product} boughtWith={boughtWith} />
      </div>

            <ProductCollections collections={productCollections} bundles={productBundles} />

      <ReviewsSection productSlug={product.slug} initialReviews={productReviews} />

      <Recommendations products={recommendations} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden className="animate-pulse">
      <div className="h-2.5 w-56 rounded-full bg-surface-muted" />
      <div className="mt-9.25 grid grid-cols-12 gap-x-5">
        <div className="col-span-6 mt-13.25 aspect-square rounded-3xl bg-surface-muted" />
        <div className="col-span-5 col-start-8 flex flex-col gap-6">
          <div className="h-12 w-3/4 rounded-full bg-surface-muted" />
          <div className="h-12 rounded-xs bg-surface-muted" />
          <div className="h-28 rounded-2xl bg-surface-muted" />
          <div className="h-60 rounded-xs bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}