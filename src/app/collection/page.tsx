import { collection } from "@/data/collection";
import CollectionCard from "@/components/ui/CollectionCard";
import Sidebar from "@/components/ui/Sidebar";
import Clock from "@/components/ui/Clock";

export default function CollectionPage() {
  return (
    <div className="min-h-screen p-4 md:p-6 grid grid-cols-[160px_1fr] gap-8 relative">
      <Sidebar />

      <main className="pt-1 pb-32">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Collection
        </h2>
        <div className="columns-2 md:columns-3 gap-6">
          {collection.map((item, i) => (
            <CollectionCard key={item.slug} item={item} coverHeight={["aspect-square", "aspect-video", "aspect-[3/4]", "aspect-[4/3]", "aspect-[2/3]"][i % 5]} />
          ))}
        </div>
      </main>

      <div className="fixed top-4 right-6 md:top-6 md:right-6">
        <Clock />
      </div>
    </div>
  );
}
