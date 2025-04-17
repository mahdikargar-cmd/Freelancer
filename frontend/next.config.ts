/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*', // برای مسیرهای عمومی مثل /admin/auth
      },
      {
        source: '/app/:path*',
        destination: 'http://localhost:8080/app/:path*', // برای مسیرهای پروژه
      },
    ];
  },
};
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  reactStrictMode: true,
});

export default   nextConfig;