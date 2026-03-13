export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-end px-8 pb-16 md:px-16">
      <div className="max-w-4xl">
        <h1 className="font-[family-name:var(--font-cormorant)] text-6xl md:text-8xl font-medium tracking-tight mb-6 text-[var(--accent)]">
          Polun Wu
        </h1>
        <p className="text-base md:text-lg text-[var(--muted)] max-w-xl leading-relaxed font-light">
          Engineer at the intersection of systems, interfaces, and intelligence.
        </p>
      </div>
    </section>
  );
}
