import Image from "next/image";
import { cn } from "@/lib/utils";

function CardIconButton({
  label,
  icon,
  disabled = false,
}: {
  label: string;
  icon: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
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
  disableAdd?: boolean;
  className?: string;
};

export default function CardActions({ name, disableAdd = false, className }: CardActionsProps) {
  return (
    <div className={cn("flex gap-2.5", className)}>
      <CardIconButton label={`Add ${name} to wishlist`} icon="/icons/card-heart.svg" />
      <CardIconButton
        label={`Quick add ${name} to cart`}
        icon="/icons/card-bag.svg"
        disabled={disableAdd}
      />
      <CardIconButton label={`Share ${name}`} icon="/icons/card-share.svg" />
    </div>
  );
}