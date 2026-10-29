import Image from "next/image";
import Button from "@/components/ui/Button";
import Tag from "@/components/ui/Tag";
import { featured, promoCards } from "@/data/homepage";
import { formatPeso } from "@/lib/utils";

type PromoCardProps = (typeof promoCards)[number];

function PromoCard({ tag, title, description, cta }: PromoCardProps) {
  return (
    <article className="flex flex-1 flex-col items-start gap-8 rounded-2xl border border-line-rose bg-white p-4 max-xl:p-2.5">
      <div className="flex w-full flex-col items-start gap-3.5">
        <Tag>{tag}</Tag>
        <div className="flex w-full flex-col gap-6">
          <h3 className="font-serif text-card-title text-ink max-xl:text-card-title-sm">{title}</h3>
          <p className="font-mono text-sm text-muted max-xl:text-xs">{description}</p>
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
    <section className="mx-auto max-w-site px-15 pt-9.5 max-xl:px-6 max-xl:pt-8">
      {/* Columns keep Figma's 921 : 451 ratio at any desktop width */}
      <div className="grid grid-cols-[921fr_451fr] gap-5 max-xl:grid-cols-[485fr_281fr]">
        <div className="relative min-h-105.5 overflow-hidden rounded-2xl max-xl:min-h-92.75">
          <Image
            src={featured.image}
            alt={featured.imageAlt}
            fill
            sizes="(min-width: 1512px) 921px, (min-width: 1280px) 61vw, 485px"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/50" />

          <div className="absolute bottom-8 left-7.5 w-100.25 max-xl:bottom-4.5 max-xl:left-5">
            <h2 className="font-serif text-feature whitespace-nowrap text-white max-xl:text-21">
              {featured.name}
            </h2>
            <p className="no-trim mt-2 line-clamp-2 font-mono text-sm text-white max-xl:text-xs">
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

        <div className="flex flex-col gap-4.5 max-xl:gap-4">
          {promoCards.map((card) => (
            <PromoCard key={card.title} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}