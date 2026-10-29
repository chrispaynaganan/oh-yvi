"use client";

import { Maximize2, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { currentUser } from "@/data/account";
import { signOut } from "@/lib/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/account/settings", label: "Profile Settings", icon: "/icons/account-profile.svg", iconClass: "w-5" },
  { href: "/account/orders", label: "Orders", icon: "/icons/account-orders.svg", iconClass: "w-6.75" },
  { href: "/account/addresses", label: "Addresses", icon: "/icons/account-addresses.svg", iconClass: "w-5.75" },
  { href: "/account/library", label: "My Library", icon: "/icons/account-library.svg", iconClass: "w-6" },
  { href: "/account/affiliates", label: "Affiliates", icon: "/icons/account-affiliates.svg", iconClass: "w-5.25" },
];

const CARD = "rounded-xl bg-white p-4 shadow-panel";

/* Tablet: profile card + a menu button that opens the account links */
function TabletBar({ pathname, onLogOut }: { pathname: string; onLogOut: () => void }) {
  const [open, setOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const rootRef = useRef<HTMLDivElement>(null);

  // Close after navigating
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // Close on Escape or a tap outside
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative z-30 flex items-center justify-between gap-4 xl:hidden">
      <div className="flex min-w-0 items-center gap-3.5 rounded-xl bg-white py-2.5 pr-6 pl-3.5 shadow-panel">
        <Image src={currentUser.avatar} alt="" width={40} height={40} className="size-10 shrink-0 rounded-full object-cover" />
        <div className="flex min-w-0 flex-col gap-2">
          <p className="trim truncate font-serif text-base tracking-tight-2 text-black">{currentUser.name}</p>
          <p className="trim truncate font-mono text-xs text-muted">{currentUser.email}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close account menu" : "Open account menu"}
        aria-expanded={open}
        className="flex size-14.5 shrink-0 items-center justify-center rounded-xl bg-white text-ink shadow-panel transition-colors hover:text-brand"
      >
        {open ? <X aria-hidden className="size-5" strokeWidth={1.5} /> : <Menu aria-hidden className="size-5" strokeWidth={1.5} />}
      </button>

      {open && (
        <div className="absolute top-full right-0 mt-3 flex w-72 flex-col gap-3">
          <nav aria-label="Account" className={cn(CARD, "flex flex-col gap-1")}>
            {NAV.map((item) => {
              const active = pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn("flex items-center gap-5 rounded-full p-1.5 transition-colors", active ? "bg-surface-muted" : "hover:bg-surface")}
                >
                  <span className="flex w-6.75 shrink-0 justify-center">
                    <Image src={item.icon} alt="" width={27} height={20} className={cn("h-5", item.iconClass)} unoptimized />
                  </span>
                  <span className="trim block font-mono text-sm tracking-tight-2 whitespace-nowrap text-black">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className={CARD}>
            <button type="button" onClick={onLogOut} className="flex w-full items-center gap-5 rounded-full p-1.5 transition-colors hover:bg-surface">
              <span className="flex w-6.75 shrink-0 justify-center">
                <Image src="/icons/account-logout.svg" alt="" width={24} height={20} className="h-5 w-6" unoptimized />
              </span>
              <span className="trim block font-mono text-sm tracking-tight-2 text-error-deep">Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/** Desktop: the collapsible sidebar. Tablet: a slim bar with a menu. */
export default function AccountSidebar({ tabletOnly = false }: { tabletOnly?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function logOut() {
    await signOut();
    router.push("/");
  }

  const tabletBar = <TabletBar pathname={pathname} onLogOut={logOut} />;
  if (tabletOnly) return tabletBar;

  return (
    <>
    {tabletBar}
    <aside
      className={cn(
        "flex shrink-0 flex-col gap-5 transition-[width] duration-300 ease-out max-xl:hidden",
        collapsed ? "w-20.5" : "w-83.25",
      )}
    >
      {/* Profile */}
      <div className={cn(CARD, "flex items-center justify-between gap-4 overflow-hidden", collapsed ? "flex-col" : "pr-6")}>
        <div className="flex min-w-0 items-center gap-4">
          <Image
            src={currentUser.avatar}
            alt={collapsed ? currentUser.name : ""}
            width={50}
            height={50}
            className="size-12.5 shrink-0 rounded-full object-cover"
          />
          {!collapsed && (
            <div className="flex min-w-0 flex-col gap-2">
              <p className="trim truncate font-serif text-xl tracking-tight-2 text-black">{currentUser.name}</p>
              <p className="trim truncate font-mono text-sm text-muted">{currentUser.email}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          aria-expanded={!collapsed}
          className="flex size-6 shrink-0 items-center justify-center text-muted transition-colors hover:text-brand"
        >
          {collapsed ? (
            <Maximize2 aria-hidden className="size-4.5" strokeWidth={1.5} />
          ) : (
            <Image src="/icons/sidebar-collapse.svg" alt="" width={18} height={18} className="size-4.5" unoptimized />
          )}
        </button>
      </div>

      {/* Sections */}
      <nav aria-label="Account" className={cn(CARD, "flex flex-col gap-1")}>
        {NAV.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              aria-label={collapsed ? item.label : undefined}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-5 rounded-full p-1.5 transition-colors",
                active ? "bg-surface-muted" : "hover:bg-surface",
                collapsed && "justify-center",
              )}
            >
              <span className="flex w-6.75 shrink-0 justify-center">
                <Image src={item.icon} alt="" width={27} height={20} className={cn("h-5", item.iconClass)} unoptimized />
              </span>
              {!collapsed && (
                <span className="trim block font-mono text-sm tracking-tight-2 whitespace-nowrap text-black">{item.label}</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Log out */}
      <div className={CARD}>
        <button
          type="button"
          onClick={logOut}
          aria-label={collapsed ? "Log out" : undefined}
          title={collapsed ? "Log out" : undefined}
          className={cn("flex w-full items-center gap-5 rounded-full p-1.5 transition-colors hover:bg-surface", collapsed && "justify-center")}
        >
          <span className="flex w-6.75 shrink-0 justify-center">
            <Image src="/icons/account-logout.svg" alt="" width={24} height={20} className="h-5 w-6" unoptimized />
          </span>
          {!collapsed && <span className="trim block font-mono text-sm tracking-tight-2 text-error-deep">Log out</span>}
        </button>
      </div>
    </aside>
    </>
  );
}