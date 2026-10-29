import Link from "next/link";

export default function AccountHeader() {
  return (
    <header className="shrink-0 border-b border-line bg-white">
      <div className="mx-auto flex h-22 max-w-site items-center justify-between px-15">
        <Link href="/" aria-label="Oh, Yvi! home" className="flex flex-col items-center text-brand">
          <span className="font-serif text-logo leading-none">Oh, Yvi!</span>
          <span className="mt-1.75 font-mono text-7 tracking-widest uppercase">papered goodness</span>
        </Link>
        <nav className="flex items-center gap-6.25 font-serif text-lg tracking-tight-2 text-black">
          <Link href="/faqs" className="transition-colors hover:text-brand">FAQ</Link>
          <Link href="/articles" className="transition-colors hover:text-brand">Articles</Link>
        </nav>
      </div>
    </header>
  );
}