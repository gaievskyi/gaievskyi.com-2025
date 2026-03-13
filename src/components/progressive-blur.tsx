"use client"

import { cn } from "@/lib/utils"
import { type HTMLMotionProps, useScroll, useTransform } from "motion/react"
import * as m from "motion/react-m"
import { useMemo } from "react"

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
}

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES
  position?: "top" | "bottom"
  blurLayers?: number
  blurIntensity?: number
  className?: string
} & HTMLMotionProps<"div">

export function ProgressiveBlur({
  direction = "bottom",
  position = "top",
  blurLayers = 16,
  blurIntensity = 0.3,
  className,
  ...props
}: ProgressiveBlurProps) {
  const { scrollY } = useScroll()

  // Transform scroll Y to opacity (show when scrolled, hide at very top and bottom)
  const opacity = useTransform(scrollY, (value) => {
    // Get current scroll percentage
    if (typeof window === "undefined") return 0
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercentage = maxScroll > 0 ? (value / maxScroll) * 100 : 0

    // Hide at very top (0%) and very bottom (100%)
    if (scrollPercentage <= 0.1 || scrollPercentage >= 99.9) return 0
    return 1
  })

  const blurConfig = useMemo(() => {
    const layers = Math.max(blurLayers, 2)
    const segmentSize = 1 / (blurLayers + 1)
    const angle = GRADIENT_ANGLES[direction]

    return Array.from({ length: layers }).map((_, index) => {
      const gradientStops = [
        index * segmentSize,
        (index + 1) * segmentSize,
        (index + 2) * segmentSize,
        (index + 3) * segmentSize,
      ].map(
        (pos, posIndex) =>
          `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
      )

      const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`

      return {
        gradient,
        blur: `blur(${index * blurIntensity}px)`,
      }
    })
  }, [direction, blurLayers, blurIntensity])

  return (
    <m.div
      className={cn(
        "fixed left-0 right-0 z-50 pointer-events-none",
        position === "bottom" ? "bottom-0" : "top-0",
        className,
      )}
      style={{ opacity }}
    >
      {blurConfig.map((config, index) => (
        <m.div
          key={index}
          className="pointer-events-none absolute inset-0 rounded-[inherit]"
          style={{
            maskImage: config.gradient,
            WebkitMaskImage: config.gradient,
            backdropFilter: config.blur,
            WebkitBackdropFilter: config.blur,
          }}
          {...props}
        />
      ))}
    </m.div>
  )
}
