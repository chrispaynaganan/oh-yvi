import Image from "next/image";
import Link from "next/link";
import { formatPeso } from "@/lib/utils";
import type { Bundle, Collection } from "@/types";

function BundlePromoCard({ slug, name, description, price, items }: Bundle) {
  const itemsTotal = items.reduce((sum, item) => sum + item.price, 0);
  const savings = itemsTotal - price;

  return (
    <article className="col-span-4 flex flex-col items-start gap-8 rounded-lg border border-line-soft p-4">
      <div className="flex w-full flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="font-mono text-10 text-ink">save with a bundle</p>
          <div className="flex flex-col gap-3.5">
            <h3 className="font-serif text-2xl text-ink">{name}</h3>
            {description && <p className="font-mono text-sm text-muted">{description}</p>}
          </div>
        </div>
        <p className="no-trim font-serif text-15 text-ink">
          {formatPeso(price)}{" "}
          {savings > 0 && <s className="text-muted">{formatPeso(itemsTotal)}</s>}
        </p>
      </div>
      <Link
        href={`/bundles/${slug}`}
        className="trim block font-serif text-sm text-ink underline transition-colors hover:text-brand"
      >
        View bundle{savings > 0 && ` & save ${formatPeso(savings)}`}
      </Link>
    </article>
  );
}

type ProductCollectionsProps = {
  collections: Collection[];
  bundles: Bundle[];
};

export default function ProductCollections({ collections, bundles }: ProductCollectionsProps) {
  if (collections.length === 0 && bundles.length === 0) return null;

  return (
    <section className="mt-13.5 grid grid-cols-12 items-start gap-x-5">
      <div className="col-span-4">
        <p className="font-mono text-10 text-ink">find your collection</p>
        <h2 className="mt-3.25 font-serif text-2xl text-ink">Made for your kind of day?</h2>
        <ul className="mt-5.5 flex w-83.5 flex-col gap-4">
          {collections.map((collection) => (
            <li key={collection.id}>
              <Link
                href={`/collections/${collection.slug}`}
                className="group flex items-center justify-between"
              >
                <span className="trim block font-serif text-15 text-ink transition-colors group-hover:text-brand">
                  Explore {collection.name}
                </span>
                <Image
                  src="/icons/arrow-up-right-thin.svg"
                  alt=""
                  width={11}
                  height={11}
                  className="size-2.75 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  unoptimized
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {bundles.slice(0, 2).map((bundle) => (
        <BundlePromoCard key={bundle.id} {...bundle} />
      ))}
    </section>
  );
}