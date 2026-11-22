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

## Home hero

`src/components/sections/home/hero.tsx` is a Server Component styled entirely with
Tailwind utilities. Its hardcoded copy, statistics, and actions live in
`src/lib/content/home.ts`. Replace that object with API data matching
`HomeHeroContent` when the backend is available. The home page exports metadata,
uses one visible H1, and renders the hero content in the initial HTML.

Original portrait and texture files live in `public/images/home/`. The portrait
uses `next/image`, eager loading, and high fetch priority. Hero images serve their
full-resolution original files without another lossy compression or resize pass.
Its crop follows the image transform from Figma; the original source stays intact.
The decorative texture is exported directly from Figma with its image adjustments
and gradient included. It uses an SVG clip outline on desktop and rounded panels
on mobile; mobile statistics crop the same light upper area as the desktop stats
panel. No extra color filters are applied. The portrait uses Figma's original
1708-by-2560 PNG instead of the compressed local WebP. Styling and responsive
behavior use Tailwind utilities.
The desktop composition starts at 1024px, including laptop screens. Its scene
uses up to 88.89% of the viewport width without a large-screen width cap, reduced
when needed to fit the entire hero below the 80px sticky header. Its width and
vertical spacing share the same scale, constrained by both viewport dimensions.
Desktop top/bottom padding is 24px/40px at the reference scale, reduced from
40px/80px.
Scene geometry follows the 1280-by-766 Figma artwork using percentages and
container units. All three home sections share a container width; The Big
Picture keeps its additional Figma inset. Typography uses the 1440px design as
its reference, shrinking to fit smaller desktop compositions and increasing
gently above 1440px, capped at 10% above the reference sizes. About body text is
20px at the reference size. Only Sangira and Holand Century are used, including
where the Figma body font differs.
Below 1024px, About and The Big Picture use typography reduced by 25% from the
initial mobile/tablet sizes. The About heading stays smaller than the hero H1 at
every breakpoint. The mobile hero readability gradient fades from transparent
at the photo panel's top, avoiding a hard rectangular overlay edge.
CTA backgrounds stay fixed on hover. The arrow exits right, re-enters from the
left, and returns to its starting position through a Tailwind animation utility.
Keyboard focus uses the same motion; reduced-motion preferences disable it.
The light and dark arrow images in `public/icons/` are the original Figma exports.

## About and The Big Picture

`AboutNabil` and `BigPicture` follow the homepage hero. Their static data and
TypeScript shapes live in `src/lib/content/home-sections.ts`; supply API data with
the same shape later. Both are Server Components using Tailwind utilities, H2
headings, and definition lists. Text is included in the initial server-rendered
HTML, with no client JavaScript needed for these sections.

The floating image is stored locally at
`public/images/home/nabil-hossain-discussion.png`. Its intrinsic dimensions reserve
layout space; lazy loading defers this below-the-fold image, and its original
pixels preserve the supplied export's clarity.

## Navigation

The shared `SiteFooter` follows the desktop and mobile Figma footer designs,
using the original local vector wordmark, social icons, and newsletter arrow.
Its desktop typography shares the home sections' scale, inherited from the root
layout. Mobile/tablet body text is 13.5px to match About, with 17.25px column
headings and a 21.75px tagline. Supporting copy stays smaller.
Static typed data lives in `src/lib/content/footer.ts`; social profile URLs are
dummy destinations until the API is connected. Contact details consistently use
the desktop homepage design. Newsletter submission validates the email locally
and displays a coming-soon message; no subscription is saved yet. The Privacy
Policy link points to `/privacy-policy`, whose page remains to be implemented.

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

## Get In Touch hero

`/get-in-touch` renders the Figma hero as a Server Component with route metadata,
a single H1, and static typed content in `src/lib/content/contact.ts`. The bulb
artwork preserves Figma's exported mask and color adjustments; the fist-bump
image uses the original 4096px source with the design's crop. Mobile/tablet use
a stacked image composition. `HeroActions` is shared with the home hero and
preserves the existing arrow animation, focus styles, and reduced-motion support.
The visible description remains Figma's placeholder copy pending final/API text.

The contact hero is followed by a looping quote marquee and a responsive contact
filmstrip. The marquee has a pause control, pauses on hover/focus, and displays
the complete static quote for reduced-motion preferences. Its decorative copies
are hidden from screen readers. Contact cards use local Figma SVGs and semantic
links; LinkedIn reveals its blue card and enlarged white icon on hover or keyboard
focus. Text follows the shared desktop scale and the smaller mobile/tablet sizes.
Contact quote, placeholder copy, and dummy social links live in the static contact
content module for the later API integration.

Contact filmstrip cards share the same hover/focus treatment with platform colors: LinkedIn blue, Facebook blue, WhatsApp green, and X black. Phone and email use the design's teal accent.
Background, border, and icon crossfade/scale transitions use a synchronized 500ms
easing curve, with transitions disabled for reduced-motion preferences.
