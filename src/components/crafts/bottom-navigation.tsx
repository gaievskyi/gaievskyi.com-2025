import Link from "next/link"
import { cn } from "@/lib/utils"

export type NavigationItem = {
  title: string
  href: string
}

type BottomNavigationProps = {
  previous?: NavigationItem
  next?: NavigationItem
  className?: string
}

export function BottomNavigation({
  previous,
  next,
  className,
}: BottomNavigationProps) {
  return (
    <nav
      className={cn(
        "flex items-center mb-16 justify-between gap-4 border-t border-border pt-8 mt-12",
        className,
      )}
    >
      {/* Previous Link */}
      <div className="flex-1">
        {previous ? (
          <Link
            href={previous.href}
            className="flex items-center gap-3 rounded-lg p-4 transition-all hover:bg-accent/50 dark:hover:bg-accent/30"
          >
            <div className="flex flex-col gap-1 text-left">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Previous
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {previous.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="h-16" />
        )}
      </div>

      {/* Next Link */}
      <div className="flex-1">
        {next ? (
          <Link
            href={next.href}
            className="group flex items-center justify-end gap-3 rounded-lg p-4 transition-all hover:bg-accent/50 dark:hover:bg-accent/30"
          >
            <div className="flex flex-col gap-1 text-right">
              <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                Next
              </span>
              <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                {next.title}
              </span>
            </div>
          </Link>
        ) : (
          <div className="h-16" />
        )}
      </div>
    </nav>
  )
}
