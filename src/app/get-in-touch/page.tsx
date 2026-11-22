import type { Metadata } from "next";
import { ContactHero } from "@/components/sections/contact/hero";
import { contactHeroContent, contactQuote, contactDetailsContent } from "@/lib/content/contact";
import { ContactQuoteMarquee } from "@/components/sections/contact/quote-marquee";
import { ContactDetails } from "@/components/sections/contact/details";

const title = "Get In Touch | Nabil Hossain";
const description = "Get in touch with Nabil Hossain to connect, explore his work, and learn about his experience in marine engineering, leadership, research and teaching.";

export const metadata: Metadata = {
  title: { absolute: title },
  description,
  openGraph: { title, description, type: "website", siteName: "Nabil Hossain" },
  twitter: { card: "summary", title, description },
};

export default function GetInTouchPage() {
  return (
    <main id="main-content">
      <ContactHero content={contactHeroContent} />
      <ContactQuoteMarquee quote={contactQuote} />
      <ContactDetails content={contactDetailsContent} />
    </main>
  );
}
