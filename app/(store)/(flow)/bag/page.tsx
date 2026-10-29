import type { Metadata } from "next";
import BagView from "@/components/bag/BagView";

export const metadata: Metadata = {
  title: "Your bag — Oh, Yvi!",
};

export default function BagPage() {
  return (
    <main>
      <h1 className="mt-9.25 font-serif text-50 text-black">Your bag</h1>
      <BagView />
    </main>
  );
}