import { withPayload } from "@payloadcms/next/withPayload"
import { withNextVideo } from "next-video/process"
import type { NextConfig } from "next"
import { fileURLToPath } from "node:url"
import createJiti from "jiti"
import svg from "@neodx/svg/webpack"

const jiti = createJiti(fileURLToPath(import.meta.url))
jiti("./env/env")

Object.assign(process.env, { NEXT_TELEMETRY_DISABLED: "1" })
const isProduction = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  experimental: {
    browserDebugInfoInTerminal: true,
    inlineCss: true,
    reactCompiler: true,
    viewTransition: true,
    useCache: true,
    cacheLife: {
      blog: {
        revalidate: 60 * 60 * 24 * 365, // 1 year
        stale: 60, // 1 minute
        expire: 60 * 60 * 24 * 365, // 1 year
      },
    },
  },
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
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    removeConsole: isProduction ? { exclude: ["error", "info"] } : false,
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(
        svg({
          cleanup: "auto",
          inputRoot: "src/assets",
          output: "public/sprites",
          fileName: "{name}.{hash:8}.svg",
          metadata: "sprite.gen.ts",
        }),
      )
    }
    return config
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
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
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
