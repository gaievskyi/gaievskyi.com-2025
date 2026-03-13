"use client"

import { usePrevious } from "@/hooks/use-previous"
import { useSound } from "@/hooks/use-sound"
import { cn } from "@/lib/utils"
import {
  LazyMotion,
  useMotionValue,
  useTransform,
  useWillChange,
} from "motion/react"
import * as m from "motion/react-m"
import { useEffect, useRef, useState } from "react"

const domMax = () => import("@/components/dom-max").then((mod) => mod.default)

const MIN = -90
const MAX = 90
const TICK_SPACING = 7
const CONTAINER_WIDTH = 600

function Ticks({
  min,
  max,
  currentValue,
}: {
  min: number
  max: number
  currentValue: number
}) {
  const tickValues = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="flex h-full items-center">
      {tickValues.map((value) => {
        const isMajor = value % 5 === 0
        const isInRange =
          value >= Math.min(currentValue, 0) &&
          value <= Math.max(currentValue, 0)

        if (isMajor) {
          return (
            <div
              key={`major-${value}`}
              className="relative flex items-center justify-center"
              style={{ width: `${TICK_SPACING}px` }}
            >
              <div
                className={cn(
                  "h-4 w-[1.5px] -translate-y-1/4 rounded-full transition-colors duration-150",
                  isInRange ? "bg-red-500" : "bg-black dark:bg-white",
                )}
              />
              <div
                className={cn(
                  "absolute -top-7 left-1/2 -translate-x-1/2 text-xs tracking-[-0.5px] transition-colors duration-150",
                  isInRange ? "text-white" : "text-black dark:text-gray-400",
                )}
              >
                {value}
              </div>
            </div>
          )
        } else {
          return (
            <div
              key={`minor-${value}`}
              className="flex items-center justify-center"
              style={{ width: `${TICK_SPACING}px` }}
            >
              <div
                className={cn(
                  "h-2 w-[1.5px] rounded-full transition-colors duration-150",
                  isInRange
                    ? "bg-red-500"
                    : "bg-black dark:bg-[hsl(0_0%_43.9%)]",
                )}
              />
            </div>
          )
        }
      })}
    </div>
  )
}

function Indicator() {
  return (
    <div className="absolute bottom-31 left-1/2 size-0 -translate-x-1/2 rotate-180 transform cursor-grab border-x-4 border-t-8 border-x-transparent border-t-red-500 active:cursor-grabbing" />
  )
}

export function FractionalSlider() {
  const willChange = useWillChange()
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentValue, setCurrentValue] = useState(0)
  const prevValue = usePrevious(currentValue)
  const [playTick] = useSound("/sounds/tick.mp3", {
    interrupt: true,
  })
  const totalTicks = MAX - MIN + 1
  const sliderWidth = totalTicks * TICK_SPACING
  const centerOffset = CONTAINER_WIDTH / 2
  const zeroPosition = ((0 - MIN) / (MAX - MIN)) * sliderWidth
  const initialX = centerOffset - zeroPosition
  const x = useMotionValue(initialX)
  const value = useTransform(x, (latestX) => {
    const minX = initialX - sliderWidth / 2
    const maxX = initialX + sliderWidth / 2
    const percentage = 1 - (latestX - minX) / (maxX - minX)
    const rawValue = MIN + percentage * (MAX - MIN)
    return Math.round(Math.max(MIN, Math.min(MAX, rawValue)))
  })

  useEffect(() => {
    return value.on("change", (latestValue) => {
      if (latestValue !== prevValue) {
        setCurrentValue(latestValue)
        if (latestValue !== 0) {
          playTick()
        }
      }
    })
  }, [value, prevValue, playTick])

  useEffect(() => {
    const onWheel = (event: WheelEvent) => {
      event.preventDefault()
      const scrollSensitivity = 0.15

      let delta = 0
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY)) {
        delta = event.deltaX
      } else {
        delta = event.deltaY
      }

      const newX = x.get() - delta * scrollSensitivity
      const minX = initialX - sliderWidth / 2
      const maxX = initialX + sliderWidth / 2
      const clampedX = Math.max(minX, Math.min(maxX, newX))
      x.set(clampedX)
    }
    const container = containerRef.current
    if (container) {
      container.addEventListener("wheel", onWheel, { passive: false })
      return () => {
        container.removeEventListener("wheel", onWheel)
      }
    }
  }, [x, initialX, sliderWidth])

  return (
    <LazyMotion strict features={domMax}>
      <div
        ref={containerRef}
        className="relative size-full cursor-ew-resize overflow-hidden select-none"
        style={{ width: `${CONTAINER_WIDTH}px` }}
      >
        <m.div
          role="slider"
          aria-label="Fractional slider"
          aria-orientation="horizontal"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={currentValue}
          aria-valuetext={`${currentValue} degrees`}
          className="relative h-full"
          style={{
            width: `${sliderWidth}px`,
            willChange,
            x,
          }}
          drag="x"
          dragConstraints={{
            left: -(sliderWidth - CONTAINER_WIDTH / 2),
            right: CONTAINER_WIDTH / 2,
          }}
          dragElastic={0.05}
          dragTransition={{
            power: 0.1,
            timeConstant: 150,
          }}
        >
          <Ticks min={MIN} max={MAX} currentValue={currentValue} />
        </m.div>
        <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-linear-to-r from-white to-transparent dark:from-[#0B0B09]" />
        <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-linear-to-l from-white to-transparent dark:from-[#0B0B09]" />
        <Indicator />
        <p
          className={cn(
            "absolute bottom-24 left-1/2 -translate-x-1/2 text-xs text-gray-500 transition-opacity duration-300 dark:text-gray-400",
            currentValue !== 0 ? "opacity-0" : "opacity-100",
          )}
        >
          Scroll or drag
        </p>
      </div>
    </LazyMotion>
  )
}
