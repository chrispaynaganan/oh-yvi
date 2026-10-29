"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useState, type FormEvent } from "react";
import EmptyState from "@/components/ui/EmptyState";
import QuantityStepper from "@/components/ui/QuantityStepper";
import { promos, type Promo } from "@/data/promos";
import { store } from "@/data/store";
import {
  removeFromBag,
  setAllSelected,
  setQuantity,
  setSelected,
  useBag,
  type BagLine,
} from "@/lib/bag";
import { resolveItem, type CatalogItem } from "@/lib/catalog";
import { cn, formatPeso } from "@/lib/utils";

function SelectCircle({
  checked,
  onToggle,
  label,
  className,
}: {
  checked: boolean;
  onToggle: () => void;
  label: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      onClick={onToggle}
      className={cn(
        "relative size-8.75 shrink-0 rounded-full transition-transform active:scale-90",
        !checked && "border border-line-dark",
        className,
      )}
    >
      {checked && <Image src="/icons/check-circle.svg" alt="" fill unoptimized />}
    </button>
  );
}

function BagRow({ line, item }: { line: BagLine; item: CatalogItem }) {
  return (
    <li className="relative flex flex-col gap-6 p-6">
      <SelectCircle
        checked={line.selected}
        onToggle={() => setSelected(line.key, !line.selected)}
        label={`Select ${item.name}`}
        className="absolute top-1/2 -left-15.25 -translate-y-1/2"
      />

      <div className="flex items-start justify-between gap-6">
        <Link href={item.href} className="group flex items-center gap-4">
          <div className="relative size-25 shrink-0 overflow-hidden rounded-xl bg-placeholder">
            <Image src={item.image} alt="" fill sizes="100px" className="object-cover" />
          </div>
          <div className="flex w-82.75 flex-col gap-5">
            <div className="flex flex-col gap-3">
              <span className="trim block font-mono text-lg tracking-tight-2 text-black transition-colors group-hover:text-brand">
                {item.name}
              </span>
              {item.options.length > 0 && (
                <span className="flex items-center gap-2.5 font-mono text-sm tracking-tight-2 text-muted">
                  {item.options.map((option, i) => (
                    <Fragment key={option}>
                      {i > 0 && <span aria-hidden className="size-1 rounded-full bg-muted" />}
                      <span className="trim block">{option}</span>
                    </Fragment>
                  ))}
                </span>
              )}
            </div>
            {item.description && (
              <p className="no-trim line-clamp-2 font-mono text-sm tracking-tight-2 text-muted">
                {item.description}
              </p>
            )}
          </div>
        </Link>
        <p className="font-mono text-29 font-bold tracking-tight-2 whitespace-nowrap text-black">
          {formatPeso(item.unitPrice * line.quantity)}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <QuantityStepper
          value={line.quantity}
          max={item.maxQuantity}
          onChange={(q) => setQuantity(line.key, q)}
          label={`Quantity of ${item.name}`}
        />
        <button
          type="button"
          aria-label={`Remove ${item.name} from bag`}
          onClick={() => removeFromBag(line.key)}
          className="relative size-10 transition-transform hover:scale-105"
        >
          <Image src="/icons/bag-remove.svg" alt="" fill unoptimized />
        </button>
      </div>
    </li>
  );
}

export default function BagView() {
  const bag = useBag();
  const [code, setCode] = useState("");
  const [promo, setPromo] = useState<Promo | null>(null);
  const [promoMessage, setPromoMessage] = useState("");

  // Server render: the browser's bag isn't readable yet
  if (bag === null) return <div aria-hidden className="mt-10 h-125" />;

  const rows = bag
    .map((line) => ({ line, item: resolveItem(line.key) }))
    .filter((row): row is { line: BagLine; item: CatalogItem } => row.item !== null);

  if (rows.length === 0) {
    return (
      <EmptyState
        className="mt-12.5"
        message="Looking for that perfect item to add to your bag? No need to stress! Check out our collection of products—you’re sure to find something that fits just right."
        cta={{ label: "View our Collections", href: "/collections" }}
      />
    );
  }

  const selected = rows.filter(({ line }) => line.selected);
  const allSelected = rows.every(({ line }) => line.selected);
  const itemCount = selected.reduce((sum, { line }) => sum + line.quantity, 0);
  const subtotal = selected.reduce((sum, { line, item }) => sum + item.unitPrice * line.quantity, 0);
  const discount = promo ? Math.round((subtotal * promo.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const threshold = store.freeShippingThreshold;
  const freeShipping = afterDiscount >= threshold;
  const shipping = itemCount === 0 || freeShipping ? 0 : store.standardShipping;
  const total = afterDiscount + shipping;
  const remaining = Math.max(0, threshold - afterDiscount);
  const progress = Math.min(100, (afterDiscount / threshold) * 100);

  function applyCode(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = promos.find((p) => p.code.toLowerCase() === code.trim().toLowerCase());
    if (found) {
      setPromo(found);
      setPromoMessage(`${found.label}: ${found.percent}% off applied.`);
    } else {
      setPromo(null);
      setPromoMessage("That code doesn’t work. Check the spelling and try again.");
    }
  }

  return (
    <div className="mt-10 grid grid-cols-12 gap-x-5 gap-y-6">
      {/* Select row */}
      <div className="col-span-8 flex items-center justify-between">
        <div className="flex items-center gap-6.5">
          <SelectCircle
            checked={allSelected}
            onToggle={() => setAllSelected(!allSelected)}
            label="Select all items"
          />
          <span className="trim block font-mono text-base font-bold tracking-tight-2 text-black">
            Select all ({rows.length})
          </span>
        </div>
        <span className="trim block font-mono text-base tracking-tight-2 text-muted">
          {selected.length} selected
        </span>
      </div>

    {/* Items: fits up to 3 products, then scrolls on its own */}
      <div className="scrollbar-soft col-span-8 row-start-2 max-h-160 self-start overflow-y-auto">
        <ul className="ml-15 divide-y divide-line-soft rounded-4xl border border-line-soft">
          {rows.map(({ line, item }) => (
            <BagRow key={line.key} line={line} item={item} />
          ))}
        </ul>
      </div>

      {/* Summary */}
      <aside className="sticky top-49.75 col-span-4 col-start-9 row-start-2 flex flex-col gap-11.75 self-start rounded-4xl border border-line-soft bg-white px-6 py-8">
        <div className="flex flex-col gap-6.5">
          <h2 className="font-serif text-2xl tracking-tight-2 text-black">Summary</h2>

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 font-mono text-base">
              <div className="flex items-center justify-between">
                <span className="trim block text-muted">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="trim block font-bold text-black">{formatPeso(subtotal)}</span>
              </div>

              {promo && discount > 0 && (
                <div className="flex items-center justify-between">
                  <span className="trim block text-muted">
                    {promo.kind === "affiliate" ? "Affiliate" : "Promo"} ({promo.code})
                  </span>
                  <span className="trim block font-bold text-success">−{formatPeso(discount)}</span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="trim block text-muted">Shipping</span>
                <div className="flex w-59.5 flex-wrap items-center justify-end gap-2 text-right font-bold text-black">
                  <span className="trim block">
                    {itemCount === 0
                      ? "—"
                      : freeShipping
                        ? "Free standard"
                        : `${formatPeso(shipping)} standard`}
                  </span>
                  <span aria-hidden className="size-0.75 rounded-full bg-black" />
                  <span className="trim block">change at checkout</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 rounded-md bg-surface-hero px-2 py-3">
              <p className="font-mono text-sm text-brand">
                {freeShipping ? (
                  <>
                    You’ve unlocked <b>free standard shipping</b>
                  </>
                ) : (
                  <>
                    Add <b>{formatPeso(remaining)}</b> more for <b>free standard shipping</b>
                  </>
                )}
              </p>
              <div className="h-1.75 overflow-hidden rounded-xs bg-line-soft">
                <div
                  className="h-full rounded-xs bg-brand transition-[width] duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <form onSubmit={applyCode} className="flex flex-col gap-4.25">
              <label htmlFor="promo-code" className="font-mono text-base font-bold text-muted">
                Promo or affiliate code
              </label>
              <div className="flex gap-3">
                <input
                  id="promo-code"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="enter code"
                  className="h-9 min-w-0 flex-1 rounded-full border border-line-strong px-4 font-mono text-base text-ink outline-none placeholder:text-muted focus:border-brand"
                />
                <button
                  type="submit"
                  className="h-9 w-24.5 shrink-0 rounded-full bg-brand font-mono text-sm font-bold text-white transition-opacity hover:opacity-90"
                >
                  Apply
                </button>
              </div>
              {promoMessage && (
                <p aria-live="polite" className={cn("font-mono text-xs", promo ? "text-success" : "text-promo")}>
                  {promoMessage}
                </p>
              )}
            </form>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="trim block font-mono text-base text-muted">Estimated total</span>
            <span className="trim block font-mono text-30 font-bold text-black">{formatPeso(total)}</span>
          </div>
          <Link
            href="/checkout/login"
            aria-disabled={itemCount === 0}
            className={cn(
              "flex h-9 items-center justify-center rounded-full bg-brand px-4 text-white transition-opacity hover:opacity-90",
              itemCount === 0 && "pointer-events-none opacity-40",
            )}
          >
            <span className="trim block font-serif text-sm">
              {itemCount === 0
                ? "Select items to buy"
                : `Buy ${itemCount} ${itemCount === 1 ? "product" : "products"} (${formatPeso(total)})`}
            </span>
          </Link>
        </div>

        <ul className="flex flex-col gap-4 rounded-lg bg-surface-muted p-4 font-mono text-xs text-muted">
          {store.bagNotes.map((note) => (
            <li key={note} className="trim">
              {note}
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}