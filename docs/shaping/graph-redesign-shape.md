---
shaping: true
---

# Graph Visualization Redesign — Shaping Doc

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | Viewers can immediately identify which nodes are projects | Core goal |
| R1 | Project nodes render as rounded rectangles with embedded text, solid blue background, white text | Must-have |
| R2 | Tech nodes render as small rounded rectangles with embedded text, scaling in size based on connectedCount | Must-have |
| R3 | Domain / Capability nodes are tiny solid circles (no transparency), label shown only on hover | Must-have |
| R4 | Side panel displays high-frequency tech buttons; clicking highlights related nodes and links | Must-have |
| R5 | Highlight behavior is consistent with existing click interaction | Nice-to-have |

---

## Shape C: Box Hierarchy System + Tech Filter Panel

| Part | Node Type | Shape | Size | Color |
|------|-----------|-------|------|-------|
| C1 | **Project** | Rounded rectangle, embedded text | Fixed, larger | Solid blue `#1400ff` + white text |
| C2 | **Tech** | Small rounded rectangle, embedded text | Scales with connectedCount | Dark `#1a1a1a` + white text |
| C3 | **Domain** | Tiny solid circle | Fixed, small | Light gray `#c8c8c8`, label on hover |
| C4 | **Capability** | Tiny solid circle | Fixed, smaller | Lighter gray `#e0e0e0`, label on hover |
| C5 | **Tech Filter Panel** | Pill button list, fixed to the right side of the canvas | — | Matches Tech node dark style |

### C5 Filter Panel Contents (ordered by frequency + interview relevance)

1. TypeScript
2. Vue.js
3. Next.js
4. React
5. Nuxt
6. Docker
7. Tailwind CSS
8. GSAP

---

## Visual Language Principles

- **Box = named subject** (Project and Tech both have embedded labels)
- **Dot = secondary classification** (Domain and Capability recede into the background)
- **No transparency** — all node colors are solid; hierarchy is conveyed through size and color lightness
- **On highlight** — non-related nodes drop to opacity 0.08; related nodes remain fully visible

---

## Decisions

- C5 panel position: **right side**
- Tech boxes: minimum size enforced (`min: 60×20px`), `max: 120×32px`, connectedCount scales within this range
- Project boxes: max-width enforced (`max-width: ~140px`), text wraps beyond that
