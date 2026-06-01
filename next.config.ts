import createMDX from '@next/mdx'
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	distDir: "dist",
	pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

	images: {
		unoptimized: true,
		remotePatterns: [
			new URL("https://cdn.jsdelivr.net/gh/kruftt/**"),
			new URL("https://hci.stanford.edu/courses/cs147/2017/au/projects/education/iqueue/**"),
		],
	},

	trailingSlash: true,

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

	// experimental: {
	//   urlImports: [
	//     'https://cdn.jsdelivr.net/'
	//   ]
	// }
};

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
