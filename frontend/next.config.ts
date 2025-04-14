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

export default nextConfig;