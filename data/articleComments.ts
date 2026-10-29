export type ArticleComment = {
  id: string;
  articleSlug: string;
  author: string;
  avatar?: string;
  rating?: 1 | 2 | 3 | 4 | 5;
  body: string;
  /** ISO date and time */
  at: string;
};

// Sample comments until they come from the database
export const articleComments: ArticleComment[] = [
  {
    id: "c1",
    articleSlug: "how-every-order-gets-printed-packaged-and-shipped",
    author: "Robert",
    avatar: "/images/avatars/robert.png",
    rating: 4,
    body: "Every order of our stationery products is carefully printed, packaged, and shipped to ensure you receive the best quality. Share your thoughts about our service!",
    at: "2026-10-29T11:56:00Z",
  },
  {
    id: "c2",
    articleSlug: "how-every-order-gets-printed-packaged-and-shipped",
    author: "Jessica",
    avatar: "/images/avatars/jessica.png",
    rating: 4,
    body: "We take pride in our stationery products, ensuring each order is printed, packaged, and shipped with care. We'd love to hear your feedback!",
    at: "2026-10-29T10:58:00Z",
  },
  {
    id: "c3",
    articleSlug: "how-every-order-gets-printed-packaged-and-shipped",
    author: "Marian",
    avatar: "/images/avatars/marian.png",
    rating: 4,
    body: "Our stationery products are printed, packaged, and shipped with precision. Let us know what you think about your experience!",
    at: "2026-10-27T12:00:00Z",
  },
  {
    id: "c4",
    articleSlug: "how-every-order-gets-printed-packaged-and-shipped",
    author: "Cassidy",
    avatar: "/images/avatars/cassidy.png",
    rating: 4,
    body: "Each order of our stationery is meticulously printed, packaged, and shipped to guarantee satisfaction. We welcome your comments!",
    at: "2026-10-22T12:00:00Z",
  },
];
