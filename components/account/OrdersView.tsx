"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import EmptyState from "@/components/ui/EmptyState";
import { store } from "@/data/store";
import { itemHref, STATUS_LABEL, statusOf, useAllOrders } from "@/lib/accountOrders";
import { formatLongDate } from "@/lib/dates";
import type { Order } from "@/lib/orders";
import { cn, formatPeso } from "@/lib/utils";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "returned", label: "Returned" },
  { id: "cancelled", label: "Cancelled" },
  { id: "refunded", label: "Refunded" },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function matches(order: Order, filter: FilterId) {
  const status = statusOf(order);
  if (filter === "all") return true;
  if (filter === "shipped") return status === "shipped" || status === "out-for-delivery";
  return status === filter;
}

function Dot() {
  return <span aria-hidden className="size-0.75 rounded-full bg-current" />;
}

function OrderRow({ order }: { order: Order }) {
  const status = statusOf(order);
  const first = order.items[0];
  const count = order.items.reduce((sum, i) => sum + i.quantity, 0);
  const reviewHref = first ? itemHref(first) : undefined;
  const canReview = status === "delivered" && reviewHref;

  return (
    <li className="flex items-center justify-between gap-6 border-b border-line-soft p-4 last:border-b-0">
      <div className="flex items-center gap-13.75">
        <Link href={`/account/orders/${order.id}`} className="group flex items-center gap-6.25">
          <div className="relative size-14.75 shrink-0 overflow-hidden rounded-lg bg-placeholder">
            {first && <Image src={first.image} alt="" fill sizes="59px" className="object-cover" />}
          </div>
          <div className="flex w-65 flex-col gap-3">
            <p className="font-serif text-xl tracking-tight-2 text-black transition-colors group-hover:text-brand">
              {first ? `${first.name} x ${first.quantity}` : "Order"}
              {order.items.length > 1 && ` + ${order.items.length - 1} more`}
            </p>
            <p className="flex items-center gap-2 font-mono text-sm tracking-tight-2 text-muted-2">
              <span className="trim block">{formatPeso(order.totals.total)}</span>
              <Dot />
              <span className="trim block">
                {count} {count === 1 ? "item" : "items"}
              </span>
              <Dot />
              <span className="trim block">{formatLongDate(order.createdAt)}</span>
            </p>
          </div>
        </Link>
        <span className="rounded-xl bg-surface-muted px-2.75 py-2">
          <span className="trim block font-mono text-sm tracking-tight-2 text-muted-2">{STATUS_LABEL[status]}</span>
        </span>
      </div>

      <div className="flex shrink-0 items-center gap-4">
        <a
          href={`mailto:${store.supportEmail}?subject=${encodeURIComponent(`Return or refund — Order ${order.id}`)}`}
          aria-label={`Request a return or refund for order ${order.id}`}
          title="Request a return or refund"
          className="relative size-12.5 transition-opacity hover:opacity-80"
        >
          <Image src="/icons/order-refund.svg" alt="" fill unoptimized />
        </a>
        {canReview ? (
          <Link
            href={`${reviewHref}#reviews`}
            aria-label={`Write a review for ${first?.name}`}
            title="Write a review"
            className="relative size-12.5 transition-opacity hover:opacity-80"
          >
            <Image src="/icons/order-review.svg" alt="" fill unoptimized />
          </Link>
        ) : (
          <span title="You can write a review once it’s delivered" className="relative size-12.5 cursor-not-allowed opacity-30">
            <Image src="/icons/order-review.svg" alt="" fill unoptimized />
          </span>
        )}
      </div>
    </li>
  );
}

export default function OrdersView() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const orders = useAllOrders();

  const requested = params.get("status");
  const filter: FilterId = FILTERS.some((f) => f.id === requested) ? (requested as FilterId) : "all";

  function choose(id: FilterId) {
    router.replace(id === "all" ? pathname : `${pathname}?status=${id}`, { scroll: false });
  }

  if (orders === null) return <div aria-hidden className="mt-8.75 h-100" />;

  if (orders.length === 0) {
    return (
      <EmptyState
        className="mt-12.5"
        message="You haven’t ordered anything yet. When you do, you can track it here."
        cta={{ label: "View our Collections", href: "/collections" }}
      />
    );
  }

  const shown = orders.filter((order) => matches(order, filter));

  return (
    <>
      <div className="mt-8.75 flex flex-wrap items-center gap-2.75">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => choose(f.id)}
            className={cn(
              "rounded-xl px-3 py-2.5 font-serif text-sm tracking-tight-2 transition-colors",
              filter === f.id ? "bg-brand text-white" : "border border-line-dark text-ink hover:border-brand",
            )}
          >
            <span className="trim block whitespace-nowrap">{f.label}</span>
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <EmptyState
          className="mt-12.5"
          message="No orders with this status."
          cta={{ label: "See all orders", href: "/account/orders" }}
        />
      ) : (
        <ul className="mt-4.5 rounded-4xl bg-white p-4">
          {shown.map((order) => (
            <OrderRow key={order.id} order={order} />
          ))}
        </ul>
      )}
    </>
  );
}