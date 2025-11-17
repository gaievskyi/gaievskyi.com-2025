import { cn } from "@/lib/utils"
import type { ComponentProps } from "react"

function Skeleton({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        "bg-linear-to-r from-accent via-accent/60 to-accent bg-size-[200%_100%] animate-skeleton-wave rounded-md",
        className,
      )}
      {...props}
    />
  )
}
export { Skeleton }
