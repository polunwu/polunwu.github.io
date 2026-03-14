const education = [
  {
    school: "National Central University",
    degree: "M.S. Mechanical Engineering",
    year: "2019",
  },
  {
    school: "National Central University",
    degree: "B.S. Mechanical Engineering",
    year: "2016",
  },
];

export default function Education() {
  return (
    <section id="education">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Education
        </h2>
        <div className="space-y-16">
          {education.map((item) => (
            <div key={item.degree} className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="text-sm font-medium">{item.degree}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{item.year}</p>
              </div>
              <div className="md:col-span-2">
                <p className="text-sm leading-relaxed">{item.school}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
