"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { AnimatePresence, motion, useAnimate } from "motion/react";
import { useBagCount, useBagLanded } from "@/lib/bag";

export default function BagButton() {
  const count = useBagCount();
  const landed = useBagLanded();
  const seen = useRef(landed);
  const [scope, animate] = useAnimate();

  // Bounce whenever a photocard lands
  useEffect(() => {
    if (landed === seen.current) return;
    seen.current = landed;
    animate(scope.current, { scale: [1, 1.22, 0.94, 1.04, 1] }, { duration: 0.45, ease: "easeOut" });
  }, [landed, animate, scope]);

  return (
    <Link
      ref={scope}
      href="/bag"
      data-bag-target
      aria-label={count > 0 ? `Bag, ${count} items` : "Bag"}
      className="relative grid size-9.5 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand"
    >
      <Image src="/icons/cart.svg" alt="" width={20} height={20} unoptimized />
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