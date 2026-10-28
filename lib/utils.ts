import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Tell tailwind-merge about our custom tokens in globals.css,
// so it doesn't mistake e.g. `text-13` (a size) for a color.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        "7", "8", "9", "10", "11", "13", "21", "25", "50", "38",
        "display", "logo", "newsletter", "section", "card-title", "feature", "collection",
      ],
      tracking: ["tight-1", "tight-2", "tight-3", "wide-1", "wide-2"],
      shadow: ["hero", "badge", "pill", "card"],
      "drop-shadow": ["menu"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPeso(amount: number) {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}