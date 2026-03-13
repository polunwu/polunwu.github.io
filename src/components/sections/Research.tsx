const papers = [
  {
    title: "Customized PEEK Implants with Microporous and Surface Modification Using 3D Printing",
    award: "2nd Place Best Paper",
    event: "ASME 13th International Conference on Micro and Nano Systems",
    year: "2019",
  },
  {
    title: "Process Optimization of PEEK 3D Printing Using Taguchi Methods",
    award: "3rd Place",
    event: "Chinese Society of Mechanical Engineers Conference, 35th",
    year: "2018",
  },
];

export default function Research() {
  return (
    <section id="research" className="px-8 py-24 md:px-16">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Research
        </h2>
        <div className="space-y-8">
          {papers.map((paper) => (
            <div key={paper.title} className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-medium">{paper.award}</p>
                <p className="text-sm text-[var(--muted)]">{paper.year}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm leading-relaxed">{paper.title}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{paper.event}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
