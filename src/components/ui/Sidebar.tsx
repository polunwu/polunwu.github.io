import Link from "next/link";
import { NavLogo, NavLinks, ContactLinks, NavControls } from "@/components/ui/NavParts";

export default function Sidebar() {
  return (
    <>
      {/* Mobile: fixed top header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-10 px-4 py-4 flex justify-between items-center bg-[var(--background)]">
        <NavLogo />
        <div className="flex items-center gap-4">
          {/* Collection is the only off-page nav link on mobile; Experience/Research are scroll anchors */}
          <Link
            href="/collection"
            className="text-sm hover:opacity-60 transition-opacity"
            style={{ color: "var(--accent)" }}
          >
            Collection
          </Link>
          <NavControls />
        </div>
      </header>

      {/* Desktop: sticky left sidebar */}
      <aside className="hidden md:flex flex-col gap-6 pt-1 sticky top-6 self-start">
        <NavLogo />
        <div className="flex flex-col gap-1">
          <NavLinks orientation="col" />
          <NavControls />
        </div>
        <ContactLinks orientation="col" />
      </aside>
    </>
  );
}
