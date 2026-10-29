import CardActions from "@/components/product/CardActions";
import MiniItemList from "@/components/product/MiniItemList";
import ProductPurchase from "@/components/product/ProductPurchase";
import PromoTimer from "@/components/ui/PromoTimer";
import type { Product } from "@/types";

type ProductDetailsProps = {
  product: Product;
  boughtWith: Product[];
};

export default function ProductDetails({ product, boughtWith }: ProductDetailsProps) {
  const { name, description, longDescription, specs, details, promoEndsAt } = product;
  const promo = promoEndsAt ? <PromoTimer endsAt={promoEndsAt} /> : undefined;

  return (
    <div className="col-span-5 col-start-8">
      <div className="flex items-center justify-between">
        {promo ?? <span />}
          <CardActions
          name={name}
          interestKey={`product:${product.slug}`}
          actions={["wishlist", "share"]}
        />
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
          <div className="mt-8">
            <MiniItemList
              items={boughtWith.map((item) => ({
                key: item.id,
                name: item.name,
                price: item.price,
                image: item.images[0],
                href: `/products/${item.slug}`,
                disabled: item.status === "out_of_stock",
                bagKey: `product:${item.slug}` as const,
              }))}
            />
          </div>
        </section>
      )}

      <ProductPurchase
        name={name}
        image={product.images[0]}
        unitPrice={product.price}
        ctaLabel={product.buttonLabel}
        status={product.status}
        maxQuantity={product.stock}
        pill={promo}
        interestKey={`product:${product.slug}`}
        bagKey={`product:${product.slug}`}
      />
    </div>
  );
}