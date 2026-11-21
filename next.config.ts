import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/contact",
        headers: [
          {
            // Allow Cal.com booking embed on the contact page.
            key: "Content-Security-Policy",
            value:
              "frame-src 'self' https://cal.com https://*.cal.com https://app.cal.com;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
