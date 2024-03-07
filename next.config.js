/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'false' },
          { key: 'Access-Control-Allow-Origin', value: process.env.APP_URL || '' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST' },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Api-Version',
          },
        ],
      },
    ]
  },
  redirects() {
    return [
      process.env.MAINTENANCE_MODE === '1'
        ? { source: '/((?!maintenance).*)', destination: '/maintenance.html', permanent: false }
        : null,
    ].filter(Boolean)
  },
}

module.exports = nextConfig
