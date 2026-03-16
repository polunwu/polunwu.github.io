import Clock from "@/components/ui/Clock";

const contactLinks = [
  { label: "Email", href: "mailto:polunwu@gmail.com" },
  { label: "GitHub", href: "https://github.com/polunwu" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/polun-wu-83a745327/" },
];

export default function TopNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-4 md:px-6 py-5 md:py-6 flex justify-between items-center">
      {/* Left: name + back link (mobile stacked) */}
      <div className="flex flex-col gap-3 bg-[var(--background)] px-1">
        <a
          href="/"
          className="font-[family-name:var(--font-cormorant)] text-xl font-semibold leading-tight whitespace-nowrap"
          style={{ color: "var(--accent)" }}
        >
          Polun Wu
        </a>
        <a
          href="/collection"
          className="md:hidden text-sm uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors py-1 -my-1"
        >
          ← Collection
        </a>
      </div>
      {/* Right: contact links (desktop) + clock */}
      <div className="flex items-center gap-8">
        <div className="hidden md:flex items-center gap-4 bg-[var(--background)] px-1">
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
        <Clock />
      </div>
    </header>
  );
}
