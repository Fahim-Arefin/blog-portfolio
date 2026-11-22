import type { Metadata } from "next";
import { holandCentury, sangira } from "@/lib/fonts";
import { SiteHeader } from "@/components/layout/site-header";
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
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
