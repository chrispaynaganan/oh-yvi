"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent, type InputHTMLAttributes } from "react";
import EmptyState from "@/components/ui/EmptyState";
import { formatAddress, savedAddress } from "@/data/account";
import { paymentMethods, wallets, type PaymentMethodId, type WalletId } from "@/data/payments";
import { removeLines, setPromoCode, useBag, usePromoCode, type BagLine } from "@/lib/bag";
import { resolveItem, type CatalogItem } from "@/lib/catalog";
import { createOrder } from "@/lib/orders";
import { computeTotals, findPromo } from "@/lib/pricing";
import { cn, formatPeso } from "@/lib/utils";
import type { Address } from "@/types";
import AddressEditor from "@/components/account/AddressEditor";
import { getPrimary, useAddressBook } from "@/lib/addresses";

const INPUT =
  "h-11 w-full rounded-full border border-line-dark bg-white px-4 font-mono text-sm text-ink outline-none placeholder:text-muted focus:border-brand";

function Field({
  label,
  id,
  className,
  ...input
}: { label: string; id: string; className?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className={cn("flex flex-col gap-3.5", className)}>
      <label htmlFor={id} className="font-mono text-base text-black">
        {label}
      </label>
      <input id={id} className={INPUT} {...input} />
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="p-2.5 font-serif text-2xl text-black">{children}</h2>;
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="mx-4 rounded-lg bg-surface-hero px-4 py-3 font-mono text-xs text-muted">{children}</p>
  );
}

/* ------------ Address ------------ */

/* ---------- Page ---------- */
type Row = { line: BagLine; item: CatalogItem };

export default function CheckoutView() {
  const router = useRouter();
  const bag = useBag();
  const promoCode = usePromoCode();
  const addressBook = useAddressBook();
  const [chosenAddress, setChosenAddress] = useState<Address | null>(null);
  const [editingAddress, setEditingAddress] = useState(false);
  const [method, setMethod] = useState<PaymentMethodId>("ewallet");
  const [wallet, setWallet] = useState<WalletId>("gcash");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);

  if (bag === null) return <div aria-hidden className="mt-13 h-150" />;
  // The customer's primary address is used unless they replace it here
  const address = chosenAddress ?? (addressBook && getPrimary(addressBook)) ?? savedAddress;

  const rows = bag
    .filter((line) => line.selected)
    .map((line) => ({ line, item: resolveItem(line.key) }))
    .filter((row): row is Row => row.item !== null);

  if (rows.length === 0) {
    return (
      <EmptyState
        className="mt-12.5"
        message="There’s nothing to check out yet. Choose the items you’d like to buy in your bag first."
        cta={{ label: "Back to bag", href: "/bag" }}
      />
    );
  }

  const promo = findPromo(promoCode);
  const totals = computeTotals(
    rows.map(({ line, item }) => ({ unitPrice: item.unitPrice, quantity: line.quantity, type: item.type })),
    promo,
  );
  const hasDigital = rows.some(({ item }) => item.type === "digital");
  const { needsShipping } = totals;

  function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const fullName = String(data.get("fullName") ?? "").trim();
    const mobile = String(data.get("mobile") ?? "").trim();
    const digits = mobile.replace(/\D/g, "");

    if (!/^(09\d{9}|639\d{9})$/.test(digits)) {
      setError("Please enter a valid Philippine mobile number, e.g. 0912 345 6789.");
      return;
    }
    if (needsShipping && editingAddress) {
      setError("Please save your delivery address first.");
      return;
    }

    setError("");
    setPlacing(true);

    // TODO(backend): create a PayMongo payment here and redirect to it.
    const order = createOrder({
      contact: { fullName, email: email.trim(), mobile },
      address: needsShipping ? address : undefined,
      payment: {
        method,
        label:
          method === "ewallet"
            ? (wallets.find((w) => w.id === wallet)?.name ?? "E-wallet")
            : method === "card"
              ? "Credit / Debit card"
              : "QR Ph",
      },
      items: rows.map(({ line, item }) => ({
        key: line.key,
        name: item.name,
        image: item.image,
        options: item.options,
        unitPrice: item.unitPrice,
        quantity: line.quantity,
        type: item.type,
      })),
      totals: {
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        paymentFee: totals.paymentFee,
        total: totals.total,
      },
      promoCode: promo?.code,
    });

    removeLines(rows.map(({ line }) => line.key));
    setPromoCode(null);
    router.push(`/checkout/confirmation/${order.id}`);
  }

  return (
    <div className="mt-13 grid grid-cols-12 gap-x-5">
      {/* ---------- Details ---------- */}
      <form
        id="checkout-form"
        onSubmit={placeOrder}
        className="col-span-8 flex flex-col gap-6 self-start rounded-2xl border border-line-soft p-2"
      >
        <section className="flex flex-col gap-4">
          <SectionTitle>Contact</SectionTitle>
          <div className="flex items-start gap-4.25 px-4">
            <Field id="fullName" name="fullName" label="Full name" placeholder="john doe" autoComplete="name" required className="w-101" />
            <Field
              id="email"
              name="email"
              type="email"
              label="Email"
              placeholder="juandc@gmail.com"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Field id="mobile" name="mobile" type="tel" label="Mobile number" placeholder="0912 345 6789" autoComplete="tel" required className="flex-1" />
          </div>
          {!needsShipping && hasDigital && (
            <Note>Your files will be sent to this email and saved to your library.</Note>
          )}
        </section>

        {needsShipping && (
          <section className="flex flex-col gap-4">
            <SectionTitle>Delivery address</SectionTitle>
            {editingAddress ? (
              <AddressEditor
                initial={address}
                onCancel={() => setEditingAddress(false)}
                onSave={(next) => {
                  setChosenAddress(next);
                  setEditingAddress(false);
                }}
              />
            ) : (
              <div className="flex items-center justify-between gap-6 rounded-2xl border border-line-soft p-4">
                <div className="flex flex-col gap-3">
                  <p className="font-serif text-xl tracking-tight-2 text-black">{address.label}</p>
                  <p className="flex items-center gap-3 font-mono text-sm tracking-tight-2 text-black">
                    <span className="trim block">{address.recipient}</span>
                    <span aria-hidden className="size-0.75 rounded-full bg-black" />
                    <span className="trim block">{address.phone}</span>
                  </p>
                  <p className="font-mono text-sm tracking-tight-2 text-muted">{formatAddress(address)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setEditingAddress(true)}
                  className="shrink-0 rounded-full border border-line-dark px-4 py-2.5 transition-colors hover:border-brand"
                >
                  <span className="trim block font-mono text-base tracking-tight-2 text-black">Replace</span>
                </button>
              </div>
            )}
            {hasDigital && (
              <Note>
                Digital items in this order will be sent to {email.trim() || "the email you provide above"}.
              </Note>
            )}
          </section>
        )}

        <section className="flex flex-col gap-4">
          <SectionTitle>Payment</SectionTitle>
          <div role="radiogroup" aria-label="Payment method" className="flex items-start gap-4">
            {paymentMethods.map((m) => {
              const active = m.id === method;
              return (
                <button
                  key={m.id}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setMethod(m.id)}
                  className={cn(
                    "flex items-center gap-4 rounded-lg border px-4 py-2.5 transition-colors",
                    active ? "border-line bg-white" : "border-transparent hover:border-line",
                  )}
                >
                  <Image
                    src={m.icon}
                    alt=""
                    width={28}
                    height={25}
                    className={cn(m.iconClass, !active && "opacity-60")}
                    unoptimized
                  />
                  <span className="flex flex-col items-start gap-3 tracking-tight-2">
                    <span className={cn("trim block font-mono text-base font-bold", active ? "text-black" : "text-muted")}>
                      {m.title}
                    </span>
                    <span className="trim block font-mono text-sm text-muted">{m.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-line-soft p-4">
            {method === "ewallet" && (
              <>
                <p className="font-mono text-sm tracking-tight-2 text-black">Select your wallet</p>
                <div role="radiogroup" aria-label="Wallet" className="flex gap-2">
                  {wallets.map((w) => (
                    <button
                      key={w.id}
                      type="button"
                      role="radio"
                      aria-checked={w.id === wallet}
                      aria-label={w.name}
                      onClick={() => setWallet(w.id)}
                      className={cn(
                        "flex h-10 w-25 items-center justify-center rounded-md border p-2.5 transition-colors",
                        w.id === wallet ? "border-brand ring-1 ring-brand" : "border-line-dark hover:border-brand",
                      )}
                    >
                      <span className={cn("relative block", w.logoClass)}>
                        <Image src={w.logo} alt="" fill sizes="80px" className="object-contain" />
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {method === "card" && (
              <p className="font-mono text-sm text-muted">
                You’ll enter your card details on PayMongo’s secure page after placing your order.
              </p>
            )}
            {method === "qrph" && (
              <p className="font-mono text-sm text-muted">
                A QR Ph code will appear after you place your order. Scan it with any bank or e-wallet app.
              </p>
            )}
          </div>
        </section>
      </form>

      {/* ---------- Summary ---------- */}
      <aside className="sticky top-49.75 col-span-4 col-start-9 self-start overflow-hidden rounded-2xl border border-line-soft bg-white">
        <div className="flex items-center justify-between p-4">
          <h2 className="font-serif text-2xl text-black">Order summary</h2>
          <Link href="/bag" aria-label="Edit your bag" className="relative size-10 transition-opacity hover:opacity-80">
            <Image src="/icons/edit-circle.svg" alt="" fill unoptimized />
          </Link>
        </div>

        <div className="flex flex-col gap-6 px-4 py-5.75">
          <ul className="flex flex-col">
            {rows.map(({ line, item }) => (
              <li key={line.key} className="flex items-center justify-between gap-4 py-4 pr-4">
                <div className="flex items-center gap-3.5">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-placeholder">
                    <Image src={item.image} alt="" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex flex-col gap-3">
                    <span className="trim block font-mono text-base font-bold text-black">
                      {item.name} x {line.quantity}
                    </span>
                    {item.options.length > 0 && (
                      <span className="trim block font-mono text-sm tracking-tight-2 text-muted">
                        {item.options.join(" • ")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="trim block font-mono text-base font-bold whitespace-nowrap text-black">
                  {formatPeso(item.unitPrice * line.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div aria-hidden className="h-px bg-line-soft" />

          <dl className="flex flex-col gap-4 font-mono text-base">
            <div className="flex items-center justify-between">
              <dt className="trim text-muted">
                Subtotal ({totals.itemCount} {totals.itemCount === 1 ? "item" : "items"})
              </dt>
              <dd className="trim font-bold text-black">{formatPeso(totals.subtotal)}</dd>
            </div>
            {promo && totals.discount > 0 && (
              <div className="flex items-center justify-between">
                <dt className="trim text-muted">Discount ({promo.code})</dt>
                <dd className="trim font-bold text-success">−{formatPeso(totals.discount)}</dd>
              </div>
            )}
            <div className="flex items-center justify-between">
              <dt className="trim text-muted">Shipping</dt>
              <dd className="trim font-bold text-black">
                {!needsShipping
                  ? "Not needed"
                  : totals.freeShipping
                    ? "Free standard"
                    : `${formatPeso(totals.shipping)} standard`}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="trim text-muted">Payment fee</dt>
              <dd className="trim font-bold text-black">{formatPeso(totals.paymentFee)}</dd>
            </div>
          </dl>

          <div aria-hidden className="h-px bg-line-soft" />

          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <span className="trim block font-mono text-base text-muted">Estimated total</span>
              <span className="trim block font-mono text-30 font-bold text-black">{formatPeso(totals.total)}</span>
            </div>
            <div className="flex flex-col gap-5.75">
              <button
                type="submit"
                form="checkout-form"
                disabled={placing}
                className="flex h-9 w-full items-center justify-center rounded-full bg-brand px-4 text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                <span className="trim block font-serif text-sm">
                  {placing ? "Placing your order…" : `Place order (${formatPeso(totals.total)})`}
                </span>
              </button>
              {error && (
                <p aria-live="polite" className="font-mono text-xs text-promo">
                  {error}
                </p>
              )}
              <p className="text-center font-mono text-xs leading-5 text-muted">
                By placing your order, you agree to our{" "}
                <Link href="/terms" className="font-bold text-black underline">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy-policy" className="font-bold text-black underline">
                  Privacy Policy
                </Link>
                . Payments are processed securely by PayMongo.
              </p>
            </div>
          </div>
        </div>
      </aside>
    </div>
  );
}