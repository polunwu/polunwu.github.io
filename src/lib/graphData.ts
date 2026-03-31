import type { NodeObject, LinkObject } from "react-force-graph-2d";
import { collection } from "@/data/collection";

export type GraphNodeType = "project" | "tech" | "domain" | "capability";

interface NodeCustomFields {
  label: string;
  nodeType: GraphNodeType;
  slug?: string;
  description?: string;
  yearStart?: number;
  yearEnd?: number;
  connectedCount?: number;
}

interface LinkCustomFields {
  linkType: "tech" | "domain" | "capability";
}

export type GraphNode = NodeObject<NodeCustomFields>;
export type GraphLink = LinkObject<NodeCustomFields, LinkCustomFields>;
export type GraphData = { nodes: GraphNode[]; links: GraphLink[] };

export function buildGraphData(): GraphData {
  const nodeMap = new Map<string, GraphNode>();
  const links: GraphLink[] = [];

  for (const item of collection) {
    // Project node
    const projectId = item.slug;
    nodeMap.set(projectId, {
      id: projectId,
      label: item.title,
      nodeType: "project",
      slug: item.slug,
      description: item.description,
      yearStart: item.yearStart,
      yearEnd: item.yearEnd,
    });

    // Tech nodes + links
    for (const tech of item.tags.tech) {
      const id = `tech:${tech}`;
      if (!nodeMap.has(id)) {
        nodeMap.set(id, { id, label: tech, nodeType: "tech", connectedCount: 0 });
      }
      links.push({ source: projectId, target: id, linkType: "tech" });
    }

    // Domain nodes + links
    for (const domain of item.tags.domain) {
      const id = `domain:${domain}`;
      if (!nodeMap.has(id)) {
        nodeMap.set(id, { id, label: domain, nodeType: "domain", connectedCount: 0 });
      }
      links.push({ source: projectId, target: id, linkType: "domain" });
    }

    // Capability nodes + links
    for (const cap of item.tags.capabilities ?? []) {
      const id = `cap:${cap}`;
      if (!nodeMap.has(id)) {
        nodeMap.set(id, { id, label: cap, nodeType: "capability", connectedCount: 0 });
      }
      links.push({ source: projectId, target: id, linkType: "capability" });
    }
  }

  // Compute connectedCount for tag nodes
  for (const link of links) {
    const targetId = link.target as string;
    const node = nodeMap.get(targetId);
    if (node && node.nodeType !== "project") {
      node.connectedCount = (node.connectedCount ?? 0) + 1;
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    links,
  };
}
