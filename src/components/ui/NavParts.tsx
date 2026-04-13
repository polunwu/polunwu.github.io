"use client";

import Link from "next/link";
import { Waypoints, Sun, Moon } from "lucide-react";
import { navLinks, contactLinks } from "@/data/nav";
import { useTheme } from "@/components/ui/ThemeProvider";

export function NavLogo() {
  return (
    <Link
      href="/"
      className="font-[family-name:var(--font-cormorant)] text-xl font-semibold leading-tight whitespace-nowrap"
      style={{ color: "var(--accent)" }}
    >
      Polun Wu
    </Link>
  );
}

type OrientationProps = {
  orientation: "row" | "col";
};

export function NavLinks({ orientation }: OrientationProps) {
  const layoutClass =
    orientation === "col" ? "flex-col gap-1" : "flex-row items-center gap-4";
  return (
    <nav className={`flex ${layoutClass}`}>
      {navLinks.map((link) => (
        <Link
          key={link.label}
          href={link.href}
          className="text-sm hover:opacity-60 transition-opacity"
          style={{ color: "var(--accent)" }}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}

export function ContactLinks({ orientation }: OrientationProps) {
  const layoutClass =
    orientation === "col" ? "flex-col gap-1" : "flex-row items-center gap-4";
  return (
    <nav className={`flex ${layoutClass}`}>
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
    </nav>
  );
}

export function NavControls() {
  const { toggle } = useTheme();
  return (
    <div className="flex items-center gap-4 mt-1">
      <Link
        href="/graph"
        aria-label="Graph"
        title="Graph"
        className="hover:opacity-60 transition-opacity"
        style={{ color: "var(--accent)" }}
      >
        <Waypoints size={16} />
      </Link>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="hover:opacity-60 transition-opacity cursor-pointer"
        style={{ color: "var(--accent)" }}
      >
        <Moon size={16} className="theme-icon-moon" />
        <Sun size={16} className="theme-icon-sun" />
      </button>
    </div>
  );
}
