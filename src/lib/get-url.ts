import { env } from "../../env/env"
import canUseDOM from "./can-use-dom"

export const getServerSideURL = () => {
  let url = env.NEXT_PUBLIC_URL

  if (!url && env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  if (!url) {
    url = "http://localhost:3000"
  }

  return url
}

export const getClientSideURL = () => {
  if (canUseDOM) {
    const protocol = globalThis.window.location.protocol
    const domain = globalThis.window.location.hostname
    const port = globalThis.window.location.port
    return `${protocol}//${domain}${port ? `:${port}` : ""}`
  }

  if (env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
  }

  return env.NEXT_PUBLIC_URL || ""
}
