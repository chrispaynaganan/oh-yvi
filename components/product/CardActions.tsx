"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, useAnimate, useReducedMotion } from "motion/react";
import { toggleInterest, useInterests, type InterestKey } from "@/lib/interests";
import { cn } from "@/lib/utils";
import { addToBag, type BagKey } from "@/lib/bag";

type Action = "wishlist" | "add" | "share";

const HEART_PATH =
  "M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.1 0 3.7 1.1 4.5 2.6.8-1.5 2.4-2.6 4.5-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z";
const BURST_ANGLES = [0, 60, 120, 180, 240, 300];

/** Ring + six tiny hearts flying out from the button */
function HeartBurst() {
  return (
    <span aria-hidden className="pointer-events-none absolute inset-0">
      <motion.span
        className="absolute inset-0 rounded-full border-2 border-heart"
        initial={{ scale: 0.6, opacity: 0.7 }}
        animate={{ scale: 1.8, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      {BURST_ANGLES.map((deg, i) => {
        const rad = (deg * Math.PI) / 180;
        return (
          <motion.svg
            key={deg}
            viewBox="0 0 24 24"
            className="absolute top-1/2 left-1/2 -mt-1 -ml-1 size-2 fill-heart"
            initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
            animate={{
              x: Math.cos(rad) * 18,
              y: Math.sin(rad) * 18,
              scale: [0, 1, 0.5],
              opacity: [1, 1, 0],
              rotate: i % 2 === 0 ? -20 : 20,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <path d={HEART_PATH} />
          </motion.svg>
        );
      })}
    </span>
  );
}

function HeartButton({
  name,
  saved,
  onToggle,
}: {
  name: string;
  saved: boolean;
  onToggle?: () => void;
}) {
  const [scope, animate] = useAnimate();
  const reduceMotion = useReducedMotion();
  const [burst, setBurst] = useState(0);

  function handleClick() {
    if (!onToggle) return;
    onToggle();
    if (reduceMotion) return;
    if (!saved) {
      setBurst((n) => n + 1);
      animate(scope.current, { scale: [1, 1.35, 0.9, 1.08, 1] }, { duration: 0.55, ease: "easeOut" });
    } else {
      animate(scope.current, { scale: [1, 0.85, 1] }, { duration: 0.25 });
    }
  }

  return (
    <button
      type="button"
      aria-label={saved ? `Remove ${name} from interests` : `Save ${name} to interests`}
      aria-pressed={saved}
      onClick={handleClick}
      className="relative size-6.75 transition-transform hover:scale-110"
    >
      {/* origin = the button's center inside the shadowed icon */}
      <span
        ref={scope}
        className="absolute inset-[-29.63%_-44.44%_-59.26%_-44.44%]"
        style={{ transformOrigin: "50% 42%" }}
      >
        <Image
          src={saved ? "/icons/card-heart-filled.svg" : "/icons/card-heart.svg"}
          alt=""
          fill
          unoptimized
        />
      </span>
      {burst > 0 && <HeartBurst key={burst} />}
    </button>
  );
}

function CardIconButton({
  label,
  icon,
  disabled = false,
  onClick,
}: {
  label: string;
  icon: string;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className="relative size-6.75 transition-transform hover:scale-110 disabled:opacity-50 disabled:hover:scale-100"
    >
      <span className="absolute inset-[-29.63%_-44.44%_-59.26%_-44.44%]">
        <Image src={icon} alt="" fill unoptimized />
      </span>
    </button>
  );
}

type CardActionsProps = {
  name: string;
  /** e.g. "product:the-good-work-journal"; makes the heart save to Interests */
  interestKey?: InterestKey;
  /** e.g. "product:the-good-work-journal"; makes the bag button add to the bag */
  bagKey?: BagKey;
  actions?: Action[];
  disableAdd?: boolean;
  className?: string;
};

export default function CardActions({
  name,
  interestKey,
  bagKey,
  actions = ["wishlist", "add", "share"],
  disableAdd = false,
  className,
}: CardActionsProps) {
  const interests = useInterests();
  const saved = interestKey ? (interests?.includes(interestKey) ?? false) : false;

  return (
    <div className={cn("flex gap-2.5", className)}>
      {actions.includes("wishlist") && (
        <HeartButton
          name={name}
          saved={saved}
          onToggle={interestKey ? () => toggleInterest(interestKey) : undefined}
        />
      )}
      {actions.includes("add") && (
        <CardIconButton
          label={`Quick add ${name} to bag`}
          icon="/icons/card-bag.svg"
          disabled={disableAdd}
          onClick={bagKey ? (e) => addToBag(bagKey, 1, e.currentTarget) : undefined}
        />
      )}
      {actions.includes("share") && (
        <CardIconButton label={`Share ${name}`} icon="/icons/card-share.svg" />
      )}
    </div>
  );
}