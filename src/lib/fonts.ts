import localFont from "next/font/local";

export const sangira = localFont({
  src: "../assets/fonts/sangira-regular.woff2",
  weight: "400",
  style: "normal",
  variable: "--font-sangira-family",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const holandCentury = localFont({
  src: [
    {
      path: "../assets/fonts/holand-century-regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/holand-century-bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-holand-century",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});
