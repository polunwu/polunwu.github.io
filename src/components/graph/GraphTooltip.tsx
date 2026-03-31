"use client";

import type { GraphNode } from "@/lib/graphData";

type Props = {
  node: GraphNode | null;
  x: number;
  y: number;
};

export default function GraphTooltip({ node, x, y }: Props) {
  if (!node) return null;

  const isProject = node.nodeType === "project";
  const clampedX = x + 220 > (typeof window !== "undefined" ? window.innerWidth : 1200)
    ? x - 220
    : x + 12;

  return (
    <div
      className="fixed z-50 pointer-events-none max-w-[200px] transition-opacity duration-150"
      style={{
        left: clampedX,
        top: y - 8,
        background: "var(--background)",
        border: "1px solid var(--border)",
        color: "var(--foreground)",
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        lineHeight: "1.5",
        padding: "8px 10px",
      }}
    >
      {isProject ? (
        <>
          <div className="font-medium mb-1" style={{ color: "var(--accent)" }}>
            {node.label}
          </div>
          {node.yearStart && (
            <div style={{ color: "var(--muted)" }} className="mb-1">
              {node.yearStart}
              {node.yearEnd ? `–${node.yearEnd}` : "–"}
            </div>
          )}
          {node.description && (
            <div style={{ color: "var(--muted)" }}>
              {node.description.length > 100
                ? node.description.slice(0, 97) + "..."
                : node.description}
            </div>
          )}
        </>
      ) : (
        <>
          <div className="font-medium mb-1">{node.label}</div>
          <div style={{ color: "var(--muted)" }}>
            Connected to {node.connectedCount ?? 0} project
            {(node.connectedCount ?? 0) !== 1 ? "s" : ""}
          </div>
        </>
      )}
    </div>
  );
}
