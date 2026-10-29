import Image from "next/image";
import { cn } from "@/lib/utils";

type QuantityStepperProps = {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
};

export default function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = 99,
  label = "Quantity",
  className,
}: QuantityStepperProps) {
  return (
    <div role="group" aria-label={label} className={cn("flex items-center", className)}>
      <button
        type="button"
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="relative size-10 transition-opacity disabled:opacity-40"
      >
        <Image src="/icons/qty-minus.svg" alt="" fill unoptimized />
      </button>
      <span aria-live="polite" className="flex size-10 items-center justify-center">
        <span className="trim block font-mono text-xl tracking-tight-2 text-black">{value}</span>
      </span>
      <button
        type="button"
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="relative size-10 transition-opacity disabled:opacity-40"
      >
        <Image src="/icons/qty-plus.svg" alt="" fill unoptimized />
      </button>
    </div>
  );
}