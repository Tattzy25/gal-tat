import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tattty-uploads.tattty.com",
      },
      {
        protocol: "https",
        hostname: "*.pix.tattty.com",
      },
    ],
  },
};
