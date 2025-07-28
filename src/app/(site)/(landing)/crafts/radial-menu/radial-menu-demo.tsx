"use client"

import { useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { RadialMenu } from "@/components/crafts/radial-menu/radial-menu"
import { Icon } from "@/components/ui/icon"

const items = [
  {
    icon: <Icon name="sprite:print" className="size-5" />,
    label: "Print",
  },
  {
    icon: <Icon name="sprite:arrow" className="size-5 rotate-180" />,
    label: "Forward",
  },
  {
    icon: <Icon name="sprite:save" className="size-5" />,
    label: "Save",
  },
  {
    icon: <Icon name="sprite:inspect" className="size-5" />,
    label: "Inspect",
  },
  {
    icon: <Icon name="sprite:arrow" className="size-5" />,
    label: "Back",
  },
  {
    icon: <Icon name="sprite:reload" className="size-4" />,
    label: "Reload",
  },
]

export function RadialMenuDemo() {
  const demoContainerRef = useRef<HTMLDivElement>(null)
  const [menuVisible, setMenuVisible] = useState(false)
  return (
    <div
      ref={demoContainerRef}
      className="relative size-full bg-white dark:bg-[#1C1C1C]"
    >
      <AnimatePresence initial={false}>
        {!menuVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            data-visible={false}
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 text-sm text-nowrap text-gray-500 select-none dark:text-[#a0a0a0]"
          >
            Hold and rotate from anywhere
          </motion.div>
        )}
      </AnimatePresence>
      <RadialMenu
        items={items}
        onVisibleChange={setMenuVisible}
        containerRef={demoContainerRef}
      />
    </div>
  )
}
