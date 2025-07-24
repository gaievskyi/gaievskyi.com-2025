import { ThemeSwitch } from "@/components/theme-switch"
import { cn } from "@/lib/utils"

export function HeaderContent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "text-sm flex items-center justify-between gap-2",
        className,
      )}
    >
      <div>
        <h1 className="font-semibold ">Daniel Gaievskyi</h1>
        <h2 className="text-muted-foreground">
          Design Engineer
          {/* Design Engineer @{" "}
          <a href="https://authologic.com" target="_blank">
            Authologic
          </a> */}
        </h2>
      </div>
      <ThemeSwitch />
    </div>
  )
}
