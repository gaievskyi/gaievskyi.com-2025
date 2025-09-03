import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-gradient-to-r from-accent via-accent/60 to-accent bg-[length:200%_100%] animate-skeleton-wave rounded-md",
        className,
      )}
      {...props}
    />
  )
}
export { Skeleton }
