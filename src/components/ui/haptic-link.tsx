"use client"

import Link from "next/link"
import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
} from "react"
import { triggerHaptic } from "tactus"

export function HapticLink({
  children,
  ...props
}: PropsWithChildren & ComponentProps<typeof Link>) {
  const clickWithHaptic: MouseEventHandler<HTMLAnchorElement> = (e) => {
    triggerHaptic()
    props.onClick?.(e)
  }
  return (
    <Link onClick={clickWithHaptic} {...props}>
      {children}
    </Link>
  )
}
