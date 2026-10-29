import type { Bundle } from "@/types";

const desk = "/images/bundles/creative-desk.png";
const planning = "/images/bundles/planning-set.png";

export const bundles: Bundle[] = [
  {
    id: "b1",
    slug: "creative-desk-bundle",
    name: "Creative Desk Bundle",
    image: desk,
    images: [desk, "/images/products/the-good-work-journal.png"],
    description: "A journal, project tracker, and washi set for ideas in motion.",
    longDescription:
      "Everything you need to get an idea from a passing thought to a finished project: a tracker for the plan, washi for color-coding, and a clothbound journal for the thinking in between.",
    badge: "best seller",
    collectionSlugs: ["for-designers", "for-voice-artists"],
    price: 875,
    items: [
      { name: "VO Project Tracker Notepad", price: 295, productSlug: "vo-project-tracker-notepad" },
      { name: "Color Study Washi Set", price: 185 },
      { name: "The Good Work Journal", price: 545, productSlug: "the-good-work-journal" },
    ],
  },
  {
    id: "b2",
    slug: "plan-ahead-pair",
    name: "Plan Ahead Pair",
    image: planning,
    description: "A daily planner and a year-at-a-glance calendar that work as a team.",
    collectionSlugs: ["for-voice-artists", "for-dads"],
    price: 1240,
    items: [
      { name: "Daily Rhythm Planner", price: 680, productSlug: "daily-rhythm-planner" },
      { name: "Year at a Glance Calendar", price: 780 },
    ],
  },
  {
    id: "b3",
    slug: "gift-ready-paper-set",
    name: "Gift-Ready Paper Set",
    image: planning,
    description: "A planner and calendar set, ready to give.",
    collectionSlugs: ["for-moms", "for-partners"],
    price: 1240,
    items: [
      { name: "Daily Rhythm Planner", price: 680, productSlug: "daily-rhythm-planner" },
      { name: "Year at a Glance Calendar", price: 780 },
    ],
  },
  {
    id: "b4",
    slug: "innovative-workspace-collection",
    name: "Innovative Workspace Collection",
    image: desk,
    description: "A notebook, washi collection, and journal for a desk that keeps up.",
    collectionSlugs: ["for-designers", "for-dads"],
    price: 900,
    items: [
      { name: "Voiceover Project Organizer Notebook", price: 300 },
      { name: "Vibrant Washi Tape Collection", price: 190 },
      { name: "The Productive Journal", price: 550 },
    ],
  },
  {
    id: "b5",
    slug: "strategic-planning-duo",
    name: "Strategic Planning Duo",
    image: planning,
    description: "Plan the day and the year side by side.",
    collectionSlugs: ["for-voice-artists", "for-designers"],
    price: 1250,
    items: [
      { name: "Daily Flow Planner", price: 700 },
      { name: "Annual Overview Calendar", price: 800 },
    ],
  },
  {
    id: "b6",
    slug: "gift-ready-stationery-set",
    name: "Gift-Ready Stationery Set",
    image: planning,
    description: "A thoughtful planning set for someone special.",
    collectionSlugs: ["for-moms", "for-partners"],
    price: 1250,
    items: [
      { name: "Daily Flow Planner", price: 700 },
      { name: "Annual Overview Calendar", price: 800 },
    ],
  },
];