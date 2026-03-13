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
      <aside className="isolate z-51 h-fit lg:left-2 lg:ml-2">
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
      className="group isolate z-51 h-full -translate-x-[260px] transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform data-[state=collapsed]:duration-500 data-[state=expanded]:translate-x-0 lg:fixed lg:top-0 lg:left-0"
      data-state={state}
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      <div className="relative mb-4 ml-2 h-full w-70 rounded-3xl border bg-white/70 p-6 backdrop-blur-xl dark:border-white/8 dark:bg-black/40">
        <Tooltip>
          <TooltipTrigger
            render={
              <Toggle
                onClick={pin}
                className="group absolute top-1/2 -right-6 -translate-y-2/3 rounded-l-none rounded-r-xl px-0 py-12 delay-100 lg:-right-8"
              >
                <span className="h-12 w-0.5 rounded-full bg-muted-foreground" />
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
