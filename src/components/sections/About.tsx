export default function About() {
  return (
    <section id="about">
      <h2 className="font-[family-name:var(--font-cormorant)] text-xl italic font-medium mb-6 text-[var(--foreground)]">
        Software engineer across systems, interfaces, and intelligence.
      </h2>
      <ol className="space-y-4 text-sm text-[var(--muted)] leading-relaxed max-w-lg list-decimal pl-5 marker:text-[var(--muted)]">
        <li>
          Frontend engineer for 5+ years, now moving into backend and AI
          systems.
        </li>
        <li>
          Currently building a retrieval-augmented generation (RAG) system from
          scratch to understand how LLMs work.
        </li>
        <li>Previously did graduate research in biomedical 3D printing.</li>
      </ol>
    </section>
  );
}
