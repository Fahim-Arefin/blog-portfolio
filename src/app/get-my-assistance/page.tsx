import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteMarquee } from "@/components/shared/quote-marquee";
import { assistanceHeroContent } from "@/lib/content/assistance";
import { connectionQuote } from "@/lib/content/quotes";

const title = "Get My Assistance | Nabil Hossain";
const description = "Practical, personal consultancy from Nabil Hossain to help you think with clarity, communicate with confidence, and do your best work.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website", siteName: "Nabil Hossain" },
  twitter: { card: "summary", title, description },
};

export default function GetMyAssistancePage() {
  return (
    <main id="main-content">
      <PageHero content={assistanceHeroContent} titleId="assistance-hero-title" />
      <QuoteMarquee quote={connectionQuote} />
    </main>
  );
}
