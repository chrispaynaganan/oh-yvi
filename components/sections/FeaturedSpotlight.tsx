import Image from "next/image";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { featured, promoCards } from "@/data/homepage";
import { formatPeso } from "@/lib/utils";

type PromoCardProps = (typeof promoCards)[number];

function PromoCard({ tag, title, description, cta }: PromoCardProps) {
  return (
    <article className="flex flex-1 flex-col items-start gap-8 rounded-2xl border border-line-rose bg-white p-4">
      <div className="flex w-full flex-col items-start gap-3.5">
        <Tag>{tag}</Tag>
        <div className="flex w-full flex-col gap-6">
          <h3 className="font-serif text-card-title text-ink">{title}</h3>
          <p className="font-mono text-sm text-muted">{description}</p>
        </div>
      </div>
      <Button href={cta.href} size="sm" className="border border-brand">
        {cta.label}
      </Button>
    </article>
  );
}

export default function FeaturedSpotlight() {
  return (
    <section className="mx-auto max-w-site px-15 pt-9.5">
      {/* Columns keep Figma's 921 : 451 ratio at any desktop width */}
      <div className="grid grid-cols-[921fr_451fr] gap-5">
        <div className="relative min-h-105.5 overflow-hidden rounded-2xl">
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            fill
            sizes="(min-width: 1512px) 921px, 61vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/50" />

          <div className="absolute bottom-8 left-7.5 w-100.25">
            <h2 className="font-serif text-feature whitespace-nowrap text-white">
              {featured.name}
            </h2>
            <p className="no-trim mt-2 line-clamp-2 font-mono text-sm text-white">
              {featured.description}
            </p>
            <div className="mt-3 flex items-start gap-2.75">
              <Button href={featured.href} variant="light" arrow>
                Buy for {formatPeso(featured.price)} only
              </Button>
              <Button href={featured.href} variant="outline-light">
                View Product Details
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4.5">
          {promoCards.map((card) => (
            <PromoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}