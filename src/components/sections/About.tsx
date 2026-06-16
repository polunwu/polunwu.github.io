export default function About() {
  return (
    <section id="about">
      <h2 className="font-[family-name:var(--font-cormorant)] text-xl italic font-medium mb-6 text-[var(--foreground)]">
        Software Engineer at the intersection of systems, interfaces, and
        intelligence.
      </h2>
      <div className="space-y-4 text-sm text-[var(--muted)] leading-relaxed max-w-lg">
        <p>
          吳柏論 Polun Wu is a software engineer driven by curiosity about how
          complex systems are designed and built. After more than five years in
          frontend engineering, his interests have expanded into backend
          systems, AI infrastructure, and software architecture. His latest side
          project is a retrieval-augmented generation (RAG) system built from
          scratch to better explore the mechanics behind modern LLMs system.
        </p>
        <p>
          Before entering the software industry, Polun conducted graduate
          research in biomedical 3D printing, where he developed a strong
          foundation in research methodology and analytical thinking. His
          professional experience shaped his ability to translate product ideas
          into maintainable software while collaborating across engineering,
          design, and research.
        </p>
        <p>
          Polun values depth over hype. He enjoys reasoning from first
          principles, pays close attention to implementation details, and
          believes good software comes from thoughtful, research-driven
          engineering.
        </p>
      </div>
    </section>
  );
}
