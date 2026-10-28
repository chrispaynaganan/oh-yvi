import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import {
  featuredOccasion,
  occasions,
  occasionsSection,
  type Occasion,
} from "@/data/homepage";

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

function OccasionText({ name, description }: Pick<Occasion, "name" | "description">) {
  return (
    <div className="flex w-full flex-col gap-2.5">
      <h3 className="font-serif text-xl tracking-tight-2 text-brand">{name}</h3>
      <p className="font-mono text-9 text-muted-2">{description}</p>
    </div>
  );
}

function FeaturedOccasionCard({ name, description, image, href }: Occasion) {
  return (
    <Link
      href={href}
      className="col-span-6 flex h-63.25 items-center gap-4 rounded-xl border border-line-rose bg-white p-4 shadow-card"
    >
      <div className="relative h-full flex-1 overflow-hidden rounded-xs bg-placeholder">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1512px) 318px, 21vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start gap-9">
        <OccasionText name={name} description={description} />
        <LearnMore />
      </div>
    </Link>
  );
}

function OccasionCard({ name, description, image, href }: Occasion) {
  return (
    <Link
      href={href}
      className="flex h-63.25 flex-col gap-2 rounded-xl border border-line-soft px-2.5 py-3"
    >
      <div className="relative h-25 shrink-0 overflow-hidden rounded-xs bg-placeholder">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1512px) 138px, 10vw"
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-start justify-between">
        <OccasionText name={name} description={description} />
        <LearnMore />
      </div>
    </Link>
  );
}

export default function OccasionShowcase() {
  return (
    <section className="mx-auto max-w-site px-15 pt-20">
      <SectionHeader {...occasionsSection} />
      <div className="mt-24.25 grid grid-cols-12 gap-x-5">
        <FeaturedOccasionCard {...featuredOccasion} />
        <div className="col-span-6 grid grid-cols-4 gap-4">
          {occasions.map((occasion) => (
            <OccasionCard key={occasion.href} {...occasion} />
          ))}
        </div>
      </div>
    </section>
  );
}