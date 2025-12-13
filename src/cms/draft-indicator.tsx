"use client"

import { getClientSideURL } from "@/lib/get-url"
import type { TypedUser } from "payload"
import { useEffect, useState } from "react"
import { z } from "zod/v4"

const API_PATH = "/api"

const draftModeResponseSchema = z.object({
  isDraft: z.boolean(),
})

const userResponseSchema = z.object({
  user: z.custom<TypedUser>().optional(),
})

export function DraftIndicator() {
  const [showDraftPreview, setShowDraftPreview] = useState(false)

  async function fetchDraftPreviewUser() {
    try {
      const draftModeResponse = await fetch("/api/check-draft-mode", {
        method: "GET",
      })
      if (!draftModeResponse.ok) {
        throw new Error("Failed to check draft mode")
      }

      const draftModeData = await draftModeResponse.json()
      const { isDraft } = draftModeResponseSchema.parse(draftModeData)
      if (!isDraft) {
        setShowDraftPreview(false)
        // Exit early if not in draft mode as there is no need to fetch the user
        return
      }

      const userResponse = await fetch(
        `${getClientSideURL()}${API_PATH}/users/me`,
        {
          method: "GET",
          credentials: "include",
        },
      )
      if (!userResponse.ok) {
        throw new Error("Failed to fetch user")
      }

      const userData = await userResponse.json()
      const { user } = userResponseSchema.parse(userData)
      if (user) {
        setShowDraftPreview(true)
      } else {
        setShowDraftPreview(false)
      }
    } catch {
      setShowDraftPreview(false)
    }
  }

  useEffect(() => {
    fetchDraftPreviewUser()
  }, [])

  if (!showDraftPreview) return null

  return (
    <>
      <div className="fixed top-4 right-4 z-50 rounded-full px-4 py-2 text-sm shadow-[rgba(0,0,0,0.25)_0px_16px_32px_0px]">
        <div className="bg-card absolute inset-0 rounded-full" />
        <div className="relative flex items-center gap-2">
          <div className="relative">
            <div className="aspect-square size-3 animate-[spin_3s_linear_infinite] rounded-full border border-dashed border-yellow-500" />
            <div className="absolute inset-0 aspect-square size-3 rounded-full border border-dashed border-yellow-500/30" />
          </div>
          <span className="text-current">Draft</span>
        </div>
      </div>
    </>
  )
}
