"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import CardActions from "@/components/product/CardActions";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { addToBag, type BagKey } from "@/lib/bag";
import type { InterestKey } from "@/lib/interests";
import { cn, formatPeso } from "@/lib/utils";
import type { ProductStatus } from "@/types";

// Height of the sticky announcement bar + header (desktop / tablet)
const HEADER_HEIGHT = 179;
const HEADER_HEIGHT_TABLET = 162;

type ProductPurchaseProps = {
  name: string;
  image: string;
  unitPrice: number;
  /** Button text before the price, e.g. "Buy this journal" */
  ctaLabel: string;
  bagKey: BagKey;
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
  bagKey,
  status = "available",
  maxQuantity = 99,
  pill,
  interestKey,
}: ProductPurchaseProps) {
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [showBar, setShowBar] = useState(false);
  const ctaRef = useRef<HTMLDivElement>(null);

  const isOut = status === "out_of_stock";
  const ctaText = isOut
    ? "Out of Stock"
    : status === "preorder"
      ? "Pre-Order"
      : `${ctaLabel} (${formatPeso(unitPrice * quantity)})`;

  const addFrom = (e: MouseEvent<HTMLButtonElement>) => addToBag(bagKey, quantity, e.currentTarget);
  const buyNow = (e: MouseEvent<HTMLButtonElement>) => {
    addToBag(bagKey, quantity, e.currentTarget);
    window.setTimeout(() => router.push("/bag"), 950); // let the photocard land first
  };

  // Show the bar once the buy buttons have scrolled up under the header
  useEffect(() => {
    const target = ctaRef.current;
    if (!target) return;
    const header = window.matchMedia("(min-width: 80rem)").matches ? HEADER_HEIGHT : HEADER_HEIGHT_TABLET;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowBar(!entry.isIntersecting && entry.boundingClientRect.top < header);
      },
      { rootMargin: `-${header}px 0px 0px 0px` },
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
      <div className="mt-5.25 flex items-center justify-end gap-3.75 max-xl:mt-11.25">
        <span className="trim block font-mono text-11 text-ink">Quantity</span>
        <QuantityStepper value={quantity} onChange={setQuantity} max={maxQuantity} />
      </div>

      <div ref={ctaRef} className="mt-3 flex gap-4 max-xl:gap-5">
        <button
          type="button"
          aria-label={`Add ${name} to bag`}
          disabled={isOut}
          onClick={addFrom}
          className="relative h-10 w-25 shrink-0 transition-opacity hover:opacity-80 disabled:opacity-40 max-xl:w-20.25"
        >
          <Image src="/icons/add-to-bag-wide.svg" alt="" fill unoptimized />
        </button>
        <button type="button" disabled={isOut} onClick={buyNow} className={cn(buyButtonClass, "flex-1 px-4")}>
          <span className="trim block font-serif text-sm">{ctaText}</span>
        </button>
      </div>

      <p className="no-trim mt-4.25 flex items-center gap-2 font-mono text-9 text-muted max-xl:mt-3">
        <span>Complimentary delivery over ₱2,500</span>
        <span aria-hidden className="size-0.75 rounded-full bg-muted" />
        <span>7-day returns policy</span>
      </p>

      {/* Sticky bar, tucked under the header until needed */}
      <div className="pointer-events-none fixed inset-x-0 top-44.75 z-30 h-34.75 overflow-hidden max-xl:top-40.5 max-xl:h-19.5">
        <div
          inert={!showBar}
          aria-hidden={!showBar}
          className={cn(
            "pointer-events-auto h-full border-b border-line-soft bg-white transition-transform duration-300 ease-out",
            showBar ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div data-fly-scope className="mx-auto flex h-full max-w-site items-center justify-between px-15 max-xl:px-6.5">
            <div className="flex items-center gap-8.75 max-xl:gap-4">
              <div data-fly-source className="relative size-26.5 shrink-0 overflow-hidden rounded-xl bg-placeholder max-xl:size-12.5 max-xl:rounded-md">
                <Image src={image} alt="" fill sizes="106px" className="object-cover" />
              </div>
              <div className="flex flex-col items-start gap-4 max-xl:gap-2.5">
                <div className="flex items-center gap-6.75">
                  <p className="font-serif text-card-title whitespace-nowrap text-ink max-xl:text-xl max-xl:tracking-tight-2">{name}</p>
                  <CardActions name={name} interestKey={interestKey} actions={["wishlist", "share"]} className="max-xl:hidden" />
                </div>
                {pill}
              </div>
              {/* Tablet: the icons sit after the name and timer */}
              <CardActions name={name} interestKey={interestKey} actions={["wishlist", "share"]} className="xl:hidden" />
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                aria-label={`Add ${name} to bag`}
                disabled={isOut}
                onClick={addFrom}
                className="relative h-10 w-14.75 transition-opacity hover:opacity-80 disabled:opacity-40 max-xl:h-9 max-xl:w-13.75"
              >
                <Image src="/icons/add-to-bag-compact.svg" alt="" fill unoptimized />
              </button>
              <button type="button" disabled={isOut} onClick={buyNow} className={cn(buyButtonClass, "px-4.25 max-xl:px-3.5")}>
                <span className="trim block font-serif text-sm whitespace-nowrap">{ctaText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}