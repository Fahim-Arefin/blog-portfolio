// Keep destinations in one place as their pages are implemented.
export const navigation = [
  { label: "Contents", href: "/contents" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Get my Assistance", href: "/get-my-assistance" },
  { label: "Get In Touch", href: "/get-in-touch" },
] as const;

export const searchablePages = [
  { label: "Home", href: "/" },
  ...navigation,
];
