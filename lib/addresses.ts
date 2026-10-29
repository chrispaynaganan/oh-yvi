"use client";

import { useSyncExternalStore } from "react";
import { sampleAddresses, type SavedAddress } from "@/data/account";
import type { Address } from "@/types";

export type AddressBook = { addresses: SavedAddress[]; primaryId: string | null };

const STORAGE_KEY = "ohyvi:addresses";
const STARTER: AddressBook = { addresses: sampleAddresses, primaryId: sampleAddresses[0]?.id ?? null };
let book: AddressBook | null = null;
const listeners = new Set<() => void>();

function read(): AddressBook {
  if (book) return book;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    book = raw ? (JSON.parse(raw) as AddressBook) : STARTER;
  } catch {
    book = STARTER;
  }
  return book;
}

function save(next: AddressBook) {
  book = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // storage blocked
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** The saved addresses. null during the server render. */
export function useAddressBook() {
  return useSyncExternalStore(subscribe, read, () => null);
}

export function getPrimary(b: AddressBook) {
  return b.addresses.find((a) => a.id === b.primaryId) ?? b.addresses[0] ?? null;
}

// TODO(backend): replace these with Supabase calls.
export function addAddress(address: Address) {
  const current = read();
  const id = crypto.randomUUID();
  save({ addresses: [...current.addresses, { ...address, id }], primaryId: current.primaryId ?? id });
}

export function updateAddress(id: string, address: Address) {
  const current = read();
  save({ ...current, addresses: current.addresses.map((a) => (a.id === id ? { ...address, id } : a)) });
}

export function removeAddress(id: string) {
  const current = read();
  const addresses = current.addresses.filter((a) => a.id !== id);
  save({ addresses, primaryId: current.primaryId === id ? (addresses[0]?.id ?? null) : current.primaryId });
}

export function setPrimaryAddress(id: string) {
  save({ ...read(), primaryId: id });
}