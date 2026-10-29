"use client";

import { Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/** Tablet: the search bar folds into a round button that opens a search field */
export default function SearchButton({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field when it opens; close on Escape or a click outside
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <button
        type="button"
        aria-label={open ? "Close search" : "Search"}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="grid size-9.5 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-brand"
      >
        {open ? (
          <X aria-hidden className="size-5" strokeWidth={1.5} />
        ) : (
          <Search aria-hidden className="size-5" strokeWidth={1.5} />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.form
            action="/shop"
            role="search"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-50 mt-2 flex h-11 w-80 items-center gap-2 rounded-full border border-line bg-white pr-1.5 pl-4 shadow-card"
          >
            <input
              ref={inputRef}
              type="search"
              name="q"
              placeholder="Search paper goods..."
              aria-label="Search paper goods"
              className="w-full bg-transparent font-serif text-sm text-ink outline-none placeholder:text-muted"
            />
            <button type="submit" className="shrink-0 rounded-full bg-brand px-3.5 py-2 text-white transition-opacity hover:opacity-90">
              <span className="trim block font-serif text-xs">Search</span>
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
