import type { PageHeroContent } from "./page-hero";

export type ContactHeroContent = PageHeroContent;

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
  image: { src: "/images/contact/fist-bump-source.jpg", alt: "Two people greeting each other with a fist bump", width: 4096, height: 2731, position: "29.734% center" },
};

export { connectionQuote as contactQuote } from "./quotes";

export type ContactDetailsContent = {
  eyebrow: string;
  heading: string;
  introduction: string;
  description: string;
  links: { label: string; href: string; icon: string; hoverIcon: string; kind: "linkedin" | "standard" | "x" }[];
};

export const contactDetailsContent: ContactDetailsContent = {
  eyebrow: "Contacts",
  heading: "Let’s Get Connected",
  introduction: "Lorem ipsum dolor sit amet consectetur. Tincidunt lectus sed fringilla sollicitudin id quis.",
  description: "Lorem ipsum dolor sit amet consectetur. Tincidunt lectus sed fringilla sollicitudin id quis. Libero praesent nibh sodales eget ipsum varius. Phasellus urna blandit nunc volutpat. Adipiscing malesuada lectus neque neque nulla habitant risus est pretium. Varius quis nullam id quam feugiat elementum sit lectus. Eget laoreet.",
  // Dummy social profiles until the API supplies the real destinations.
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "/icons/footer/linkedin.svg", hoverIcon: "/icons/contact/linkedin-hover-1.svg", kind: "linkedin" },
    { label: "Phone", href: "tel:+6584639145", icon: "/icons/contact/phone.svg", hoverIcon: "/icons/contact/phone-2.svg", kind: "standard" },
    { label: "Email", href: "mailto:nevhossain@gmail.com", icon: "/icons/footer/email.svg", hoverIcon: "/icons/contact/email-1.svg", kind: "standard" },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "/icons/footer/facebook.svg", hoverIcon: "/icons/contact/facebook-1.svg", kind: "standard" },
    { label: "WhatsApp", href: "https://wa.me/6584639145", icon: "/icons/footer/whatsapp.svg", hoverIcon: "/icons/contact/whatsapp-1.svg", kind: "standard" },
    { label: "X", href: "https://x.com/", icon: "/icons/contact/x.svg", hoverIcon: "/icons/contact/x.svg", kind: "x" },
  ],
};
