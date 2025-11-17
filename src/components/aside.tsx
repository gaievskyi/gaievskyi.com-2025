"use client"

import { ThemeSwitch } from "@/components/theme-switch"
import { Icon } from "@/components/ui/icon"
import { Toggle } from "@/components/ui/toggle"
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
      <aside className="isolate z-51 h-fit lg:fixed lg:top-10 lg:left-2 lg:ml-2">
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
      className="group isolate z-51 h-full lg:fixed lg:top-0 lg:left-0 -translate-x-[220px] transition-transform duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] will-change-transform data-[state=expanded]:translate-x-0"
      data-state={state}
      onMouseEnter={expand}
      onMouseLeave={collapse}
    >
      <div className="relative h-full w-60 rounded-r-3xl border-r bg-background/95 backdrop-blur-sm py-6 px-6">
        <Toggle
          onClick={pin}
          className="absolute top-1/2 -right-8 -translate-y-2/3 rounded-r-xl flex items-center gap-2 px-0 py-12 rounded-l-none before:rounded-l-none border-y border-r bg-background/95 border-border"
        >
          <Icon name="sprite:ellipsis-vertical" className="size-6!" />
        </Toggle>
        <div className="flex items-center gap-2 mb-8 ml-3">
          <ThemeSwitch />
        </div>
        {children}
      </div>
    </aside>
  )
}
