import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "light" | "outline-light";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  primary: "bg-brand text-white",
  outline: "border border-brand text-brand",
  light: "bg-white text-brand",
  "outline-light": "border border-white text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-[10px] text-[13px]",
  md: "px-4 py-3 text-[14px]",
};

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: Variant;
  size?: Size;
  arrow?: boolean;
  className?: string;
};

export default function Button({
  href,
  children,
  variant = "primary",
  size = "md",
  arrow = false,
  className,
}: ButtonProps) {
  const arrowSrc =
    variant === "light"
      ? "/icons/arrow-up-right-dark.svg"
      : "/icons/arrow-up-right-light.svg";

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-[10px] rounded-full font-serif leading-normal whitespace-nowrap transition-opacity hover:opacity-90",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      <span className="trim block">{children}</span>
      {arrow && (
        <Image
          src={arrowSrc}
          alt=""
          width={12}
          height={12}
          className="h-[11.5px] w-[11.508px]"
          unoptimized
        />
      )}
    </Link>
  );
}