import { buildGraphData } from "@/lib/graphData";
import Sidebar from "@/components/ui/Sidebar";
import Clock from "@/components/ui/Clock";
import GraphLoader from "@/components/graph/GraphLoader";

export default function GraphPage() {
  const data = buildGraphData();
  return (
    <div className="h-screen p-4 md:p-6 pt-20 md:pt-6 grid grid-cols-1 md:grid-cols-[160px_1fr] gap-8 relative">
      <Sidebar />

      <div className="relative w-full h-full overflow-hidden">
        <GraphLoader data={data} />
      </div>

      <div className="hidden md:block fixed top-6 right-6">
        <Clock />
      </div>
    </div>
  );
}
