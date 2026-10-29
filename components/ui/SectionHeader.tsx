import Button from "@/components/ui/Button";

type SectionHeaderProps = {
  title: string;
  intro: string;
  aside?: string;
  cta?: { label: string; href: string };
};

export default function SectionHeader({ title, intro, aside, cta }: SectionHeaderProps) {
  return (
    <div className="grid grid-cols-12 gap-x-5 gap-y-7.75 max-xl:gap-y-5.25">
      <h2 className="col-span-12 font-serif text-section whitespace-nowrap text-ink max-xl:text-section-sm">
        {title}
      </h2>
      <p className="col-span-4 row-start-2 font-mono text-base text-muted max-xl:col-span-5">{intro}</p>
      {aside && (
        <p className="col-span-4 col-start-6 row-start-2 font-mono text-base text-muted max-xl:col-span-5 max-xl:col-start-7">
          {aside}
        </p>
      )}
      {cta && (
        <div className="col-span-3 col-start-10 row-start-2 justify-self-end max-xl:hidden">
          <Button href={cta.href} variant="outline">
            {cta.label}
          </Button>
        </div>
      )}
    </div>
  );
}