"use client";

import { useMemo } from "react";
import { currentUser, sampleAddresses } from "@/data/account";
import { store } from "@/data/store";
import type { BagKey } from "@/lib/bag";
import { resolveItem } from "@/lib/catalog";
import { useOrders, type Order, type OrderItem, type OrderStatus, type TrackingEvent } from "@/lib/orders";

/* ---------- Status wording ---------- */
export const STATUS_LABEL: Record<OrderStatus, string> = {
  processing: "Processing",
  shipped: "Shipped",
  "out-for-delivery": "Out for delivery",
  delivered: "Delivered",
  returned: "Returned",
  cancelled: "Cancelled",
  refunded: "Refunded",
};

export const STATUS_HEADLINE: Record<OrderStatus, string> = {
  processing: "We’re getting your order ready.",
  shipped: "Your order is on the way.",
  "out-for-delivery": "Your order is on the way.",
  delivered: "Your order has arrived.",
  returned: "We’ve received your return.",
  cancelled: "This order was cancelled.",
  refunded: "This order was refunded.",
};

/** How full the status ring is */
export const STATUS_PROGRESS: Record<OrderStatus, number> = {
  processing: 0.25,
  shipped: 0.5,
  "out-for-delivery": 0.75,
  delivered: 1,
  returned: 1,
  cancelled: 1,
  refunded: 1,
};

export const statusOf = (order: Order): OrderStatus => order.status ?? "processing";

/** The tracking steps, newest first. Orders without a courier yet get the expected steps. */
export function trackingEvents(order: Order): TrackingEvent[] {
  if (order.tracking) return order.tracking.events;
  return [
    { title: "Delivered", body: "Your package will be delivered to your address." },
    { title: "Shipped", body: "We’ll email you a tracking link once it’s on its way." },
    { title: "Printed and packed", body: "Your items are printed and checked by hand. Usually 3–4 business days." },
    { title: "Order placed", body: "We’ve received your order and it’s in the print queue.", at: order.createdAt },
  ];
}

/** Product or bundle page for an order line */
export function itemHref(item: OrderItem) {
  const [kind, slug] = item.key.split(":");
  if (kind === "product") return `/products/${slug}`;
  if (kind === "bundle") return `/bundles/${slug}`;
  return undefined;
}

/* ---------- Sample orders (removed once orders come from Supabase) ---------- */
function makeOrder(o: {
  id: string;
  createdAt: string;
  status: OrderStatus;
  lines: [slug: string, quantity: number][];
  payment: Order["payment"];
  tracking?: Order["tracking"];
}): Order {
  const items: OrderItem[] = o.lines.flatMap(([slug, quantity]) => {
    const key = `product:${slug}` as BagKey;
    const item = resolveItem(key);
    if (!item) return [];
    return [{ key, name: item.name, image: item.image, options: item.options, unitPrice: item.unitPrice, quantity, type: item.type }];
  });
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const physical = items.some((i) => i.type === "physical");
  const shipping = physical && subtotal < store.freeShippingThreshold ? store.standardShipping : 0;

  return {
    id: o.id,
    transactionId: "000125936793586",
    paymentReference: "123034253565675",
    createdAt: o.createdAt,
    contact: { fullName: currentUser.name, email: currentUser.email, mobile: "0912 345 6789" },
    address: physical ? sampleAddresses[0] : undefined,
    payment: o.payment,
    items,
    totals: { subtotal, discount: 0, shipping, paymentFee: 0, total: subtotal + shipping },
    status: o.status,
    tracking: o.tracking,
  };
}

const courier = store.legal.courier;

export const sampleOrders: Order[] = [
  makeOrder({
    id: "12Vbe6G-8KL872-jKlmp6",
    createdAt: "2026-07-13T07:36:00Z",
    status: "out-for-delivery",
    lines: [["vo-project-tracker-notepad", 1], ["mini-calling-card-set", 2]],
    payment: { method: "ewallet", label: "GCash" },
    tracking: {
      courier,
      number: "[TRACKING-NO]",
      url: "#",
      events: [
        { title: "Delivered", body: "Your package has been delivered. Thank you for shopping with us!" },
        { title: "Out for Delivery", body: "Your package is out with the courier and will be delivered to your address today.", at: "2026-07-21T01:45:00Z" },
        { title: "Arrived at Sorting Facility", body: "Your package has reached the regional sorting facility and is being prepared for the next leg of its journey.", at: "2026-07-20T00:15:00Z" },
        { title: `Handed to ${courier}`, body: "Your package has been successfully collected from our studio and is now on its way to you!", at: "2026-07-19T07:36:00Z" },
      ],
    },
  }),
  makeOrder({
    id: "8KmP2qR-4TzW91-aB3dE7",
    createdAt: "2026-10-27T03:10:00Z",
    status: "processing",
    lines: [["vo-project-tracker-notepad", 1]],
    payment: { method: "ewallet", label: "Maya" },
  }),
  makeOrder({
    id: "Q7nX4vL-2HcY58-pR9sT1",
    createdAt: "2026-05-21T05:20:00Z",
    status: "delivered",
    lines: [["habit-notes-mini-pad", 2]],
    payment: { method: "card", label: "Credit / Debit card" },
    tracking: {
      courier,
      number: "[TRACKING-NO]",
      url: "#",
      events: [
        { title: "Delivered", body: "Your package has been delivered. Thank you for shopping with us!", at: "2026-05-27T06:30:00Z" },
        { title: "Out for Delivery", body: "Your package is out with the courier.", at: "2026-05-27T01:00:00Z" },
        { title: `Handed to ${courier}`, body: "Your package left our studio.", at: "2026-05-25T08:00:00Z" },
      ],
    },
  }),
  makeOrder({
    id: "Z3wF8kN-6JqB27-mV5cH2",
    createdAt: "2025-11-03T02:45:00Z",
    status: "shipped",
    lines: [["mini-calling-card-set", 1]],
    payment: { method: "qrph", label: "QR Ph" },
    tracking: {
      courier,
      number: "[TRACKING-NO]",
      url: "#",
      events: [
        { title: "Delivered", body: "Your package will be delivered to your address." },
        { title: `Handed to ${courier}`, body: "Your package left our studio.", at: "2025-11-06T07:00:00Z" },
      ],
    },
  }),
  makeOrder({
    id: "H5tR1yD-9LpG43-xK8nW6",
    createdAt: "2026-01-10T09:15:00Z",
    status: "refunded",
    lines: [["vo-project-tracker-notepad", 3]],
    payment: { method: "ewallet", label: "GrabPay" },
  }),
];

/** Orders placed on this device plus the samples, newest first. null during the server render. */
export function useAllOrders() {
  const placed = useOrders();
  return useMemo(
    () => (placed === null ? null : [...placed, ...sampleOrders].sort((a, b) => b.createdAt.localeCompare(a.createdAt))),
    [placed],
  );
}