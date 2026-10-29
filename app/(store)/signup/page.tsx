import type { Metadata } from "next";
import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Sign up — Oh, Yvi!" };

export default function SignUpPage() {
  return (
    <AuthPage
      mode="signup"
      title="First time seeing you around here."
      subtitle="Sign up to place your order and unlock a personal referral link after purchase."
      switchHref="/login"
    />
  );
}