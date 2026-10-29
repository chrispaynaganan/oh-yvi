"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import CardActions from "@/components/product/CardActions";
import { cn, formatPeso } from "@/lib/utils";
import type { Product } from "@/types";
import { addToBag } from "@/lib/bag";

export default function ProductCard({
  product,
  ctaLabel,
  className,
}: {
  product: Product;
  ctaLabel?: string;
  className?: string;
}) {
  const [active, setActive] = useState(0);
  const { slug, name, description, price, images, status, badge, buttonLabel } = product;
  const href = `/products/${slug}`;
  const isOut = status === "out_of_stock";

  const ctaText =
    status === "out_of_stock"
      ? "Out of Stock"
      : status === "preorder"
        ? "Pre-Order"
      : `${ctaLabel ?? buttonLabel} (${formatPeso(price)})`;

  return (
    <article data-fly-scope className={className}>
      <div data-fly-source className="relative aspect-square overflow-hidden rounded-2xl bg-placeholder">
        <Link href={href} aria-label={name} className="absolute inset-0">
          <Image
            src={images[active]}
            alt={name}
            fill
            sizes="(min-width: 1512px) 333px, (min-width: 1280px) 23vw, 252px"
            className="object-cover"
          />
          {isOut && <span className="absolute inset-0 bg-scrim/60" />}
        </Link>

        {badge && (
          <span className="pointer-events-none absolute top-5 left-5 rounded-full bg-white px-3.25 py-2.5 shadow-badge max-xl:top-2.75 max-xl:left-1.75">
            <span className="trim block font-mono text-10 font-bold whitespace-nowrap text-brand">
              {badge}
            </span>
          </span>
        )}

        <CardActions
          name={name}
          interestKey={`product:${slug}`}
          bagKey={`product:${slug}`}
          disableAdd={isOut}
          className="absolute top-5 right-4.75 max-xl:top-2.75 max-xl:right-2.75"
        />

        {images.length > 1 && (
          <div className="absolute bottom-4.25 left-1/2 flex -translate-x-1/2 gap-1.5 max-xl:bottom-2.25">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-current={i === active}
                onClick={() => setActive(i)}
                className={cn(
                  "size-2 rounded-full transition-colors",
                  i === active ? "bg-white" : "bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        )}
      </div>

      <Link href={href} className="mt-5 block max-xl:mt-4.5">
        <h3 className="font-serif text-lg text-ink">{name}</h3>
      </Link>
      <p className="mt-3 font-mono text-10 text-muted">{description}</p>

      <button
        type="button"
        disabled={isOut}
        onClick={(e) => addToBag(`product:${slug}`, 1, e.currentTarget)}
        className={cn(
          "mt-6.75 flex w-full items-center justify-center rounded-full max-xl:mt-4 px-4 py-3 font-serif text-base transition-opacity",
          isOut
            ? "cursor-not-allowed bg-disabled text-disabled-text"
            : "bg-brand-soft text-white hover:opacity-90",
        )}
      >
        <span className="trim block">{ctaText}</span>
      </button>
    </article>
  );
}