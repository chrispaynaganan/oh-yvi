"use client";

import Image from "next/image";
import Link from "next/link";
import EmptyState from "@/components/ui/EmptyState";
import { sampleLibrary, type LibraryItem } from "@/data/account";
import { products } from "@/data/products";
import { formatLongDate } from "@/lib/dates";
import { useOrders } from "@/lib/orders";

function Dot() {
  return <span aria-hidden className="size-0.75 rounded-full bg-current" />;
}

export default function LibraryView() {
  const orders = useOrders();
  if (orders === null) return <div aria-hidden className="mt-6.75 h-100" />;

  // Digital items from orders placed on this device, newest first
  const fromOrders: LibraryItem[] = orders.flatMap((order) =>
    order.items
      .filter((item) => item.type === "digital")
      .map((item) => {
        const product = products.find((p) => `product:${p.slug}` === item.key);
        return {
          key: `${order.id}:${item.key}`,
          name: item.name,
          image: item.image,
          format: product?.file?.format ?? "PDF",
          size: product?.file?.size ?? "",
          purchasedAt: order.createdAt,
          href: product ? `/products/${product.slug}` : undefined,
        };
      }),
  );
  const items = [...fromOrders, ...sampleLibrary];

  if (items.length === 0) {
    return (
      <EmptyState
        className="mt-12.5"
        message="Your digital files will appear here right after you buy one."
        cta={{ label: "View our Collections", href: "/collections" }}
      />
    );
  }

  return (
    <ul className="mt-6.75 rounded-4xl bg-white p-4">
      {items.map((item) => (
        <li key={item.key} className="flex items-center justify-between gap-6 border-b border-line-soft p-4 last:border-b-0">
          <div className="flex items-center gap-6.25">
            <div className="relative size-14.75 shrink-0 overflow-hidden rounded-lg bg-placeholder">
              <Image src={item.image} alt="" fill sizes="59px" className="object-cover" />
            </div>
            <div className="flex flex-col gap-3">
              <p className="font-serif text-xl tracking-tight-2 text-black">{item.name}</p>
              <p className="flex items-center gap-2 font-mono text-sm tracking-tight-2 text-muted-2">
                <span className="trim block">{item.format}</span>
                {item.size && (
                  <>
                    <Dot />
                    <span className="trim block">{item.size}</span>
                  </>
                )}
                <Dot />
                <span className="trim block">{formatLongDate(item.purchasedAt)}</span>
              </p>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-4">
            {item.href ? (
              <Link href={item.href} aria-label={`View ${item.name}`} className="relative size-12.5 transition-opacity hover:opacity-80">
                <Image src="/icons/file-view.svg" alt="" fill unoptimized />
              </Link>
            ) : (
              <span aria-hidden className="relative size-12.5 opacity-40">
                <Image src="/icons/file-view.svg" alt="" fill unoptimized />
              </span>
            )}
            {/* TODO(backend): signed download link from storage */}
            <button
              type="button"
              disabled
              aria-label={`Download ${item.name}`}
              title="Downloads start working once files are connected"
              className="relative size-12.5 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Image src="/icons/file-download.svg" alt="" fill unoptimized />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}