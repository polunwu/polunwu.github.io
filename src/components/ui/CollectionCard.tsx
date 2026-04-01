import Image from "next/image";
import { CollectionItem } from "@/data/collection";

export default function CollectionCard({ item }: { item: CollectionItem }) {
  return (
    <a
      href={`/collection/${item.slug}`}
      className="block mb-6 break-inside-avoid group"
    >
      <div className={`${item.coverAspect} w-full mb-3 overflow-hidden relative`}>
        {item.cover ? (
          item.cover.endsWith(".mp4") ? (
            <video
              src={`/${item.cover}`}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={`/${item.cover}`}
              alt={item.title}
              fill
              className="object-cover"
            />
          )
        ) : (
          <div className="w-full h-full bg-[var(--border)]" />
        )}
      </div>
      <p className="text-xs text-[var(--muted)] mb-1">
        ↑ {item.yearStart}{item.yearEnd ? `–${item.yearEnd}` : ""}_{" "}
        <span className="text-[var(--foreground)] group-hover:opacity-60 transition-opacity">
          &quot;{item.title}&quot;
        </span>
      </p>
      <p className="text-xs text-[var(--muted)] leading-relaxed">
        {item.description}
      </p>
      <div className="flex flex-wrap gap-1 mt-2">
        <span className="text-xs text-[var(--accent)] opacity-60">
          {item.tags.type}
        </span>
      </div>
    </a>
  );
}
