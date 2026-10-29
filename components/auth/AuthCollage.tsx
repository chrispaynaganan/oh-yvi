import Image from "next/image";
import { cn } from "@/lib/utils";

const photo = (n: number) => `/images/auth/photo-${n}.png`;

// Each column repeats its photos end to end so the loop is seamless.
// Photos are placeholders; the CMS will supply them later.
const COLUMNS = [
  { key: "left", photos: [1, 2, 3], className: "left-0 animate-scroll-up", duration: "48s" },
  { key: "middle", photos: [4, 5, 1], className: "left-73.25 animate-scroll-down max-xl:left-49", duration: "56s" },
  { key: "right", photos: [6, 7, 8], className: "left-147.25 animate-scroll-up max-xl:hidden", duration: "52s" },
];

// Fades the collage into the page at the top and bottom
const FADE = "linear-gradient(to bottom, transparent, black 12%, black 50%, transparent 96%)";

export default function AuthCollage() {
  return (
    <div
      aria-hidden
      className="relative h-205 w-213 overflow-hidden max-xl:h-190.5 max-xl:w-95.5"
      style={{ maskImage: FADE, WebkitMaskImage: FADE }}
    >
      {COLUMNS.map((column) => (
        <div
          key={column.key}
          className={cn(
            "absolute top-0 flex w-65.75 flex-col gap-6 pb-6 motion-reduce:animate-none max-xl:w-46.25 max-xl:gap-2.75 max-xl:pb-2.75",
            column.className,
          )}
          style={{ animationDuration: column.duration }}
        >
          {[...column.photos, ...column.photos].map((n, i) => (
            <div
              key={i}
              className="relative h-89.5 w-full shrink-0 overflow-hidden rounded-2xl bg-placeholder max-xl:h-62.75"
            >
              <Image src={photo(n)} alt="" fill sizes="263px" className="object-cover" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}