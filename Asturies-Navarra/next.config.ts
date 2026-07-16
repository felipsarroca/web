import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/web/Asturies-Navarra",
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: "/web/Asturies-Navarra",
  },
};

export default nextConfig;
