/** @type {import('next').NextConfig} */

const API_URL = process.env.API_URL //?? "http://localhost:3001"

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${API_URL}/:path*`,
			},
		]
	},
	webpack: (config, context) => {
		// Enable polling based on env variable being set
		if (process.env.NEXT_WEBPACK_USEPOLLING) {
			config.watchOptions = {
				poll: 500,
				aggregateTimeout: 300
			}
		}
		return config
	},
};

export default nextConfig;
