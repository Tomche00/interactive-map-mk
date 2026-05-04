
Looking at this Macedonia Explorer app, here are meaningful improvements I'd suggest, grouped by impact.

## High-impact improvements

**1. Search bar on the map**
Add a search input above/inside the map that filters pins by name (EN + MK), description, or type. Results could highlight matching pins and optionally pan/zoom focus. Big UX win for 288 locations.

**2. Click-to-open detail panel (instead of hover-only)**
Hover tooltips are great on desktop but unreliable on mobile/touch. Add a click behavior that opens a side drawer (using existing `Sheet` component) with full details, photo placeholder, coordinates, "Open in Google Maps" + "Open in Apple Maps" + "Copy coordinates" buttons.

**3. Real interactive map (Leaflet/MapLibre) as optional upgrade**
The static image + percent-positioned pins is clean but limits zoom/pan. A lightweight Leaflet layer with OSM tiles would unlock zoom, clustering for dense areas (Skopje, Ohrid), and better mobile UX. Could keep the stylized image as a "stylized" toggle.

**4. Pin clustering**
Even without switching map libs, cluster overlapping pins (e.g., several monuments in the same town) into a single grouped pin that expands on hover/click. Reduces visual noise.

## Medium-impact polish

**5. Favorites / saved locations**
Let users star locations (persisted in `localStorage`). Add a "Favorites" filter chip and badge count.

**6. Share a location**
"Copy link" button on each pin that produces a URL like `/?location=ohrid` which auto-opens that pin's tooltip/drawer on load. Great for sharing.

**7. Region/area grouping**
Add a secondary filter for regions (Pelagonia, Polog, Skopje, Southwestern, etc.) so users can narrow by geography, not just type.

**8. Stats / "Explore random" button**
A "Surprise me" button that picks a random visible pin and opens its details — great for discovery.

## Quality / technical

**9. Image asset cleanup**
Multiple unused JSON files in `src/data/` (`locations - v2.json`, `locations0.json`, `locations00 (1).json`, `locations00 (2).json`) and `:Zone.Identifier` files in `src/assets/`. Delete them to clean the project.

**10. SEO + meta tags**
Add proper `<title>`, `description`, OpenGraph image, and structured data per route in `index.html` / per page. Currently likely default Lovable meta.

**11. Accessibility pass**
- Pins are `<div>` with click handlers — should be `<button>` with `aria-label`
- Language toggle button needs `aria-label` reflecting current state
- Tooltip should be keyboard-reachable (Tab through pins)

**12. Loading + empty states**
"No locations match filters" empty state when user deselects all categories.

## Recommendation

The highest user-visible wins are **#1 (search)**, **#2 (click-to-open detail panel)**, and **#6 (shareable location URLs)**. These three together would make the app feel meaningfully more useful without large architectural changes.

I'll let the user pick which direction to go rather than bundle everything.
