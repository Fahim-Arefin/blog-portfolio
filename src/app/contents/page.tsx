import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { contentsHeroContent } from "@/lib/content/contents";

const title = "Contents | Nabil Hossain";
const description = "Explore Nabil Hossain’s content, ideas and experiences in marine engineering, leadership, learning and personal improvement.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website", siteName: "Nabil Hossain" },
  twitter: { card: "summary", title, description },
};

export default function ContentsPage() {
  return (
    <main id="main-content">
      <PageHero content={contentsHeroContent} titleId="contents-hero-title" />
    </main>
  );
}
