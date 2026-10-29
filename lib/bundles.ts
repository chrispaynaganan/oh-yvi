import type { Bundle } from "@/types";

/** Item total, peso savings and rounded percent off for a bundle */
export function bundleTotals(bundle: Bundle) {
  const itemsTotal = bundle.items.reduce((sum, item) => sum + item.price, 0);
  const savings = Math.max(0, itemsTotal - bundle.price);
  const percent = itemsTotal > 0 ? Math.round((savings / itemsTotal) * 100) : 0;
  return { itemsTotal, savings, percent };
}