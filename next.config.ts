import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/anna-gayle-terminal' : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/anna-gayle-terminal/' : '',
};

export default nextConfig;