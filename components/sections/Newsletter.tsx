import NewsletterForm from "@/components/forms/NewsletterForm";
import { newsletter } from "@/data/homepage";

export default function Newsletter() {
  return (
    <section className="mx-auto max-w-site px-15 pt-13.75 pb-14 max-xl:px-6 max-xl:pt-5.75 max-xl:pb-5.75">
      <div className="flex flex-col gap-4.5 rounded-2xl bg-surface-rose px-5 py-6.5">
        <p className="font-mono text-10 text-ink">{newsletter.eyebrow}</p>
        <div className="flex items-start justify-between gap-10 max-xl:gap-5.25">
          <h2 className="w-125.25 font-serif text-newsletter text-ink max-xl:w-auto max-xl:flex-1 max-xl:text-35 max-xl:leading-normal">{newsletter.title}</h2>
          <div className="flex w-112.75 shrink-0 flex-col gap-8 max-xl:w-auto max-xl:flex-1 max-xl:shrink">
            <div className="flex flex-col gap-2.5">
              <h3 className="font-serif text-lg tracking-tight-2 text-ink">
                {newsletter.subtitle}
              </h3>
              <p className="font-mono text-11 text-muted-2">{newsletter.description}</p>
            </div>
            <NewsletterForm note={newsletter.note} />
          </div>
        </div>
      </div>
    </section>
  );
}