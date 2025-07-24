"use client"

import {
  CheckIcon,
  type CheckIconHandle,
} from "@/components/animated-icons/check"
import { CopyIcon, type CopyIconHandle } from "@/components/animated-icons/copy"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  useRef,
  useState,
  type ComponentProps,
  type MouseEventHandler,
} from "react"

type CopyButtonProps = ComponentProps<typeof Button> & {
  text: string
  tooltipSide?: "top" | "bottom" | "left" | "right"
}

export function CopyButton({ text, tooltipSide, ...props }: CopyButtonProps) {
  const copyIconRef = useRef<CopyIconHandle>(null)
  const checkIconRef = useRef<CheckIconHandle>(null)
  const [isCopied, setIsCopied] = useState(false)

  const onMouseEnter = () => {
    if (!isCopied) {
      copyIconRef.current?.startAnimation()
    }
  }

  const onMouseLeave = () => {
    if (!isCopied) {
      copyIconRef.current?.stopAnimation()
    }
  }

  const onClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    await navigator.clipboard.writeText(text)
    setIsCopied(true)
    setTimeout(() => {
      checkIconRef.current?.startAnimation()
    }, 50)

    setTimeout(() => {
      checkIconRef.current?.stopAnimation()
      setTimeout(() => {
        setIsCopied(false)
      }, 200)
    }, 2000)

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
        >
          {isCopied ? (
            <CheckIcon ref={checkIconRef} />
          ) : (
            <CopyIcon ref={copyIconRef} />
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side={tooltipSide}>
        <p>{isCopied ? "Copied" : "Copy"}</p>
      </TooltipContent>
    </Tooltip>
  )
}
