import Image from "next/image";
import Button from "@/components/ui/Button";
import { hero } from "@/data/homepage";
import { cn } from "@/lib/utils";

export default function Hero() {
  const { avatars, stat, caption } = hero.socialProof;

  return (
    <section className="overflow-hidden bg-surface-hero">
      <div className="relative mx-auto h-184.25 max-w-site px-15 pt-42.25">
        <div className="relative z-10 w-139.25">
          <h1 className="font-serif text-display text-black">{hero.title}</h1>

          <p className="mt-6.75 w-135 font-mono text-base text-muted-2">
            {hero.subtitle}
          </p>

          <div className="mt-11.25 flex items-start gap-2.75">
            <Button href={hero.primaryCta.href} arrow>
              {hero.primaryCta.label}
            </Button>
            <Button href={hero.secondaryCta.href} variant="outline">
              {hero.secondaryCta.label}
            </Button>
          </div>

          <div className="mt-20.75 flex items-center gap-4">
            <div className="flex items-center">
              {avatars.map((src, i) => (
                <div
                  key={src}
                  className={cn(
                    "relative size-9.25 shrink-0",
                    i < avatars.length - 1 && "-mr-2",
                  )}
                >
                  <div className="absolute inset-[-18.92%_-29.73%_-40.54%_-29.73%]">
                    <Image
                      src={src}
                      alt=""
                      width={59}
                      height={59}
                      className="block size-full max-w-none"
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="flex w-51 flex-col gap-2">
              <p className="font-serif text-lg text-black">{stat}</p>
              <p className="font-serif text-10 text-muted-2">{caption}</p>
            </div>
          </div>
        </div>

        {/* Same position as Figma at 1512px; scales with the window below that */}
        <div className="absolute top-23.25 left-[47.16%] aspect-802/562 w-[53.04%] shadow-hero">
          <Image
            src={hero.image}
            alt={hero.imageAlt}
            fill
            priority
            sizes="(min-width: 1512px) 802px, 53vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}