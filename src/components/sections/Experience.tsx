type Highlight = { text: string; href?: string };

const experiences = [
  {
    company: "GILOO Group Limited",
    role: "Software Engineer",
    period: "09/2021 – Present",
    location: "Remote, Taipei",
    highlights: [
      { text: "Improved performance on critical pages, reducing load time by 56%, achieving LCP < 2s and CLS = 0.00 for a streaming platform serving 100K+ monthly active users", href: "/collection/giloo-platform" },
      { text: "Led frontend tech stack modernization (TypeScript, React, Next.js, TanStack Query, Tailwind, shadcn/ui)", href: "/collection/giloo-platform" },
      { text: "Introduced Cypress E2E testing covering 90+ complex data ↔ user scenarios", href: "/collection/giloo-platform" },
      { text: "Built a content-creator system supporting video uploads, customizable content, and revenue management", href: "/collection/creator-system" },
      { text: "Implemented internationalization with multi-language and multi-currency support for Taiwan, Hong Kong, and the U.S.", href: "/collection/giloo-platform" },
      { text: "Mentored a junior engineer and established onboarding workflows, documentation standards, and code review processes", href: "/collection/giloo-platform" },
    ] as Highlight[],
  },
  {
    company: "Polish Design",
    role: "Frontend Engineer",
    period: "02/2020 – 09/2021",
    location: "Remote, Taipei",
    highlights: [
      { text: "Developed browser-based 3D visualizations and mobile AR interactive experiences", href: "/collection/3d-ar-experiences" },
      { text: "Designed and implemented advanced animations using CSS Animations and GSAP" },
      { text: "Introduced new web and UI frameworks, contributing to the restructuring of 30+ pages in a network management platform redesign", href: "/collection/network-management-platform" },
    ] as Highlight[],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Experience
        </h2>
        <div className="space-y-16">
          {experiences.map((exp) => (
            <div key={exp.company} className="grid md:grid-cols-3 gap-8">
              <div>
                <p className="font-medium">{exp.company}</p>
                <p className="text-sm text-[var(--muted)] mt-1">{exp.role}</p>
                <p className="text-sm text-[var(--muted)]">{exp.period}</p>
              </div>
              <ul className="md:col-span-2 space-y-3">
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--muted)] leading-relaxed pl-4 border-l border-[var(--border)]"
                  >
                    {h.href ? (
                      <a
                        href={h.href}
                        className="hover:text-[var(--foreground)] transition-colors duration-200 underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--muted)]"
                      >
                        {h.text}
                      </a>
                    ) : (
                      h.text
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
