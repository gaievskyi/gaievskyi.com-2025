"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { useIsMobile } from "@/hooks/use-is-mobile"
import { cn } from "@/lib/utils"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import type { TocItem } from "./generate-toc"

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: "blur(4px)",
    x: -15,
  },
  visible: {
    filter: "blur(0px)",
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
      mass: 0.8,
    },
  },
}

type TocItemProps = {
  item: TocItem
  isActive: boolean
  onScrollTo: (id: string) => void
  isMobile: boolean
}

function TocItem({ item, isActive, onScrollTo, isMobile }: TocItemProps) {
  return (
    <motion.button
      aria-current={isActive ? "location" : undefined}
      title={`Navigate to ${item.title}`}
      variants={itemVariants}
      onClick={() => onScrollTo(item.id)}
      className={cn(
        "block w-full text-left py-1 text-sm leading-relaxed transition-colors duration-200",
        "hover:text-zinc-900 dark:hover:text-zinc-100",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 dark:focus-visible:ring-zinc-100/20",
        "focus-visible:rounded-sm",
        item.level === 1 && "font-medium text-zinc-600 dark:text-zinc-400",
        item.level === 2 && "pl-4 text-xs text-zinc-500 dark:text-zinc-500",
        item.level >= 3 && "pl-8 text-xs text-zinc-500 dark:text-zinc-500",
        isActive && "text-zinc-900 dark:text-zinc-100 font-medium",
      )}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <span className="relative flex items-center">
        {isActive && !isMobile && (
          <motion.span
            aria-hidden="true"
            className="absolute top-1/2 -left-4 -translate-y-1/2 text-zinc-900 dark:text-zinc-100"
            layoutId="toc-indicator"
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            -
          </motion.span>
        )}
        {item.title}
      </span>
    </motion.button>
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
  const [activeId, setActiveId] = useState<string>("")
  const isMobile = useIsMobile()

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
    <nav
      className={cn("", className)}
      aria-label="Table of contents"
      role="navigation"
    >
      <AnimatePresence initial={false}>
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            opacity: { duration: 0.2 },
          }}
          style={{ overflow: "hidden" }}
        >
          <ScrollArea className="h-fit max-h-[60svh]">
            <div className="space-y-1 pr-3">
              {items.map((item) => (
                <TocItem
                  key={item.id}
                  item={item}
                  isActive={activeId === item.id}
                  onScrollTo={scrollToHeading}
                  isMobile={isMobile}
                />
              ))}
            </div>
          </ScrollArea>
        </motion.div>
      </AnimatePresence>
    </nav>
  )
}
