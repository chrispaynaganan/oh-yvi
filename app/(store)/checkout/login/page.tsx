import type { Metadata } from "next";
import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Login to checkout — Oh, Yvi!" };

export default function CheckoutLoginPage() {
  return (
    <AuthPage
      mode="login"
      title="Login first before buying."
      subtitle="Sign in to place your order and unlock a personal referral link after purchase."
      afterAuth="/checkout"
      switchHref="/checkout/signup"
    />
  );
}