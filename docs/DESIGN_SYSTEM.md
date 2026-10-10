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

## Typography

Geist Sans is the default reading and interface face. Geist Mono is reserved for labels, route hints, metrics, and technical metadata. Headings should be compact and confident; body copy should remain readable with generous line height.

## Layout and responsive rules

- Mobile-first spacing and layout.
- Use a centered content column with a generous maximum width.
- Preserve comfortable reading widths for narrative case-study content.
- Use visible keyboard focus states and adequate touch targets.
- Prefer semantic HTML and meaningful heading order.

## Component guidance

No component framework is planned. Add small local components only when a pattern repeats or needs isolated behavior. Keep visual variants close to the component and tokens centralized in `globals.css`.
