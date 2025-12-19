import "./env/env"
// ^ validate env
import { withPayload } from "@payloadcms/next/withPayload"
import type { NextConfig } from "next"
import { withNextVideo } from "next-video/process"

Object.assign(process.env, { NEXT_TELEMETRY_DISABLED: "1" })
const isProduction = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  reactCompiler: true,
  cacheLife: {
    blog: {
      revalidate: 60 * 60 * 24 * 365, // 1 year
      stale: 60, // 1 minute
      expire: 60 * 60 * 24 * 365, // 1 year
    },
  },
  experimental: {
    globalNotFound: true,
    browserDebugInfoInTerminal: !isProduction,
    inlineCss: true,
    useCache: true,
  },
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
      {
        protocol: "https",
        hostname: "gaievskyi.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: isProduction ? { exclude: ["error", "info"] } : false,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        destination: "/ie-incompatible.html",
        has: [
          {
            type: "header",
            key: "user-agent",
            value: "(.*Trident.*)", // all ie browsers
          },
        ],
        permanent: false,
        source: "/:path((?!ie-incompatible.html$).*)", // all pages except the incompatibility page
      },
    ]
  },
}

export default withPayload(withNextVideo(nextConfig, { folder: "src/videos" }))
