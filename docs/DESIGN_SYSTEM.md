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
