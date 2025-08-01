import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  distDir: "dist",
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  
  images: {
    unoptimized: true
  },

  // turbopack: {
  //   rules: {
  //     '*.md': {
  //       loaders: ['raw-loader'],
  //       as: '*.js',
  //     }
  //   }
  // },

  // webpack: (config, options) => {
  //   config.module.rules.push({
  //     test: /\.(md|mdx)/,
  //     use: ['raw-loader'],
  //   });
  //   return config
  // },
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
