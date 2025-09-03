import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import { Tooltip as BaseTooltip } from "@base-ui-components/react/tooltip"
import type { ComponentProps } from "react"

function TooltipProvider({
  delay = 0,
  closeDelay = 0,
  ...props
}: ComponentProps<typeof BaseTooltip.Provider>) {
  return (
    <BaseTooltip.Provider
      data-slot="tooltip-provider"
      delay={delay}
      closeDelay={closeDelay}
      {...props}
    />
  )
}

function Tooltip({ ...props }: ComponentProps<typeof BaseTooltip.Root>) {
  return (
    <TooltipProvider>
      <BaseTooltip.Root data-slot="tooltip" {...props} />
    </TooltipProvider>
  )
}

function TooltipTrigger({
  ...props
}: ComponentProps<typeof BaseTooltip.Trigger>) {
  return <BaseTooltip.Trigger data-slot="tooltip-trigger" {...props} />
}

function TooltipPortal({
  ...props
}: ComponentProps<typeof BaseTooltip.Portal>) {
  return <BaseTooltip.Portal data-slot="tooltip-portal" {...props} />
}

function TooltipPositioner({
  ...props
}: ComponentProps<typeof BaseTooltip.Positioner>) {
  return <BaseTooltip.Positioner data-slot="tooltip-positioner" {...props} />
}

function TooltipArrow({ ...props }: ComponentProps<typeof BaseTooltip.Arrow>) {
  return <BaseTooltip.Arrow data-slot="tooltip-arrow" {...props} />
}

function TooltipContent({
  className,
  align = "center",
  sideOffset = 8,
  side = "top",
  children,
  ...props
}: ComponentProps<typeof BaseTooltip.Popup> & {
  align?: BaseTooltip.Positioner.Props["align"]
  side?: BaseTooltip.Positioner.Props["side"]
  sideOffset?: BaseTooltip.Positioner.Props["sideOffset"]
}) {
  return (
    <TooltipPortal>
      <TooltipPositioner sideOffset={sideOffset} align={align} side={side}>
        <BaseTooltip.Popup
          data-slot="tooltip-content"
          className={cn(
            "bg-popover text-popover-foreground outline-border z-50 w-fit origin-[var(--transform-origin)] rounded-md px-2 py-1.5 text-xs text-balance shadow-sm outline -outline-offset-1 transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className,
          )}
          {...props}
        >
          {children}
          <TooltipArrow className="data-[side=bottom]:top-[-16px] data-[side=left]:right-[-16px] data-[side=left]:rotate-90 data-[side=right]:left-[-16px] data-[side=right]:-rotate-90 data-[side=top]:bottom-[-13px] data-[side=top]:rotate-180">
            <Icon name="sprite:tooltip-arrow" className="text-xl" />
          </TooltipArrow>
        </BaseTooltip.Popup>
      </TooltipPositioner>
    </TooltipPortal>
  )
}

export {
  Tooltip,
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  TooltipPositioner,
  TooltipProvider,
  TooltipTrigger,
}
