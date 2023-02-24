/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: false,
  experimental: {
    appDir: true,
  },
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/app'
      },
      {
        source: '/chats/:path*',
        destination: '/app/chats/:path*', // Matched parameters can be used in the destination
      },
    ]
  },
}
