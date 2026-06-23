// Codes by mahdi tasha
// Importing part
import type { NextConfig } from "next";

// Defining next.js configs
const nextConfig: NextConfig = {
   reactCompiler: true,
   images: {
      remotePatterns: [
         {
            protocol: "https",
            hostname: "cdn.dummyjson.com",
         },
      ],
   },
};

// Exporting the configs as default
export default nextConfig;
