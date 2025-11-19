"use client"

import { ThemeSwitch } from "@/components/theme-switch"
import { Toggle } from "@/components/ui/toggle"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useState } from "react"

type AsideProps = {
  children?: React.ReactNode
  expandable?: boolean
}

export function Aside({ children, expandable = false }: AsideProps) {
  const [state, setState] = useState<"expanded" | "collapsed">("collapsed")
  const [isPinned, setIsPinned] = useState(false)

  if (!expandable) {
    return (
      <aside className="isolate z-51 h-fit  lg:left-2 lg:ml-2">
        {children}
        <div className="fixed top-11 left-7 z-51 hidden sm:block">
          <ThemeSwitch />
        </div>
      </aside>
    )
  }

  function expand() {
    if (!isPinned) {
      setState("expanded")
    }
  }

  function collapse() {
    if (!isPinned) {
      setState("collapsed")
    }
  }

  function pin() {
    setIsPinned(!isPinned)
    if (!isPinned) {
      setState("expanded")
    }
  }

  return (
    <aside
      className="group isolate z-51 h-full lg:fixed lg:top-0 lg:left-0 -translate-x-[260px] transition-transform duration-700 data-[state=collapsed]:duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform data-[state=expanded]:translate-x-0"
      data-state={state}
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      <div className="relative backdrop-blur-xl h-full ml-2 mb-4 w-70 rounded-3xl bg-white/70 dark:bg-black/40 border dark:border-white/[0.08] py-6 px-6">
        <Tooltip>
          <TooltipTrigger
            render={
              <Toggle
                onClick={pin}
                className="absolute group top-1/2 delay-100 -right-6 lg:-right-8 -translate-y-2/3 rounded-r-xl rounded-l-none px-0 py-12"
              >
                <span className="h-12 w-0.5 bg-muted-foreground rounded-full" />
              </Toggle>
            }
          />
          <TooltipContent side="right">
            {isPinned ? "Unpin" : "Pin"}
          </TooltipContent>
        </Tooltip>
        {children}
        <div className="fixed bottom-11 left-7 z-51 hidden sm:block">
          <ThemeSwitch />
        </div>
      </div>
    </aside>
  )
}
