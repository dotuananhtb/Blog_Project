import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
    domains: [
      "via.placeholder.com",
      "picsum.photos",
      "images.unsplash.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "graph.facebook.com",
      "pbs.twimg.com",
      "cdn.pixabay.com",
      "images.pexels.com",
      "res.cloudinary.com",
      "firebasestorage.googleapis.com",
      "storage.googleapis.com",
      "amazonaws.com",
      "s3.amazonaws.com",
      "imgur.com",
      "i.imgur.com",
      "imagekit.io",
      "cloudinary.com",
      "camerabox.vn",
      "example.com",
      "localhost",
    ],
    unoptimized: process.env.NODE_ENV === "development",
  },
  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
      },
    },
  },
};

export default nextConfig;
