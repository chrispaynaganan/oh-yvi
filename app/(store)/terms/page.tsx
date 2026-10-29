import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsAndConditions } from "@/data/legal";

export const metadata: Metadata = { title: "Terms & Conditions — Oh, Yvi!" };

export default function TermsPage() {
  return <LegalPage doc={termsAndConditions} />;
}