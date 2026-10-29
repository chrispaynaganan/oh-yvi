export type Promo = {
  code: string;
  label: string;
  percent: number;
  kind: "promo" | "affiliate";
};

export const promos: Promo[] = [
  { code: "HELLO10", label: "Welcome offer", percent: 10, kind: "promo" },
  { code: "ANNA5", label: "Anna’s affiliate code", percent: 5, kind: "affiliate" },
];