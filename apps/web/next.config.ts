import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // @softglass/ui ships prebuilt dist (ESM). Tokens are plain CSS.
  // transpilePackages kept so workspace source edits still work if exports point at src later.
  transpilePackages: ["@softglass/ui"],
};

export default nextConfig;
