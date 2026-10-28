import Image from "next/image";
import Button from "@/components/ui/Button";
import Countdown from "@/components/ui/Countdown";
import { aboutTeaser, saleBanner } from "@/data/homepage";

function SaleCard() {
  return (
    <div className="col-span-5 flex h-100.75 flex-col items-start gap-10 rounded-2xl bg-surface-muted p-5">
      <div className="flex w-full flex-col gap-5">
        <p className="font-mono text-10 text-muted-3">{saleBanner.eyebrow}</p>
        <div className="flex flex-col gap-6.5">
          <h2 className="font-serif text-50 leading-14.25 tracking-tight-3 whitespace-pre-line text-brand">
            {saleBanner.title}
          </h2>
          <p className="font-mono text-sm text-muted">{saleBanner.description}</p>
        </div>
      </div>

      <Countdown endsAt={saleBanner.endsAt} />

      <div className="flex items-start gap-2.75">
        <Button href={saleBanner.primaryCta.href} arrow>
          {saleBanner.primaryCta.label}
        </Button>
        <Button href={saleBanner.secondaryCta.href} variant="outline">
          {saleBanner.secondaryCta.label}
        </Button>
      </div>
    </div>
  );
}

function StoryCard() {
  return (
    <div className="relative col-span-7 flex h-100.75 flex-col items-start justify-between overflow-hidden rounded-2xl border border-line-strong py-5 pr-58.75 pl-5">
      {/* Tilted photo, anchored to the right edge so it scales with the card */}
      <div className="absolute top-18 -right-20.75 flex h-117.25 w-118.75 items-center justify-center">
        <div className="relative h-96.75 w-98.75 flex-none -rotate-14">
          <Image
            src={aboutTeaser.image}
            alt={aboutTeaser.imageAlt}
            fill
            sizes="395px"
            className="object-cover"
          />
        </div>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-5">
        <p className="font-mono text-10 text-ink">{aboutTeaser.eyebrow}</p>
        <div className="flex flex-col gap-6.5">
          <h2 className="font-serif text-50 whitespace-pre-line text-ink">
            {aboutTeaser.title}
          </h2>
          <p className="font-mono text-sm text-muted">{aboutTeaser.description}</p>
        </div>
      </div>

      <Button href={aboutTeaser.cta.href} arrow className="relative z-10">
        {aboutTeaser.cta.label}
      </Button>
    </div>
  );
}

export default function SaleAndStory() {
  return (
    <section className="mx-auto max-w-site px-15 pt-16.5">
      <div className="grid grid-cols-12 gap-x-5">
        <SaleCard />
        <StoryCard />
      </div>
    </section>
  );
}