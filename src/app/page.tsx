import type { Metadata } from "next";
import { HomeHero } from "@/components/sections/home/hero";
import { homeHeroContent } from "@/lib/content/home";
import { AboutNabil } from "@/components/sections/home/about-nabil";
import { BigPicture } from "@/components/sections/home/big-picture";
import { aboutNabilContent, bigPictureContent } from "@/lib/content/home-sections";

const title = "Nabil Hossain | The Improvement Specialist";
const description = "Meet Nabil Hossain and explore his experience in marine engineering, leadership, research and teaching, plus his mission to maximize impact and benefit others.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website", siteName: "Nabil Hossain" },
  twitter: { card: "summary", title, description },
};

export default function Home() {
  return (
    <main
      id="main-content"
      className="[--home-content-width:min(88.888889vw,calc((100svh_-_80px)*1280/830))] [--home-layout-unit:calc(var(--home-content-width)/1280)] [--home-type-unit:min(var(--home-layout-unit),1.1px,calc(.9px_+_.006944444vw))]"
    >
      <HomeHero content={homeHeroContent} />
      <AboutNabil content={aboutNabilContent} />
      <BigPicture content={bigPictureContent} />
    </main>
  );
}
