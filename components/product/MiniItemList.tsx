import Image from "next/image";
import Link from "next/link";
import { formatPeso } from "@/lib/utils";

export type MiniItem = {
  key: string;
  name: string;
  price: number;
  image?: string;
  href?: string;
  disabled?: boolean;
};

function ItemBody({ name, price, image }: Pick<MiniItem, "name" | "price" | "image">) {
  return (
    <>
      <div className="relative size-13.75 shrink-0 overflow-hidden rounded-sm bg-placeholder">
        {image && <Image src={image} alt="" fill sizes="55px" className="object-cover" />}
      </div>
      <div className="flex flex-col gap-3.75">
        <span className="trim block font-serif text-17 text-ink transition-colors group-hover:text-brand">
          {name}
        </span>
        <span className="trim block font-mono text-xs text-muted">{formatPeso(price)}</span>
      </div>
    </>
  );
}

export default function MiniItemList({ items }: { items: MiniItem[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((item) => (
        <li key={item.key} className="flex items-center justify-between gap-4">
          {item.href ? (
            <Link href={item.href} className="group flex items-center gap-3.5">
              <ItemBody {...item} />
            </Link>
          ) : (
            <div className="flex items-center gap-3.5">
              <ItemBody {...item} />
            </div>
          )}
          <button
            type="button"
            disabled={item.disabled}
            aria-label={`Add ${item.name} to bag`}
            className="shrink-0 rounded-full border border-brand px-2.5 py-2 text-brand transition-colors hover:bg-brand hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-brand"
          >
            <span className="trim block font-serif text-xs">Add</span>
          </button>
        </li>
      ))}
    </ul>
  );
}