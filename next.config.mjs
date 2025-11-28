/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['img.shields.io', 'storage.googleapis.com'],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
