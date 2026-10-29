import type { Metadata } from "next";
import Image from "next/image";
import AccountHeading from "@/components/account/AccountHeading";
import LibraryView from "@/components/account/LibraryView";

export const metadata: Metadata = { title: "My Library — Oh, Yvi!" };

export default function LibraryPage() {
  return (
    <>
      <AccountHeading title="My Library" description="Everything digital you’ve bought, ready to download anytime, on any device." />
      <p className="mt-16.25 inline-flex items-center gap-2.5 rounded-full border border-line-dark py-2.5 pr-4 pl-2.5">
        <Image src="/icons/info-circle.svg" alt="" width={24} height={24} className="size-6" unoptimized />
        <span className="trim block font-mono text-base tracking-tight-2 text-muted-3">
          Email download links expire after 30 days. Links here always work while you’re logged in.
        </span>
      </p>
      <LibraryView />
    </>
  );
}