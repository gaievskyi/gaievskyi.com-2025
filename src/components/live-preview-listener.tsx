"use client"

import { getClientSideURL } from "@/lib/get-url"
import { RefreshRouteOnSave } from "@payloadcms/live-preview-react"
import { useRouter } from "next/navigation"

export function LivePreviewListener() {
  const router = useRouter()
  return (
    <RefreshRouteOnSave
      refresh={router.refresh}
      serverURL={getClientSideURL()}
    />
  )
}
