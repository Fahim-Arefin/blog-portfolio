export type HeroImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type HomeHeroContent = {
  heading: string;
  introduction: string;
  statistics: { value: string; label: string }[];
  actions: { label: string; href: string; tone: "dark" | "light" }[];
  portrait: HeroImage;
  background: HeroImage;
};

// Static content for now. Pass API data with this shape to HomeHero later.
export const homeHeroContent: HomeHeroContent = {
  heading: "The Improvement Specialist",
  introduction:
    "I explore how people, teams and systems improve. I examine the exact ways to get better than yesterday - across work, education and opportunity. From marine engine workshops and university classrooms to leadership roles and personal experiments.",
  statistics: [
    { value: "140+", label: "People Impacted" },
    { value: "15+", label: "Projects & Pursuits" },
    { value: "3", label: "Systems Built" },
    { value: "4", label: "Core Expertises" },
  ],
  actions: [
    { label: "Discover My Contents", href: "/contents", tone: "dark" },
    { label: "Get In Touch", href: "/get-in-touch", tone: "light" },
  ],
  portrait: {
    src: "/images/home/nabil-hossain-figma.png",
    alt: "Nabil Hossain seated in a brown suit",
    width: 1708,
    height: 2560,
  },
  background: {
    src: "/images/home/hero-texture-figma.png",
    alt: "",
    width: 1295,
    height: 766,
  },
};
