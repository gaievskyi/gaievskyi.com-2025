import {
  BottomNavigation,
  type NavigationItem,
} from "@/components/crafts/bottom-navigation"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { unstable_ViewTransition as ViewTransition } from "react"
import { BackAside } from "@/components/back-aside"

type ComponentDemoLayoutProps = {
  title: string
  date: string
  children: ReactNode
  previous?: NavigationItem
  next?: NavigationItem
  article?: ReactNode
  className?: string
  slug?: string
}

export function ComponentDemoLayout({
  title,
  date,
  children,
  previous,
  next,
  article,
  slug,
  className,
}: ComponentDemoLayoutProps) {
  return (
    <>
      <BackAside />
      <article className="container mt-12 px-4 pt-8 sm:px-0 sm:pt-0">
        <div className="mb-6 flex flex-col gap-2">
          <h1 className="text-sm font-semibold text-primary">{title}</h1>
          <h2 className="text-sm leading-none text-muted-foreground">{date}</h2>
        </div>

        <ViewTransition name={`video-${slug}`}>
          <div
            className={cn(
              "overflow-hidden h-[380px] relative mt-10 flex items-center justify-center border border-border rounded-xl bg-white dark:bg-[#0B0B09]",
              className,
            )}
          >
            {children}
          </div>
        </ViewTransition>

        {article && (
          <div className="prose prose-base mt-10 max-w-none overflow-hidden dark:prose-invert prose-headings:font-medium prose-headings:tracking-tight prose-h1:text-xl prose-h2:text-lg prose-h3:text-lg prose-h4:text-lg prose-p:text-base prose-p:leading-7 prose-p:text-zinc-600 dark:prose-p:text-[#bbbbbb] prose-blockquote:border-l-zinc-300 prose-blockquote:text-zinc-600 dark:prose-blockquote:border-l-zinc-700 dark:prose-blockquote:text-zinc-400 prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100 prose-code:rounded prose-code:bg-zinc-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-medium prose-code:text-zinc-900 prose-code:outline prose-code:outline-dashed prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-zinc-800 dark:prose-code:text-zinc-100 prose-pre:border prose-pre:border-zinc-200 prose-pre:bg-zinc-900 dark:prose-pre:border-zinc-800 dark:prose-pre:bg-zinc-950 prose-li:text-[15px] dark:prose-li:text-[#bbbbbb]">
            {article}
          </div>
        )}

        {(previous || next) && (
          <BottomNavigation previous={previous} next={next} />
        )}
      </article>
    </>
  )
}
