"use client"
import { useScroll } from "@/hooks/use-scroll"
import { cn } from "@/lib/utils"
import { type HTMLMotionProps, LazyMotion } from "motion/react"
import * as m from "motion/react-m"

const features = () =>
  import("./lazy-motion-animations").then((mod) => mod.default)

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
  const { scrollYPercentage } = useScroll()
  const layers = Math.max(blurLayers, 2)
  const segmentSize = 1 / (blurLayers + 1)

  if (scrollYPercentage === 0 || scrollYPercentage === 100) return null

  return (
    <div
      className={cn(
        "fixed left-0 right-0 z-50 pointer-events-none",
        position === "bottom" ? "bottom-0" : "top-0",
        className,
      )}
    >
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction]
        const gradientStops = [
          index * segmentSize,
          (index + 1) * segmentSize,
          (index + 2) * segmentSize,
          (index + 3) * segmentSize,
        ].map(
          (pos, posIndex) =>
            `rgba(255, 255, 255, ${posIndex === 1 || posIndex === 2 ? 1 : 0}) ${pos * 100}%`,
        )

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(
          ", ",
        )})`

        return (
          <LazyMotion strict key={index} features={features}>
            <m.div
              className="pointer-events-none absolute inset-0 rounded-[inherit]"
              style={{
                maskImage: gradient,
                WebkitMaskImage: gradient,
                backdropFilter: `blur(${index * blurIntensity}px)`,
                WebkitBackdropFilter: `blur(${index * blurIntensity}px)`,
              }}
              {...props}
            />
          </LazyMotion>
        )
      })}
    </div>
  )
}
