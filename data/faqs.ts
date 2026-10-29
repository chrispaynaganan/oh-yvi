import { store } from "@/data/store";

export type FaqCategory = { id: string; label: string };

export type Faq = {
  id: string;
  categoryId: string;
  question: string;
  answer: string;
  mostAsked?: boolean;
  steps?: { title: string; note: string }[];
};

export const faqCategories: FaqCategory[] = [
  { id: "products", label: "Product and Materials" },
  { id: "orders", label: "Orders and Checkouts" },
  { id: "shipping", label: "Shipping and Delivery" },
  { id: "payments", label: "Payments" },
  { id: "returns", label: "Returns and Refunds" },
  { id: "account", label: "Account and Library" },
];

export const faqs: Faq[] = [
  {
    id: "what-we-offer",
    categoryId: "products",
    mostAsked: true,
    question: "What types of stationery does Oh, Yvi! offer?",
    answer:
      "Our catalog includes notepads, journals, planners, calendars, washi tapes, business cards, bookmarks and wallpapers, plus digital planners you can download right after purchase.",
  },
  {
    id: "product-specs",
    categoryId: "products",
    mostAsked: true,
    question: "Where can I find product specifications?",
    answer:
      "Every product page has a Product specifications box right under the description, with the paper weight, size and materials.",
  },
  {
    id: "made-in-ph",
    categoryId: "products",
    question: "Are your products made in the Philippines?",
    answer: "Yes. Everything is designed, printed and packed in the Philippines, in small batches.",
  },
  {
    id: "checkout-account",
    categoryId: "orders",
    question: "Can I checkout without creating an account?",
    answer:
      "You’ll need a free account to check out. It lets us send your receipt, keep your digital files in your library, and give you a personal referral link after your first purchase.",
  },
  {
    id: "payment-failed",
    categoryId: "orders",
    question: "What happens if my payment fails?",
    answer: `Nothing is charged and your bag stays as it is, so you can try again or pick another method. If money left your account but you didn’t get a confirmation email within 15 minutes, email us at ${store.supportEmail} with your order details.`,
  },
  {
    id: "delivery-time",
    categoryId: "shipping",
    mostAsked: true,
    question: "How long does delivery take?",
    answer:
      "Every order is carefully printed just for you, ensuring that each piece meets our high standards. The delivery process consists of two essential parts: first, the production phase where your items are crafted with precision, and then the shipping phase, where your order is securely packaged and sent to your doorstep. Here’s a detailed overview of what you can expect after you complete your checkout process.",
    steps: [
      { title: "Order placed", note: "today" },
      { title: "Printed and packed", note: "3-4 business days" },
      { title: "Shipped", note: "metro manila: 2-3 days" },
      { title: "Delivered", note: "provinces: 3-4 days" },
    ],
  },
  {
    id: "track-order",
    categoryId: "shipping",
    question: "How can I track an order?",
    answer:
      "Once your order ships, we email you a tracking link. You can also see its status anytime under My Orders in your account.",
  },
  {
    id: "shipping-cost",
    categoryId: "shipping",
    question: "How much is shipping?",
    answer: `Standard delivery is ₱${store.standardShipping}, and free on orders over ₱${store.freeShippingThreshold.toLocaleString("en-PH")}. Digital items don’t need shipping.`,
  },
  {
    id: "payment-methods",
    categoryId: "payments",
    question: "Which payment methods do you accept?",
    answer:
      "GCash, Maya, GrabPay, Visa and Mastercard, and QR Ph, all processed securely by PayMongo. There are no payment or convenience fees.",
  },
  {
    id: "returns",
    categoryId: "returns",
    question: "Can I return an item?",
    answer:
      "Yes, physical items can be returned within 7 days of delivery if they’re unused and in their original packaging. Digital items can’t be returned once downloaded.",
  },
  {
    id: "digital-files",
    categoryId: "account",
    question: "Where do I find my digital files?",
    answer: "They’re in My Library in your account, ready to download anytime. We also email them right after purchase.",
  },
];