"use client";

import { Maximize2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
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

export default function AccountSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  async function logOut() {
    await signOut();
    router.push("/");
  }

  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col gap-5 transition-[width] duration-300 ease-out",
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
  );
}