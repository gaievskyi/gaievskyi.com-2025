"use client"

import { Spinner } from "@/components/ui/spinner"
import { useLinkStatus } from "next/link"
import { useSpinDelay } from "spin-delay"

export function LinkLoadingIndicator({
  children,
}: {
  children: React.ReactNode
}) {
  const { pending } = useLinkStatus()
  const shouldSpin = useSpinDelay(pending, {
    delay: 250,
  })
  return shouldSpin ? (
    <Spinner size="sm" className="mr-8 bg-current" />
  ) : (
    children
  )
}
