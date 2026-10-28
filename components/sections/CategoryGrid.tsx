import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import { collections } from "@/data/collections";
import { categoriesSection } from "@/data/homepage";
import type { Collection } from "@/types";

function CategoryCard({ slug, name, description, image }: Collection) {
  return (
    <Link href={`/collections/${slug}`} className="group block">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-placeholder">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(min-width: 1512px) 333px, 23vw"
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
    <section className="mx-auto max-w-site px-15 pt-16.75">
      <SectionHeader {...categoriesSection} />
      <div className="mt-21.75 grid grid-cols-4 gap-x-5 gap-y-12.25">
        {collections.map((collection) => (
          <CategoryCard key={collection.id} {...collection} />
        ))}
      </div>
    </section>
  );
}