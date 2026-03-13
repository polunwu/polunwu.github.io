export default function About() {
  return (
    <section id="about" className="px-8 py-24 md:px-16">
      <div className="max-w-4xl grid md:grid-cols-2 gap-16 items-start">
        <div className="aspect-square bg-[var(--border)] rounded-sm">
          {/* Photo placeholder */}
        </div>
        <div className="space-y-5 text-[var(--muted)] leading-relaxed">
          <p>
            Polun Wu is an engineer driven by curiosity about what&apos;s next.
          </p>
          <p>
            His path spans mechanical engineering research in precision 3D
            printing, building interactive web products and streaming platforms,
            and now exploring AI systems — not as a series of pivots, but as the
            same instinct: go where technology is moving and build something
            meaningful there.
          </p>
          <p>
            In an era where AI makes writing code easier, Polun believes the
            real leverage has shifted upstream — to seeing the right problem,
            understanding the system, and knowing how to connect the right
            engineering resources to solve it. His cross-domain background makes
            him a natural collaborator — equally comfortable working with
            researchers, designers, product managers, and engineers.
          </p>
        </div>
      </div>
    </section>
  );
}
