"use client";

import { useSyncExternalStore } from "react";

export type BagKey = `${"product" | "bundle"}:${string}`;
export type BagLine = { key: BagKey; quantity: number; selected: boolean };
export type Flight = {
  id: number;
  src: string;
  from: { x: number; y: number; size: number };
  to: { x: number; y: number };
  quantity: number;
};

const STORAGE_KEY = "ohyvi:bag";
const NO_LINES: BagLine[] = [];
const NO_FLIGHTS: Flight[] = [];

let lines: BagLine[] | null = null;
let flights: Flight[] = NO_FLIGHTS;
let landed = 0;
let nextFlightId = 1;
const listeners = new Set<() => void>();

function readLines(): BagLine[] {
  if (lines) return lines;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    lines = raw ? (JSON.parse(raw) as BagLine[]) : NO_LINES;
  } catch {
    lines = NO_LINES; // storage blocked (e.g. private browsing)
  }
  return lines;
}

function emit() {
  listeners.forEach((listener) => listener());
}

function saveLines(next: BagLine[]) {
  lines = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked; the bag still works until the page is closed
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      lines = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Bag lines. null during the server render. */
export function useBag() {
  return useSyncExternalStore(subscribe, readLines, () => null);
}

export function useFlights() {
  return useSyncExternalStore(subscribe, () => flights, () => NO_FLIGHTS);
}

/** Goes up by one every time a photocard lands in the bag */
export function useBagLanded() {
  return useSyncExternalStore(subscribe, () => landed, () => 0);
}

/** Count for the header badge: everything except what's still in the air */
export function useBagCount() {
  const bag = useBag();
  const inAir = useFlights();
  if (!bag) return 0;
  const total = bag.reduce((sum, line) => sum + line.quantity, 0);
  const flying = inAir.reduce((sum, flight) => sum + flight.quantity, 0);
  return Math.max(0, total - flying);
}

/** Starts the photocard throw from the clicked item's photo to the header bag */
function launch(from: Element, quantity: number) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const target = document.querySelector("[data-bag-target]");
  if (!target) return;

  const source = from.closest("[data-fly-scope]")?.querySelector("[data-fly-source]") ?? from;
  const img = source.querySelector("img");
  const src = img?.currentSrc || img?.src;
  if (!src) return;

  const a = source.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  const size = Math.min(220, Math.max(96, Math.min(a.width, a.height)));

  flights = [
    ...flights,
    {
      id: nextFlightId++,
      src,
      from: { x: a.left + a.width / 2, y: a.top + a.height / 2, size },
      to: { x: b.left + b.width / 2, y: b.top + b.height / 2 },
      quantity,
    },
  ];
}

export function addToBag(key: BagKey, quantity = 1, from?: Element | null) {
  const current = readLines();
  const existing = current.find((line) => line.key === key);
  const next = existing
    ? current.map((line) =>
        line.key === key ? { ...line, quantity: line.quantity + quantity, selected: true } : line,
      )
    : [...current, { key, quantity, selected: true }];
  if (from) launch(from, quantity); // before saving, so the badge waits for the landing
  saveLines(next);
}

export function finishFlight(id: number) {
  flights = flights.filter((flight) => flight.id !== id);
  landed += 1;
  emit();
}

export function setQuantity(key: BagKey, quantity: number) {
  saveLines(readLines().map((line) => (line.key === key ? { ...line, quantity: Math.max(1, quantity) } : line)));
}

export function removeFromBag(key: BagKey) {
  saveLines(readLines().filter((line) => line.key !== key));
}

export function setSelected(key: BagKey, selected: boolean) {
  saveLines(readLines().map((line) => (line.key === key ? { ...line, selected } : line)));
}

export function setAllSelected(selected: boolean) {
  saveLines(readLines().map((line) => ({ ...line, selected })));
}

/* ---------- Promo / affiliate code ---------- */
const PROMO_KEY = "ohyvi:promo";
let promoCode: string | null | undefined; // undefined = not read yet

function readPromo(): string | null {
  if (promoCode !== undefined) return promoCode;
  try {
    promoCode = window.localStorage.getItem(PROMO_KEY);
  } catch {
    promoCode = null;
  }
  return promoCode;
}

export function usePromoCode() {
  return useSyncExternalStore(subscribe, readPromo, () => null);
}

export function setPromoCode(code: string | null) {
  promoCode = code;
  try {
    if (code) window.localStorage.setItem(PROMO_KEY, code);
    else window.localStorage.removeItem(PROMO_KEY);
  } catch {
    // storage blocked
  }
  emit();
}

/** Removes the purchased lines after an order is placed */
export function removeLines(keys: BagKey[]) {
  saveLines(readLines().filter((line) => !keys.includes(line.key)));
}