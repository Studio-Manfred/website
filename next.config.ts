import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
  // Own-domain proxy for Manfred Analytics so ad-blockers can't catch the
  // events by hostname. The tracker derives its POST endpoint from
  // `new URL(scriptSrc).origin + "/api/event"`, so serving the script from
  // studiomanfred.com routes events to the same origin — which we then
  // rewrite through to the analytics service.
  async rewrites() {
    return [
      {
        source: "/js/t.js",
        destination: "https://manfred-analytics.vercel.app/t.js",
      },
      {
        source: "/api/event",
        destination: "https://manfred-analytics.vercel.app/api/event",
      },
    ];
  },
};

export default nextConfig;
