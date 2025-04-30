/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/:path*',
      },
      {
        source: '/app/:path*',
        destination: 'http://localhost:8080/app/:path*',
      },
    ];
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // نادیده گرفتن خطاهای ESLint موقع بیلد
  },
  typescript: {
    ignoreBuildErrors: true, // نادیده گرفتن خطاهای TypeScript موقع بیلد
  },
};

// تنظیمات PWA
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA(nextConfig);