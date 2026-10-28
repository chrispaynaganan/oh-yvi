import Image from "next/image";
import Link from "next/link";
import CardActions from "@/components/product/CardActions";
import ProductPurchase from "@/components/product/ProductPurchase";
import PromoTimer from "@/components/ui/PromoTimer";
import { formatPeso } from "@/lib/utils";
import type { Product } from "@/types";

type ProductDetailsProps = {
  product: Product;
  boughtWith: Product[];
};

export default function ProductDetails({ product, boughtWith }: ProductDetailsProps) {
  const { name, description, longDescription, specs, details, promoEndsAt } = product;

  return (
    <div className="col-span-5 col-start-8">
      <div className="flex items-center justify-between">
        {promoEndsAt ? <PromoTimer endsAt={promoEndsAt} /> : <span />}
        <CardActions name={name} actions={["wishlist", "share"]} />
      </div>

      <h1 className="mt-7.75 font-serif text-product text-ink">{name}</h1>
      <p className="no-trim mt-4.75 line-clamp-3 font-mono text-sm text-muted">
        {longDescription ?? description}
      </p>

      {specs && specs.length > 0 && (
        <div className="mt-9.25 flex flex-col gap-4 rounded-2xl bg-surface-hero p-3.5 text-ink">
          <h2 className="font-serif text-lg">Product specifications</h2>
          <ul className="flex flex-col gap-4">
            {specs.map((spec) => (
              <li key={spec} className="trim font-mono text-xs">
                {spec}
              </li>
            ))}
          </ul>
        </div>
      )}

      {details && details.length > 0 && (
        <div className="mt-8.75 flex flex-col gap-9">
          {details.map((detail) => (
            <section key={detail.title} className="flex flex-col gap-4">
              <h2 className="font-serif text-lg text-ink">{detail.title}</h2>
              <p className="font-mono text-sm text-muted">{detail.body}</p>
            </section>
          ))}
        </div>
      )}

      {boughtWith.length > 0 && (
        <section className="mt-13.5">
          <h2 className="font-serif text-lg text-ink">Usually Bought With</h2>
          <ul className="mt-8 flex flex-col gap-3">
            {boughtWith.map((item) => (
              <li key={item.id} className="flex items-center justify-between gap-4">
                <Link href={`/products/${item.slug}`} className="group flex items-center gap-3.5">
                  <div className="relative size-13.75 shrink-0 overflow-hidden rounded-sm bg-placeholder">
                    <Image src={item.images[0]} alt="" fill sizes="55px" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-3.75">
                    <span className="trim block font-serif text-17 text-ink group-hover:text-brand">
                      {item.name}
                    </span>
                    <span className="trim block font-mono text-xs text-muted">
                      {formatPeso(item.price)}
                    </span>
                  </div>
                </Link>
                <button
                  type="button"
                  disabled={item.status === "out_of_stock"}
                  aria-label={`Add ${item.name} to bag`}
                  className="shrink-0 rounded-full border border-brand px-2.5 py-2 text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand"
                >
                  <span className="trim block font-serif text-xs">Add</span>
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      <ProductPurchase product={product} />
    </div>
  );
}