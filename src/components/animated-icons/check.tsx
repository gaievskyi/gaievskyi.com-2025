"use client"

import { cn } from "@/lib/utils"
import type { Variants } from "motion/react"
import { motion, useAnimation } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useImperativeHandle } from "react"

export type CheckIconHandle = {
  startAnimation: () => void
  stopAnimation: () => void
}

type CheckIconProps = HTMLAttributes<HTMLDivElement> & {
  size?: number
}

const checkVariants: Variants = {
  normal: {
    pathLength: 0,
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
}

const CheckIcon = forwardRef<CheckIconHandle, CheckIconProps>(
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
          <motion.path
            d="M20 6L9 17L4 12"
            variants={checkVariants}
            initial="normal"
            animate={controls}
            style={{ pathLength: 0 }}
          />
        </svg>
      </div>
    )
  },
)

CheckIcon.displayName = "CheckIcon"

export { CheckIcon }
