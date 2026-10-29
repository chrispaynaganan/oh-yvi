"use client";

import { Check, CreditCard, ShoppingBag } from "lucide-react";
import { motion, MotionConfig } from "motion/react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const STEPS = [
  { key: "bag", label: "Bag", Icon: ShoppingBag, match: (p: string) => p === "/bag" },
  { key: "checkout", label: "Checkout", Icon: CreditCard, match: (p: string) => p === "/checkout" },
  {
    key: "confirmation",
    label: "Confirmation",
    Icon: Check,
    match: (p: string) => p.startsWith("/checkout/confirmation"),
  },
];

const spring = { type: "spring", stiffness: 380, damping: 32 } as const;

function StepsBar({ current }: { current: number }) {
  return (
    <MotionConfig reducedMotion="user">
      <ol aria-label="Checkout steps" className="flex items-center gap-4">
        {STEPS.map((step, i) => {
          const active = i === current;
          return (
            <motion.li
              key={step.key}
              layout
              transition={spring}
              aria-current={active ? "step" : undefined}
              className={cn(
                "relative flex h-11.25 items-center justify-center rounded-full",
                active ? "px-3.5 text-white" : "w-11.25 border border-line-dark text-ink",
              )}
            >
              {active && (
                <motion.span
                  layoutId="active-step"
                  transition={spring}
                  className="absolute inset-0 rounded-full bg-brand"
                />
              )}
              <motion.span layout="position" className="relative flex items-center gap-2">
                <step.Icon aria-hidden className="size-5" strokeWidth={1.5} />
                {active ? (
                  <motion.span
                    key={step.key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.2 }}
                    className="trim block font-mono text-sm whitespace-nowrap"
                  >
                    {step.label}
                  </motion.span>
                ) : (
                  <span className="sr-only">{step.label}</span>
                )}
              </motion.span>
            </motion.li>
          );
        })}
      </ol>
    </MotionConfig>
  );
}

export default function CheckoutSteps() {
  const pathname = usePathname();
  const current = Math.max(0, STEPS.findIndex((step) => step.match(pathname)));
  return <StepsBar current={current} />;
}

/** Shown for a split second before the page knows which step it's on */
export function CheckoutStepsPlaceholder() {
  return (
    <div aria-hidden className="flex items-center gap-4">
      {STEPS.map((step) => (
        <span key={step.key} className="size-11.25 rounded-full border border-line-dark" />
      ))}
    </div>
  );
}