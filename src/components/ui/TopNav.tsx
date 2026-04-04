import Link from "next/link";
import Clock from "@/components/ui/Clock";
import { NavLogo, NavControls } from "@/components/ui/NavParts";

type Props = {
  backHref?: string;
  backLabel?: string;
};

export default function TopNav({
  backHref = "/collection",
  backLabel = "Collection",
}: Props) {
  return (
    <header className="fixed top-0 left-0 right-0 z-10 px-4 md:px-6 py-5 md:py-6 flex justify-between items-center bg-[var(--background)] md:bg-transparent">
      <div className="flex flex-col gap-3 md:flex-row bg-[var(--background)] px-1">
        <NavLogo />
      </div>
      <div className="flex items-center gap-4 md:gap-8">
        <Link
          href={backHref}
          className="md:hidden text-sm text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
        >
          ← {backLabel}
        </Link>
        <div className="bg-[var(--background)] px-1">
          <NavControls />
        </div>
        <Clock />
      </div>
    </header>
  );
}
