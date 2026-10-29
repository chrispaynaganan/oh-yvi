export type NavLink = { label: string; href: string };

export const shopNav: NavLink[] = [
  { label: "All", href: "/shop" },
  { label: "New Release", href: "/shop?sort=new" },
  { label: "Sale", href: "/shop?filter=sale" },
];

export const groupNav: NavLink[] = [
  { label: "Collections", href: "/collections" },
  { label: "Bundles", href: "/bundles" },
];

export const categoryNav: NavLink[] = [
  { label: "Journals", href: "/collections/journals" },
  { label: "Planners", href: "/collections/planners" },
  { label: "Notepads", href: "/collections/notepads" },
  { label: "Calendars", href: "/collections/calendars" },
  { label: "Tapes", href: "/collections/washi-tapes" },
];

export const utilityNav: NavLink[] = [
  { label: "Articles", href: "/blog" },
  { label: "FAQs", href: "/faqs" },
];

export const menuGroups: NavLink[][] = [
  [
    { label: "New Release", href: "/shop?sort=new" },
    { label: "Sale", href: "/shop?filter=sale" },
  ],
  [
    { label: "Collections", href: "/collections" },
    { label: "Bundles", href: "/bundles" },
  ],
  [
    { label: "Journals", href: "/collections/journals" },
    { label: "Planners", href: "/collections/planners" },
    { label: "Tapes", href: "/collections/washi-tapes" },
    { label: "Calendars", href: "/collections/calendars" },
  ],
  [{ label: "FAQs", href: "/faqs" }],
];