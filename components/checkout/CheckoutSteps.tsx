import Image from "next/image";
import { cn } from "@/lib/utils";

export default function CheckoutSteps({ className }: { className?: string }) {
  return (
    <ol aria-label="Checkout steps" className={cn("flex items-center gap-4", className)}>
      <li aria-current="step" className="flex h-11.25 items-center gap-2 rounded-full bg-brand px-3.5">
        <Image src="/icons/step-bag.svg" alt="" width={17} height={20} className="h-5 w-4.25" unoptimized />
        <span className="trim block font-mono text-sm text-white">Bag</span>
      </li>
      <li className="relative size-11.25">
        <Image src="/icons/step-payment.svg" alt="Payment" fill unoptimized />
      </li>
      <li className="relative size-11.25">
        <Image src="/icons/step-done.svg" alt="Done" fill unoptimized />
      </li>
    </ol>
  );
}