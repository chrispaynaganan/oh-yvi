import Link from "next/link";
import { Fragment } from "react";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex items-center gap-2 font-mono text-sm whitespace-nowrap">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <Fragment key={item.label}>
              {i > 0 && (
                <li aria-hidden className="trim text-tan">
                  /
                </li>
              )}
              <li className={cn("trim", isLast ? "font-bold text-black" : "text-muted")}>
                {isLast || !item.href ? (
                  <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
                ) : (
                  <Link href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}