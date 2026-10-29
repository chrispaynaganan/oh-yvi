import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { collections } from "@/data/collections";
import { categoriesSection } from "@/data/homepage";
import { cn } from "@/lib/utils";
import type { Collection } from "@/types";

function CategoryCard({ slug, name, description, image, className }: Collection & { className?: string }) {
  return (
    <Link href={`/collections/${slug}`} className={cn("group block", className)}>
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-placeholder">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1512px) 333px, (min-width: 1280px) 23vw, 252px"
          className="object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </div>
      <h3 className="mt-4 font-mono text-21 font-bold text-ink">{name}</h3>
      <p className="mt-3.75 font-mono text-11 text-muted">{description}</p>
    </Link>
  );
}

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-site px-15 pt-16.75 max-xl:px-6 max-xl:pt-15">
      <SectionHeader {...categoriesSection} />
      <div className="mt-21.75 grid grid-cols-4 gap-x-5 gap-y-12.25 max-xl:mt-8.5 max-xl:grid-cols-3 max-xl:gap-x-3.75 max-xl:gap-y-11">
                {collections
          .filter((collection) => collection.kind === "category")
          .map((collection, i) => (
          // Tablet shows the first six
          <CategoryCard key={collection.id} {...collection} className={i >= 6 ? "max-xl:hidden" : undefined} />
        ))}
      </div>
    </section>
  );
}