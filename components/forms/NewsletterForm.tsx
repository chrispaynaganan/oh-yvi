"use client";

import Image from "next/image";
import { useState } from "react";

export default function NewsletterForm({ note }: { note: string }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true); // Resend gets connected here later
      }}
      className="flex flex-col gap-3"
    >
      <label htmlFor="newsletter-email" className="font-mono text-10 tracking-wide-1 text-ink">
        Email address
      </label>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between overflow-hidden rounded-2xl border border-line-input bg-white py-1.5 pr-1.5 pl-6.5">
          <input
            id="newsletter-email"
            type="email"
            name="email"
            required
            placeholder="you@example.com"
            className="w-full bg-transparent font-mono text-sm text-ink outline-none placeholder:text-muted-2"
          />
          <button
            type="submit"
            className="flex shrink-0 items-center gap-2 rounded-full bg-brand py-2.5 pr-3 pl-3.75 text-white transition-opacity hover:opacity-90"
          >
            <span className="trim block font-serif text-sm">Count me in</span>
            <Image
              src="/icons/arrow-right.svg"
              alt=""
              width={15}
              height={12}
              className="h-3 w-3.75"
              unoptimized
            />
          </button>
        </div>
        <p className="font-mono text-11 text-muted-3" aria-live="polite">
          {submitted ? "Thanks! You're on the list." : note}
        </p>
      </div>
    </form>
  );
}