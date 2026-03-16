const papers = [
  {
    title: "Customized PEEK Implants with Microporous and Surface Modification Using 3D Printing",
    award: "2nd Place Best Paper",
    event: "ASME 13th International Conference on Micro and Nano Systems",
    year: "2019",
    href: "/collection/peek-implants",
  },
  {
    title: "Process Optimization of PEEK 3D Printing Using Taguchi Methods",
    award: "3rd Place",
    event: "Chinese Society of Mechanical Engineers Conference, 35th",
    year: "2018",
    href: "/collection/peek-implants",
  },
];

export default function Research() {
  return (
    <section id="research">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Research
        </h2>
        <div className="flex flex-col gap-12">
          {papers.map((paper) => (
            <a
              key={paper.title}
              href={paper.href}
              className="grid md:grid-cols-3 gap-4 md:gap-8 -mx-2 px-2 py-2 -my-2 hover:bg-[var(--border)]/20 transition-colors duration-200 group"
            >
              <div>
                <p className="text-sm font-medium group-hover:text-[var(--accent)] transition-colors duration-200">{paper.award}</p>
                <p className="text-sm text-[var(--muted)]">{paper.year}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm leading-relaxed underline underline-offset-2 decoration-[var(--border)] group-hover:decoration-[var(--muted)] transition-colors duration-200">{paper.title}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{paper.event}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
