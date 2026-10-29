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
    collectionSlugs: ["notepads", "for-voice-artists"],
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
    collectionSlugs: ["planners", "for-voice-artists"],
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
    collectionSlugs: ["notepads", "for-voice-artists"],
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
    collectionSlugs: ["business-cards", "for-voice-artists"],
    status: "available",
    badge: "best seller",
    buttonLabel: "Get calling card",
  },
    {
    id: "p5",
    slug: "the-good-work-journal",
    name: "The Good Work Journal",
    description:
      "A clothbound journal for reflection, planning, and capturing everyday moments.",
    longDescription:
      "Discover our beautifully crafted clothbound journal, designed for those who cherish the art of reflection, thoughtful planning, and capturing everyday moments. This journal is not just a place to jot down your thoughts; it's a sanctuary for your ideas, dreams, and aspirations. With its durable cover and high-quality pages, it invites you to explore your creativity and document your journey through life. Whether you're setting goals, recording memories, or simply observing the world around you, this journal is your perfect companion.",
    price: 545,
    images: gallery("/images/products/the-good-work-journal.png"),
    type: "digital",
    collectionSlugs: ["journals", "for-designers", "for-dads"],
    status: "available",
    badge: "best seller",
    buttonLabel: "Buy this journal",
    specs: [
      "120 GSM smooth writing paper",
      "Designed and packed in the Philippines",
      "16 in stock",
    ],
    details: [
      {
        title: "Product highlights",
        body: "Rounded corners, a smooth writing surface, and a compact format made for project notes and everyday planning.",
      },
      {
        title: "Shipping & returns",
        body: "Orders include complimentary delivery over ₱2,500 and a seven-day returns window.",
      },
      {
        title: "Good to know",
        body: "Each journal is packed by hand, so small variations in the cloth cover are part of its character.",
      },
    ],
    boughtWithSlugs: ["vo-project-tracker-notepad", "habit-notes-mini-pad", "mini-calling-card-set"],
    bundleIds: ["b1", "b2"],
    promoEndsAt: "2026-11-02T23:59:59+08:00",
    stock: 16,
    options: ["A5", "Clothbound"],
    file: { format: "PDF", size: "12.2MB" },
  },
];