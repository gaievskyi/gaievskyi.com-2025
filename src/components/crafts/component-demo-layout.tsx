import {
  BottomNavigation,
  type NavigationItem,
} from "@/components/crafts/bottom-navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { unstable_ViewTransition as ViewTransition } from "react"
import { BackAside } from "@/components/back-aside"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"

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
      <BackAside />
      <article className="container mt-12 px-4 pt-8 sm:px-0 sm:pt-0">
        <Flex direction="col" gap="sm" className="mb-6">
          <Heading size="sm" weight="semibold">
            {title}
          </Heading>
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
