import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    // Next 16 only honours qualities listed here; anything else silently falls
    // back to 75, which is what was making the photography look soft.
    qualities: [75, 90, 92],
  },
};

export default nextConfig;
