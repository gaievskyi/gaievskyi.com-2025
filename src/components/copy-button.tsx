"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState, type ComponentProps, type MouseEventHandler } from "react"

type CopyButtonProps = ComponentProps<typeof Button> & {
  text: string
  tooltipSide?: "top" | "bottom" | "left" | "right"
}

export function CopyButton({ text, tooltipSide, ...props }: CopyButtonProps) {
  const [isCopied, setIsCopied] = useState(false)

  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    props.onClick?.(e)
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button {...props} variant="ghost" size="icon" onClick={onClick}>
            {isCopied ? (
              <Icon name="sprite:check" />
            ) : (
              <Icon name="sprite:copy" />
            )}
          </Button>
        }
      />
      <TooltipContent side={tooltipSide}>
        <p>{isCopied ? "Copied" : "Copy"}</p>
      </TooltipContent>
    </Tooltip>
  )
}
