"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type TocItem = { id: string; title: string };

export default function LegalToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      // Counts a section as "current" once it passes just below the sticky header
      { rootMargin: "-200px 0px -60% 0px" },
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="sticky top-50 col-span-4 self-start">
      <h2 className="font-serif text-28 text-ink">On this page</h2>
      <ol className="mt-8.75 list-decimal ps-6.75 font-mono text-lg leading-10 text-ink">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn("transition-colors hover:text-brand", active === item.id && "font-bold text-brand")}
            >
              {item.title}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}