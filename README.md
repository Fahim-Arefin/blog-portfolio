# Nabil Portfolio

Next.js App Router, TypeScript, and Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

Open http://localhost:3000. Run `npm run lint` for ESLint,
`npx tsc --noEmit` for type checking, and `npm run build` for a production build.

## Folder structure

```text
src/
  app/                  # Routes, layouts, global CSS, and metadata route files
    layout.tsx          # Root document and default metadata
    page.tsx            # Home route
    globals.css
    favicon.ico
  components/
    ui/                 # Reusable buttons, inputs, and UI primitives
    layout/             # Shared header, navigation, and footer
    sections/           # Page sections, grouped by page as needed
  config/               # Shared site settings and navigation configuration
  lib/
    actions/            # Section Server Actions, grouped by section
    api/                # External API requests and response handling
    seo/                # Shared metadata and structured data helpers
  types/                # Types shared across features
  assets/fonts/         # Local WOFF2 font files
public/
  images/               # Photos and static images
  icons/                # Static icon assets
```

The `@/` alias points to `src/`, e.g. `@/components/layout/site-header`.
Configuration files, environment files, and `public/` stay at the project root.
Folders with `.gitkeep` are reserved for future implementation.

## Component organization

Keep route files focused on composing sections and exporting route metadata.
Use Server Components by default; add `"use client"` for browser interactions.
Components used only by one route can live in that route's `_components/` folder.
Shared components belong in `src/components/`. Keep feature-specific types beside
their implementation; reserve `src/types/` for types used across features.

## Future API integration

- Put section Server Actions in `src/lib/actions/`, grouped by section, such as
  `contact.ts` and `newsletter.ts`. Use `"use server"` in action modules and
  validate inputs and authorization inside each action as appropriate.
- Group external requests by resource in `src/lib/api/`, such as `projects.ts`
  and `articles.ts`. Keep response types and validation near those functions.
- Fetch SEO-relevant content in Server Components so it appears in rendered HTML.
  Use client fetching for interactions that need it.
- Keep credentials in root `.env.local`. Guard modules accessing secrets with
  `import "server-only"`; never expose secrets through `NEXT_PUBLIC_` variables.
- Choose caching and revalidation per resource according to freshness needs.
  Consult installed Next.js docs before selecting APIs or enabling Cache
  Components. No global caching policy is configured yet.
- Check unsuccessful HTTP responses and validate external data before using it.
- Add `src/app/api/<resource>/route.ts` when the browser or an external service
  needs an endpoint. Server Components can call external APIs directly.

No API endpoint, client library, or environment variable is required yet.

## SEO conventions

Use the Next.js Metadata API in layouts and pages, with `generateMetadata` when
metadata depends on API content. Shared helpers belong in `src/lib/seo/`.
Add `robots.ts`, `sitemap.ts`, and social preview files under `src/app/` once the
production domain and public routes are known. Use verified site information for
canonical URLs and structured data.

Use semantic HTML, descriptive links, appropriate image alternative text, and
optimized images and fonts. Replace the starter page and its default metadata as
real site content is implemented.

## Navigation

The shared `SiteHeader` sticks to the top of the viewport, with Holand Century
text and locally exported SVGs. Desktop links use 18px text in an 80px header.
Below 1024px, a 64px header shows the logo, search, and a hamburger trigger for a
right-hand sheet containing every page link. The reusable Sheet follows the
shadcn composition pattern using Radix Dialog, with a backdrop, focus trapping,
scroll locking, Escape dismissal, and focus restoration. It closes on link
selection and when switching to the desktop breakpoint.

Mobile links use 18px text. Current page links use the real Holand ExtraBold
weight (800), an underline, and `aria-current="page"`; the sheet also adds a soft
background. Matching nested routes highlight their parent link.
Search filters the configured page list locally; it does not fetch API content.

Destinations are centralized in `src/config/navigation.ts`. The Contents,
Testimonials, Get my Assistance, and Get In Touch routes are planned destinations;
their page content still needs to be implemented. Prefetching is disabled for
these links until those routes exist.

## Fonts

`src/lib/fonts.ts` loads self-hosted WOFF2 assets with `next/font/local` and
`display: "swap"`. The root layout exposes both families throughout the app.
Holand Century is the default body font.

| Tailwind classes | Font |
| --- | --- |
| `font-sangira` or `font-display` with `font-normal` | Sangira Regular (400) |
| `font-holand` or `font-sans` with `font-normal` | Holand Century Regular (400) |
| `font-holand` or `font-sans` with `font-bold` | Holand Century Bold (700) |
| `font-holand` or `font-sans` with `font-extrabold` | Holand Century ExtraBold (800) |

Four WOFF2 files are included: Sangira Regular and Holand Century Regular, Bold,
and ExtraBold. Sangira has no supplied bold style. Other weights and italics are
not loaded.

## Version-specific documentation

Follow `AGENTS.md`. Matching Next.js documentation lives in
`node_modules/next/dist/docs/`.
