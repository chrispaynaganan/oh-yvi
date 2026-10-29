"use client";

import { useSyncExternalStore } from "react";

export type InterestKey = `${"product" | "bundle"}:${string}`;

const STORAGE_KEY = "ohyvi:interests";
const EMPTY: InterestKey[] = [];

let cache: InterestKey[] | null = null;
const listeners = new Set<() => void>();

function read(): InterestKey[] {
  if (cache) return cache;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    cache = raw ? (JSON.parse(raw) as InterestKey[]) : EMPTY;
  } catch {
    cache = EMPTY; // storage blocked (e.g. private browsing)
  }
  return cache;
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Saved interests. null during the server render, before the browser can be read. */
export function useInterests() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function toggleInterest(key: InterestKey) {
  const current = read();
  const next = current.includes(key) ? current.filter((k) => k !== key) : [...current, key];
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked; the change still applies until the page is closed
  }
  listeners.forEach((listener) => listener());
}