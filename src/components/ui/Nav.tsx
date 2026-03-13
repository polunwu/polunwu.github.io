const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-6 md:px-16">
      <a href="#" className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold tracking-tight text-[var(--accent)]">
        Polun Wu
      </a>
      <ul className="flex gap-8">
        {navLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[var(--accent)] hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
