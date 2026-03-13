import { Button } from "@/components/ui/button"
import { Flex } from "@/components/ui/layout/flex"
import { cn } from "@/lib/utils"
import Link from "next/link"

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
        "mt-12 mb-16 flex items-center justify-between border-t border-border pt-8",
        className,
      )}
    >
      <div className="flex-1">
        {previous ? (
          <Link href={previous.href}>
            <Button
              variant="ghost"
              size="xl"
              className="size-full justify-start"
            >
              <Flex direction="col" gap="sm">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Previous
                </span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  {previous.title}
                </span>
              </Flex>
            </Button>
          </Link>
        ) : (
          <div className="h-16" />
        )}
      </div>
      <div className="flex-1">
        {next ? (
          <Link href={next.href}>
            <Button variant="ghost" size="xl" className="size-full justify-end">
              <Flex direction="col" gap="sm" align="end">
                <span className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                  Next
                </span>
                <span className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
                  {next.title}
                </span>
              </Flex>
            </Button>
          </Link>
        ) : (
          <div className="h-16" />
        )}
      </div>
    </nav>
  )
}
