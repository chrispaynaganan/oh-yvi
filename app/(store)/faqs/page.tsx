import type { Metadata } from "next";
import Image from "next/image";
import FaqCenter from "@/components/faqs/FaqCenter";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { faqCategories, faqs } from "@/data/faqs";
import { store } from "@/data/store";

export const metadata: Metadata = {
  title: "Help Centre — Oh, Yvi!",
  description: "Answers about our stationery, your order, delivery and payments.",
};

export default function FaqsPage() {
  return (
    <main className="mx-auto max-w-site px-15 pt-16.25 max-xl:px-6 max-xl:pt-7.75">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Help Centre" }]} />

      <h1 className="mt-18.5 font-serif text-38 text-ink max-xl:mt-11">Questions? Let&apos;s Make Things Clear.</h1>
      <p className="mt-8 w-142 font-mono text-base text-muted max-xl:mt-4">
        Everything you need to know about your stationery, your order, and shopping with Oh, Yvi!
      </p>

      <FaqCenter faqs={faqs} categories={faqCategories} />

      <section className="mt-18.25 flex items-center justify-between rounded-full bg-surface-muted py-8 pr-6.5 pl-11.5 max-xl:mt-6.75 max-xl:py-4.5 max-xl:pl-10">
        <div className="flex w-xl flex-col gap-4 text-ink max-xl:w-84.5 max-xl:gap-3.5">
          <h2 className="font-serif text-34 max-xl:text-2xl">Still wondering?</h2>
          <p className="font-mono text-15 max-xl:text-xs">Message us and a real person will get back to you within an hour</p>
        </div>
        <div className="flex items-start gap-2.75">
          <a
            href={store.chatUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-full bg-brand px-4 py-3 text-white transition-opacity hover:opacity-90"
          >
            <span className="trim block font-serif text-sm">Chat with us</span>
            <Image src="/icons/chat.svg" alt="" width={15} height={12} className="h-3 w-3.75" unoptimized />
          </a>
          <a
            href={`mailto:${store.supportEmail}`}
            className="flex items-center gap-2.5 rounded-full border border-brand px-4 py-3 text-brand transition-colors hover:bg-brand/5"
          >
            <span className="trim block font-serif text-sm">Send us an email</span>
            <Image src="/icons/mail.svg" alt="" width={13} height={10} className="h-2.5 w-3.25" unoptimized />
          </a>
        </div>
      </section>
    </main>
  );
}