"use client";

import Image from "next/image";
import Link from "next/link";
import { store } from "@/data/store";

function SpotlightArt() {
  return (
        <div aria-hidden className="pointer-events-none absolute top-1/2 left-1/2 h-245.5 w-378 -translate-x-1/2 -translate-y-1/2">
      <div className="absolute top-118.25 left-185.5 h-137.25 w-213.5">
        <Image src="/images/errors/torn-notebook.png" alt="" fill sizes="854px" className="object-cover" />
      </div>
      <div className="absolute -top-6 left-214.5 h-196.25 w-153.5">
        <div className="absolute inset-[-12.74%_-16.29%]">
          <Image src="/images/errors/beam-1.svg" alt="" fill unoptimized />
        </div>
      </div>
      <div className="absolute -top-6 left-238 h-202.5 w-119">
        <div className="absolute inset-[-12.35%_-20.99%]">
          <Image src="/images/errors/beam-2.svg" alt="" fill unoptimized />
        </div>
      </div>
    </div>
  );
}

function Tip({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-center gap-4.75">
      <Image src="/icons/check-light.svg" alt="" width={20} height={20} className="size-5 shrink-0" unoptimized />
      <p className="flex-1 font-mono text-base">{children}</p>
    </li>
  );
}

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
        <main className="relative flex min-h-screen items-center overflow-hidden bg-night text-white">
      <SpotlightArt />

            <div className="relative mx-auto w-full max-w-site px-15 py-16">
        <span className="inline-flex rounded-xl bg-error px-4 py-2.5">
          <span className="trim block font-mono text-base font-bold text-error-ink">error 500</span>
        </span>

        <h1 className="mt-8.25 font-serif text-36">Something went wrong on our end.</h1>
        <p className="mt-5 w-171.5 font-mono text-base">
          it’s not you. it’s us. We’ve been notified and are working on it. Please try again in a
          few minutes.
        </p>

        <div className="mt-9.75 flex items-center gap-3">
          <button
            type="button"
            onClick={() => reset()}
            className="flex items-center gap-2.5 rounded-full bg-white px-4 py-3 text-brand transition-opacity hover:opacity-90"
          >
            <span className="trim block font-serif text-sm">Try again</span>
            <Image src="/icons/refresh.svg" alt="" width={10} height={12} className="h-3 w-2.5" unoptimized />
          </button>
          <Link
            href="/"
            className="rounded-full border border-white px-4 py-3 transition-colors hover:bg-white/10"
          >
            <span className="trim block font-serif text-sm">Back to Homepage</span>
          </Link>
        </div>

        <section className="mt-15.25 flex w-171.5 flex-col gap-24.25 rounded-2xl border border-night-line p-6">
          <div className="flex flex-col gap-5">
            <h2 className="font-serif text-xl">In the meantime</h2>
            <ul className="flex flex-col gap-5.25">
              <Tip>Your cart and saved details are safe.</Tip>
              <Tip>If you were paying, check your email before trying again so you aren’t charged twice.</Tip>
              <Tip>
                Still stuck? Message us at{" "}
                <a href={`mailto:${store.supportEmail}`} className="underline hover:text-white/80">
                  {store.supportEmail}
                </a>{" "}
                and include the code below.
              </Tip>
            </ul>
          </div>
          <p className="font-mono text-base">Error reference: {error.digest ?? "unavailable"}</p>
        </section>
      </div>
    </main>
  );
}