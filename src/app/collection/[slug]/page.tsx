import { collection } from "@/data/collection";
import { notFound } from "next/navigation";
import TopNav from "@/components/ui/TopNav";
import Gallery from "@/components/ui/Gallery";

export function generateStaticParams() {
  return collection.map((item) => ({ slug: item.slug }));
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = collection.find((i) => i.slug === slug);

  if (!item) notFound();

  const { detail } = item;

  return (
    <div className="min-h-screen px-4 md:px-6 pt-20 md:pt-24">
      <TopNav />

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8">
        <div className="hidden md:block" />
        <main className="pt-1 pb-32">
          {/* Back link — desktop only (mobile shows in TopNav) */}
          <a
            href="/collection"
            className="hidden md:inline-block text-xs uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors mb-12"
          >
            ← Collection
          </a>

          {/* Metadata */}
          <div className="mb-12 space-y-1">
            <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-medium text-[var(--foreground)]">
              {detail?.projectName ?? item.title}
            </h1>
            <p className="text-xs text-[var(--muted)]">
              {item.yearStart}{item.yearEnd ? `–${item.yearEnd}` : ""}
              {detail?.role ? ` · ${detail.role}` : ""}
            </p>
            {detail?.collaboration && (
              <p className="text-xs text-[var(--muted)]">{detail.collaboration}</p>
            )}
          </div>

          {/* Descriptions */}
          {detail?.descriptions && detail.descriptions.length > 0 && (
            <div className="space-y-6 max-w-xl mb-16">
              {detail.descriptions.map((block, i) =>
                block.type === "heading" ? (
                  <h2 key={i} className="text-sm font-medium text-[var(--foreground)] mt-8">
                    {block.content}
                  </h2>
                ) : block.type === "text" ? (
                  <div key={i} className="space-y-4">
                    {block.content.split("\n\n").map((para, j) => (
                      <p key={j} className="text-sm text-[var(--muted)] leading-relaxed">
                        {para}
                      </p>
                    ))}
                  </div>
                ) : (
                  <pre
                    key={i}
                    className="text-xs text-[var(--foreground)] bg-[var(--border)] p-4 overflow-x-auto leading-relaxed"
                  >
                    <code>{block.content}</code>
                  </pre>
                )
              )}
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-16">
            {item.tags.tech.map((t) => (
              <span
                key={t}
                className="text-xs text-[var(--muted)] border border-[var(--border)] px-2 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Links */}
          {detail?.links && detail.links.length > 0 && (
            <div className="flex gap-4 mb-16">
              {detail.links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-[var(--accent)] hover:opacity-60 transition-opacity"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          )}

          {/* Gallery */}
          {detail?.gallery && detail.gallery.length > 0 && (
            <Gallery items={detail.gallery} />
          )}
        </main>
      </div>
    </div>
  );
}
