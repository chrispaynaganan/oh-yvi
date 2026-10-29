import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "Page not found — Oh, Yvi!",
};

const QUICK_LINKS = [
  { title: "Track an order", text: "See where your parcel is", href: "/account/orders" },
  { title: "Read articles", text: "Guides and updates", href: "/blog" },
  { title: "Visit the FAQ", text: "Answers to common questions", href: "/faqs" },
];

function MagnifierArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute top-0 left-1/2 h-245.5 w-378 -translate-x-1/2">
      <div className="absolute -top-2.5 left-117.5 flex h-402.75 w-381.75 items-center justify-center">
        <div className="relative h-196.5 w-360.5 flex-none -rotate-130 overflow-hidden">
          <div className="absolute top-[-36.36%] left-[0.04%] h-[184.87%] w-[100.85%]">
            <Image src="/images/errors/magnifier.png" alt="" fill sizes="1454px" className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <MagnifierArt />

      <div className="relative mx-auto max-w-site px-15 pt-124 pb-12.75">
        <span className="inline-flex rounded-xl bg-error-deep px-4 py-2.5">
          <span className="trim block font-mono text-base font-bold text-white">error 404</span>
        </span>

        <h1 className="mt-8.25 font-serif text-36 text-ink">We can’t find the page.</h1>
        <p className="mt-5 w-171.5 font-mono text-base text-ink">
          The link may be broken, or the page may have moved. Try searching, or head somewhere below.
        </p>

        <form action="/shop" role="search" className="mt-6 flex gap-4">
          <label className="flex h-10.75 w-112.75 items-center gap-3 rounded-full bg-surface-muted px-4">
            <Image src="/icons/search-dark.svg" alt="" width={17} height={17} className="size-4.25 shrink-0" unoptimized />
            <input
              type="search"
              name="q"
              placeholder="Search products or articles"
              aria-label="Search products or articles"
              className="w-full bg-transparent font-mono text-15 text-ink outline-none placeholder:text-muted-2"
            />
          </label>
          <button
            type="submit"
            className="rounded-full bg-brand px-5.75 text-white transition-opacity hover:opacity-90"
          >
            <span className="trim block font-serif text-base">Search</span>
          </button>
        </form>

        <div className="mt-6 flex items-center gap-3">
          <Link href="/" className="rounded-full bg-brand px-4 py-3.25 text-white transition-opacity hover:opacity-90">
            <span className="trim block font-serif text-sm">Back to Homepage</span>
          </Link>
          <Link
            href="/shop"
            className="rounded-full border border-brand px-4 py-3 text-brand transition-colors hover:bg-brand/5"
          >
            <span className="trim block font-serif text-sm">Shop all products</span>
          </Link>
        </div>

        <nav aria-label="Helpful links" className="mt-27.75 flex items-center gap-8">
          {QUICK_LINKS.map((link, i) => (
            <Fragment key={link.href}>
              {i > 0 && <span aria-hidden className="h-14.75 w-px bg-line" />}
              <Link href={link.href} className="group flex flex-col gap-4">
                <span className="trim block font-serif text-lg text-black transition-colors group-hover:text-brand">
                  {link.title}
                </span>
                <span className="trim block font-mono text-sm text-muted">{link.text}</span>
              </Link>
            </Fragment>
          ))}
        </nav>
      </div>
    </main>
  );
}