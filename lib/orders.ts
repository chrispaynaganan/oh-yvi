"use client";

import { useSyncExternalStore } from "react";
import type { BagKey } from "@/lib/bag";
import type { Address } from "@/types";

export type OrderItem = {
  key: BagKey;
  name: string;
  image: string;
  options: string[];
  unitPrice: number;
  quantity: number;
  type: "physical" | "digital";
};

export type Order = {
  id: string;
  transactionId: string;
  paymentReference: string;
  createdAt: string;
  contact: { fullName: string; email: string; mobile: string };
  address?: Address;
  payment: { method: "ewallet" | "card" | "qrph"; label: string };
  items: OrderItem[];
  totals: { subtotal: number; discount: number; shipping: number; paymentFee: number; total: number };
  promoCode?: string;
};

const STORAGE_KEY = "ohyvi:orders";
const NONE: Order[] = [];
let orders: Order[] | null = null;
const listeners = new Set<() => void>();

function read(): Order[] {
  if (orders) return orders;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    orders = raw ? (JSON.parse(raw) as Order[]) : NONE;
  } catch {
    orders = NONE;
  }
  return orders;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** All saved orders. null during the server render. */
export function useOrders() {
  return useSyncExternalStore(subscribe, read, () => null);
}

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789";
const randomChars = (n: number) =>
  Array.from({ length: n }, () => ALPHABET[Math.floor(Math.random() * ALPHABET.length)]).join("");
const randomDigits = (n: number) =>
  Array.from({ length: n }, () => Math.floor(Math.random() * 10)).join("");

// TODO(backend): orders are created by the server after PayMongo confirms payment.
export function createOrder(input: Omit<Order, "id" | "transactionId" | "paymentReference" | "createdAt">) {
  const order: Order = {
    ...input,
    id: `${randomChars(7)}-${randomChars(6)}-${randomChars(6)}`,
    transactionId: randomDigits(15),
    paymentReference: randomDigits(15),
    createdAt: new Date().toISOString(),
  };
  orders = [order, ...read()];
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  } catch {
    // storage blocked; the order still shows until the page is closed
  }
  listeners.forEach((listener) => listener());
  return order;
}