"use client";

import Image from "next/image";
import { toggleInterest, useInterests, type InterestKey } from "@/lib/interests";
import { cn } from "@/lib/utils";

type Action = "wishlist" | "add" | "share";

function CardIconButton({
  label,
  icon,
  disabled = false,
  pressed,
  onClick,
}: {
  label: string;
  icon: string;
  disabled?: boolean;
  pressed?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
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
  actions?: Action[];
  disableAdd?: boolean;
  className?: string;
};

export default function CardActions({
  name,
  interestKey,
  actions = ["wishlist", "add", "share"],
  disableAdd = false,
  className,
}: CardActionsProps) {
  const interests = useInterests();
  const saved = interestKey ? (interests?.includes(interestKey) ?? false) : false;

  return (
    <div className={cn("flex gap-2.5", className)}>
      {actions.includes("wishlist") && (
        <CardIconButton
          label={saved ? `Remove ${name} from interests` : `Save ${name} to interests`}
          icon={saved ? "/icons/card-heart-filled.svg" : "/icons/card-heart.svg"}
          pressed={saved}
          onClick={interestKey ? () => toggleInterest(interestKey) : undefined}
        />
      )}
      {actions.includes("add") && (
        <CardIconButton
          label={`Quick add ${name} to cart`}
          icon="/icons/card-bag.svg"
          disabled={disableAdd}
        />
      )}
      {actions.includes("share") && (
        <CardIconButton label={`Share ${name}`} icon="/icons/card-share.svg" />
      )}
    </div>
  );
}