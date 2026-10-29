"use client";

import Image from "next/image";
import { useState, type PointerEvent } from "react";
import { cn } from "@/lib/utils";

const ZOOM_LEVELS = [1, 1.5, 2, 2.5];

type ProductGalleryProps = {
  images: string[];
  name: string;
  badges: string[];
};

export default function ProductGallery({ images, name, badges }: ProductGalleryProps) {
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(0);
  const [origin, setOrigin] = useState("50% 50%");
  const hasMany = images.length > 1;

  const goTo = (next: number) => {
    setIndex((next + images.length) % images.length);
    setZoom(0);
  };

  const followPointer = (e: PointerEvent<HTMLDivElement>) => {
    if (zoom === 0) return;
    const box = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - box.left) / box.width) * 100;
    const y = ((e.clientY - box.top) / box.height) * 100;
    setOrigin(`${x}% ${y}%`);
  };

  return (
    <div
      data-fly-source
      onPointerMove={followPointer}
      className="relative aspect-square overflow-hidden rounded-3xl bg-placeholder max-xl:rounded-2xl"
    >
      <div
        className="absolute inset-0 transition-transform duration-300 ease-out"
        style={{ transform: `scale(${ZOOM_LEVELS.at(zoom)})`, transformOrigin: origin }}
      >
        <Image
          src={images[index]}
          alt={`${name}, photo ${index + 1} of ${images.length}`}
          fill
          priority
          sizes="(min-width: 1512px) 687px, (min-width: 1280px) 46vw, 383px"
          className="object-cover"
        />
      </div>

      {badges.length > 0 && (
        <div className="pointer-events-none absolute top-7.5 left-7.5 flex gap-3.25 max-xl:top-3 max-xl:left-2.5 max-xl:gap-1.75">
          {badges.map((badge) => (
            <span key={badge} className="rounded-xl bg-white px-3 py-2.5 shadow-badge-lg max-xl:p-2">
              <span className="trim block font-mono text-xs font-bold tracking-label whitespace-nowrap text-brand max-xl:text-10">
                {badge}
              </span>
            </span>
          ))}
        </div>
      )}

      {hasMany && (
        <>
          <button
            type="button"
            aria-label="Previous photo"
            onClick={() => goTo(index - 1)}
            className="absolute top-1/2 left-7.5 size-12.5 -translate-y-1/2 max-xl:left-2.5 max-xl:size-10 transition-transform hover:scale-105"
          >
            <Image src="/icons/gallery-arrow.svg" alt="" fill unoptimized />
          </button>
          <button
            type="button"
            aria-label="Next photo"
            onClick={() => goTo(index + 1)}
            className="absolute top-1/2 right-7.5 size-12.5 -translate-y-1/2 max-xl:right-2.75 max-xl:size-10 transition-transform hover:scale-105"
          >
            <Image src="/icons/gallery-arrow.svg" alt="" fill unoptimized className="rotate-180" />
          </button>

          <div className="absolute bottom-11.75 left-11.75 flex gap-2.25 max-xl:bottom-4.25 max-xl:left-2.5 max-xl:gap-1">
            {images.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Show photo ${i + 1} of ${images.length}`}
                aria-current={i === index}
                onClick={() => goTo(i)}
                className={cn(
                  "size-4 rounded-full transition-colors max-xl:size-2",
                  i === index ? "bg-white" : "bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </>
      )}

      <div className="absolute right-7.5 bottom-7.5 flex gap-4 max-xl:right-2.75 max-xl:bottom-3.5 max-xl:gap-1.75">
        <button
          type="button"
          aria-label="Zoom out"
          disabled={zoom === 0}
          onClick={() => setZoom((z) => Math.max(0, z - 1))}
          className="relative size-12.5 transition-opacity disabled:opacity-50 max-xl:size-10"
        >
          <span className="absolute inset-[-24%_-32%_-40%_-32%]">
            <Image src="/icons/zoom-out.svg" alt="" fill unoptimized />
          </span>
        </button>
        <button
          type="button"
          aria-label="Zoom in"
          disabled={zoom === ZOOM_LEVELS.length - 1}
          onClick={() => setZoom((z) => Math.min(ZOOM_LEVELS.length - 1, z + 1))}
          className="relative size-12.5 transition-opacity disabled:opacity-50 max-xl:size-10"
        >
          <span className="absolute inset-[-24%_-32%_-40%_-32%]">
            <Image src="/icons/zoom-in.svg" alt="" fill unoptimized />
          </span>
        </button>
      </div>
    </div>
  );
}