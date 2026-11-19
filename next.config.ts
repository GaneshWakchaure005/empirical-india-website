import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      { source: "/:path*", has: [{ type: "host", value: "empiricalindia.com" }], destination: "https://www.empiricalindia.com/:path*", permanent: true },
      // Legacy WordPress indexed routes redirects (301 Moved Permanently)
      {
        source: "/projects",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/projects/:path*",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/project",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/project/:path*",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/services",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/services/:path*",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/detail-service",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/detail-service/:path*",
        destination: "/products",
        statusCode: 301,
      },
      {
        source: "/blog-solar-energy-v1",
        destination: "/blogs",
        statusCode: 301,
      },
      {
        source: "/blog-solar-energy-v1/:path*",
        destination: "/blogs",
        statusCode: 301,
      },
    ];
  },
  async headers() {
    return [
      { source: "/admin/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      { source: "/api/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" }] },
      {
        source: "/images/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/favicon.ico",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
