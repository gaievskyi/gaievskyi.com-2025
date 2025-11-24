"use client"

import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type {
  ComponentProps,
  MouseEventHandler,
  PropsWithChildren,
} from "react"
import { triggerHaptic } from "tactus"

export const ExternalLink = ({
  className,
  children,
  ...props
}: PropsWithChildren & ComponentProps<"a"> & { iconClassName?: string }) => {
  const clickWithHaptic: MouseEventHandler<HTMLAnchorElement> = (e) => {
    triggerHaptic()
    props.onClick?.(e)
  }
  return (
    <a
      onClick={clickWithHaptic}
      target="_blank"
      className={cn(
        "inline-flex items-baseline gap-0.5 text-link no-underline transition-colors duration-200 hover:text-link-hover",
        className,
      )}
      {...props}
    >
      {children}
      <Icon name="sprite:arrow2" className="text-sm" />
    </a>
  )
}
