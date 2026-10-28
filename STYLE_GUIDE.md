# decent.music Style Guide

## 1. Creative direction

**Working concept:** *The Global Coliseum*

decent.music should feel like entering the service level of a monumental concert venue: exposed concrete, matte-black shipping containers, painted wayfinding, white stencil labels, steel hardware, and concentrated pools of electric blue light.

The visual system should be industrial without feeling militaristic, distressed without feeling dirty, and monumental without becoming heavy or difficult to use.

### Core principles

1. **Monumental:** Large forms, confident spacing, and simple geometry.
2. **Functional:** Every label should feel like real venue wayfinding.
3. **Tactile:** Surfaces may suggest concrete, steel, paint, and shipping containers.
4. **Restrained:** Use texture and stencil typography as accents, not everywhere.
5. **Alive:** Decent blue represents stage light, sound energy, and active locations.

## 2. Brand signature

The existing `decent` logo remains the primary brand asset. The `.music` extension should use Decent blue and sit on the logo baseline.

### Preferred treatments

- Full-color logo on concrete white or light gray.
- Full-color logo on matte black, with sufficient clear space.
- Blue `.music` extension; do not stencil the brand name.
- Use the logo as a clean digital mark. Texture belongs around it, not over it.

### Clear space

Maintain clear space equal to the height of the lowercase `e` around the complete wordmark.

## 3. Color system

| Token | Hex | Use |
| --- | --- | --- |
| Decent Blue | `#3B86F6` | Active pins, focus rings, links, selected states, stage-light accents |
| Shipping Black | `#151515` | Header, panels, space around the globe, primary dark surface |
| Asphalt | `#242424` | Secondary dark surfaces and raised container panels |
| Charcoal Steel | `#343434` | Borders, inactive controls, dark dividers |
| Concrete | `#A6A39D` | Map land, large neutral fields, secondary surfaces |
| Concrete Light | `#D8D5CE` | Cards, content backgrounds, light structural surfaces |
| Chalk White | `#F5F3EE` | Primary text on dark surfaces and stencil labeling |
| Safety White | `#FFFFFF` | High-contrast icons and small critical labels |
| Deep Water | `#163B5B` | Oceans and water features |
| Weathered Blue | `#255C88` | Water detail and inactive map elements |
| Signal Rust | `#B95632` | Rare warning or maintenance-state accent only |

### Color ratios

- Shipping Black and Chalk White should account for roughly 65% of the interface.
- Concrete neutrals should account for roughly 25%.
- Decent Blue and other accents should remain under 10%.
- Never use Decent Blue for long passages of text.
- Do not introduce multiple bright concert-light colors. Blue is the signature light.

## 4. Typography

The typography system combines architectural utility with a small amount of stencil character.

### Font roles

| Role | Typeface | Treatment |
| --- | --- | --- |
| Brand | Existing Decent wordmark | Preserve as image asset |
| Display | `Roboto Condensed`, `Arial Narrow`, sans-serif | Bold, compact, monumental |
| Interface/body | `Inter`, system-ui, sans-serif | Clear and neutral |
| Stencil labels | `Stardos Stencil`, `Roboto Mono`, monospace | Uppercase, spaced, used sparingly |
| Data/numbers | `Roboto Mono`, monospace | Capacities, ranks, coordinates, counts |

### Type scale

```css
--type-display: clamp(3rem, 8vw, 7.5rem);
--type-h1: clamp(2.25rem, 5vw, 4.5rem);
--type-h2: clamp(1.65rem, 3vw, 2.75rem);
--type-body: 1rem;
--type-label: 0.75rem;
--type-micro: 0.6875rem;
```

### Stencil-label rules

- Use uppercase only.
- Use letter spacing between `0.12em` and `0.2em`.
- Keep labels short: `VENUE 042`, `CAPACITY`, `EUROPE`, `ACTIVE`.
- Prefer Chalk White on Shipping Black.
- Allow slight paint wear as a decorative mask only at large sizes.
- Never distress small text or accessibility-critical information.

## 5. Materials and texture

### Concrete

Concrete is the architectural base. Use low-contrast grain, broad tonal variation, and occasional formwork seams.

- Texture opacity: 3–7%.
- Avoid high-frequency noise behind text.
- Use seams to reinforce the layout grid, not as random decoration.
- Corners are firm: `0–4px` for structural panels.

### Shipping containers

Black shipping containers inspire cards, drawers, search panels, and venue detail surfaces.

- Matte black or asphalt fill.
- Thin charcoal border.
- Subtle vertical corrugation at 2–4% contrast.
- White stencil identification near a top or bottom edge.
- Small steel details may appear as corner blocks or fasteners.
- Do not make every component corrugated; reserve the effect for major panels.

### Paint and light

- White labels should resemble painted wayfinding.
- Decent Blue behaves like stage lighting: glow is allowed only around active pins and selected controls.
- Keep blue glow soft and localized; avoid neon cyberpunk styling.

## 6. Layout and grid

Use an architectural grid based on **8px**, with larger structural divisions at **24px**, **48px**, and **96px**.

### Desktop

- Header: 72–84px tall.
- Map fills the remaining viewport.
- Primary information panel: 360–440px wide.
- Panels align to viewport edges like installed venue infrastructure.
- Prefer asymmetrical placement to centered floating cards.

### Mobile

- Header: 64–72px tall.
- Venue detail becomes a bottom sheet.
- Minimum touch target: 44×44px.
- Keep the globe visible above the bottom sheet.
- Stencil labels remain accents, not body copy.

## 7. Map direction

The globe is the primary visual stage.

### Globe palette

- Space/sky: Shipping Black `#151515`.
- Water: Deep Water `#163B5B` with restrained lighter details.
- Land: Concrete `#A6A39D` with muted natural variation.
- Country and administrative borders: hidden.
- Basemap labels: hidden.
- Major roads: optional and heavily muted.

### Venue markers

- Individual venue: Decent Blue center with a Chalk White ring.
- Selected venue: larger blue marker with a restrained glow.
- Cluster: black circular plate, blue outer ring, white mono count.
- Do not use novelty music-note or microphone pins.
- Pin motion should resemble a stage light coming online, not bouncing.

### Globe motion

- Begin with a slow rotation on initial load.
- Stop immediately upon pointer, touch, keyboard, or zoom interaction.
- Respect `prefers-reduced-motion`.
- Resetting the globe may restart rotation.

## 8. Components

### Header

- Matte-black container surface.
- Decent logo at left.
- Small white stencil utility labels at right.
- Active actions use Decent Blue.
- Avoid a conventional marketing navigation bar.

### Intro panel

- Treat as a black shipping-container placard.
- White condensed headline.
- Small stencil eyebrow.
- One blue primary action.
- Square or minimally rounded corners.

### Venue detail panel

- Container-black surface with subtle corrugation.
- Venue name in condensed display type.
- Location in white stencil or mono labeling.
- Capacity displayed as a large mono number.
- Field labels in muted concrete gray.
- Official venue link styled as a blue painted stripe or utility action.

### Search and filters

- Inputs resemble inset equipment labels rather than soft consumer UI.
- Black fields, thin steel borders, white text.
- Selected filters use a blue edge or blue status lamp.
- Use clear text in addition to color for all states.

### Buttons

**Primary:** Decent Blue with Shipping Black text.

**Secondary:** Shipping Black with a Chalk White border and label.

**Utility:** Transparent, white stencil label, blue focus state.

- Default radius: `2px`.
- Pill buttons should be avoided unless the control is a map status indicator.
- Hover uses a small luminance shift, not a large transform.

## 9. Iconography

- Use simple line icons with squared terminals.
- Prefer architectural and utility symbols: locator, compass, layers, capacity, link.
- Stroke width should remain consistent at 1.5–2px.
- Avoid decorative music-note iconography unless it communicates audio specifically.

## 10. Motion and sound behavior

- Motion should feel mechanical, deliberate, and heavy.
- Panel entrance: 180–240ms, ease-out, short linear translation.
- Marker activation: 160ms opacity and scale.
- Globe rotation: continuous and very slow.
- Avoid springy, elastic, or playful bounce easing.
- The interface should not autoplay sound.

## 11. Photography and imagery

Preferred photography emphasizes venue scale and infrastructure:

- Empty stages before doors open.
- Concrete concourses and tunnels.
- Stadium lighting rigs.
- Loading docks, cables, road cases, and container structures.
- Wide crowds shown as scale rather than celebrity-focused imagery.

### Treatment

- High contrast.
- Slightly desaturated.
- Cool shadows with restrained blue highlights.
- Documentary rather than glossy promotional photography.
- Never place heavy texture over faces or critical details.

## 12. Voice and labeling

The voice is direct, informed, and venue-focused.

### Preferred

- `EXPLORE VENUES`
- `267 ACTIVE VENUES`
- `CAPACITY 90,000`
- `LONDON · UNITED KINGDOM`
- `VIEW VENUE`
- `RETURN TO GLOBE`

### Avoid

- Hype-heavy phrases such as “epic,” “ultimate,” or “mind-blowing.”
- Military terminology despite the stencil influence.
- Excessive music puns.
- Long explanatory copy over the map.

## 13. Accessibility

- Maintain WCAG AA contrast for all functional text.
- Use Chalk White on Shipping Black for standard text.
- Use black text—not white—for small text on Decent Blue.
- Keep body text free of stencil effects and distressing.
- Provide visible keyboard focus using a 3px Decent Blue outline.
- Map interactions must have equivalent keyboard-accessible controls or a searchable venue list.
- Do not rely on marker color alone for selected or clustered states.
- Respect reduced-motion preferences.
- Preserve map attribution and source credits.

## 14. CSS foundation

```css
:root {
  --decent-blue: #3b86f6;
  --shipping-black: #151515;
  --asphalt: #242424;
  --charcoal-steel: #343434;
  --concrete: #a6a39d;
  --concrete-light: #d8d5ce;
  --chalk-white: #f5f3ee;
  --safety-white: #ffffff;
  --deep-water: #163b5b;
  --weathered-blue: #255c88;
  --signal-rust: #b95632;

  --font-display: "Roboto Condensed", "Arial Narrow", sans-serif;
  --font-body: Inter, system-ui, sans-serif;
  --font-stencil: "Stardos Stencil", "Roboto Mono", monospace;
  --font-data: "Roboto Mono", monospace;

  --space-1: 0.5rem;
  --space-2: 1rem;
  --space-3: 1.5rem;
  --space-4: 3rem;
  --space-5: 6rem;

  --radius-structural: 2px;
  --border-steel: 1px solid var(--charcoal-steel);
  --focus-ring: 0 0 0 3px var(--decent-blue);
}
```

## 15. Design test

Before approving a screen, ask:

1. Does it feel like a global venue rather than a generic music app?
2. Is the interface still easy to read without the textures?
3. Is stencil typography limited to short labels?
4. Does Decent Blue identify active or important elements?
5. Are the globe and venue data still the main event?
6. Does the experience remain usable with motion disabled?

