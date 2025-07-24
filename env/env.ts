import { createEnv } from "@t3-oss/env-nextjs"
import { vercel, neonVercel } from "@t3-oss/env-nextjs/presets-zod"
import { z } from "zod/mini"

export const env = createEnv({
  extends: [vercel(), neonVercel()],
  server: {
    MUX_TOKEN_ID: z.string(),
    MUX_TOKEN_SECRET: z.string(),
    HIDE_TAILWIND_INDICATOR: z.optional(
      z.union([z.boolean(), z.literal([1, 0])]),
    ),
    PAYLOAD_SECRET: z.string(),
    BLOB_READ_WRITE_TOKEN: z.string(),
  },
  client: {
    NEXT_PUBLIC_URL: z.optional(z.url()),
  },
  shared: {
    NODE_ENV: z.optional(
      z.union([z.literal("development"), z.literal("production")]),
    ),
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
  },
  emptyStringAsUndefined: true,
  isServer: globalThis.window === undefined,
  skipValidation:
    !!process.env.CI ||
    !!process.env.SKIP_ENV_VALIDATION ||
    process.env.npm_lifecycle_event === "lint",
})
