import { buildGraphData } from "@/lib/graphData";
import Sidebar from "@/components/ui/Sidebar";
import Clock from "@/components/ui/Clock";
import GraphLoader from "@/components/graph/GraphLoader";

export default function GraphPage() {
  const data = buildGraphData();
  return (
    <div className="h-screen pt-15 flex flex-col md:pt-0 md:grid md:grid-cols-[160px_1fr] relative overflow-hidden">
      <div className="md:p-6">
        <Sidebar />
      </div>

      <div className="flex-1 relative w-full overflow-hidden md:h-full">
        <GraphLoader data={data} />
      </div>

      <div className="hidden md:block fixed top-6 right-6">
        <Clock />
      </div>
    </div>
  );
}
