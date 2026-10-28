import type { Collection } from "@/types";

export const collections: Collection[] = [
  {
    id: "c1",
    slug: "notepads",
    kind: "category",
    name: "Notepads",
    description:
      "Explore our chic notepads, ideal for staying organized and inspired. Available in different sizes with sturdy covers, they’re perfect for students, professionals, and artists.",
    image: "/images/categories/notepads.png",
  },
  {
    id: "c2",
    slug: "journals",
    kind: "category",
    name: "Journals",
    description:
      "Discover our stylish journals, designed to keep your thoughts organized and your creativity flowing. Offered in various sizes with durable covers, they’re perfect for writers, students, and anyone looking to capture their ideas.",
    image: "/images/categories/journals.png",
  },
  {
    id: "c3",
    slug: "planners",
    kind: "category",
    name: "Planners",
    description:
      "Discover our stylish planners, designed to keep you organized and motivated. Offered in various sizes with durable covers, they’re perfect for students, professionals, and creatives.",
    image: "/images/categories/planners.png",
  },
  {
    id: "c4",
    slug: "calendars",
    kind: "category",
    name: "Calendars",
    description:
      "Discover our stylish calendars, designed to keep you organized and motivated. Offered in various sizes with durable covers, they’re perfect for students, professionals, and creatives.",
    image: "/images/categories/calendars.png",
  },
  {
    id: "c5",
    slug: "washi-tapes",
    kind: "category",
    name: "Washi Tapes",
    description:
      "Discover our stylish washi tapes, perfect for adding a touch of creativity to your projects. Available in various designs and widths, they’re great for crafters, planners, and anyone looking to personalize their space.",
    image: "/images/categories/washi-tapes.png",
  },
  {
    id: "c6",
    slug: "business-cards",
    kind: "category",
    name: "Business Cards",
    description:
      "Discover our stylish business cards, designed to make a lasting impression. Offered in various finishes with durable materials, they’re perfect for entrepreneurs, freelancers, and creatives.",
    image: "/images/categories/business-cards.png",
  },
  {
    id: "c7",
    slug: "bookmarks",
    kind: "category",
    name: "Bookmarks",
    description:
      "Discover our stylish bookmarks, designed to keep your place and spark your creativity. Available in various sizes with durable designs, they’re perfect for readers, students, and creatives.",
    image: "/images/categories/bookmarks.png",
  },
  {
    id: "c8",
    slug: "wallpapers",
    kind: "category",
    name: "Wallpapers",
    description:
      "Transform your space with our stylish wallpaper stickers, designed to keep you organized and inspired. Offered in various sizes with durable finishes, they’re perfect for students, professionals, and creatives.",
    image: "/images/categories/wallpapers.png",
  },

    {
    id: "o1",
    slug: "for-voice-artists",
    kind: "occasion",
    name: "For Voice Artists",
    shortName: "Voice Artists",
    heading: "For Voice Artists,",
    description:
      "Detailed scripts, comprehensive session notes, and a thoughtful structure are essential for effective work behind the microphone. These elements not only enhance clarity but also ensure a smooth flow during recordings, allowing for a more engaging experience for both the speaker and the audience.",
    intro:
      "Voices are everything. Every line, every script, every audition boils down to one concern — \"Is my voice ready?\" However, voice artists often overlook an essential aspect: managing their auditions and projects. It's crucial to not only focus on vocal quality but also to stay organized.",
    aside:
      "Keeping track of submissions, deadlines, and feedback can significantly enhance your chances of success. By balancing vocal preparation with effective project management, you can elevate your career in the voice acting industry.",
    image: "/images/occasions/voice-artists.png",
    bundleIds: ["b1", "b2"],
  },
  {
    id: "o2",
    slug: "for-designers",
    kind: "occasion",
    name: "For Designers",
    shortName: "Designers",
    description:
      "A tactile edit for sketches, concepts, feedback, and bright new directions.",
    image: "/images/occasions/designers.png",
  },
  {
    id: "o3",
    slug: "for-dads",
    kind: "occasion",
    name: "For Dads",
    shortName: "Dads",
    description:
      "Useful paper goods for plans, projects, and everyday things worth remembering.",
    image: "/images/occasions/dads.png",
  },
  {
    id: "o4",
    slug: "for-moms",
    kind: "occasion",
    name: "For Moms",
    shortName: "Moms",
    description:
      "Beautiful companions for full days, family plans, and moments of her own.",
    image: "/images/occasions/moms.png",
  },
  {
    id: "o5",
    slug: "for-partners",
    kind: "occasion",
    name: "For Partners",
    shortName: "Partners",
    description:
      "Thoughtful sets for shared plans, small notes, and celebrating your favorite person.",
    image: "/images/occasions/partners.png",
  },
];