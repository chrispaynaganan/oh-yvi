"use client";

import { useSyncExternalStore } from "react";

function subscribe(onTick: () => void) {
  const id = setInterval(onTick, 1000);
  return () => clearInterval(id);
}
const getNow = () => Math.floor(Date.now() / 1000);
const getServerNow = () => null;

/** Current time in whole seconds, ticking every second. null during the server render. */
export function useNowSeconds() {
  return useSyncExternalStore(subscribe, getNow, getServerNow);
}