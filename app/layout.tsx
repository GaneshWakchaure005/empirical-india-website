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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      <body className="min-h-full flex flex-col">
        <JsonLd data={organizationSchema()} />
        <ConditionalSiteChrome>{children}</ConditionalSiteChrome>
      </body>
    </html>
  );
}
