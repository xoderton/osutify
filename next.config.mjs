const isProd = process.env.NODE_ENV === "production";
const internalHost = process.env.TAURI_DEV_HOST || "localhost";

/** @type {import("next").NextConfig} */
const nextConfig = {
  images: { unoptimized: true, },
  assetPrefix: isProd ? null : `http://${internalHost}:3000`,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.ppy.sh",
        pathname: "/beatmaps/**",
      },
      {
        protocol: "https",
        hostname: "osu.ppy.sh",
        pathname: "/assets/**",
      },
    ],
  },
};

export default nextConfig;
