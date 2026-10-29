import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

function Shadow({ src, className, inset }: { src: string; className: string; inset: string }) {
  return (
    <div className={cn("absolute", className)}>
      <div className={cn("absolute", inset)}>
        <Image src={src} alt="" fill unoptimized />
      </div>
    </div>
  );
}

function Photo({ src, className, inner }: { src: string; className: string; inner: string }) {
  return (
    <div className={cn("absolute flex items-center justify-center", className)}>
      <div className={cn("relative flex-none overflow-hidden rounded-2xl", inner)}>
        <Image src={src} alt="" fill sizes="240px" className="object-cover" />
      </div>
    </div>
  );
}

/** The scattered stationery illustration, same on every empty page */
function EmptyIllustration() {
  return (
    <div aria-hidden className="relative h-83.25 w-134.75">
      <Shadow
        src="/images/empty/shadow-planner.svg"
        className="top-41.75 left-67 h-35.75 w-32.75"
        inset="inset-[-34.97%_-38.17%]"
      />
      <Shadow
        src="/images/empty/shadow-journal.svg"
        className="top-13.25 left-34.5 h-33.5 w-35"
        inset="inset-[-37.31%_-35.71%]"
      />
      <Shadow
        src="/images/empty/shadow-calendar.svg"
        className="top-5 left-76.5 h-26.5 w-32"
        inset="inset-[-47.17%_-39.22%]"
      />
      <Shadow
        src="/images/empty/shadow-notepad.svg"
        className="top-50 left-4.5 h-23.75 w-20"
        inset="inset-[-52.63%_-62.89%]"
      />
      <Shadow
        src="/images/empty/shadow-bookmark.svg"
        className="top-38.25 left-117.25 h-31 w-12.25"
        inset="inset-[-40.49%_-103.09%]"
      />

      <Photo src="/images/empty/planner.png" className="top-24.25 left-52.75 size-68.75" inner="size-59.75 rotate-10" />
      <Photo src="/images/empty/notepad.png" className="top-35 -left-9 size-48" inner="size-37.25 rotate-20" />
      <Photo src="/images/empty/journal.png" className="-top-7.5 left-10 size-75.5" inner="size-61 -rotate-16" />
      <Photo src="/images/empty/calendar.png" className="-top-10.5 left-63.25 size-52" inner="size-42.25 -rotate-16" />
      <Photo src="/images/empty/bookmark.png" className="top-26.75 left-99 size-48.75" inner="size-41.25 rotate-12" />
    </div>
  );
}

type EmptyStateProps = {
  message: string;
  cta?: { label: string; href: string };
  className?: string;
};

export default function EmptyState({ message, cta, className }: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <EmptyIllustration />
      <p className="mt-6.75 w-112.75 text-center font-mono text-sm text-muted">{message}</p>
      {cta && (
        <Link
          href={cta.href}
          className="mt-10.25 flex h-10 items-center rounded-2xl border border-brand bg-brand px-4 text-white transition-opacity hover:opacity-90"
        >
          <span className="trim block font-serif text-sm">{cta.label}</span>
        </Link>
      )}
    </div>
  );
}