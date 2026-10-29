import Image from "next/image";
import Link from "next/link";
import CardActions from "@/components/product/CardActions";
import { bundleTotals } from "@/lib/bundles";
import { formatPeso } from "@/lib/utils";
import type { Bundle } from "@/types";

export default function BundleCard(bundle: Bundle) {
  const { slug, name, image, price, items } = bundle;
  const { savings } = bundleTotals(bundle);
  const href = `/bundles/${slug}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-line-soft">
      <div className="relative h-38.5 shrink-0 bg-placeholder">
        <Link href={href} aria-label={name} className="absolute inset-0">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1512px) 451px, 30vw"
            className="object-cover"
          />
        </Link>
        <CardActions
          name={name}
          interestKey={`bundle:${slug}`}
          className="absolute top-5.25 right-5.25"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between gap-7 p-4">
        <div className="flex flex-col gap-7">
          <Link href={href} className="transition-colors hover:text-brand">
            <h3 className="font-serif text-lg text-ink">{name}</h3>
          </Link>

          <div className="flex flex-col gap-6.5">
            <ul className="flex flex-col gap-2.5 text-muted">
              {items.map((item) => (
                <li key={item.name} className="flex items-end justify-between gap-4 whitespace-nowrap">
                  <span className="trim block font-serif text-sm">{item.name}</span>
                  <span className="trim block font-mono text-xs">{formatPeso(item.price)}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-end gap-2.75">
              <div className="flex w-full items-center justify-between text-muted">
                <span className="trim block font-serif text-sm font-bold">Total</span>
                <span className="trim block font-mono text-xs font-bold">{formatPeso(price)}</span>
              </div>
              {savings > 0 && (
                <p className="font-mono text-11 font-bold text-success">
                  save {formatPeso(savings)}
                </p>
              )}
            </div>
          </div>
        </div>

        <button
          type="button"
          className="flex w-full items-center justify-center rounded-full bg-brand-soft px-4 py-3 text-white transition-opacity hover:opacity-90"
        >
          <span className="trim block font-serif text-base">Get this bundle</span>
        </button>
      </div>
    </article>
  );
}