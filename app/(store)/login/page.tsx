import type { Metadata } from "next";
import AuthPage from "@/components/auth/AuthPage";

export const metadata: Metadata = { title: "Login — Oh, Yvi!" };

export default function LoginPage() {
  return (
    <AuthPage
      mode="login"
      title="I see you have returned."
      subtitle="Sign in to place your order and unlock a personal referral link after purchase."
      switchHref="/signup"
    />
  );
}