import type { HeroImage, HomeHeroContent } from "./home";

export type ContactHeroContent = {
  heading: string;
  introduction: string;
  actions: HomeHeroContent["actions"];
  background: HeroImage;
  mobileBackground: HeroImage;
  image: HeroImage;
};

// Static Figma copy and local assets; replace with API content later.
export const contactHeroContent: ContactHeroContent = {
  heading: "Get In Touch",
  introduction: "Lorem ipsum dolor sit amet consectetur. Ac eu malesuada augue venenatis posuere viverra in mauris ultricies. Tincidunt eu nisi enim nunc nunc consectetur gravida sit.",
  actions: [
    { label: "Discover My Contents", href: "/contents", tone: "dark" },
    { label: "About Me", href: "/#about-nabil-hossain", tone: "light" },
  ],
  background: { src: "/images/contact/hero-bulbs.png", alt: "", width: 1280, height: 766 },
  mobileBackground: { src: "/images/contact/hero-bulbs-mobile.png", alt: "", width: 1295, height: 766 },
  image: { src: "/images/contact/fist-bump-source.jpg", alt: "Two people greeting each other with a fist bump", width: 4096, height: 2731 },
};
