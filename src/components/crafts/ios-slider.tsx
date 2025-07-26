"use client"

import { useState, useRef, useCallback } from "react"
import { motion, useMotionValue, useTransform, animate } from "framer-motion"
import { Icon } from "@/components/ui/icon"

const MIN_VALUE = 0
const MAX_VALUE = 100

type IosSliderProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "min" | "max"
> & {
  defaultValue?: number
  min?: number
  max?: number
}

export function IosSlider({
  defaultValue = 60,
  min = MIN_VALUE,
  max = MAX_VALUE,
  ...props
}: IosSliderProps) {
  const [value, setValue] = useState(defaultValue)
  const sliderRef = useRef<HTMLDivElement>(null)
  const stretchMotion = useMotionValue(0)
  const progressHeight = `${((value - min) / (max - min)) * 100}%`
  const containerScaleY = useTransform(stretchMotion, [0, 1], [1, 1.1])
  const containerScaleX = useTransform(stretchMotion, [0, 1], [1, 0.92])

  const resetStretch = useCallback(() => {
    animate(stretchMotion, 0, { duration: 0.2, ease: "easeOut" })
  }, [stretchMotion])

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value)
    setValue(newValue)

    if (newValue === min || newValue === max) {
      animate(stretchMotion, 1, { duration: 0.2, ease: "easeOut" })
    } else {
      animate(stretchMotion, 0, { duration: 0.2, ease: "easeOut" })
    }
  }

  const onMouseDown = () => {
    if (value !== min && value !== max) {
      animate(stretchMotion, 0, { duration: 0.1 })
    }
  }

  const onMouseUp = () => {
    resetStretch()
  }

  const onTouchStart = () => {
    if (value !== min && value !== max) {
      animate(stretchMotion, 0, { duration: 0.1 })
    }
  }

  const onTouchEnd = () => {
    resetStretch()
  }

  return (
    <div className="relative h-56 w-25">
      <motion.div
        ref={sliderRef}
        className="relative flex h-full w-full touch-none items-end justify-center overflow-hidden rounded-full border border-white/10 bg-ios-slider-bg shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_1px_0_rgba(255,255,255,0.1)] outline-none"
        style={{
          scaleY: containerScaleY,
          scaleX: containerScaleX,
          transformOrigin: value === min ? "50% 0%" : "50% 100%",
        }}
        tabIndex={0}
        onMouseLeave={resetStretch}
        onBlur={resetStretch}
      >
        <motion.div
          className="pointer-events-none absolute right-0 bottom-0 left-0 origin-bottom bg-white"
          style={{
            height: progressHeight,
          }}
        />
        <Icon
          name="sprite:sun2"
          className="pointer-events-none absolute bottom-[20px] left-1/2 size-12 -translate-x-1/2 text-ios-slider-icon"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={value}
          onChange={onChange}
          onMouseDown={onMouseDown}
          onMouseUp={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          className="absolute inset-0 h-full w-full opacity-0 [direction:rtl] [writing-mode:vertical-lr]"
          {...props}
        />
      </motion.div>
    </div>
  )
}
