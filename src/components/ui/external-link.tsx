import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import type { PropsWithChildren, ComponentProps } from "react"

export const ExternalLink = ({
  className,
  iconClassName,
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
    <Icon
      name="sprite:external-link"
      className={cn(
        "text-black/40 stroke-current dark:text-muted-foreground",
        iconClassName,
      )}
    />
  </a>
)
