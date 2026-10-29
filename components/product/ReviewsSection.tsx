"use client";

import Image from "next/image";
import { useId, useState, type FormEvent } from "react";
import StarRating, { Star } from "@/components/ui/Stars";
import type { Review } from "@/types";

const RATING_OPTIONS = [
  { value: "all", label: "All ratings" },
  { value: "5", label: "5 stars" },
  { value: "4", label: "4 stars" },
  { value: "3", label: "3 stars" },
  { value: "2", label: "2 stars" },
  { value: "1", label: "1 star" },
];

const SORT_OPTIONS = [
  { value: "recent", label: "Most recent" },
  { value: "highest", label: "Highest rated" },
  { value: "lowest", label: "Lowest rated" },
];

const dateFormat = new Intl.DateTimeFormat("en-PH", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "Asia/Manila",
});

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}) {
  const id = useId();
  return (
    <div className="flex items-center gap-2.5">
      <label htmlFor={id} className="font-mono text-10 font-bold text-ink">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="appearance-none rounded-xl border border-muted-2 bg-white py-2 pr-6.75 pl-2 font-mono text-10 text-muted outline-none focus-visible:border-brand"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <Image
          src="/icons/chevron-down.svg"
          alt=""
          width={11}
          height={6}
          className="pointer-events-none absolute top-1/2 right-2 h-1.5 w-2.75 -translate-y-1/2"
          unoptimized
        />
      </div>
    </div>
  );
}

function ReviewItem({ review }: { review: Review }) {
  const { rating, title, body, author, date, image } = review;
  return (
    <li className="flex shrink-0 items-start gap-2.5">
      {image && (
        <div className="relative size-21.5 shrink-0 overflow-hidden rounded-lg bg-placeholder">
          <Image src={image} alt={`Photo from ${author}`} fill sizes="86px" className="object-cover" />
        </div>
      )}
      <div className="flex min-w-0 flex-col pt-0.5">
        <StarRating value={rating} className="gap-0.5" starClassName="size-2.5" />
        <p className="mt-2.25 font-mono text-xs font-bold tracking-label text-black">{title}</p>
        <p className="mt-2.75 font-mono text-xs tracking-label text-black">{body}</p>
        <p className="mt-5.5 font-mono text-xs tracking-label text-black">
          {author}, {dateFormat.format(new Date(date))}
        </p>
      </div>
    </li>
  );
}

export default function ReviewsSection({
  productSlug,
  initialReviews,
}: {
  productSlug: string;
  initialReviews: Review[];
}) {
  const [reviews, setReviews] = useState(initialReviews);
  const [ratingFilter, setRatingFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  // Form
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [notice, setNotice] = useState("");

  const shown = [...reviews]
    .filter((r) => ratingFilter === "all" || r.rating === Number(ratingFilter))
    .sort((a, b) =>
      sort === "highest"
        ? b.rating - a.rating
        : sort === "lowest"
          ? a.rating - b.rating
          : b.date.localeCompare(a.date),
    );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (rating === 0) {
      setNotice("Please choose a star rating.");
      return;
    }
    setReviews((current) => [
      {
        id: crypto.randomUUID(),
        productSlug,
        rating: rating as Review["rating"],
        title: title.trim() || "Review",
        body: body.trim(),
        author: "You",
        date: new Date().toISOString(),
      },
      ...current,
    ]);
    setRating(0);
    setTitle("");
    setBody("");
    setRatingFilter("all");
    setSort("recent");
    setNotice("Thanks! Your review was added.");
  }

  return (
        <section id="reviews" className="mt-13.25 scroll-mt-50">
      <h2 className="font-serif text-28 text-ink">Ratings &amp; Reviews</h2>

      <div className="mt-7.25 flex items-center gap-11">
        <FilterSelect label="Rating" value={ratingFilter} onChange={setRatingFilter} options={RATING_OPTIONS} />
        <FilterSelect label="Sort" value={sort} onChange={setSort} options={SORT_OPTIONS} />
      </div>

      <div className="mt-10.25 grid grid-cols-12 items-start gap-x-5">
        {/* Write a review */}
        <form onSubmit={handleSubmit} className="col-span-5 flex flex-col">
          <p className="font-serif text-sm text-ink">
            {reviews.length === 0 ? "Be the first to share your thoughts." : "Share your thoughts."}
          </p>

          <div
            role="radiogroup"
            aria-label="Your rating"
            onMouseLeave={() => setHovered(0)}
            className="mt-6.25 flex gap-0.5"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                role="radio"
                aria-checked={rating === n}
                aria-label={`${n} star${n > 1 ? "s" : ""}`}
                onMouseEnter={() => setHovered(n)}
                onClick={() => {
                  setRating(n);
                  setNotice("");
                }}
                className="size-6"
              >
                <Star filled={n <= (hovered || rating)} className="size-6" />
              </button>
            ))}
          </div>

          <label htmlFor="review-title" className="mt-7 font-mono text-11 text-ink">
            Review title
          </label>
          <input
            id="review-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Sum it up in a few words."
            className="mt-2.75 h-10.5 rounded-2xl border border-line-strong px-4 font-mono text-11 text-ink outline-none placeholder:text-muted focus:border-brand"
          />

          <label htmlFor="review-body" className="mt-8 font-mono text-11 text-ink">
            What would you like to say about the product?
          </label>
          <textarea
            id="review-body"
            required
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Tell us how this product felt to use."
            className="mt-3.25 h-26.75 resize-none rounded-2xl border border-line-strong p-4 font-mono text-11 text-ink outline-none placeholder:text-muted focus:border-brand"
          />

          <div className="mt-4.5 flex items-center justify-between gap-4">
            <p aria-live="polite" className="font-mono text-11 text-muted">
              {notice}
            </p>
            <button
              type="submit"
              className="shrink-0 rounded-xl border border-brand bg-brand px-5.5 py-3 text-white transition-opacity hover:opacity-90"
            >
              <span className="trim block font-serif text-sm">Submit review</span>
            </button>
          </div>
        </form>

        {/* Reviews panel: fixed height, scrolls on its own */}
        <div className="col-span-7 col-start-6 h-90.5 overflow-hidden rounded-2xl border border-line-strong">
          {shown.length === 0 ? (
            <div className="flex h-full items-center justify-center p-2.5">
              <p className="text-center font-serif text-sm text-muted">
                {reviews.length === 0
                  ? "No reviews yet. Be the one to add the first review for this product."
                  : "No reviews match this rating yet."}
              </p>
            </div>
          ) : (
            <ul className="scrollbar-soft flex h-full flex-col gap-4.25 overflow-y-auto p-5">
              {shown.map((review) => (
                <ReviewItem key={review.id} review={review} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}