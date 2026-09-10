# Urbanview — character and exhibition direction

## Applied foundation

Geist Sans is the common typeface for headings, body copy, and controls. Geist Mono is reserved for dates, exhibit numbers, and catalog metadata. Body text uses 16px, expanding to 18px on large displays; regular labels use 14px. Only secondary mobile date labels and small decorative codes use 12px. Headings retain the dense, bold urban poster character with a controlled size scale. The Chinese name 蒋承浩 appears beside the identity block in a heavy system sans serif.

Contacts use a three-column directory on desktop, two columns on tablet, and one column on phones. Each entry has a grid-aligned pictogram, its channel name, a readable address/account, an underline, and an outward arrow. Icons are deliberately pixel-styled interpretations, not official platform logos.

Experience and papers share the same date rail, card structure, type hierarchy, and disclosure interaction. Experience dates show a prominent end/current endpoint and a quieter start endpoint with its own label and smaller hollow bullet. Clicking or keyboard-activating a card opens its notes; links are outside the disclosure trigger.

## Character proposals

These are proposals, not newly generated or approved character assets. All directions preserve the canonical character: warm brown bob and forelock, tan ears and tail, black rectangular glasses, grey jacket, plaid shirt, red collar accent, and dark eyes with restrained warm/cyan highlights. Use the references in `design/mascot/README.md` when producing artwork.

### A. Pixel paste-up — recommended

- Visual: a deliberately drawn 64–96px pixel character with a dark stepped silhouette, limited warm colors, electric blue shadow, and fluorescent yellow backing. The pixels remain sharp when enlarged; do not pixelate an existing illustration with a filter.
- Placement: a small character overlapping the portrait's lower corner; one alternate controller pose on the project exhibition footer.
- Behavior: static first; optional two-frame blink or wave on direct interaction, respecting reduced motion. Keep all body copy in the normal readable typeface.
- Why it fits: joins the research/game identity to the new pixel contact icons, while the print-like backing ties it to the poster layout.
- Production: transparent PNG at native pixel dimensions, displayed with `image-rendering: pixelated`. One hero pose and one gaming pose are enough.

### B. Street stencil

- Visual: a bust of the character rendered as a two- or three-color stencil, with slight ink misregistration and restrained spray texture. Preserve the glasses, forelock, ears, jacket collar, and warm hair color.
- Placement: a large corner stamp alongside the Chinese name; a smaller signature on the exhibition's last divider.
- Behavior: static, like a signature painted onto the page. No automatic spray animation or moving page overlay.
- Why it fits: strongest relationship to street signage, blue/yellow contrast, and bold bilingual lettering. Less playful than the pixel direction.
- Production: transparent raster artwork with clear negative space. Keep fine spray noise out of small mobile versions.

### C. Halftone comic sticker

- Visual: heavy ink contours, flat color, halftone shading, offset blue/yellow registration, and a die-cut silhouette. Preserve the canonical costume and face rather than turning the character into a generic mascot.
- Placement: one “thinking” sticker at the experience/research transition, one expressive portrait sticker by the contact directory.
- Behavior: a small tilt on hover or focus; no rotating sticker carousel.
- Why it fits: offers more expression and warmth than the stencil, with stronger editorial print character than a smooth chibi sticker.
- Production: transparent PNG/WebP in two sizes; check face readability at 80–120 CSS pixels.

Recommended first asset: direction A, one friendly waving pose, approximately 120–160 CSS pixels on desktop and 88–112 on mobile. Final artwork should be selected before replacing any existing personal imagery.

## Selected output: street-poster exhibition

Each project is an independent numbered exhibit: a ticket-like top strip, substantial artwork or typographic cover, title, description, and a plainly labeled external link. The rail uses native horizontal scrolling and scroll snap; arrow controls and keyboard arrows provide alternatives to touch/trackpad scrolling. The next card is visible on narrow screens. Reduced-motion users get instant navigation.

Projects are rendered from the configuration array, without assuming exactly two entries. The current research and game projects have distinct blue/yellow and violet poster treatments but identical caption structures. The closing “exhibition continues” line is outside the collection, so it never counts as a fake project.

To add a project, add a unique `no`, title, description, destination, action label, kind, and optional cover image to `featuredProjects` in `content/site.ts`. More exhibits extend the rail without redesigning the section.
