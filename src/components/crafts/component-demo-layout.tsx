import {
  BottomNavigation,
  type NavigationItem,
} from "@/components/crafts/bottom-navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HapticLink } from "@/components/ui/haptic-link"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { ViewTransition } from "react"

type ComponentDemoLayoutProps = {
  title: string
  date: string
  children: ReactNode
  previous?: NavigationItem
  next?: NavigationItem
  className?: string
  slug?: string
  decoratedBackground?: boolean
}

export function ComponentDemoLayout({
  title,
  date,
  children,
  previous,
  next,
  slug,
  className,
  decoratedBackground = true,
}: ComponentDemoLayoutProps) {
  return (
    <article className="container flex h-svh w-full flex-col justify-center px-4 pt-12 sm:px-0">
      <Flex gap="xl" align="center" justify="between">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<HapticLink href="/" />}>
                <Icon name="sprite:arrow-back" className="size-4.5" /> Index
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>Crafts</BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>
                <Heading weight="medium" className="tracking-tight">
                  {title}
                </Heading>
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <time
          dateTime={date}
          className="text-xs text-nowrap text-muted-foreground sm:text-sm"
        >
          {date}
        </time>
      </Flex>
      <ViewTransition name={`video-${slug}`} default="scale">
        <Flex
          as="main"
          align="center"
          justify="center"
          className={cn(
            "overflow-hidden rounded-2xl corner-squircle supports-corner:rounded-3xl h-[380px] relative mt-10 outline-1 outline-border",
            decoratedBackground &&
              "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.03)_11px)]",
            decoratedBackground &&
              "dark:bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.03)_10px,rgba(255,255,255,0.03)_11px)]",
            className,
          )}
        >
          {children}
        </Flex>
      </ViewTransition>
      {(previous || next) && (
        <BottomNavigation previous={previous} next={next} />
      )}
    </article>
  )
}
