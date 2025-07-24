import { env } from "../../env/env"

export const isProduction =
  env.NODE_ENV === "production" || Boolean(env.VERCEL_PROJECT_PRODUCTION_URL)

export const isDevelopment = env.NODE_ENV === "development"
