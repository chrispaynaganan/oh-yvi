"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CardActions from "@/components/product/CardActions";
import { cn, formatPeso } from "@/lib/utils";
import type { ProductStatus } from "@/types";
import type { InterestKey } from "@/lib/interests";

// Height of the sticky announcement bar + header on desktop
const HEADER_HEIGHT = 179;

type ProductPurchaseProps = {
  name: string;
  image: string;
  unitPrice: number;
  /** Button text before the price, e.g. "Buy this journal" */
  ctaLabel: string;
  status?: ProductStatus;
  maxQuantity?: number;
  /** Shown under the name in the sticky bar (promo timer or savings pill) */
  pill?: React.ReactNode;
  interestKey?: InterestKey;
};

export default function ProductPurchase({
  name,
  image,
  unitPrice,
  ctaLabel,
  status = "available",
  maxQuantity = 99,
  pill,
  interestKey,
}: ProductPurchaseProps) {
  const [quantity, setQuantity] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isOut = status === "out_of_stock";
  const ctaText = isOut
    ? "Out of Stock"
    : status === "preorder"
      ? "Pre-Order"
      : `${ctaLabel} (${formatPeso(unitPrice * quantity)})`;

  // Show the bar once the buy buttons have scrolled up under the header
  useEffect(() => {
    const target = ctaRef.current;
    if (!target) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < HEADER_HEIGHT);
      },
      { rootMargin: `-${HEADER_HEIGHT}px 0px 0px 0px` },
    );
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const buyButtonClass = cn(
    "flex h-10 items-center justify-center rounded-2xl border transition-opacity",
    isOut
      ? "cursor-not-allowed border-disabled bg-disabled text-disabled-text"
      : "border-brand bg-brand text-white hover:opacity-90",
  );

  return (
    <>
      {/* Quantity */}
      <div className="mt-5.25 flex items-center justify-end gap-3.75">
        <span id="quantity-label" className="trim block font-mono text-11 text-ink">
          Quantity
        </span>
        <div role="group" aria-labelledby="quantity-label" className="flex items-center">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={quantity <= 1}
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="relative size-10 transition-opacity disabled:opacity-40"
          >
            <Image src="/icons/qty-minus.svg" alt="" fill unoptimized />
          </button>
          <span aria-live="polite" className="flex size-10 items-center justify-center">
            <span className="trim block font-mono text-xl tracking-tight-2 text-black">
              {quantity}
            </span>
          </span>
          <button
            type="button"
            aria-label="Increase quantity"
            disabled={quantity >= maxQuantity}
            onClick={() => setQuantity((q) => Math.min(maxQuantity, q + 1))}
            className="relative size-10 transition-opacity disabled:opacity-40"
          >
            <Image src="/icons/qty-plus.svg" alt="" fill unoptimized />
          </button>
        </div>
      </div>

      {/* Buttons */}
      <div ref={ctaRef} className="mt-3 flex gap-4">
        <button
          type="button"
          aria-label={`Add ${name} to bag`}
          disabled={isOut}
          className="relative h-10 w-25 shrink-0 transition-opacity hover:opacity-80 disabled:opacity-40"
        >
          <Image src="/icons/add-to-bag-wide.svg" alt="" fill unoptimized />
        </button>
        <button type="button" disabled={isOut} className={cn(buyButtonClass, "flex-1 px-4")}>
          <span className="trim block font-serif text-sm">{ctaText}</span>
        </button>
      </div>

      <p className="no-trim mt-4.25 flex items-center gap-2 font-mono text-9 text-muted">
        <span>Complimentary delivery over ₱2,500</span>
        <span aria-hidden className="size-0.75 rounded-full bg-muted" />
        <span>7-day returns policy</span>
      </p>

      {/* Sticky bar, tucked under the header until needed */}
      <div className="pointer-events-none fixed inset-x-0 top-44.75 z-30 h-34.75 overflow-hidden">
        <div
          inert={!showBar}
          aria-hidden={!showBar}
          className={cn(
            "pointer-events-auto h-full border-b border-line-soft bg-white transition-transform duration-300 ease-out",
            showBar ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="mx-auto flex h-full max-w-site items-center justify-between px-15">
            <div className="flex items-center gap-8.75">
              <div className="relative size-26.5 shrink-0 overflow-hidden rounded-xl bg-placeholder">
                <Image src={image} alt="" fill sizes="106px" className="object-cover" />
              </div>
              <div className="flex flex-col items-start gap-4">
                <div className="flex items-center gap-6.75">
                  <p className="font-serif text-card-title whitespace-nowrap text-ink">{name}</p>
                    <CardActions name={name} interestKey={interestKey} actions={["wishlist", "share"]} />
                </div>
                {pill}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label={`Add ${name} to bag`}
                disabled={isOut}
                className="relative h-10 w-14.75 transition-opacity hover:opacity-80 disabled:opacity-40"
              >
                <Image src="/icons/add-to-bag-compact.svg" alt="" fill unoptimized />
              </button>
              <button type="button" disabled={isOut} className={cn(buyButtonClass, "px-4.25")}>
                <span className="trim block font-serif text-sm whitespace-nowrap">{ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}