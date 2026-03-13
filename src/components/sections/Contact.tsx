const links = [
  { label: "Email", href: "mailto:polunwu@gmail.com", display: "polunwu@gmail.com" },
  { label: "GitHub", href: "https://github.com/polunwu", display: "github.com/polunwu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/polun-wu-83a745327/", display: "linkedin.com/in/polun-wu" },
];

export default function Contact() {
  return (
    <section id="contact" className="px-8 py-24 md:px-16">
      <div className="max-w-4xl">
        <h2 className="text-xs uppercase tracking-widest text-[var(--muted)] mb-12">
          Contact
        </h2>
        <div className="space-y-3">
          {links.map((link) => (
            <div key={link.label} className="flex gap-8 items-baseline">
              <span className="text-sm text-[var(--muted)] w-20">{link.label}</span>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-[var(--muted)] transition-colors"
              >
                {link.display}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
