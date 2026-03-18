type Highlight = { text: string; href?: string };

const experiences = [
  {
    company: "GILOO Group Limited",
    role: "Software Engineer",
    period: "09/2021 – Present",
    location: "Remote, Taipei",
    highlights: [
      {
        text: "Optimized Core Web Vitals for a 100K+ MAU streaming platform, reducing load times by 56% with LCP < 2s and CLS = 0.00 on critical pages",
        href: "/collection/giloo-platform",
      },
      {
        text: "Led frontend infrastructure modernization (Next.js, TypeScript, TanStack Query) to improve developer experience and UI scalability with shadcn/ui",
        href: "/collection/giloo-platform",
      },
      {
        text: "Established Cypress E2E testing covering 90+ complex data-driven user scenarios to ensure platform stability and reliability",
        href: "/collection/giloo-platform",
      },
      {
        text: "Built a content-creator system with streamlined video uploads, modular publishing workflows, and revenue management",
        href: "/collection/creator-system",
      },
      {
        text: "Implemented internationalization capabilities for Taiwan, Hong Kong, and U.S. markets, including multi-language and multi-currency support",
        href: "/collection/giloo-platform",
      },
      {
        text: "Mentored a new engineer and standardized onboarding and code review processes to improve team collaboration",
        href: "/collection/giloo-platform",
      },
    ] as Highlight[],
  },
  {
    company: "Polish Design",
    role: "Frontend Engineer",
    period: "02/2020 – 09/2021",
    location: "Remote, Taipei",
    highlights: [
      {
        text: "Developed browser-based 3D visualizations and mobile AR interactive experiences",
        href: "/collection/3d-ar-experiences",
      },
      {
        text: "Designed and implemented interactive web animations using GSAP and CSS animations to enhance visual storytelling",
      },
      {
        text: "Contributed to the restructuring of 40+ pages in a major platform redesign, introducing modern web and UI frameworks to improve scalability",
        href: "/collection/network-management-platform",
      },
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
            <div key={exp.company} className="grid md:grid-cols-3 gap-8 group">
              <div>
                <p className="font-medium group-hover:text-[var(--accent)] transition-colors duration-200">
                  {exp.company}
                </p>
                <p className="text-sm text-[var(--muted)] mt-1">{exp.role}</p>
                <p className="text-sm text-[var(--muted)]">{exp.period}</p>
              </div>
              <ul className="md:col-span-2 space-y-3">
                {exp.highlights.map((h, i) => (
                  <li
                    key={i}
                    className="text-sm text-[var(--muted)] leading-relaxed border-l border-[var(--border)]"
                  >
                    {h.href ? (
                      <a
                        href={h.href}
                        className="block pl-4 py-1 -my-1 underline underline-offset-2 decoration-[var(--border)] hover:text-[var(--foreground)] hover:bg-[var(--border)]/20 hover:decoration-[var(--muted)] transition-colors duration-200"
                      >
                        {h.text}
                      </a>
                    ) : (
                      <span className="block pl-4">{h.text}</span>
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
