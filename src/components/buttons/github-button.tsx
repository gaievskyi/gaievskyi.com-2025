"use client"

import type { GithubIconHandle } from "@/components/animated-icons/github"
import { GithubIcon } from "@/components/animated-icons/github"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { useRef, type MouseEventHandler, type ComponentProps } from "react"

type GithubButtonProps = ComponentProps<typeof Button> & {
  href?: string
}

export function GithubButton({ className, href, ...props }: GithubButtonProps) {
  const iconRef = useRef<GithubIconHandle>(null)

  const onMouseEnter = () => {
    iconRef.current?.startAnimation()
  }

  const onMouseLeave = () => {
    iconRef.current?.stopAnimation()
  }

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const url = href || "https://github.com/gaievskyi"
    window.open(url, "_blank")
    props.onClick?.(e)
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          {...props}
          variant="ghost"
          size="icon"
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          onClick={onClick}
          className={cn("group size-9 rounded-full cursor-pointer", className)}
        >
          <GithubIcon
            ref={iconRef}
            className="text-muted-foreground group-hover:text-foreground"
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Source code</p>
      </TooltipContent>
    </Tooltip>
  )
}
