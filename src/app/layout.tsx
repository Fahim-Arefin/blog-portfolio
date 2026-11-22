import type { Metadata } from "next";
import { holandCentury, sangira } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { footerContent } from "@/lib/content/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Nabil Hossain", template: "%s | Nabil Hossain" },
  description: "Ideas and insights on improving people, teams and systems from Nabil Hossain.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${holandCentury.variable} ${sangira.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col [--home-content-width:min(88.888889vw,calc((100svh_-_80px)*1280/830))] [--home-layout-unit:calc(var(--home-content-width)/1280)] [--home-type-unit:min(var(--home-layout-unit),1.1px,calc(.9px_+_.006944444vw))]">
        <SiteHeader />
        {children}
        <SiteFooter content={footerContent} />
      </body>
    </html>
  );
}
