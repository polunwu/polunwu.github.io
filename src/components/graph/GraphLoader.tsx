"use client";

import dynamic from "next/dynamic";
import type { GraphData } from "@/lib/graphData";

const ForceGraphClient = dynamic(() => import("./ForceGraphClient"), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: "12px",
        color: "var(--muted)",
      }}
    >
      Loading graph...
    </div>
  ),
});

export default function GraphLoader({ data }: { data: GraphData }) {
  return <ForceGraphClient data={data} />;
}
