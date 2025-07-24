"use client"

import { cn } from "@/lib/utils"
import type { Transition } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useImperativeHandle } from "react"

export type CopyIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type CopyIconProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

const defaultTransition: Transition = {
  type: "spring",
  stiffness: 160,
  damping: 17,
  mass: 1,
}

const CopyIcon = forwardRef<CopyIconHandle, CopyIconProps>(
  ({ className, size = 28, ...props }, ref) => {
    const controls = useAnimation()

    useImperativeHandle(ref, () => ({
      startAnimation: () => controls.start("animate"),
      stopAnimation: () => controls.start("normal"),
    }))

    return (
      <div className={cn(className)} {...props}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.rect
            width="14"
            height="14"
            x="8"
            y="8"
            rx="2"
            ry="2"
            variants={{
              normal: { y: 0, x: 0 },
              animate: { y: -3, x: -3 },
            }}
            animate={controls}
            transition={defaultTransition}
          />
          <motion.path
            d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
            variants={{
              normal: { x: 0, y: 0 },
              animate: { x: 3, y: 3 },
            }}
            transition={defaultTransition}
            animate={controls}
          />
        </svg>
      </div>
    )
  },
)

CopyIcon.displayName = "CopyIcon"

export { CopyIcon }
