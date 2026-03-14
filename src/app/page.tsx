import Sidebar from "@/components/ui/Sidebar";
import Clock from "@/components/ui/Clock";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Research from "@/components/sections/Research";
import Education from "@/components/sections/Education";

export default function Home() {
  return (
    <div className="min-h-screen p-4 md:p-6 grid grid-cols-[160px_1fr] gap-8 relative">
      <Sidebar />

      <main className="space-y-16 pt-1 pb-32">
        <About />
        <Experience />
        <Research />
        <Education />
      </main>

      <div className="fixed top-4 right-6 md:top-6 md:right-6">
        <Clock />
      </div>
    </div>
  );
}
