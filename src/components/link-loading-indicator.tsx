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
  const showSpinner = useSpinDelay(pending, { delay: 250, minDuration: 100 })
  return showSpinner ? (
    <Spinner size="sm" className="mr-8 bg-current" />
  ) : (
    children
  )
}
