import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConditionalSiteChrome from "@/components/layout/ConditionalSiteChrome";
import { siteSEO } from "@/data/seo";
import { organizationSchema, pageMetadata, siteOrigin } from "@/lib/seo";
import JsonLd from "@/components/seo/JsonLd";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  ...pageMetadata(siteSEO.pages.home),
  title: {
    default: `${siteSEO.pages.home.title} | ${siteSEO.name}`,
    template: `%s | ${siteSEO.name}`,
  },
  description: siteSEO.pages.home.description,
  metadataBase: new URL(siteOrigin()),
  robots: {
    index: process.env.SITE_INDEXABLE !== "false",
    follow: true,
  },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
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
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
        <link
          rel="preload"
          href="/images/company-logo.webp"
          as="image"
          type="image/webp"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
