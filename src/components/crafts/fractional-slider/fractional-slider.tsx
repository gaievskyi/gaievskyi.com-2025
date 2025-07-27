"use client"

import { cn } from "@/lib/utils"
import { motion, useWillChange } from "framer-motion"
import { useRef } from "react"

const MIN = -90
const MAX = 90
const TICK_SPACING = 7
const CONTAINER_WIDTH = 600

const getPositionFromValue = (val: number, min: number, max: number) => {
  return ((val - min) / (max - min)) * 100
}

function Ticks({ min, max }: { min: number; max: number }) {
  const ticks = []

  for (let i = min; i <= max; i++) {
    const isMajor = i % 5 === 0
    const isEndValue = i === min || i === max

    if (isMajor) {
      ticks.push(
        <div
          key={`major-${i}`}
          className="absolute top-1/2 h-4 w-px -translate-x-1/2 -translate-y-3/4 transform rounded-full bg-black dark:bg-white"
          style={{ left: `${getPositionFromValue(i, min, max)}%` }}
        >
          <div
            className={cn(
              "absolute -top-6 left-1/2 -translate-x-1/2 transform text-xs",
              isEndValue ? "text-gray-400" : "text-black dark:text-white",
            )}
          >
            {i}
          </div>
        </div>,
      )
    } else {
      ticks.push(
        <div
          key={`minor-${i}`}
          className="absolute top-1/2 h-2 w-px -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-black dark:bg-[#707070]"
          style={{ left: `${getPositionFromValue(i, min, max)}%` }}
        />,
      )
    }
  }

  return ticks
}

function Indicator() {
  return (
    <div className="absolute bottom-31 left-1/2 size-0 -translate-x-1/2 rotate-180 transform cursor-grab border-t-[8px] border-r-[4px] border-l-[4px] border-t-red-500 border-r-transparent border-l-transparent active:cursor-grabbing" />
  )
}

export function FractionalSlider() {
  const willChange = useWillChange()
  const containerRef = useRef<HTMLDivElement>(null)
  const totalTicks = MAX - MIN + 1
  const sliderWidth = totalTicks * TICK_SPACING
  const centerOffset = CONTAINER_WIDTH / 2
  const zeroPosition = (getPositionFromValue(0, MIN, MAX) / 100) * sliderWidth
  const initialX = centerOffset - zeroPosition

  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div
        ref={containerRef}
        className="relative size-full cursor-ew-resize overflow-hidden select-none"
        style={{ width: `${CONTAINER_WIDTH}px` }}
      >
        <motion.div
          role="slider"
          aria-label="Fractional slider"
          aria-orientation="horizontal"
          aria-valuemin={MIN}
          aria-valuemax={MAX}
          aria-valuenow={0}
          aria-valuetext={`0 degrees`}
          className="relative h-full"
          style={{
            width: `${sliderWidth}px`,
            willChange,
          }}
          initial={{ x: initialX }}
          drag="x"
          dragConstraints={{
            left: -(sliderWidth - CONTAINER_WIDTH / 2),
            right: CONTAINER_WIDTH / 2,
          }}
          dragElastic={0.05}
          dragMomentum={true}
          dragTransition={{
            power: 0.01,
            timeConstant: 100,
          }}
        >
          <Ticks min={MIN} max={MAX} />
        </motion.div>
      </div>
      <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent dark:from-[#0B0B09]" />
      <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent dark:from-[#0B0B09]" />
      <Indicator />
    </div>
  )
}
