import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";
import type { ArticleBlock, ArticleText } from "@/types";

function Rich({ body }: { body: ArticleText }) {
  if (typeof body === "string") return body;
  return body.map((part, i) =>
    typeof part === "string" ? (
      <Fragment key={i}>{part}</Fragment>
    ) : (
      <Link key={i} href={part.href} className="font-bold text-ink underline hover:text-brand">
        {part.text}
      </Link>
    ),
  );
}

export default function ArticleBody({ blocks, className }: { blocks: ArticleBlock[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-7 font-mono text-base text-muted max-xl:text-sm", className)}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "paragraph":
            return (
              <p key={i}>
                <Rich body={block.body} />
              </p>
            );
          case "step": {
            // Steps are numbered in order, ignoring the other blocks
            const number = blocks.slice(0, i + 1).filter((b) => b.type === "step").length;
            return (
              <section key={i} className="flex flex-col gap-6.75">
                <h2 className="font-mono text-lg font-bold text-muted">
                  {number}. {block.title}
                </h2>
                <p>{block.body}</p>
              </section>
            );
          }
          case "image":
            return (
              <figure key={i} className="flex flex-col gap-4.5">
                <div className="relative h-89.75 overflow-hidden rounded-4xl bg-placeholder max-xl:h-80.25">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    fill
                    sizes="(min-width: 1512px) 920px, (min-width: 1280px) 60vw, 481px"
                    className="object-cover"
                  />
                </div>
                {block.caption && <figcaption className="font-mono text-sm text-muted">{block.caption}</figcaption>}
              </figure>
            );
          case "quote":
            return (
              <blockquote key={i} className="font-serif text-28 text-black">
                {block.text}
              </blockquote>
            );
        }
      })}
    </div>
  );
}
