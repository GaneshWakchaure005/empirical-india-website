import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
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
      // Legacy WordPress indexed routes redirects
      {
        source: "/projects",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/projects/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/services/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/detail-service",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/detail-service/:path*",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/blog-solar-energy-v1",
        destination: "/blogs",
        permanent: true,
      },
      {
        source: "/blog-solar-energy-v1/:path*",
        destination: "/blogs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
