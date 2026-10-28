import Image from "next/image";
import Link from "next/link";
import {
  categoryNav,
  groupNav,
  shopNav,
  utilityNav,
  type NavLink,
} from "@/data/navigation";

function NavChip({ label, href }: NavLink) {
  return (
    <Link
      href={href}
      className="flex items-center rounded-full border border-line bg-white px-3 py-[10px] font-serif text-[12px] leading-[18px] whitespace-nowrap text-ink transition-colors hover:border-brand"
    >
      <span className="trim block">{label}</span>
    </Link>
  );
}

function IconButton({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid size-[38px] place-items-center rounded-full border border-line bg-white transition-colors hover:border-brand"
    >
      <Image src={icon} alt="" width={20} height={20} unoptimized />
    </Link>
  );
}

function Divider() {
  return (
    <div className="flex h-[30px] w-0 items-center justify-center" aria-hidden>
      <div className="flex-none rotate-90">
        <div className="relative h-0 w-[30px]">
          <div className="absolute inset-[-1px_0_0_0]">
            <Image src="/icons/divider.svg" alt="" fill unoptimized />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Header() {
  return (
    <header className="mx-auto w-full max-w-site px-4 md:px-[60px]">
      {/* Row 1: menu · logo · links + icons */}
      <div className="mt-[20px] grid grid-cols-[1fr_auto_1fr] items-center">
        <button
          type="button"
          aria-label="Open menu"
          className="relative size-[25px] justify-self-start"
        >
          <span className="absolute inset-[29.17%_16.67%]">
            <span className="absolute inset-[-8%_-5%]">
              <Image src="/icons/menu.svg" alt="" fill unoptimized />
            </span>
          </span>
        </button>

        <Link
          href="/"
          aria-label="Oh Yvi home"
          className="flex h-[39.695px] w-[89.719px] flex-col items-center justify-center"
        >
          <span className="block font-serif text-[36px] leading-[25.2px] tracking-[-2.88px] whitespace-nowrap text-brand">
            Oh Yvi
          </span>
          <span className="block pt-[7px] font-mono text-[7px] leading-none tracking-[1.54px] whitespace-nowrap text-brand uppercase">
            paper goods
          </span>
        </Link>

        <div className="flex items-center gap-[23px] justify-self-end">
          {utilityNav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden font-serif text-[12px] leading-[18px] text-ink hover:text-brand md:block"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-start gap-2">
            <IconButton href="/account" label="Account" icon="/icons/user.svg" />
            <IconButton href="/account/wishlist" label="Wishlist" icon="/icons/heart.svg" />
            <IconButton href="/cart" label="Cart with 0 items" icon="/icons/cart.svg" />
          </div>
        </div>
      </div>

      {/* Row 2: shop chips · search · category chips */}
      <div className="mt-[23px] flex justify-center pb-[26px] min-[1400px]:grid min-[1400px]:grid-cols-[1fr_auto_1fr] min-[1400px]:items-center min-[1400px]:gap-[27px]">
        <nav aria-label="Shop" className="hidden items-center gap-6 min-[1400px]:flex">
          <div className="flex items-center gap-3">
            {shopNav.map((link) => <NavChip key={link.href} {...link} />)}
          </div>
          <Divider />
          <div className="flex items-center gap-3">
            {groupNav.map((link) => <NavChip key={link.href} {...link} />)}
          </div>
        </nav>

        <form
          action="/shop"
          role="search"
          className="flex h-[30px] w-full max-w-[490px] items-center justify-between rounded-full border border-line bg-surface py-1 pr-[14px] pl-4 min-[1400px]:w-[490px]"
        >
          <input
            type="search"
            name="q"
            placeholder="Search paper goods..."
            aria-label="Search paper goods"
            className="w-full bg-transparent font-serif text-[12px] text-ink outline-none placeholder:text-muted"
          />
          <button type="submit" aria-label="Search" className="shrink-0">
            <Image src="/icons/search.svg" alt="" width={18} height={20} unoptimized />
          </button>
        </form>

        <nav
          aria-label="Categories"
          className="hidden items-center gap-3 justify-self-end min-[1400px]:flex"
        >
          {categoryNav.map((link) => <NavChip key={link.href} {...link} />)}
        </nav>
      </div>
    </header>
  );
}