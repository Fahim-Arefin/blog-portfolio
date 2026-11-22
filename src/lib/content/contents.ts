import type { PageHeroContent } from "./page-hero";

// Static Figma copy and original local assets; replace with API content later.
export const contentsHeroContent: PageHeroContent = {
  heading: "Contents",
  introduction: "Lorem ipsum dolor sit amet consectetur. Ac eu malesuada augue venenatis posuere viverra in mauris ultricies. Tincidunt eu nisi enim nunc nunc consectetur gravida sit.",
  actions: [
    { label: "About Me", href: "/#about-nabil-hossain", tone: "light" },
  ],
  background: { src: "/images/contents/hero-books.png", alt: "", width: 1280, height: 766 },
  mobileBackground: { src: "/images/contents/hero-books-mobile.png", alt: "", width: 1295, height: 766 },
  image: { src: "/images/contents/books-and-mug.jpg", alt: "A peach-colored mug resting on a stack of books", width: 2048, height: 2048 },
};
