const navLinks = [
  { label: "Experience", href: "/#experience" },
  { label: "Collection", href: "/collection" },
  { label: "Research", href: "/#research" },
];

const contactLinks = [
  { label: "Email", href: "mailto:polunwu@gmail.com" },
  { label: "GitHub", href: "https://github.com/polunwu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/polun-wu-83a745327/" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col gap-6 pt-1 sticky top-6 self-start">
      <a
        href="/"
        className="font-[family-name:var(--font-cormorant)] text-xl font-semibold leading-tight"
        style={{ color: "var(--accent)" }}
      >
        Polun Wu
      </a>

      <nav className="flex flex-col gap-1">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="text-sm hover:opacity-60 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex flex-col gap-1">
        {contactLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </aside>
  );
}
