"use client";

import { useState } from "react";
import ProductGrid from "@/components/product/ProductGrid";
import type { Product } from "@/types";

/** Product grid that shows a few products on tablets, with "View more" for the rest */
export default function ExpandableProductGrid({
  products,
  tabletLimit = 3,
}: {
  products: Product[];
  tabletLimit?: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const hasMore = products.length > tabletLimit;

  return (
    <>
      <ProductGrid products={products} tabletLimit={expanded ? undefined : tabletLimit} />
      {hasMore && !expanded && (
        <div className="mt-7.5 flex justify-center xl:hidden">
          <button
            type="button"
            onClick={() => setExpanded(true)}
            className="rounded-full border border-brand px-4 py-3 text-brand transition-colors hover:bg-brand/5"
          >
            <span className="trim block font-serif text-sm">View more</span>
          </button>
        </div>
      )}
    </>
  );
}
