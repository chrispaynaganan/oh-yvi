"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

/** Bookmark and share buttons beside the author */
export default function ArticleActions({ title }: { title: string }) {
  // TODO(backend): save bookmarks to the customer's account
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  async function share() {
    const url = window.location.href;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
        return;
      }
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // share sheet closed or clipboard blocked
    }
  }

  return (
    <div className="flex items-center gap-3.25">
      <span aria-live="polite" className="font-mono text-xs text-muted">
        {copied ? "Link copied" : ""}
      </span>
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? "Remove bookmark" : "Bookmark this article"}
        onClick={() => setSaved(!saved)}
        className={cn("relative size-11.5 rounded-full transition-shadow hover:opacity-80", saved && "ring-2 ring-brand")}
      >
        <Image src="/icons/bookmark-circle.svg" alt="" fill unoptimized />
      </button>
      <button
        type="button"
        aria-label="Share this article"
        onClick={share}
        className="relative size-11.5 transition-opacity hover:opacity-80"
      >
        <Image src="/icons/share-circle.svg" alt="" fill unoptimized />
      </button>
    </div>
  );
}
