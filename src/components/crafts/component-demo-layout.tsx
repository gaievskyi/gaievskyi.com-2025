import { BackAside } from "@/components/back-aside"
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
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { cn } from "@/lib/utils"
import Link from "next/link"
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
    <>
      <BackAside />
      <article className="container flex h-svh w-full flex-col justify-center px-4 pt-12 sm:px-0">
        <Flex direction="col" gap="xs">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  Index
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
            className="text-xs text-muted-foreground sm:text-sm"
          >
            {date}
          </time>
        </Flex>
        <ViewTransition name={`video-${slug}`}>
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
    </>
  )
}
