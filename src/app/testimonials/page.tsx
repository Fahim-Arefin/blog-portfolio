import type { Metadata } from "next";
import { PageHero } from "@/components/shared/page-hero";
import { QuoteMarquee } from "@/components/shared/quote-marquee";
import { testimonialsHeroContent } from "@/lib/content/testimonials-page";
import { connectionQuote } from "@/lib/content/quotes";

const title = "Testimonials | Nabil Hossain";
const description = "Explore feedback on working with Nabil Hossain and discover his approach to collaboration, leadership and personal improvement.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website", siteName: "Nabil Hossain" },
  twitter: { card: "summary", title, description },
};

export default function TestimonialsPage() {
  return (
    <main id="main-content">
      <PageHero content={testimonialsHeroContent} titleId="testimonials-hero-title" />
      <QuoteMarquee quote={connectionQuote} />
    </main>
  );
}
