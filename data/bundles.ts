import type { Bundle } from "@/types";

export const bundles: Bundle[] = [
  {
    id: "b1",
    slug: "creative-desk-bundle",
    name: "Creative Desk Bundle",
    image: "/images/bundles/creative-desk.png",
    price: 875,
    items: [
      { name: "VO Project Tracker Notepad", price: 295 },
      { name: "Color Study Washi Set", price: 185 },
      { name: "The Good Work Journal", price: 545 },
    ],
  },
  {
    id: "b2",
    slug: "creative-desk-bundle-2",
    name: "Creative Desk Bundle",
    image: "/images/bundles/planning-set.png",
    price: 1240,
    items: [
      { name: "Daily Rhythm Planner", price: 680 },
      { name: "Year at a Glance Calendar", price: 780 },
    ],
  },
];