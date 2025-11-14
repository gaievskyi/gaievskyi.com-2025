"use client"

import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Spinner } from "@/components/ui/spinner"
import { useIsMountedState } from "@/hooks/use-is-mounted-state"
import { useShortcut } from "@/hooks/use-shortcut"
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

export function ThemeSwitch() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const isMounted = useIsMountedState()

  useShortcut("cmd+j", () => {
    setTheme(getNextTheme(theme))
  })

  const onToggle = () => {
    setTheme(getNextTheme(theme))
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="icon-sm"
      onClick={onToggle}
      aria-label="Toggle theme"
      disabled={!isMounted}
    >
      {isMounted ? (
        getThemeIcon(resolvedTheme)
      ) : (
        <Spinner size="sm" className="bg-foreground" />
      )}
    </Button>
  )
}
