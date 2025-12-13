"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"
import { useCallback, useEffect, useRef, useState } from "react"
import type { TocItem } from "./generate-toc"

type TocItemProps = {
  item: TocItem
  isActive: boolean
  onScrollTo: (id: string) => void
}

function TocItem({ item, isActive, onScrollTo }: TocItemProps) {
  const getTickWidth = () => {
    if (item.level === 1) return isActive ? "w-12" : "w-8"
    if (item.level === 2) return isActive ? "w-6" : "w-4"
    return isActive ? "w-3" : "w-2"
  }

  return (
    <button
      aria-current={isActive ? "location" : undefined}
      title={`Go to "${item.title}"`}
      onClick={() => onScrollTo(item.id)}
      className={cn(
        "relative flex items-center w-full text-left py-2 text-sm leading-relaxed transition-colors duration-200",
        "hover:text-zinc-900 dark:hover:text-zinc-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:focus-visible:ring-zinc-100/20",
        "focus-visible:rounded-sm",
        "after:absolute after:bottom-0 after:h-px after:bg-zinc-200 dark:after:bg-zinc-800 after:transition-all after:duration-200",
        "last:after:hidden",
        item.level === 1 && "gap-4 after:left-0 after:w-8",
        item.level === 2 && "gap-3 after:left-0 after:w-4",
        item.level >= 3 && "gap-2 after:left-0 after:w-2",
      )}
    >
      <span
        className={cn(
          "shrink-0 relative flex items-center transition-all duration-200",
          "before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-px before:w-full before:transition-all before:duration-200",
          isActive
            ? "before:bg-zinc-900 dark:before:bg-zinc-100"
            : "before:bg-zinc-200 dark:before:bg-zinc-800",
          getTickWidth(),
        )}
      />
      <span
        className={cn(
          "transition-colors duration-200",
          item.level === 1 && "font-medium text-zinc-600 dark:text-zinc-400",
          item.level === 2 && "text-xs text-zinc-500 dark:text-zinc-500",
          item.level >= 3 && "text-xs text-zinc-500 dark:text-zinc-500",
          isActive && "text-zinc-900 dark:text-zinc-100",
        )}
      >
        {item.title}
      </span>
    </button>
  )
}

type TableOfContentsProps = Readonly<{
  className?: string
  containerSelector?: string
  items: TocItem[]
}>

export function TableOfContents({
  className,
  containerSelector = "main",
  items,
}: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>(items[0]?.id || "")

  const isScrollingRef = useRef(false)
  const scrollEndTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const scrollEndTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const onIntersect = useCallback((entries: IntersectionObserverEntry[]) => {
    if (isScrollingRef.current) return
    for (const entry of entries) {
      if (entry.isIntersecting) {
        setActiveId(entry.target.id)
        break
      }
    }
  }, [])

  const { observeElements } = useIntersectionObserver({
    onIntersect,
    rootMargin: "-20% 0% -35% 0%",
    threshold: 0,
    enabled: items.length > 0,
  })

  useEffect(() => {
    if (!items || items.length === 0) return

    const container = containerSelector
      ? document.querySelector(containerSelector)
      : document

    if (!container) return

    const headings = container.querySelectorAll("h1, h2, h3, h4, h5, h6")

    let itemIndex = 0
    for (const heading of headings) {
      if (itemIndex < items.length) {
        const item = items[itemIndex]
        const headingText = heading.textContent?.trim() || ""
        if (headingText === item.title) {
          heading.id = item.id
          itemIndex++
        }
      }
    }

    let currentActiveId = items[0]?.id || ""
    for (const heading of headings) {
      const rect = heading.getBoundingClientRect()
      const headingId = heading.id

      if (rect.top <= window.innerHeight * 0.3 && headingId) {
        currentActiveId = headingId
      }
    }
    // eslint-disable-next-line react-you-might-not-need-an-effect/no-derived-state, react-hooks/set-state-in-effect
    setActiveId(currentActiveId)

    const elementsToObserve = items
      .map((item) => document.getElementById(item.id))
      .filter((element): element is HTMLElement => element !== null)

    if (elementsToObserve.length > 0) {
      observeElements(elementsToObserve)
    }
  }, [items, containerSelector, observeElements])

  function scrollToHeading(id: string) {
    const element = document.getElementById(id)
    if (element) {
      setActiveId(id)
      isScrollingRef.current = true

      if (scrollEndTimeoutRef.current) {
        clearTimeout(scrollEndTimeoutRef.current)
      }
      if (scrollEndTimerRef.current) {
        clearTimeout(scrollEndTimerRef.current)
      }

      const offsetTop = element.offsetTop - 100
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      })

      scrollEndTimeoutRef.current = setTimeout(() => {
        isScrollingRef.current = false
      }, 1000)

      const onScrollEnd = () => {
        if (scrollEndTimerRef.current) {
          clearTimeout(scrollEndTimerRef.current)
        }
        scrollEndTimerRef.current = setTimeout(() => {
          isScrollingRef.current = false
          if (scrollEndTimeoutRef.current) {
            clearTimeout(scrollEndTimeoutRef.current)
          }
          window.removeEventListener("scroll", onScrollEnd)
        }, 100)
      }

      window.addEventListener("scroll", onScrollEnd)
    }
  }

  if (items.length === 0) {
    return null
  }

  return (
    <nav className={className} aria-label="Table of contents" role="navigation">
      <ScrollArea className="h-fit max-h-[60svh]">
        <div className="pr-3">
          {items.map((item) => (
            <TocItem
              key={item.id}
              item={item}
              isActive={activeId === item.id}
              onScrollTo={scrollToHeading}
            />
          ))}
        </div>
      </ScrollArea>
    </nav>
  )
}
