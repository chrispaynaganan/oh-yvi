export type PaymentMethodId = "ewallet" | "card" | "qrph";
export type WalletId = "gcash" | "maya" | "grabpay";

export const paymentMethods: {
  id: PaymentMethodId;
  title: string;
  subtitle: string;
  icon: string;
  iconClass: string;
}[] = [
  { id: "ewallet", title: "E-wallets", subtitle: "GCash, Maya, GrabPay", icon: "/icons/pay-ewallet.svg", iconClass: "h-6.25 w-3.75" },
  { id: "card", title: "Credit / Debit card", subtitle: "Visa, Mastercard", icon: "/icons/pay-card.svg", iconClass: "h-5 w-7" },
  { id: "qrph", title: "QR Ph", subtitle: "Scan with any bank app", icon: "/icons/pay-qrph.svg", iconClass: "size-5.75" },
];

export const wallets: { id: WalletId; name: string; logo: string; logoClass: string }[] = [
  { id: "gcash", name: "GCash", logo: "/images/wallet-gcash.png", logoClass: "h-4.75 w-19.5" },
  { id: "maya", name: "Maya", logo: "/images/wallet-maya.png", logoClass: "h-4.25 w-14.5" },
  { id: "grabpay", name: "GrabPay", logo: "/images/wallet-grabpay.png", logoClass: "h-5 w-17.5" },
];