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
        destination: 'http://localhost:8080/app/:path*', // مسیر دقیق‌تر
      },
    ];
  },
};

export default nextConfig;