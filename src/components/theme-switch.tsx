"use client"

import { AnimatedBackground } from "@/components/animated-background"
import { Icon } from "@/components/ui/icon"
import { useShortcut } from "@/hooks/use-shortcut"
import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"

const THEMES_OPTIONS = [
  {
    label: "Light",
    id: "light",
    icon: <Icon name="sprite:sun" className="mb-0.5 size-3" />,
  },
  {
    label: "Dark",
    id: "dark",
    icon: <Icon name="sprite:moon" className="mb-0.5 size-3" />,
  },
  {
    label: "System",
    id: "system",
    icon: <Icon name="sprite:system" className="mb-0.5 size-3" />,
  },
]

export function ThemeSwitch({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()

  useShortcut("cmd+j", () => {
    setTheme(theme === "dark" ? "light" : "dark")
  })

  return (
    <div
      className={cn(
        "flex items-center w-fit rounded-md border border-border/50 bg-muted/50 p-0.5 shadow-xs backdrop-blur-xs",
        className,
      )}
    >
      <AnimatedBackground
        className="rounded-sm border border-border/40 bg-background"
        defaultValue={theme ?? "system"}
        transition={{
          type: "spring",
          bounce: 0.1,
          duration: 0.4,
        }}
        enableHover={false}
        onValueChange={(id) => {
          setTheme(id as string)
        }}
      >
        {THEMES_OPTIONS.map((themeOption) => (
          <button
            key={themeOption.id}
            className="relative inline-flex size-5 items-center justify-center rounded-sm text-muted-foreground/60 transition-all duration-200 hover:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:outline-hidden active:scale-95 data-[checked=true]:text-current data-[checked=true]:shadow-xs"
            aria-label={`Switch to ${themeOption.label} theme`}
            data-id={themeOption.id}
            type="button"
          >
            {themeOption.icon}
          </button>
        ))}
      </AnimatedBackground>
    </div>
  )
}
