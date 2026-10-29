import { Suspense } from "react";
import AccountSidebar from "@/components/account/AccountSidebar";

export default function AccountMainLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="mx-auto flex min-h-0 w-full max-w-site gap-5 px-15">
      <div className="shrink-0 pt-14">
        <Suspense fallback={<div className="w-83.25" />}>
          <AccountSidebar />
        </Suspense>
      </div>
      <main className="scrollbar-soft min-w-0 flex-1 overflow-y-auto pt-14 pb-12">{children}</main>
    </div>
  );
}