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
    <>
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
              "overflow-hidden [corner-shape:squircle] h-[380px] relative mt-10 rounded-3xl outline-1 outline-border",
              decoratedBackground &&
                "bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.03)_11px)]",
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
    </>
  )
}
