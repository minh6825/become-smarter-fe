import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.ontaplade.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 's4-media1.study4.com',
        port: '',
      }
    ]
  },
  sassOptions: {
    api: 'modern-compiler' // or "modern"
  }
};

export default nextConfig;
