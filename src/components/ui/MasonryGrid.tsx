"use client";

import { useEffect, useState } from "react";
import { CollectionItem } from "@/data/collection";
import CollectionCard from "@/components/ui/CollectionCard";

// Tailwind breakpoints: <640 → 1 col, 640–767 → 2 cols, ≥768 → 3 cols.
function columnsForWidth(width: number): number {
  if (width >= 768) return 3;
  if (width >= 640) return 2;
  return 1;
}

export default function MasonryGrid({ items }: { items: CollectionItem[] }) {
  // Start at the desktop count so the SSR/first-paint markup matches the
  // common case; corrected on mount for narrower viewports.
  const [cols, setCols] = useState(3);

  useEffect(() => {
    const update = () => setCols(columnsForWidth(window.innerWidth));
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Round-robin by index so reading left-to-right across the top row yields
  // items 0,1,2…, the next row 3,4,5…, while each column stays tightly stacked.
  const columns: CollectionItem[][] = Array.from({ length: cols }, () => []);
  items.forEach((item, i) => columns[i % cols].push(item));

  return (
    <div className="flex gap-6 items-start">
      {columns.map((col, i) => (
        <div key={i} className="flex flex-1 flex-col gap-6 min-w-0">
          {col.map((item) => (
            <CollectionCard key={item.slug} item={item} />
          ))}
        </div>
      ))}
    </div>
  );
}
