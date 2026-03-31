"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import { forceCollide, forceX, forceY } from "d3-force";
import type { GraphData, GraphNode, GraphLink } from "@/lib/graphData";
import GraphTooltip from "./GraphTooltip";

type Props = { data: GraphData };

type TooltipState = { node: GraphNode } | null;

const NODE_RADIUS: Record<string, number> = {
  project: 14,
  tech: 5,
  domain: 5,
  capability: 4,
};

const NODE_COLOR: Record<string, string> = {
  project: "#1400ff",
  tech: "rgba(26,26,26,0.6)",
  domain: "rgba(107,107,107,0.3)",
  capability: "rgba(26,26,26,0.4)",
};

const LINK_COLOR: Record<string, string> = {
  tech: "rgba(20,0,255,0.15)",
  domain: "rgba(107,107,107,0.2)",
  capability: "rgba(107,107,107,0.12)",
};

function resolveNode(val: GraphNode["id"] | GraphNode | undefined): GraphNode | null {
  if (!val) return null;
  if (typeof val === "object") return val as GraphNode;
  return null;
}

export default function ForceGraphClient({ data }: Props) {
  const fgRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [highlightNodeIds, setHighlightNodeIds] = useState<Set<string>>(new Set());
  const [highlightLinkIds, setHighlightLinkIds] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Resize observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver((entries) => {
      const { width, height } = entries[0].contentRect;
      setDims({ width, height });
    });
    obs.observe(el);
    setDims({ width: el.clientWidth, height: el.clientHeight });
    return () => obs.disconnect();
  }, []);

  // Track mouse position for tooltip placement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  // Force simulation tuning + initial zoom
  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    fg.d3Force("link")?.distance((link: GraphLink) => {
      const lt = link.linkType;
      if (lt === "tech") return 160;
      if (lt === "domain") return 260;
      return 320;
    });
    fg.d3Force("charge")?.strength(-350);
    fg.d3Force("x", forceX(0).strength(0.06));
    fg.d3Force("y", forceY(0).strength(0.06));
    fg.d3Force("collide", forceCollide((node: GraphNode) => {
      const type = node.nodeType ?? "tech";
      const r = type === "tech"
        ? 3 + Math.sqrt(node.connectedCount ?? 1) * 2.5
        : (NODE_RADIUS[type] ?? 5);
      return r + 20;
    }).strength(1));
    const timer = setTimeout(() => {
      fg.zoomToFit(400, 60);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const getNodeId = (node: GraphNode): string => String(node.id ?? "");

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    setTooltip(node ? { node } : null);
    if (containerRef.current) {
      containerRef.current.style.cursor = node?.nodeType === "project" ? "pointer" : "default";
    }
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.nodeType === "project" && node.slug) {
        window.location.href = `/collection/${node.slug}`;
        return;
      }
      // Tag node: toggle highlight
      const id = getNodeId(node);
      if (selectedNodeId === id) {
        setSelectedNodeId(null);
        setHighlightNodeIds(new Set());
        setHighlightLinkIds(new Set());
        return;
      }
      setSelectedNodeId(id);
      const newNodeIds = new Set<string>([id]);
      const newLinkIds = new Set<string>();
      for (const link of data.links) {
        const src = resolveNode(link.source);
        const tgt = resolveNode(link.target);
        const srcId = src ? getNodeId(src) : (link.source as string);
        const tgtId = tgt ? getNodeId(tgt) : (link.target as string);
        if (srcId === id || tgtId === id) {
          newNodeIds.add(srcId);
          newNodeIds.add(tgtId);
          newLinkIds.add(`${srcId}--${tgtId}`);
        }
      }
      setHighlightNodeIds(newNodeIds);
      setHighlightLinkIds(newLinkIds);
    },
    [data.links, selectedNodeId]
  );

  const handleBackgroundClick = useCallback(() => {
    setSelectedNodeId(null);
    setHighlightNodeIds(new Set());
    setHighlightLinkIds(new Set());
    setTooltip(null);
  }, []);

  const nodeCanvasObject = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const id = getNodeId(node);
      const type = node.nodeType ?? "tech";
      const hasSelection = highlightNodeIds.size > 0;
      const isHighlighted = highlightNodeIds.has(id);
      let r = type === "tech"
        ? 3 + Math.sqrt(node.connectedCount ?? 1) * 2.5
        : (NODE_RADIUS[type] ?? 5);

      // Dimming / highlighting
      let alpha = 1;
      if (hasSelection) {
        alpha = isHighlighted ? 1 : 0.12;
        if (isHighlighted) r += 2;
      }

      ctx.save();
      ctx.globalAlpha = alpha;

      // Circle
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, r, 0, 2 * Math.PI);

      if (type === "project") {
        ctx.fillStyle = "#1400ff";
        ctx.fill();
        if (isHighlighted && hasSelection) {
          ctx.strokeStyle = "#1400ff";
          ctx.lineWidth = 1.5 / globalScale;
          ctx.stroke();
        }
      } else {
        ctx.fillStyle = NODE_COLOR[type] ?? NODE_COLOR.tech;
        ctx.fill();
        if (type === "capability") {
          ctx.strokeStyle = "#e2e0db";
          ctx.lineWidth = 0.8 / globalScale;
          ctx.stroke();
        }
        if (isHighlighted && hasSelection) {
          ctx.strokeStyle = "#1400ff";
          ctx.lineWidth = 1.5 / globalScale;
          ctx.stroke();
        }
      }

      // Labels
      const label = node.label ?? "";
      const showLabel =
        type === "project" ||
        (type !== "capability" && globalScale > 0.8) ||
        (type === "capability" && globalScale > 1.2);

      if (showLabel) {
        const fontSize = type === "project" ? 14 / globalScale : 11 / globalScale;
        ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
        ctx.textAlign = "center";
        ctx.textBaseline = "top";

        if (type === "project") {
          ctx.fillStyle = hasSelection && !isHighlighted ? "rgba(26,26,26,0.3)" : "#1a1a1a";
          ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + r + 3 / globalScale);
        } else {
          ctx.fillStyle = hasSelection && !isHighlighted ? "rgba(107,107,107,0.3)" : "#6b6b6b";
          ctx.fillText(label, node.x ?? 0, (node.y ?? 0) + r + 2 / globalScale);
        }
      }

      ctx.restore();
    },
    [highlightNodeIds]
  );

  const nodePointerAreaPaint = useCallback(
    (node: GraphNode, color: string, ctx: CanvasRenderingContext2D) => {
      const type = node.nodeType ?? "tech";
      const r = type === "tech"
        ? 3 + Math.sqrt(node.connectedCount ?? 1) * 2.5
        : (NODE_RADIUS[type] ?? 5);
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(node.x ?? 0, node.y ?? 0, r + 4, 0, 2 * Math.PI);
      ctx.fill();
    },
    []
  );

  const linkCanvasObject = useCallback(
    (link: GraphLink, ctx: CanvasRenderingContext2D) => {
      const src = resolveNode(link.source);
      const tgt = resolveNode(link.target);
      if (!src || !tgt) return;
      const srcId = getNodeId(src);
      const tgtId = getNodeId(tgt);
      const linkKey = `${srcId}--${tgtId}`;

      const hasSelection = highlightLinkIds.size > 0;
      const isHighlighted = highlightLinkIds.has(linkKey);

      let color = LINK_COLOR[link.linkType ?? "tech"] ?? LINK_COLOR.tech;
      if (hasSelection && !isHighlighted) {
        color = "rgba(200,200,200,0.06)";
      } else if (hasSelection && isHighlighted) {
        color = link.linkType === "tech"
          ? "rgba(20,0,255,0.4)"
          : "rgba(107,107,107,0.5)";
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(src.x ?? 0, src.y ?? 0);
      ctx.lineTo(tgt.x ?? 0, tgt.y ?? 0);
      ctx.stroke();
    },
    [highlightLinkIds]
  );

  return (
    <div ref={containerRef} className="absolute inset-0">
      <ForceGraph2D
        ref={fgRef}
        graphData={data}
        width={dims.width}
        height={dims.height}
        backgroundColor="var(--background)"
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        linkCanvasObject={linkCanvasObject}
        onNodeHover={handleNodeHover}
        onNodeClick={handleNodeClick}
        onBackgroundClick={handleBackgroundClick}
        nodeLabel={() => ""}
        linkDirectionalArrowLength={0}
        enableNodeDrag
        enableZoomInteraction
        enablePanInteraction
        d3AlphaDecay={0.02}
        d3VelocityDecay={0.2}
        onNodeDrag={(_node, translate) => {
          if (Math.abs(translate.x) > 2 || Math.abs(translate.y) > 2) {
            fgRef.current?.d3ReheatSimulation();
          }
        }}
        onNodeDragEnd={() => fgRef.current?.d3ReheatSimulation()}
      />
      <GraphTooltip
        node={tooltip?.node ?? null}
        x={tooltipPos.x}
        y={tooltipPos.y}
      />
    </div>
  );
}
