import type { PageHeroContent } from "./page-hero";
import { contentsHeroContent } from "./contents";

// Figma uses the same book imagery and About Me action on these two pages.
export const testimonialsHeroContent: PageHeroContent = {
  ...contentsHeroContent,
  heading: "Testimonials",
};
