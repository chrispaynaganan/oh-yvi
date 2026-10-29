import Image from "next/image";
import { cn } from "@/lib/utils";

// Three staggered columns, positioned as in Figma
const PHOTOS = [
  { src: "/images/auth/photo-1.png", className: "top-13 left-0" },
  { src: "/images/auth/photo-2.png", className: "top-108.5 left-0" },
  { src: "/images/auth/photo-3.png", className: "top-202 left-0" },
  { src: "/images/auth/photo-4.png", className: "top-35.5 left-73.25" },
  { src: "/images/auth/photo-5.png", className: "top-130.75 left-73.25" },
  { src: "/images/auth/photo-6.png", className: "top-0 left-147.25" },
  { src: "/images/auth/photo-7.png", className: "top-95.25 left-147.25" },
  { src: "/images/auth/photo-8.png", className: "top-189.75 left-147.25" },
];

// Fades the collage into the page at the top and bottom
const FADE = "linear-gradient(to bottom, transparent, black 12%, black 50%, transparent 96%)";

export default function AuthCollage() {
  return (
    <div
      aria-hidden
      className="relative h-205 w-213 overflow-hidden"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      {PHOTOS.map((photo) => (
        <div
          key={photo.src}
          className={cn("absolute h-89.5 w-65.75 overflow-hidden rounded-2xl bg-placeholder", photo.className)}
        >
          <Image src={photo.src} alt="" fill sizes="263px" className="object-cover" />
        </div>
      ))}
    </div>
  );
}