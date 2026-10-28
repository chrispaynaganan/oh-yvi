import type { Product } from "@/types";

// Placeholder: the design shows 5 photo dots per product, but we only have
// one photo each for now. Real galleries will come from the CMS.
const gallery = (src: string) => Array<string>(5).fill(src);

export const products: Product[] = [
  {
    id: "p1",
    slug: "vo-project-tracker-notepad",
    name: "VO Project Tracker Notepad",
    description:
      "add the description here for this product to let the customers know what are they buying",
    price: 175,
    images: gallery("/images/products/vo-project-tracker-notepad.png"),
    type: "physical",
    collectionSlugs: ["notepads"],
    status: "available",
    badge: "new release",
    buttonLabel: "Get notepad",
  },
  {
    id: "p2",
    slug: "daily-rhythm-planner",
    name: "Daily Rhythm Planner",
    description:
      "add the description here for this product to let the customers know what are they buying",
    price: 350,
    images: gallery("/images/products/daily-rhythm-planner.png"),
    type: "physical",
    collectionSlugs: ["planners"],
    status: "out_of_stock",
    badge: "best seller",
    buttonLabel: "Get planner",
  },
  {
    id: "p3",
    slug: "habit-notes-mini-pad",
    name: "Habit Notes Mini Pad",
    description:
      "add the description here for this product to let the customers know what are they buying",
    price: 150,
    images: gallery("/images/products/habit-notes-mini-pad.png"),
    type: "physical",
    collectionSlugs: ["notepads"],
    status: "preorder",
    badge: "best seller",
    buttonLabel: "Get mini pad",
  },
  {
    id: "p4",
    slug: "mini-calling-card-set",
    name: "Mini Calling Card Set",
    description:
      "add the description here for this product to let the customers know what are they buying",
    price: 260,
    images: gallery("/images/products/mini-calling-card-set.png"),
    type: "physical",
    collectionSlugs: ["business-cards"],
    status: "available",
    badge: "best seller",
    buttonLabel: "Get calling card",
  },
];