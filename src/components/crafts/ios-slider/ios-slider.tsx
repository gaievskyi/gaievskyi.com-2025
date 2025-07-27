"use client"

import { useState, useRef } from "react"
import { motion, useMotionValue, useTransform, animate } from "motion/react"

const MIN_VALUE = 0
const MAX_VALUE = 100

function ProgressBar({
  value,
  min,
  max,
}: {
  value: number
  min: number
  max: number
}) {
  const progressHeight = `${((value - min) / (max - min)) * 100}%`

  return (
    <motion.div
      className="pointer-events-none absolute right-0 bottom-0 left-0 origin-bottom bg-white"
      style={{ height: progressHeight }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
    />
  )
}

type IosSliderProps = Omit<
  React.ComponentPropsWithoutRef<"input">,
  "type" | "min" | "max"
> & {
  defaultValue?: number
  value?: number
  min?: number
  max?: number
  icon?: React.ReactNode
}

export function IosSlider({
  defaultValue = 0,
  value: valueProp = defaultValue,
  min = MIN_VALUE,
  max = MAX_VALUE,
  icon,
  onChange,
  ...props
}: IosSliderProps) {
  const [value, setValue] = useState(defaultValue || valueProp)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const lastExtremeRef = useRef<"min" | "max" | null>(null)
  const stretchMotion = useMotionValue(0)
  const containerScaleY = useTransform(stretchMotion, [0, 1], [1, 1.07])
  const containerScaleX = useTransform(stretchMotion, [0, 1], [1, 0.95])

  const resetStretch = () => {
    animate(stretchMotion, 0, { duration: 0.2, ease: "easeOut" })
  }

  const updateValue = (newValue: number) => {
    if (!inputRef.current) return
    const clampedValue = Math.max(min, Math.min(max, newValue))
    setValue(clampedValue)
    inputRef.current.value = clampedValue.toString()
    inputRef.current.dispatchEvent(new Event("input", { bubbles: true }))
    if (clampedValue === min || clampedValue === max) {
      lastExtremeRef.current = clampedValue === min ? "min" : "max"
      animate(stretchMotion, 1, { duration: 0.2, ease: "easeOut" })
    } else {
      resetStretch()
    }
  }

  const calculateValueFromPosition = (clientY: number) => {
    if (!containerRef.current) return value
    const rect = containerRef.current.getBoundingClientRect()
    const percentage = Math.max(
      0,
      Math.min(1, 1 - (clientY - rect.top) / rect.height),
    )
    return min + (max - min) * percentage
  }

  const onInteraction = (clientY: number, isStart = false) => {
    if (isStart) isDragging.current = true
    if (!isDragging.current && !isStart) return
    const newValue = calculateValueFromPosition(clientY)
    updateValue(newValue)
  }

  const onEnd = () => {
    isDragging.current = false
    resetStretch()
  }

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    onInteraction(e.clientY, true)
    const onMouseMove = (e: MouseEvent) => onInteraction(e.clientY)
    const onMouseUp = () => {
      onEnd()
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onInteraction(e.touches[0].clientY, true)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onInteraction(e.touches[0].clientY)
  }

  const onTouchEnd = (e: React.TouchEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onEnd()
  }

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.valueAsNumber
    if (!isNaN(newValue)) updateValue(newValue)
    onChange?.(e)
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    const step = ((max - min) / 100) * 3
    let newValue = value
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault()
        newValue = Math.min(max, value + step)
        break
      case "ArrowDown":
        e.preventDefault()
        newValue = Math.max(min, value - step)
        break
      default:
        return
    }
    updateValue(newValue)
  }

  const transformOrigin =
    lastExtremeRef.current === "min" ? "50% 0%" : "50% 100%"

  return (
    <motion.div
      ref={containerRef}
      className="relative flex h-56 w-22 touch-none items-end justify-center overflow-hidden rounded-full bg-ios-slider-bg shadow-[0_0_20px_rgba(255,255,255,0.05),inset_0_2px_0_rgba(255,255,255,0.05)] outline-1 outline-gray-200 backdrop-blur-sm select-none focus:ring-2 focus:ring-blue-500 dark:outline-none"
      style={{
        scaleY: containerScaleY,
        scaleX: containerScaleX,
        transformOrigin,
      }}
      role="slider"
      aria-orientation="vertical"
      aria-valuenow={value}
      aria-valuemin={min}
      aria-valuemax={max}
      tabIndex={0}
      onMouseLeave={resetStretch}
      onBlur={resetStretch}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onKeyDown={onKeyDown}
    >
      <ProgressBar value={value} min={min} max={max} />
      <div className="text-ios-slider-icon pointer-events-none absolute bottom-[20px] left-1/2 -translate-x-1/2">
        {icon}
      </div>
      <input
        ref={inputRef}
        type="range"
        min={min}
        max={max}
        step={0.1}
        value={value}
        onChange={onInputChange}
        className="absolute inset-0 h-full w-full appearance-none opacity-0 [writing-mode:vertical-lr]"
        aria-hidden="true"
        {...props}
      />
    </motion.div>
  )
}
