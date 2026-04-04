---
shaping: true
---

# Sidebar & TopNav Refactor — Shaping

## Problem

- `contactLinks` is duplicated in both Sidebar and TopNav
- Both components maintain styles independently — changes in one don't propagate to the other
- Top header right side (TopNav, Sidebar mobile) includes contact links; adding a theme toggle will overflow
- Nav.tsx is an unused legacy remnant

## Requirements (R)

| ID | Requirement | Status |
|----|-------------|--------|
| R0 | `contactLinks` and `navLinks` maintained in a single source | Core goal |
| R1 | Sidebar and TopNav share UI sub-components so styles stay in sync | Core goal |
| R2 | Sidebar desktop appearance unchanged | Must-have |
| R3 | TopNav appearance unchanged (structural adjustments acceptable, visually close) | Must-have |
| R4 | Sidebar mobile header appearance unchanged (structural adjustments acceptable) | Must-have |
| R5 | Top header right side is stable — does not overflow as items are added | Must-have |
| R6 | Merge into a single component driven by props | Undecided — proceed with C first, revisit later |
| R7 | Remove Nav.tsx legacy remnant | Nice-to-have |
| R8 | Header right side contains only icon-based controls (graph, theme toggle, Clock) | Must-have |
| R9 | Contact links appear only in Sidebar desktop bottom — not in any top header | Must-have |

**Note R9:** Removing contact links from detail pages (TopNav) is acceptable for now. A footer may be considered later.

---

## Selected Shape: C — Extract constants + shared sub-components + separate contact links

| Part | Mechanism |
|------|-----------|
| C1 | `src/data/nav.ts` — exports `navLinks` and `contactLinks` |
| C2 | `<NavLogo />` — logo link with Cormorant font styles |
| C3 | `<NavLinks />` — nav link list, accepts `orientation: "row" \| "col"` |
| C4 | `<ContactLinks />` — contact link list, accepts `orientation: "row" \| "col"`; used only in Sidebar desktop |
| C5 | `<NavControls />` — icon controls area; currently holds graph icon; theme toggle slots in here later; Clock composed by parent |
| C6 | Sidebar desktop: `<NavLogo>` + `<NavLinks orientation="col">` + `<ContactLinks orientation="col">` |
| C7 | Sidebar mobile header: `<NavLogo>` + `<NavControls>` |
| C8 | TopNav: `<NavLogo>` + back link (mobile only) + `<NavControls>` + `<Clock>` |
| C9 | Delete Nav.tsx |

## Fit Check

| Req | Requirement | Status | C |
|-----|-------------|--------|---|
| R0 | `contactLinks` and `navLinks` maintained in a single source | Core goal | ✅ |
| R1 | Sidebar and TopNav share UI sub-components so styles stay in sync | Core goal | ✅ |
| R2 | Sidebar desktop appearance unchanged | Must-have | ✅ |
| R3 | TopNav appearance unchanged (structural adjustments acceptable) | Must-have | ✅ |
| R4 | Sidebar mobile header appearance unchanged (structural adjustments acceptable) | Must-have | ✅ |
| R5 | Top header right side does not overflow as items are added | Must-have | ✅ |
| R8 | Header right side contains only icon-based controls | Must-have | ✅ |
| R9 | Contact links only in Sidebar desktop bottom | Must-have | ✅ |
| R7 | Remove Nav.tsx legacy remnant | Nice-to-have | ✅ |
