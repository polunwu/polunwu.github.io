"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import ForceGraph2D, { type ForceGraphMethods } from "react-force-graph-2d";
import { forceCollide, forceX, forceY } from "d3-force";
import type { GraphData, GraphNode, GraphLink } from "@/lib/graphData";
import GraphTooltip from "./GraphTooltip";

type Props = { data: GraphData };
type TooltipState = { node: GraphNode } | null;

const FEATURED_TECHS = [
  "TypeScript",
  "Vue.js",
  "Next.js",
  "React",
  "Nuxt",
  "Docker",
  "Tailwind CSS",
  "GSAP",
];

// Screen-pixel constants (all divided by globalScale inside canvas callbacks)
const PROJECT_FONT = 11;
const PROJECT_PAD_X = 10;
const PROJECT_PAD_Y = 7;
const PROJECT_MAX_TEXT_W = 120;
const PROJECT_CORNER = 4;

const TECH_MIN_FONT = 9;
const TECH_MAX_FONT = 11;
const TECH_PAD_X = 7;
const TECH_PAD_Y = 5;
const TECH_MIN_W = 52;
const TECH_MAX_W = 108;
const TECH_CORNER = 3;
const TECH_MAX_COUNT = 4; // max connectedCount in this dataset

function drawRoundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
}

function getWrappedLines(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function resolveNode(val: GraphNode["id"] | GraphNode | undefined): GraphNode | null {
  if (!val) return null;
  if (typeof val === "object") return val as GraphNode;
  return null;
}

export default function ForceGraphClient({ data }: Props) {
  const fgRef = useRef<ForceGraphMethods<GraphNode, GraphLink> | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState({ width: 800, height: 600 });
  const [tooltip, setTooltip] = useState<TooltipState>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [highlightNodeIds, setHighlightNodeIds] = useState<Set<string>>(new Set());
  const [highlightLinkIds, setHighlightLinkIds] = useState<Set<string>>(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const draggingRef = useRef<string | null>(null);

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

  // Track mouse for tooltip placement
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      setTooltipPos({ x: e.clientX, y: e.clientY });
    };
    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  const getNodeId = (node: GraphNode): string => String(node.id ?? "");

  const applyHighlight = useCallback(
    (id: string) => {
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
      setSelectedNodeId(id);
      setHighlightNodeIds(newNodeIds);
      setHighlightLinkIds(newLinkIds);
    },
    [data.links]
  );

  const clearHighlight = useCallback(() => {
    setSelectedNodeId(null);
    setHighlightNodeIds(new Set());
    setHighlightLinkIds(new Set());
  }, []);


  // Force simulation tuning
  useEffect(() => {
    if (!fgRef.current) return;
    const fg = fgRef.current;
    fg.d3Force("link")?.distance((link: GraphLink) => {
      const lt = link.linkType;
      if (lt === "tech") return 160;
      if (lt === "domain") return 280;
      return 340;
    });
    fg.d3Force("charge")?.strength(-450);
    fg.d3Force("x", forceX(0).strength(0.06));
    fg.d3Force("y", forceY(0).strength(0.06));
    fg.d3Force(
      "collide",
      forceCollide((node: GraphNode) => {
        const type = node.nodeType ?? "tech";
        if (type === "project") return 85;
        if (type === "tech") return 22 + Math.sqrt(node.connectedCount ?? 1) * 8;
        return 12;
      }).strength(1)
    );
    const timer = setTimeout(() => fg.zoomToFit(400, 60), 600);
    return () => clearTimeout(timer);
  }, []);

  const handleNodeHover = useCallback((node: GraphNode | null) => {
    setTooltip(node ? { node } : null);
    if (containerRef.current) {
      const isClickable = node?.nodeType === "project" || node?.nodeType === "tech";
      containerRef.current.style.cursor = isClickable ? "pointer" : "default";
    }
  }, []);

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (node.nodeType === "project" && node.slug) {
        window.location.href = `/collection/${node.slug}`;
        return;
      }
      const id = getNodeId(node);
      if (selectedNodeId === id) {
        clearHighlight();
      } else {
        applyHighlight(id);
      }
    },
    [selectedNodeId, applyHighlight, clearHighlight]
  );

  const handleBackgroundClick = useCallback(() => {
    clearHighlight();
    setTooltip(null);
  }, [clearHighlight]);

  const nodeCanvasObject = useCallback(
    (node: GraphNode, ctx: CanvasRenderingContext2D, globalScale: number) => {
      const id = getNodeId(node);
      const type = node.nodeType ?? "tech";
      const hasSelection = highlightNodeIds.size > 0;
      const isHighlighted = highlightNodeIds.has(id);
      const alpha = hasSelection && !isHighlighted ? 0.1 : 1;
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const gs = globalScale;

      ctx.save();
      ctx.globalAlpha = alpha;

      if (type === "project") {
        const fontSize = PROJECT_FONT / gs;
        ctx.font = `500 ${fontSize}px "IBM Plex Mono", monospace`;
        const maxTW = PROJECT_MAX_TEXT_W / gs;
        const lines = getWrappedLines(ctx, node.label ?? "", maxTW);
        const lineH = fontSize * 1.35;
        const textW = Math.max(...lines.map((l) => ctx.measureText(l).width));
        const padX = PROJECT_PAD_X / gs;
        const padY = PROJECT_PAD_Y / gs;
        const boxW = textW + padX * 2;
        const boxH = lines.length * lineH + padY * 2;
        const bx = x - boxW / 2;
        const by = y - boxH / 2;
        const r = PROJECT_CORNER / gs;

        drawRoundedRect(ctx, bx, by, boxW, boxH, r);
        ctx.fillStyle = "#1400ff";
        ctx.fill();

        if (isHighlighted && hasSelection) {
          drawRoundedRect(
            ctx,
            bx - 1.5 / gs,
            by - 1.5 / gs,
            boxW + 3 / gs,
            boxH + 3 / gs,
            r + 1.5 / gs
          );
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 1.5 / gs;
          ctx.stroke();
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const totalTextH = lines.length * lineH;
        lines.forEach((line, i) => {
          const ly = y - totalTextH / 2 + i * lineH + lineH / 2;
          ctx.fillText(line, x, ly);
        });
      } else if (type === "tech") {
        const t = Math.min(
          ((node.connectedCount ?? 1) - 1) / (TECH_MAX_COUNT - 1),
          1
        );
        const fontSize = (TECH_MIN_FONT + t * (TECH_MAX_FONT - TECH_MIN_FONT)) / gs;
        ctx.font = `${fontSize}px "IBM Plex Mono", monospace`;
        const padX = TECH_PAD_X / gs;
        const minW = TECH_MIN_W / gs;
        const maxW = TECH_MAX_W / gs;
        const rawTW = ctx.measureText(node.label ?? "").width;
        const boxW = Math.min(Math.max(rawTW + padX * 2, minW), maxW);
        const minH = (TECH_MIN_FONT + TECH_PAD_Y * 2) / gs;
        const maxH = (TECH_MAX_FONT + TECH_PAD_Y * 2) / gs;
        const boxH = minH + t * (maxH - minH);
        const bx = x - boxW / 2;
        const by = y - boxH / 2;
        const r = TECH_CORNER / gs;

        drawRoundedRect(ctx, bx, by, boxW, boxH, r);
        ctx.fillStyle = "#1a1a1a";
        ctx.fill();

        if (isHighlighted && hasSelection) {
          drawRoundedRect(
            ctx,
            bx - 1.5 / gs,
            by - 1.5 / gs,
            boxW + 3 / gs,
            boxH + 3 / gs,
            r + 1.5 / gs
          );
          ctx.strokeStyle = "#1400ff";
          ctx.lineWidth = 1.5 / gs;
          ctx.stroke();
        }

        ctx.fillStyle = "#ffffff";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(node.label ?? "", x, y);
      } else {
        // domain / capability — small solid circle, no label (tooltip handles it)
        const r = (type === "domain" ? 4 : 3) / gs;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fillStyle = type === "domain" ? "#c8c8c8" : "#d8d8d8";
        ctx.fill();

        if (isHighlighted && hasSelection) {
          ctx.strokeStyle = "#1400ff";
          ctx.lineWidth = 1 / gs;
          ctx.stroke();
        }
      }

      ctx.restore();
    },
    [highlightNodeIds]
  );

  const nodePointerAreaPaint = useCallback(
    (
      node: GraphNode,
      color: string,
      ctx: CanvasRenderingContext2D,
      globalScale: number
    ) => {
      const type = node.nodeType ?? "tech";
      const x = node.x ?? 0;
      const y = node.y ?? 0;
      const gs = globalScale;
      ctx.fillStyle = color;

      if (type === "project") {
        const w = (PROJECT_MAX_TEXT_W + PROJECT_PAD_X * 2) / gs;
        const h = (PROJECT_FONT * 2.7 + PROJECT_PAD_Y * 2) / gs;
        ctx.fillRect(x - w / 2, y - h / 2, w, h);
      } else if (type === "tech") {
        const w = TECH_MAX_W / gs;
        const h = (TECH_MAX_FONT + TECH_PAD_Y * 2) / gs;
        ctx.fillRect(x - w / 2, y - h / 2, w, h);
      } else {
        const r = (type === "domain" ? 4 : 3) / gs + 6 / gs;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, 2 * Math.PI);
        ctx.fill();
      }
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

      let color =
        link.linkType === "tech"
          ? "rgba(20,0,255,0.15)"
          : link.linkType === "domain"
          ? "rgba(107,107,107,0.2)"
          : "rgba(107,107,107,0.12)";

      if (hasSelection && !isHighlighted) {
        color = "rgba(200,200,200,0.05)";
      } else if (hasSelection && isHighlighted) {
        color =
          link.linkType === "tech"
            ? "rgba(20,0,255,0.5)"
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

  const handleTechPillClick = useCallback(
    (tech: string) => {
      const id = `tech:${tech}`;
      if (selectedNodeId === id) {
        clearHighlight();
      } else {
        applyHighlight(id);
      }
    },
    [selectedNodeId, applyHighlight, clearHighlight]
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
        onNodeDrag={(node, translate) => {
          const id = getNodeId(node);
          if (draggingRef.current !== id) {
            draggingRef.current = id;
            applyHighlight(id);
          }
          if (Math.abs(translate.x) > 2 || Math.abs(translate.y) > 2) {
            fgRef.current?.d3ReheatSimulation();
          }
        }}
        onNodeDragEnd={() => {
          draggingRef.current = null;
          clearHighlight();
          fgRef.current?.d3ReheatSimulation();
        }}
      />

      {/* Tech filter panel — desktop: right side vertical */}
      <div className="absolute top-1/2 right-4 -translate-y-1/2 hidden md:flex flex-col gap-2 z-10">
        {FEATURED_TECHS.map((tech) => {
          const isActive = selectedNodeId === `tech:${tech}`;
          return (
            <button
              key={tech}
              onClick={() => handleTechPillClick(tech)}
              style={{ fontFamily: "var(--font-mono)" }}
              className={`px-4 py-1.5 rounded-full text-xs border shadow-xs transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-[var(--background)] text-[var(--foreground)] border-[#a0a0a0] hover:border-[#1a1a1a]"
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      {/* Tech filter panel — mobile: bottom horizontal scrollable */}
      <div className="absolute bottom-4 left-0 right-0 flex md:hidden z-10 overflow-x-auto px-4 gap-2 pb-1">
        {FEATURED_TECHS.map((tech) => {
          const isActive = selectedNodeId === `tech:${tech}`;
          return (
            <button
              key={tech}
              onClick={() => handleTechPillClick(tech)}
              style={{ fontFamily: "var(--font-mono)" }}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs border shadow-xs transition-colors cursor-pointer whitespace-nowrap ${
                isActive
                  ? "bg-[#1a1a1a] text-white border-[#1a1a1a]"
                  : "bg-[var(--background)] text-[var(--foreground)] border-[#a0a0a0]"
              }`}
            >
              {tech}
            </button>
          );
        })}
      </div>

      <GraphTooltip
        node={tooltip?.node ?? null}
        x={tooltipPos.x}
        y={tooltipPos.y}
      />
    </div>
  );
}
