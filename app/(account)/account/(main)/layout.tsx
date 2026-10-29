import { Suspense } from "react";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountMainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-site gap-5 px-15 max-xl:flex-col max-xl:gap-0 max-xl:px-6.5">
      <div className="shrink-0 pt-14 max-xl:pt-4">
        <Suspense fallback={<div className="w-83.25 max-xl:h-14.5" />}>
          <AccountSidebar />
        </Suspense>
      </div>
      <main className="scrollbar-soft min-w-0 flex-1 overflow-y-auto pt-14 pb-12 max-xl:pt-13.75">{children}</main>
    </div>
  );
}