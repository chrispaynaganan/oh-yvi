import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyPolicy } from "@/data/legal";

export const metadata: Metadata = { title: "Privacy Policy — Oh, Yvi!" };

export default function PrivacyPolicyPage() {
  return <LegalPage doc={privacyPolicy} />;
}