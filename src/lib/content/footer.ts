export type FooterContent = {
  tagline: string;
  contact: { heading: string; address: string; email: string; phone: string };
  socialHeading: string;
  socialLinks: { label: string; href: string; icon: string; width: number; height: number }[];
  newsletter: { heading: string; introduction: string; placeholder: string; disclaimer: string };
  privacy: { label: string; href: string };
  copyright: string;
};

// Static Figma content. Replace the social destinations and other data with API values later.
export const footerContent: FooterContent = {
  tagline: "Created for Improvement",
  contact: {
    heading: "Contact",
    address: "456 Location, city, country",
    email: "nevhossain@gmail.com",
    phone: "+6584639145",
  },
  socialHeading: "Follow me",
  socialLinks: [
    { label: "Email Nabil Hossain", href: "mailto:nevhossain@gmail.com", icon: "/icons/footer/email.svg", width: 30.6, height: 30.6 },
    { label: "WhatsApp", href: "https://wa.me/6584639145", icon: "/icons/footer/whatsapp.svg", width: 30.6, height: 30.6 },
    { label: "Facebook", href: "https://www.facebook.com/", icon: "/icons/footer/facebook.svg", width: 30.6, height: 31.0115 },
    { label: "LinkedIn", href: "https://www.linkedin.com/", icon: "/icons/footer/linkedin.svg", width: 30.6, height: 30.6 },
  ],
  newsletter: {
    heading: "Newsletter",
    introduction: "Sign up for updates",
    placeholder: "Email",
    disclaimer: "By subscribing, you agree to receive newsletters.",
  },
  privacy: { label: "Privacy Policy", href: "/privacy-policy" },
  copyright: "Copyright 2026",
};
