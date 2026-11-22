import type { HeroImage, HomeHeroContent } from "./home";

export type PageHeroContent = {
  heading: string;
  introduction: string;
  actions: HomeHeroContent["actions"];
  background: HeroImage;
  mobileBackground: HeroImage;
  image: HeroImage & { position?: string; scale?: number; transformOrigin?: string };
};
