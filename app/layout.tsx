import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

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
        <Suspense fallback={<div className="h-[54px] sm:h-[62px] md:h-[68px] lg:h-[72px] xl:h-[76px] bg-white border-b border-steel-200" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
