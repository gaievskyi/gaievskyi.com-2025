import { cn } from "@/lib/utils"
import { Clock } from "@/components/clock"

export function FooterContent({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex justify-between gap-5 text-muted-foreground2",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm">
        {new Date().getFullYear()},
        <Clock />
        <div className="inline-flex gap-1">
          <span>&copy;</span>
          <span className="hidden lg:inline">Daniel Gaievskyi</span>
        </div>
      </p>
      <p className="flex items-center gap-4 text-sm">
        <a href="mailto:daniel@gaievskyi.com" className="hover:text-brand">
          Contact
        </a>
      </p>
    </div>
  )
}
