import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalSiteChrome from "@/components/layout/ConditionalSiteChrome";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Empirical India | Roll Forming Lines, Metal Pallets and Tubes",
    template: "%s | Empirical India",
  },
  description:
    "Empirical India designs custom automated roll-forming lines and manufactures modular metal pallets and tubes to customer requirements. Share a drawing or application to start a discussion.",
  metadataBase: new URL("https://www.empiricalindia.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Empirical India",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
