"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import { formatAddress } from "@/data/account";
import { store } from "@/data/store";
import {
  STATUS_HEADLINE,
  STATUS_LABEL,
  STATUS_PROGRESS,
  statusOf,
  trackingEvents,
  useAllOrders,
} from "@/lib/accountOrders";
import { formatLongDate, formatTime } from "@/lib/dates";
import type { Order } from "@/lib/orders";
import { cn, formatPeso } from "@/lib/utils";

const CARD = "rounded-2xl bg-white px-4 py-6";

function StatusRing({ progress, muted }: { progress: number; muted: boolean }) {
  const r = 25;
  const length = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 58 58" aria-hidden className="size-14.5 -rotate-90">
      <circle cx="29" cy="29" r={r} fill="none" strokeWidth="5" className="stroke-line-soft" />
      <circle
        cx="29"
        cy="29"
        r={r}
        fill="none"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={length}
        strokeDashoffset={length * (1 - progress)}
        className={cn("transition-[stroke-dashoffset] duration-700", muted ? "stroke-muted" : "stroke-brand")}
      />
    </svg>
  );
}

function CourierBox({ order }: { order: Order }) {
  const [copied, setCopied] = useState(false);
  const tracking = order.tracking;

  if (!tracking) {
    return (
      <div className="rounded-4xl border border-line-strong p-4 font-mono text-sm text-muted-2">
        Your tracking number will appear here once your order ships.
      </div>
    );
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(tracking!.number);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard blocked; nothing to do
    }
  }

  return (
    <div className="flex items-center justify-between gap-6 rounded-4xl border border-line-strong p-4">
      <div className="flex items-center gap-2">
        <div aria-hidden className="size-13.75 shrink-0 rounded-md bg-placeholder" />
        <div className="flex flex-col gap-2.5 font-mono text-base tracking-tight-2">
          <span className="trim block text-muted-2">{tracking.courier} tracking number</span>
          <span className="trim block font-bold text-black">{tracking.number}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Tracking number copied" : "Copy tracking number"}
          title={copied ? "Copied!" : "Copy tracking number"}
          className="relative size-12.5 transition-opacity hover:opacity-80"
        >
          <Image src="/icons/copy-circle.svg" alt="" fill unoptimized />
        </button>
        <a
          href={tracking.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-12.5 items-center gap-2.5 rounded-full border border-line-dark pr-3.5 pl-5 transition-colors hover:border-brand"
        >
          <span className="trim block font-mono text-sm tracking-tight-2 text-black">track on {tracking.courier}</span>
          <Image src="/icons/arrow-up-right.svg" alt="" width={17} height={17} className="size-4.25" unoptimized />
        </a>
      </div>
      <span aria-live="polite" className="sr-only">
        {copied ? "Tracking number copied" : ""}
      </span>
    </div>
  );
}

function Timeline({ order }: { order: Order }) {
  const events = trackingEvents(order);
  const currentIndex = events.findIndex((e) => e.at);

  return (
    <ol className="flex flex-col">
      {events.map((event, i) => {
        const upcoming = !event.at;
        const current = i === currentIndex;
        return (
          <li key={`${event.title}-${i}`} className="flex gap-5 pb-8 last:pb-0">
            <div className="relative flex w-19.75 shrink-0 justify-center">
              {i < events.length - 1 && (
                <span aria-hidden className="absolute top-11.25 -bottom-8 left-1/2 w-px bg-line-strong" />
              )}
              <span
                className={cn(
                  "relative flex size-11.25 items-center justify-center rounded-full",
                  current && "bg-brand text-white",
                  !current && !upcoming && "border border-black text-black",
                  upcoming && "border border-line bg-white text-line-strong",
                )}
              >
                <Check aria-hidden className="size-5.5" strokeWidth={1.5} />
              </span>
            </div>

            <div className={cn("flex flex-1 items-start justify-between gap-6 pt-2 tracking-tight-2", upcoming && "text-strip-text")}>
              <div className="flex w-85.5 flex-col gap-4">
                <p className={cn("font-mono text-base font-bold", !upcoming && "text-black")}>{event.title}</p>
                <p className={cn("font-mono text-sm", !upcoming && "text-muted-2")}>{event.body}</p>
              </div>
              <div className={cn("flex w-24.5 flex-col items-end gap-2.5 text-right font-mono text-sm", !upcoming && "text-muted-3")}>
                {event.at ? (
                  <>
                    <span className="trim block">{formatLongDate(event.at)}</span>
                    <span className="trim block">{formatTime(event.at)}</span>
                  </>
                ) : (
                  <span className="trim block">Upcoming</span>
                )}
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

export default function OrderDetailView() {
  const { orderId } = useParams<{ orderId: string }>();
  const orders = useAllOrders();

  if (orders === null) return <div aria-hidden className="h-150" />;

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return (
      <EmptyState
        className="mt-12.5"
        message="We couldn’t find this order. It may belong to another account or device."
        cta={{ label: "Back to my orders", href: "/account/orders" }}
      />
    );
  }

  const status = statusOf(order);
  const physical = order.items.some((i) => i.type === "physical");
  const finished = status === "returned" || status === "cancelled" || status === "refunded";
  const supportLink = `mailto:${store.supportEmail}?subject=${encodeURIComponent(`Help with order ${order.id}`)}`;

  return (
    <>
      <div className="max-xl:hidden">
        <Breadcrumbs items={[{ label: "Orders", href: "/account/orders" }, { label: `Order No. ${order.id}` }]} />
      </div>

      <div className="mt-11.75 flex items-start justify-between gap-10 max-xl:mt-13.75 max-xl:gap-6">
        <div>
          <h1 className="font-serif text-36 tracking-tight-3 text-black">{STATUS_HEADLINE[status]}</h1>
          <div className="mt-6.5 grid w-174 grid-cols-2 gap-x-5 gap-y-3 font-mono text-base tracking-tight-2 text-muted max-xl:w-auto max-xl:grid-cols-1">
            <p>Order number: {order.id}</p>
            <p>Payment Method: {order.payment.label}</p>
            <p>Transaction ID: {order.transactionId}</p>
            <p>Date Purchased: {formatLongDate(order.createdAt)}</p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3 rounded-full bg-white py-2.5 pr-6.25 pl-2.5 shadow-float">
          <StatusRing progress={STATUS_PROGRESS[status]} muted={finished} />
          <div className="flex flex-col gap-3 tracking-tight-2 whitespace-nowrap">
            <span className="trim block font-mono text-sm text-muted">Status</span>
            <span className="trim block font-mono text-base font-bold text-black">{STATUS_LABEL[status]}</span>
          </div>
        </div>
      </div>

      <div className="mt-13.5 grid grid-cols-12 items-start gap-5 max-xl:mt-6 max-xl:grid-cols-2">
        {/* Tracking */}
        <section className="col-span-9 flex flex-col gap-6.5 rounded-2xl bg-white p-6 max-xl:order-4 max-xl:col-span-2 max-xl:p-4">
          <h2 className="font-mono text-lg font-bold tracking-tight-2 text-black">Tracking history</h2>
          {physical ? (
            <div className="flex flex-col gap-8.5">
              <CourierBox order={order} />
              <Timeline order={order} />
            </div>
          ) : (
            <p className="font-mono text-sm text-muted-2">
              This order only has digital items, so there’s nothing to ship. Find your files in{" "}
              <Link href="/account/library" className="font-bold text-brand underline">
                My Library
              </Link>
              .
            </p>
          )}
        </section>

        {/* Side cards */}
        {/* Tablet: these cards join the grid (items left, address + help right) */}
        <div className="col-span-3 flex flex-col gap-4 max-xl:contents">
          {order.address && (
            <section className={cn(CARD, "flex flex-col gap-5.5 font-mono text-sm tracking-tight-2 max-xl:order-2")}>
              <h2 className="font-bold text-muted">Delivering to</h2>
              <div className="flex flex-col gap-3">
                <p className="flex items-center gap-2 text-muted">
                  <span className="trim block font-bold">{order.address.label}</span>
                  <span aria-hidden className="size-0.75 rounded-full bg-current" />
                  <span className="trim block">{order.address.recipient}</span>
                </p>
                <p className="text-black">{formatAddress(order.address)}</p>
              </div>
            </section>
          )}

          <section className={cn(CARD, "flex flex-col gap-4 font-mono text-base tracking-tight-2 text-black max-xl:order-1 max-xl:row-span-2 max-xl:self-stretch")}>
            {order.items.map((item) => (
              <div key={item.key} className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3.75">
                  <div className="relative size-9.75 shrink-0 overflow-hidden rounded-xs bg-placeholder">
                    <Image src={item.image} alt="" fill sizes="39px" className="object-cover" />
                  </div>
                  <span className="trim block">
                    {item.name} x {item.quantity}
                  </span>
                </div>
                <span className="trim block font-bold whitespace-nowrap">{formatPeso(item.unitPrice * item.quantity)}</span>
              </div>
            ))}
            <div className="flex items-center justify-between gap-3 max-xl:mt-auto">
              <span className="trim block">Total paid{physical ? " (incl. shipping)" : ""}</span>
              <span className="trim block font-bold">{formatPeso(order.totals.total)}</span>
            </div>
          </section>

          <section className={cn(CARD, "flex flex-col gap-5.5 font-mono text-sm tracking-tight-2 max-xl:order-3")}>
            <h2 className="font-bold text-muted">Need help with this order?</h2>
            <div className="flex flex-col gap-4">
              <p className="text-black">Damaged, missing, or wrong item? Message us within 7 days of delivery.</p>
              <a href={supportLink} className="font-bold text-brand underline hover:opacity-80">
                Contact support
              </a>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}