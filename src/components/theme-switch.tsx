"use client"

import { Icon } from "@/components/ui/icon"
import { Spinner } from "@/components/ui/spinner"
import { useShortcut } from "@/hooks/use-shortcut"
import { useIsMountedState } from "@/hooks/use-is-mounted-state"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const getThemeIcon = (theme: string | undefined) => {
  switch (theme) {
    case "light":
      return <Icon name="sprite:sun" className="size-4 text-black" />
    case "dark":
      return <Icon name="sprite:moon" className="size-4 text-white" />
  }
}

const getNextTheme = (currentTheme: string | undefined) => {
  switch (currentTheme) {
    case "light":
      return "dark"
    case "dark":
      return "light"
    default:
      return "light"
  }
}

export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isMounted = useIsMountedState()

  useShortcut("cmd+j", () => {
    setTheme(getNextTheme(theme))
  })

  const onToggle = () => {
    setTheme(getNextTheme(theme))
  }

  return (
    <button
      onClick={onToggle}
      className={cn(
        "inline-flex size-7 items-center justify-center rounded-md border border-border/50 bg-muted/50 shadow-xs backdrop-blur-xs transition-all duration-200 hover:text-muted-foreground hover:bg-muted/70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed",
        className,
      )}
      aria-label="Toggle theme"
      type="button"
      disabled={!isMounted}
    >
      {isMounted ? (
        getThemeIcon(resolvedTheme)
      ) : (
        <Spinner size="sm" className="bg-foreground" />
      )}
    </button>
  )
}
