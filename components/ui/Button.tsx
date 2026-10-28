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
  sm: "px-4 py-2.5 text-13",
  md: "px-4 py-3 text-sm",
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
        "inline-flex shrink-0 items-center justify-center gap-2.5 rounded-full font-serif whitespace-nowrap transition-opacity hover:opacity-90",
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
          className="size-3"
          unoptimized
        />
      )}
    </Link>
  );
}