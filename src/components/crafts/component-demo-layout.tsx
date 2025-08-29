import { AutoScrollTop } from "@/components/auto-scroll-top"
import { BackAside } from "@/components/back-aside"
import {
  BottomNavigation,
  type NavigationItem,
} from "@/components/crafts/bottom-navigation"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"
import { unstable_ViewTransition as ViewTransition } from "react"

type ComponentDemoLayoutProps = {
  title: string
  date: string
  children: ReactNode
  previous?: NavigationItem
  next?: NavigationItem
  className?: string
  slug?: string
}

export function ComponentDemoLayout({
  title,
  date,
  children,
  previous,
  next,
  slug,
  className,
}: ComponentDemoLayoutProps) {
  return (
    <>
      <AutoScrollTop />
      <BackAside />
      <article className="container flex h-svh w-full flex-col justify-center px-4 pt-12 sm:px-0">
        <Flex direction="col">
          <Heading weight="semibold">{title}</Heading>
          <Heading as="h2" size="sm" color="muted">
            {date}
          </Heading>
        </Flex>
        <ViewTransition name={`video-${slug}`}>
          <Flex
            as="main"
            align="center"
            justify="center"
            className={cn(
              "overflow-hidden h-[380px] relative mt-10 border border-border rounded-xl bg-white dark:bg-[#0B0B09]",
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
    </>
  )
}
