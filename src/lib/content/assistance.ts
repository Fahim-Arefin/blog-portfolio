import type { PageHeroContent } from "./page-hero";

// Static Figma content. Supply the same shape from the API later.
export const assistanceHeroContent: PageHeroContent = {
  heading: "Get my Assistance",
  introduction: "Practical, personal consultancy to help you think with clarity, communicate with confidence, and do your best work.",
  actions: [{ label: "About Me", href: "/#about-nabil-hossain", tone: "light" }],
  background: { src: "/images/assistance/hero-handshake.png", alt: "", width: 1280, height: 766 },
  mobileBackground: { src: "/images/assistance/hero-handshake-mobile.png", alt: "", width: 1295, height: 766 },
  image: {
    src: "/images/assistance/sunset-friends.jpg",
    alt: "A group of friends jumping on the beach at sunset",
    width: 2048,
    height: 2048,
    scale: 1.140493,
    transformOrigin: "left center",
  },
};
