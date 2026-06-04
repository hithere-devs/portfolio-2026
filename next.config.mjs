/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: [
			'img.shields.io',
			'hithere-devs-public-86edc30b.s3.ap-south-2.amazonaws.com',
		],
		dangerouslyAllowSVG: true,
	},
};

export default nextConfig;
