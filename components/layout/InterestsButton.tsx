"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { useInterests } from "@/lib/interests";

export default function InterestsButton() {
  const count = useInterests()?.length ?? 0;

  return (
    <Link
      href="/interests"
      aria-label={count > 0 ? `Interests, ${count} saved` : "Interests"}
      className="relative grid size-9.5 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand"
    >
      <Image src="/icons/heart.svg" alt="" width={20} height={20} unoptimized />
      <AnimatePresence initial={false}>
        {count > 0 && (
          <motion.span
            key={count}
            aria-hidden
            initial={{ scale: 0.4, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.4, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 18 }}
            className="absolute -top-1 -right-1 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-brand px-1 font-mono text-9 leading-none font-bold text-white ring-2 ring-white"
          >
            {count > 99 ? "99+" : count}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}