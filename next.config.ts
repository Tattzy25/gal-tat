import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tattty-uploads.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pix.tattty.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "pvt.tattty.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
