import type { NextConfig } from "next";

// Origin of the separate AI landing page app (manfred-ai-in-da-box/web).
// Unset by default, so /ai stays a 404 until the app is deployed and the
// variable is set in Vercel.
const aiLandingOrigin = process.env.AI_LANDING_ORIGIN?.replace(/\/+$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**.supabase.co" },
      { protocol: "https", hostname: "cdn.example.com" },
    ],
  },
  // STU-1167: the Triple Diamond Roles share page moved from a static file to a
  // site page; the first shared link keeps working.
  async redirects() {
    return [
      {
        source: "/share/triple-diamond-roles-jj0fmd7u.html",
        destination: "/share/triple-diamond-roles-jj0fmd7u",
        permanent: true,
      },
    ];
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
      // The app uses basePath "/ai", so pages and assets all live under /ai.
      ...(aiLandingOrigin
        ? [
            { source: "/ai", destination: `${aiLandingOrigin}/ai` },
            { source: "/ai/:path*", destination: `${aiLandingOrigin}/ai/:path*` },
          ]
        : []),
    ];
  },
};

export default nextConfig;
