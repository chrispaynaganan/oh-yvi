import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { collections } from "@/data/collections";
import { occasionsSection } from "@/data/homepage";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types";

const occasions = collections.filter((collection) => collection.kind === "occasion");

function LearnMore() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.75 rounded-full bg-white px-2.5 py-2 shadow-pill">
      <span className="trim block font-serif text-10 tracking-tight-1 whitespace-nowrap text-muted-2">
        Learn more
      </span>
      <Image
        src="/icons/arrow-up-right-small.svg"
        alt=""
        width={7}
        height={7}
        className="size-1.75"
        unoptimized
      />
    </span>
  );
}

function OccasionCard({ slug, name, description, image, className }: Collection & { className?: string }) {
  return (
    <Link
      href={`/collections/${slug}`}
      className={cn(
        "occasion flex h-63.25 min-w-0 grow-3 basis-0 flex-col gap-2 rounded-xl border border-line-soft px-2.5 py-3 transition-[flex-grow,padding,background-color,border-color,box-shadow] duration-500 ease-out expanded:grow-13 expanded:flex-row expanded:items-center expanded:gap-4 expanded:border-line-rose expanded:bg-white expanded:p-4 expanded:shadow-card",
        className,
      )}
    >
      <div className="relative h-25 w-full shrink-0 overflow-hidden rounded-xs bg-placeholder expanded:h-full expanded:w-auto expanded:flex-1">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1512px) 343px, 23vw"
          className="object-cover"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col items-start justify-between gap-6 expanded:justify-start expanded:gap-9">
        <div className="flex w-full flex-col gap-2.5">
          <h3 className="font-serif text-xl tracking-tight-2 whitespace-nowrap text-brand">
            {name}
          </h3>
          <p className="no-trim line-clamp-4 font-mono text-9 text-muted-2 expanded:line-clamp-none">
            {description}
          </p>
        </div>
        <LearnMore />
      </div>
    </Link>
  );
}

export default function OccasionShowcase() {
  return (
    <section className="mx-auto max-w-site px-15 pt-20 max-xl:px-6 max-xl:pt-10">
      <SectionHeader {...occasionsSection} />
      <div className="mt-24.25 flex gap-4 max-xl:mt-10.25">
        {occasions.map((occasion, i) => (
          // Tablet shows the first four
          <OccasionCard key={occasion.id} {...occasion} className={i >= 4 ? "max-xl:hidden" : undefined} />
        ))}
      </div>
    </section>
  );
}