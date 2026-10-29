import { promos, type Promo } from "@/data/promos";
import { store } from "@/data/store";

export type PricedLine = {
  unitPrice: number;
  quantity: number;
  type: "physical" | "digital";
};

export function findPromo(code: string | null) {
  if (!code) return null;
  return promos.find((p) => p.code.toLowerCase() === code.toLowerCase()) ?? null;
}

export function computeTotals(lines: PricedLine[], promo: Promo | null) {
  const itemCount = lines.reduce((sum, l) => sum + l.quantity, 0);
  const subtotal = lines.reduce((sum, l) => sum + l.unitPrice * l.quantity, 0);
  const discount = promo ? Math.round((subtotal * promo.percent) / 100) : 0;
  const afterDiscount = subtotal - discount;
  const needsShipping = lines.some((l) => l.type === "physical");
  const freeShipping = afterDiscount >= store.freeShippingThreshold;
  const shipping = !needsShipping || itemCount === 0 || freeShipping ? 0 : store.standardShipping;
  const paymentFee = 0;

  return {
    itemCount,
    subtotal,
    discount,
    afterDiscount,
    needsShipping,
    freeShipping,
    shipping,
    paymentFee,
    total: afterDiscount + shipping + paymentFee,
  };
}