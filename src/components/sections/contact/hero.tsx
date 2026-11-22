import { PageHero } from "@/components/shared/page-hero";
import type { ContactHeroContent } from "@/lib/content/contact";

export function ContactHero({ content }: { content: ContactHeroContent }) {
  return <PageHero content={content} titleId="contact-hero-title" />;
}
