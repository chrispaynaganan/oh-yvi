"use client";

import Image from "next/image";
import { useRef, useState, type FormEvent } from "react";
import StarRating, { Star } from "@/components/ui/Stars";
import type { ArticleComment } from "@/data/articleComments";
import { useNowSeconds } from "@/lib/clock";
import { formatLongDate } from "@/lib/dates";

function timeAgo(iso: string, now: number | null) {
  if (now === null) return formatLongDate(iso);
  const minutes = Math.floor((now - Date.parse(iso) / 1000) / 60);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min${minutes === 1 ? "" : "s"} ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return hours === 1 ? "an hour ago" : `${hours} hours ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return days === 1 ? "a day ago" : `${days} days ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return weeks === 1 ? "1 week ago" : `${weeks} weeks ago`;
  return formatLongDate(iso);
}

export default function ArticleComments({
  articleSlug,
  initialComments,
}: {
  articleSlug: string;
  initialComments: ArticleComment[];
}) {
  const now = useNowSeconds();
  const [comments, setComments] = useState(initialComments);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // TODO(backend): save comments and ratings to the database
  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    setComments([{ id: crypto.randomUUID(), articleSlug, author: "You", body, at: new Date().toISOString() }, ...comments]);
    setText("");
  }

  function respond(name: string) {
    setText(`@${name} `);
    inputRef.current?.focus();
  }

  return (
    <section aria-labelledby="comments-title" className="mt-12.75 max-xl:mt-10">
      <div className="flex items-start justify-between gap-6">
        <h2 id="comments-title" className="font-serif text-28 text-ink max-xl:text-2xl">
          Comments ({comments.length})
        </h2>
        <div className="flex flex-col items-start gap-4">
          <p className="font-serif text-sm text-ink">Rate this article</p>
          <div role="radiogroup" aria-label="Rate this article" onMouseLeave={() => setHovered(0)} className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onMouseEnter={() => setHovered(n)}
                onClick={() => setRating(n)}
                className="size-6"
              >
                <Star filled={n <= (hovered || rating)} className="size-6" />
              </button>
            ))}
          </div>
          <p aria-live="polite" className="font-mono text-10 text-muted">
            {rating > 0 ? "Thanks for rating!" : ""}
          </p>
        </div>
      </div>

      <div className="mt-6.25 grid grid-cols-12 items-start gap-x-5 max-xl:gap-y-8">
        <form onSubmit={submit} className="col-span-5 flex flex-col max-xl:col-span-12">
          <label htmlFor="comment" className="font-mono text-11 text-ink">
            Add a comment
          </label>
          <textarea
            ref={inputRef}
            id="comment"
            required
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Share your thoughts ..."
            className="mt-2.75 h-26.75 resize-none rounded-2xl border border-line-strong p-4 font-mono text-11 text-ink outline-none placeholder:text-muted focus:border-brand"
          />
          <button
            type="submit"
            className="mt-4.5 self-end rounded-full bg-brand px-5.5 py-3 text-white transition-opacity hover:opacity-90"
          >
            <span className="trim block font-serif text-sm">Submit comment</span>
          </button>
        </form>

        <div className="col-span-7 col-start-6 h-126.75 overflow-hidden rounded-2xl border border-line-strong max-xl:col-span-12 max-xl:col-start-1 max-xl:h-100">
          {comments.length === 0 ? (
            <div className="flex h-full items-center justify-center p-6">
              <p className="text-center font-serif text-sm text-muted">No comments yet. Start the conversation.</p>
            </div>
          ) : (
            <ul className="scrollbar-soft flex h-full flex-col gap-8 overflow-y-auto py-10 pr-10.75 pl-10 max-xl:px-6">
              {comments.map((comment) => (
                <li key={comment.id} className="flex gap-6.75 max-xl:gap-4">
                  {comment.avatar ? (
                    <Image src={comment.avatar} alt="" width={49} height={49} className="size-12.25 shrink-0 rounded-full object-cover" />
                  ) : (
                    <span aria-hidden className="flex size-12.25 shrink-0 items-center justify-center rounded-full bg-surface-muted font-serif text-lg text-brand">
                      {comment.author.charAt(0)}
                    </span>
                  )}
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-end justify-between gap-4">
                      <div className="flex flex-col gap-2.25">
                        {comment.rating && <StarRating value={comment.rating} className="gap-0.5" starClassName="size-2.5" />}
                        <p className="font-mono text-sm font-bold tracking-label text-black">{comment.author}</p>
                      </div>
                      <p className="shrink-0 font-mono text-xs tracking-label text-black">{timeAgo(comment.at, now)}</p>
                    </div>
                    <p className="mt-3 font-mono text-xs tracking-label text-muted">{comment.body}</p>
                    <button
                      type="button"
                      onClick={() => respond(comment.author)}
                      className="mt-4 self-start font-mono text-xs font-bold tracking-label text-black underline hover:text-brand"
                    >
                      Respond
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
