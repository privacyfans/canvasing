/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
  
  // Add headers for development CORS issues
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
          { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-api-token, x-refresh-token, x-user-agent" },
        ]
      }
    ]
  },

  // Add rewrites for API proxy if needed
  async rewrites() {
    return [
      // Uncomment and modify if you want to proxy API calls
      // {
      //   source: '/api/proxy/:path*',
      //   destination: 'http://117.102.70.147:9583/api/v1/:path*',
      // },
    ]
  },
}

export default nextConfig