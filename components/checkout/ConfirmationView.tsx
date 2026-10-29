"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import EmptyState from "@/components/ui/EmptyState";
import { formatAddress } from "@/data/account";
import { products } from "@/data/products";
import { store } from "@/data/store";
import { useOrders, type Order, type OrderItem } from "@/lib/orders";
import { cn, formatPeso } from "@/lib/utils";

const TZ = "Asia/Manila";
const dateFormat = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: TZ });
const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone: TZ });
const formatDate = (d: Date) => dateFormat.format(d);
const formatDateTime = (d: Date) => `${dateFormat.format(d)} ${timeFormat.format(d)}`;

function Dot() {
  return <span aria-hidden className="size-0.75 shrink-0 rounded-full bg-current" />;
}

/* ---------- Digital: your files ---------- */
function FilesSection({ items, purchased }: { items: OrderItem[]; purchased: Date }) {
  return (
    <section>
      <h2 className="font-serif text-30 tracking-tight-3 text-black">Your files</h2>
      <p className="mt-5.5 w-142.25 font-mono text-base tracking-tight-2 text-muted">
        Your purchase is in your library, download it anytime in your account. Go to{" "}
        <Link href="/account/library" className="font-bold text-ink underline hover:text-brand">
          My Library
        </Link>
        .
      </p>
      <ul className="mt-5 flex w-142.25 flex-col gap-3">
        {items.map((item) => {
          const product = products.find((p) => `product:${p.slug}` === item.key);
          return (
            <li
              key={item.key}
              className="flex items-center justify-between rounded-4xl border border-line-strong p-4"
            >
              <div className="flex items-center gap-6.25">
                <div className="relative size-14.75 shrink-0 overflow-hidden rounded-lg bg-placeholder">
                  <Image src={item.image} alt="" fill sizes="59px" className="object-cover" />
                </div>
                <div className="flex flex-col gap-3">
                  <p className="font-serif text-xl tracking-tight-2 text-black">{item.name}</p>
                  <p className="flex items-center gap-2 font-mono text-sm tracking-tight-2 text-muted-2">
                    {product?.file && (
                      <>
                        <span className="trim block">{product.file.format}</span>
                        <Dot />
                        <span className="trim block">{product.file.size}</span>
                        <Dot />
                      </>
                    )}
                    <span className="trim block">{formatDate(purchased)}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link
                  href="/account/library"
                  aria-label={`Open ${item.name} in your library`}
                  className="relative size-12.5 transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/file-view.svg" alt="" fill unoptimized />
                </Link>
                <Link
                  href="/account/library"
                  aria-label={`Download ${item.name}`}
                  className="relative size-12.5 transition-opacity hover:opacity-80"
                >
                  <Image src="/icons/file-download.svg" alt="" fill unoptimized />
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

/* ---------- Physical: what happens next ---------- */
function NextSteps({ order, purchased }: { order: Order; purchased: Date }) {
  const eta = new Date(purchased.getTime() + store.estimatedDeliveryDays * 86_400_000);
  const placedToday = formatDate(purchased) === formatDate(new Date());
  const upcoming = [
    { title: "Printed and packed", note: "3-4 business days" },
    { title: "Shipped", note: "Track by email" },
    { title: "Delivered", note: `Est. ${formatDate(eta)}` },
  ];

  return (
    <section>
      <h2 className="font-serif text-30 tracking-tight-3 text-black">What happens next?</h2>

      <ol className="mt-11 grid grid-cols-4 gap-3">
        <li className="flex flex-col gap-4 rounded-lg bg-done p-2">
          <Image src="/icons/step-done-check.svg" alt="" width={25} height={25} className="size-6.25" unoptimized />
          <div className="flex flex-col gap-2.5">
            <p className="font-serif text-sm text-done-ink">Order placed</p>
            <p className="font-mono text-xs text-done-sub">{placedToday ? "today" : formatDate(purchased)}</p>
          </div>
        </li>
        {upcoming.map((step, i) => (
          <li key={step.title} className="flex flex-col gap-4 rounded-lg border border-line-soft p-2">
            <span className="flex size-6.25 items-center justify-center rounded-full border border-line-soft">
              <span className="trim block font-serif text-xs text-black">{i + 2}</span>
            </span>
            <div className="flex flex-col gap-2.5">
              <p className="font-serif text-sm text-black">{step.title}</p>
              <p className="font-mono text-xs text-muted">{step.note}</p>
            </div>
          </li>
        ))}
      </ol>

      {order.address && (
        <div className="mt-16.75 grid grid-cols-2 gap-x-5">
          <div>
            <p className="font-mono text-sm font-bold tracking-tight-2 text-muted">Delivering to</p>
            <p className="mt-5.5 flex items-center gap-2 font-mono text-sm tracking-tight-2 text-muted">
              <span className="trim block font-bold">{order.address.label}</span>
              <Dot />
              <span className="trim block">{order.address.recipient}</span>
            </p>
            <p className="mt-3 font-mono text-sm tracking-tight-2 text-black">{formatAddress(order.address)}</p>
          </div>
          <div>
            <p className="font-mono text-sm font-bold tracking-tight-2 text-muted">Shipping</p>
            <p className="mt-5.5 font-mono text-sm tracking-tight-2 text-black">Standard delivery</p>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------- Receipt ---------- */
function ReceiptCell({ label, value, grow }: { label: string; value: string; grow?: boolean }) {
  return (
    <div className={cn("flex flex-col gap-3 py-3.5 font-mono text-base tracking-tight-2", grow && "flex-1")}>
      <span className="trim block text-muted">{label}</span>
      <span className="trim block font-bold whitespace-nowrap text-black">{value}</span>
    </div>
  );
}

function Receipt({ order, purchased }: { order: Order; purchased: Date }) {
  const needsShipping = order.items.some((item) => item.type === "physical");
  const { subtotal, shipping, discount, paymentFee, total } = order.totals;

  const rows = [
    { label: "Subtotal", value: formatPeso(subtotal) },
    { label: "Shipping", value: needsShipping ? (shipping === 0 ? "Free" : formatPeso(shipping)) : "—" },
    { label: "Discount", value: discount > 0 ? `−${formatPeso(discount)}` : formatPeso(0) },
    { label: "Payment fee", value: formatPeso(paymentFee) },
  ];

  return (
    <section className="col-span-6 col-start-7 -mt-3.5">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-30 tracking-tight-3 text-black">Receipt</h2>
        <button
          type="button"
          onClick={() => window.print()}
          aria-label="Save or print your receipt"
          className="relative size-12.5 transition-opacity hover:opacity-80 print:hidden"
        >
          <Image src="/icons/receipt-download.svg" alt="" fill unoptimized />
        </button>
      </div>

      <div className="mt-7.5 flex items-center gap-6.5 overflow-hidden rounded-lg border border-line-strong px-4">
        <ReceiptCell label="Paid via" value={order.payment.label} />
        <span aria-hidden className="h-15 w-px shrink-0 bg-line-strong" />
        <ReceiptCell label="Payment reference" value={`REF No. ${order.paymentReference}`} grow />
        <span aria-hidden className="h-15 w-px shrink-0 bg-line-strong" />
        <ReceiptCell label="Date paid" value={formatDateTime(purchased)} grow />
      </div>

      <ul className="mt-7.75 flex flex-col gap-4">
        {order.items.map((item) => (
          <li key={item.key} className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.75">
              <div className="relative size-9.75 shrink-0 overflow-hidden rounded-xs bg-placeholder">
                <Image src={item.image} alt="" fill sizes="39px" className="object-cover" />
              </div>
              <span className="trim block font-mono text-base tracking-tight-2 text-black">
                {item.name} x {item.quantity}
              </span>
            </div>
            <span className="trim block font-mono text-base font-bold tracking-tight-2 text-black">
              {formatPeso(item.unitPrice * item.quantity)}
            </span>
          </li>
        ))}
      </ul>

      <dl className="mt-7.75 flex flex-col gap-4 font-mono text-base tracking-tight-2">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between">
            <dt className="trim text-muted">{row.label}</dt>
            <dd className="trim font-bold text-black">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex items-center justify-between font-mono font-bold text-black">
        <span className="trim block text-base">Total paid</span>
        <span className="trim block text-32">{formatPeso(total)}</span>
      </div>
      <p className="mt-4.25 text-right font-mono text-xs text-muted">Includes VAT (12%)</p>
    </section>
  );
}

/* ---------- Page ---------- */
export default function ConfirmationView() {
  const { orderId } = useParams<{ orderId: string }>();
  const orders = useOrders();

  // Server render: saved orders aren't readable yet
  if (orders === null) return <div aria-hidden className="mt-9.25 h-150" />;

  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return (
      <EmptyState
        className="mt-12.5"
        message="We couldn’t find this order on this device. If you just paid, check your email for your receipt."
        cta={{ label: "Back to homepage", href: "/" }}
      />
    );
  }

  const purchased = new Date(order.createdAt);
  const digitalItems = order.items.filter((item) => item.type === "digital");
  const hasPhysical = order.items.some((item) => item.type === "physical");
  const footer = [
    `Sold by ${store.sellerName}`,
    store.sellerAddress,
    `TIN ${store.tin}`,
    store.supportEmail,
    `your invoice was sent to ${order.contact.email}`,
  ];

  return (
    <>
      <h1 className="mt-9.25 font-serif text-product tracking-tight-3 text-black">
        Payment received.
        <br />
        Your product is ready!
      </h1>

      <div className="mt-12.75 grid grid-cols-12 gap-x-5 gap-y-3 font-mono text-base tracking-tight-2 text-muted">
        <p className="col-span-3">Order number: {order.id}</p>
        <p className="col-span-4 col-start-4">Payment Method: {order.payment.label}</p>
        <p className="col-span-3">Transaction ID: {order.transactionId}</p>
        <p className="col-span-4 col-start-4">Date Purchased: {formatDate(purchased)}</p>
      </div>

      <div className="mt-14 grid grid-cols-12 items-start gap-x-5">
        <div className="col-span-6 flex flex-col">
          <div className="flex flex-col gap-16">
            {digitalItems.length > 0 && <FilesSection items={digitalItems} purchased={purchased} />}
            {hasPhysical && <NextSteps order={order} purchased={purchased} />}
          </div>

          <div className="mt-8 flex items-center gap-3 print:hidden">
            {hasPhysical ? (
              <>
                <Link
                  href="/account/orders"
                  className="flex h-9 items-center rounded-full bg-brand px-6 text-white transition-opacity hover:opacity-90"
                >
                  <span className="trim block font-serif text-sm">Track my order</span>
                </Link>
                <Link
                  href="/"
                  className="rounded-full border border-brand px-4 py-3 text-brand transition-colors hover:bg-brand/5"
                >
                  <span className="trim block font-serif text-sm">Continue shopping</span>
                </Link>
              </>
            ) : (
              <Link
                href="/"
                className="flex h-9 items-center rounded-full bg-brand px-6 text-white transition-opacity hover:opacity-90"
              >
                <span className="trim block font-serif text-sm">Shop more</span>
              </Link>
            )}
          </div>
        </div>

        <Receipt order={order} purchased={purchased} />
      </div>

      <ul className="mt-8 flex w-171.5 flex-wrap items-center gap-4 font-mono text-xs tracking-tight-2 text-muted">
        {footer.map((part, i) => (
          <li key={part} className="flex items-center gap-4">
            {i > 0 && <Dot />}
            <span className="trim block">{part}</span>
          </li>
        ))}
      </ul>
    </>
  );
}