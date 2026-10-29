import Image from "next/image";
import Link from "next/link";
import {
  categoryNav,
  groupNav,
  shopNav,
  utilityNav,
  type NavLink,
} from "@/data/navigation";
import MenuButton from "@/components/layout/MenuButton";
import InterestsButton from "@/components/layout/InterestsButton";
import BagButton from "@/components/layout/BagButton";
import SearchButton from "@/components/layout/SearchButton";
import { cn } from "@/lib/utils";

function NavChip({ label, href, className }: NavLink & { className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center rounded-full border border-line bg-white px-3 py-2.5 font-serif text-xs leading-4.5 whitespace-nowrap text-ink transition-colors hover:border-brand",
        className,
      )}
    >
      <span className="trim block">{label}</span>
    </Link>
  );
}

function IconButton({
  href,
  label,
  icon,
  className,
}: {
  href: string;
  label: string;
  icon: string;
  className?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        "grid size-9.5 place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand",
        className,
      )}
    >
      <Image src={icon} alt="" width={20} height={20} unoptimized />
    </Link>
  );
}

function Divider() {
  return (
    <div className="flex h-7.5 w-0 items-center justify-center" aria-hidden>
      <div className="flex-none rotate-90">
        <div className="relative h-0 w-7.5">
          <div className="absolute inset-x-0 -top-px bottom-0">
            <Image src="/icons/divider.svg" alt="" fill unoptimized />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
        <header className="border-b border-line-soft">
      <div className="mx-auto w-full max-w-site px-4 md:px-6.5 xl:px-15">
      {/* Row 1: menu · logo · links + icons */}
      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center">
        <MenuButton/>

        <Link
          href="/"
          aria-label="Oh, Yvi! home"
          className="flex h-10 w-22.5 flex-col items-center justify-center"
        >
          <span className="block font-serif text-logo whitespace-nowrap text-brand">
            Oh, Yvi!
          </span>
          <span className="block pt-1.75 font-mono text-7 leading-none tracking-wide-2 whitespace-nowrap text-brand uppercase">
            papered goodness
          </span>
        </Link>

        <div className="flex items-center gap-5.75 justify-self-end">
          {utilityNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden font-serif text-xs leading-4.5 text-ink hover:text-brand xl:block"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-start gap-2">
            {/* Tablet: search moves up here as a round button */}
            <SearchButton className="xl:hidden" />
            <IconButton href="/login" label="Account" icon="/icons/user.svg" />
            <InterestsButton />
            <BagButton />
          </div>
        </div>
      </div>

      {/* Row 2: shop chips · search · category chips */}
      <div className="mt-4.25 flex items-center justify-between pb-4.25 xl:mt-5.75 xl:justify-center xl:pb-6.5 wide:grid wide:grid-cols-[1fr_auto_1fr] wide:items-center wide:gap-6.75">
        <nav aria-label="Shop" className="flex items-center gap-4 xl:hidden wide:flex wide:gap-6">
          <div className="flex items-center gap-2.5 wide:gap-3">
            {shopNav.map((link) => <NavChip key={link.href} {...link} />)}
          </div>
          <Divider />
          <div className="flex items-center gap-2.5 wide:gap-3">
            {groupNav.map((link) => <NavChip key={link.href} {...link} />)}
          </div>
        </nav>

        <form
          action="/shop"
          role="search"
          className="hidden h-7.5 w-full max-w-122.5 xl:flex items-center justify-between rounded-full border border-line bg-surface py-1 pr-3.5 pl-4 wide:w-122.5"
        >
          <input
            type="search"
            name="q"
            placeholder="Search paper goods..."
            aria-label="Search paper goods"
            className="w-full bg-transparent font-serif text-xs text-ink outline-none placeholder:text-muted"
          />
          <button type="submit" aria-label="Search" className="shrink-0">
            <Image src="/icons/search.svg" alt="" width={18} height={20} unoptimized />
          </button>
        </form>

        <nav
          aria-label="Categories"
          className="flex items-center gap-2.5 justify-self-end xl:hidden wide:flex wide:gap-3"
        >
          {categoryNav.map((link, i) => (
            // Tablet shows the first three
            <NavChip key={link.href} {...link} className={i >= 3 ? "hidden wide:flex" : undefined} />
          ))}
        </nav>
      </div>
    </div>
    </header>
  );
}