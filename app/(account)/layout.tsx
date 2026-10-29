import AccountHeader from "@/components/account/AccountHeader";

export default function AccountLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-screen flex-col md:h-dvh md:overflow-hidden">
      <AccountHeader />
      <div className="flex min-h-0 flex-1 bg-surface-muted">{children}</div>
    </div>
  );
}