import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", // درخواست‌های سمت فرانت که به /api می‌روند
        destination: "http://localhost:8080/:path*", // ارسال به سرور بک‌اند
      },
    ];
  },
};

export default nextConfig;
