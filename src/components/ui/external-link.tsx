import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type { ComponentProps, PropsWithChildren } from "react"

export const ExternalLink = ({
  className,
  children,
  ...props
}: PropsWithChildren & ComponentProps<"a"> & { iconClassName?: string }) => (
  <a
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
