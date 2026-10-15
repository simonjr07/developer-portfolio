# Design System

## Visual direction

Dark Premium Tech: restrained, spacious, high-contrast, and credible for business-facing software work. Use depth through borders, surfaces, and subtle shadows rather than decorative effects that compete with content.

## Tokens

| Token | Value | Use |
| --- | --- | --- |
| Background | `#0B0F14` | Page canvas |
| Surface | `#141B24` | Cards and content panels |
| Primary | `#F3F6FA` | Headings and key content |
| Secondary | `#9AA8B8` | Supporting copy and metadata |
| Accent | `#75AFFF` | Links, actions, focus, and selected states |

The shell also uses a restrained raised-surface token for open navigation and a translucent border token for separation. These support hierarchy without introducing gradients or excessive glow.

## Typography

Geist Sans is the default reading and interface face. Geist Mono is reserved for labels, route hints, metrics, and technical metadata. Headings should be compact and confident; body copy should remain readable with generous line height.

## Layout and responsive rules

- Mobile-first spacing and layout.
- Use a centered content column with a generous maximum width.
- Preserve comfortable reading widths for narrative case-study content.
- Use visible keyboard focus states and adequate touch targets.
- Prefer semantic HTML and meaningful heading order.

## Component guidance

No component framework is planned. TASK-002 provides local `Container`, `SectionHeading`, `Card`, `ButtonLink`, `SiteHeader`, `SiteFooter`, and `SiteShell` components. Keep visual variants close to the component and tokens centralized in `globals.css`. The mobile menu restores focus on close, responds to Escape, and respects reduced-motion preferences.

TASK-006.5 refinements to keep consistent:

- Use the shared `Eyebrow` for every mono uppercase micro-label and `TechnologyBadge` (inside a `<ul>`) for every technology pill; do not hand-copy their classes.
- `SectionHeading` owns the heading scale: page `h1` is `text-4xl → sm:text-5xl`, section `h2` is `text-3xl → sm:text-4xl`. Case-study internal headings sit one step below at `text-2xl`.
- `Card` carries no default padding; each caller states its padding explicitly (`p-6` for content cards, `p-6 sm:p-8` for large panels, `p-3 sm:p-4` for media cards). Card grids use `gap-4 sm:gap-5`.
- Plain anchors that cannot use Next `Link` (e.g. `mailto:`) reuse `buttonLinkClassName` from `button-link.tsx` rather than duplicating button classes.
- Project screenshots render at their intrinsic aspect ratio (dimensions in `src/data/projects.ts`); do not reintroduce a fixed-ratio `object-cover` frame, which crops capture content.
- Interactive project cards use the stretched-link pattern: one keyboard stop per card, card-level `hover:`/`focus-within:` border state, and the live-demo link kept separately targetable above the overlay.
