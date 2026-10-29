import { store } from "@/data/store";

const L = store.legal;

export type RichPart = string | { text: string; href?: string };

export type LegalBlock =
  | { type: "text"; body: string | RichPart[] }
  | { type: "cards"; items: { title: string; body: string }[] }
  | { type: "table"; head: [string, string]; rows: [string, string][] }
  | { type: "chips"; items: string[] }
  | { type: "contact" };

export type LegalSection = { id: string; title: string; blocks: LegalBlock[] };

export type LegalDoc = {
  title: string;
  breadcrumb: string;
  /** ISO dates */
  updated: string;
  effective: string;
  sections: LegalSection[];
};

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  breadcrumb: "Privacy Policy",
  updated: "2026-07-13",
  effective: "2026-07-13",
  sections: [
    {
      id: "who-we-are",
      title: "Who we are",
      blocks: [
        {
          type: "text",
          body: `${L.businessName} is a partnership registered in the Philippines with the SEC under registration no. ${L.secNumber}, located at ${L.businessAddress}. We are the personal information controller for the data described in this policy, in line with the Data Privacy Act of 2012 (RA 10173).`,
        },
      ],
    },
    {
      id: "what-we-collect",
      title: "What we collect",
      blocks: [
        {
          type: "cards",
          items: [
            { title: "Account details", body: "Name, email, password (encrypted), phone number." },
            { title: "Order details", body: "Delivery address, items ordered, payment status and reference." },
            { title: "Your content", body: "Reviews, ratings and comments you post on our site." },
            { title: "Usage data", body: "Pages visited, device and browser type, collected through cookies." },
          ],
        },
      ],
    },
    {
      id: "how-we-use-it",
      title: "How we use it",
      blocks: [
        {
          type: "text",
          body: "We use your information to process and deliver orders, manage your account, reply to your messages, send order updates, and, only if you subscribe, send our newsletter. We may also use anonymous usage data to improve the site.",
        },
      ],
    },
    {
      id: "who-we-share-it-with",
      title: "Who we share it with",
      blocks: [
        { type: "text", body: "We never sell your data. We share only what’s needed with services that help us run the store:" },
        {
          type: "table",
          head: ["service", "what for"],
          rows: [
            ["PayMongo", "Processing payments"],
            [L.courier, "Delivering your orders"],
            ["Resend", "Sending order emails and newsletters"],
            ["Supabase, Vercel", "Hosting our website and database"],
          ],
        },
      ],
    },
    {
      id: "how-long-we-keep-it",
      title: "How long we keep it",
      blocks: [
        {
          type: "text",
          body: `We keep account data while your account is active. Order records are kept for ${L.retentionYears} years for tax and accounting requirements. After that, we delete or anonymise them.`,
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your rights",
      blocks: [
        { type: "text", body: "Under the Data Privacy Act, you have the right to:" },
        {
          type: "chips",
          items: ["Be informed", "Access", "Object", "Correct", "Erase or Block", "Data portability", "File a complaint"],
        },
        {
          type: "text",
          body: "To use any of these, email us at the address below. You may also file a complaint with the National Privacy Commission.",
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies",
      blocks: [
        {
          type: "text",
          body: "We use essential cookies to keep you logged in and remember your cart. [If used: We also use analytics cookies to understand how the site is used. You can turn these off in the cookie banner.]",
        },
      ],
    },
    { id: "contact-us", title: "Contact us", blocks: [{ type: "contact" }] },
  ],
};

export const termsAndConditions: LegalDoc = {
  title: "Terms & Conditions",
  breadcrumb: "Terms and Conditions",
  updated: "2026-07-13",
  effective: "2026-07-13",
  sections: [
    {
      id: "using-our-site",
      title: "Using our site",
      blocks: [
        {
          type: "text",
          body: `By using ${store.domain} or placing an order, you agree to these terms. If you don’t agree, please don’t use the site. You must be at least 18, or have a parent or guardian’s permission, to buy from us.`,
        },
      ],
    },
    {
      id: "your-account",
      title: "Your account",
      blocks: [
        {
          type: "text",
          body: "Keep your login details private. You’re responsible for activity on your account. We may suspend accounts used for fraud, abuse or breaking these terms.",
        },
      ],
    },
    {
      id: "orders-and-pricing",
      title: "Orders and pricing",
      blocks: [
        {
          type: "text",
          body: "Your order is confirmed once payment is received and you get a confirmation email. We may cancel and fully refund an order if an item is unavailable or a price was listed in error.",
        },
      ],
    },
    {
      id: "payments",
      title: "Payments",
      blocks: [
        {
          type: "text",
          body: "Payments are processed by PayMongo. By paying, you also agree to PayMongo’s terms. We don’t store your card or e-wallet details.",
        },
      ],
    },
    {
      id: "shipping-returns-refunds",
      title: "Shipping, returns, and refunds",
      blocks: [
        {
          type: "text",
          body: [
            "Delivery times, fees, and how to request a return or refund are explained in our ",
            { text: "Shipping & Returns policy", href: "/shipping-returns" },
            ", which forms part of these terms.",
          ],
        },
      ],
    },
    {
      id: "reviews-and-comments",
      title: "Reviews and comments",
      blocks: [
        {
          type: "text",
          body: "Only verified buyers can leave reviews. Keep them honest and respectful. We may remove content that is offensive, misleading, spam, or shares someone else’s personal information.",
        },
      ],
    },
    {
      id: "affiliate-program",
      title: "Affiliate program",
      blocks: [
        {
          type: "text",
          body: `Affiliates earn ${L.affiliateRate}% commission on completed, non-refunded orders made through their link. Payouts happen ${L.payoutSchedule}. Self-referrals and misleading promotion aren’t allowed.`,
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual property",
      blocks: [
        {
          type: "text",
          body: `All designs, photos, text and logos on this site belong to ${L.businessName}. You may not copy, reprint or resell them without written permission.`,
        },
      ],
    },
    {
      id: "limitation-of-liability",
      title: "Limitation of liability",
      blocks: [
        {
          type: "text",
          body: "To the extent allowed by law, our liability for any claim is limited to the amount you paid for the order concerned. Nothing here limits your rights under the Consumer Act of the Philippines.",
        },
      ],
    },
    {
      id: "changes-to-these-terms",
      title: "Changes to these terms",
      blocks: [
        {
          type: "text",
          body: "We may update these terms. The “Last updated” date above shows the latest version. Orders are covered by the terms in effect when they were placed.",
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing law",
      blocks: [
        {
          type: "text",
          body: `These terms are governed by the laws of the Republic of the Philippines. Disputes will be handled by the courts of ${L.disputeCity}.`,
        },
      ],
    },
    { id: "contact-us", title: "Contact us", blocks: [{ type: "contact" }] },
  ],
};