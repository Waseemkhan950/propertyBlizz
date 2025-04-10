/**
 * Next.js Configuration File
 *
 * This file contains configuration settings for the Next.js application:
 *
 * 1. Images Configuration:
 *    - Configures remote image optimization and security settings
 *    - Currently allows images from Google authentication (lh3.googleusercontent.com)
 *    - This is necessary for displaying Google user profile pictures
 *
 * The remotePatterns array specifies which external image sources are allowed:
 * - protocol: 'https' - Only allows secure HTTPS connections
 * - hostname: 'lh3.googleusercontent.com' - Google's image hosting domain
 * - pathname: '/**' - Allows any path under the specified hostname
 * - port: '' - No specific port required
 *
 * 2. Server Actions Configuration:
 *    - Configures the body size limit for server actions
 *    - Currently set to 20MB
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "lh3.googleusercontent.com",
				pathname: "/**",
				port: "",
			},
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				pathname: "/**",
				port: "",
			},
		],
	},
	experimental: {
		serverActions: {
			bodySizeLimit: "20mb",
		},
	},
};

export default nextConfig;
