"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { motion, AnimatePresence, useTransform, useSpring } from "framer-motion"
import {
  CENTER_RADIUS,
  getAngleDifference,
  getArcPath,
  getDividerPath,
  getSegmentPath,
  ITEM_OFFSET,
  normalizeAngle,
  RADIUS,
} from "./math"
import { cn } from "@/lib/utils"
import { RadialMenuContext, useRadialMenu } from "./radial-menu-context"

export type RadialMenuItem = {
  icon: React.ReactNode
  label: string
}

function RadialMenuSegment({ index }: { index: number }) {
  const { items, rotation, activeIndex, cx, cy } = useRadialMenu()
  const totalItems = items.length
  const start = (360 / totalItems) * index - ITEM_OFFSET
  const end = (360 / totalItems) * (index + 1) - ITEM_OFFSET

  return (
    <path
      d={getSegmentPath(
        cx,
        cy,
        CENTER_RADIUS,
        RADIUS,
        start - rotation,
        end - rotation,
      )}
      data-active={index === activeIndex}
      className={cn(
        "transition-colors duration-200 ease-in-out",
        index === activeIndex
          ? "fill-gray-300 dark:fill-[#363636] stroke-none"
          : "fill-gray-100 dark:fill-[#242424] stroke-none",
      )}
    />
  )
}

function RadialMenuIcon({
  item,
  index,
}: {
  item: RadialMenuItem
  index: number
}) {
  const { items, rotation, activeIndex, cx, cy } = useRadialMenu()
  const totalItems = items.length
  const angle =
    ((360 / totalItems) * (index + 0.5) - rotation - ITEM_OFFSET) *
    (Math.PI / 180)
  const x = cx + (Math.cos(angle) * (RADIUS + CENTER_RADIUS)) / 2
  const y = cy + (Math.sin(angle) * (RADIUS + CENTER_RADIUS)) / 2

  return (
    <div
      data-active={index === activeIndex}
      className={cn(
        "absolute flex items-center justify-center w-12 h-12 text-2xl pointer-events-none",
        index === activeIndex
          ? " text-gray-900 dark:text-white"
          : " text-gray-600 dark:text-[#bdbdbd]",
      )}
      style={{ left: x - 24, top: y - 24 }}
    >
      {item.icon}
    </div>
  )
}

function RadialMenuCenter() {
  const { activeIndex, items, cx, cy } = useRadialMenu()

  return (
    <div
      className="pointer-events-none absolute flex items-center justify-center text-sm text-gray-600 dark:text-[#bdbdbd]"
      style={{
        left: cx - CENTER_RADIUS,
        top: cy - CENTER_RADIUS,
        width: CENTER_RADIUS * 2,
        height: CENTER_RADIUS * 2,
      }}
    >
      {activeIndex >= 0 && activeIndex < items.length
        ? items[activeIndex].label
        : "Select"}
    </div>
  )
}

function RadialMenuActiveIndicator() {
  const { activeIndex, items, rotation, cx, cy } = useRadialMenu()
  const totalItems = items.length
  const prevActiveIndex = useRef(activeIndex)
  const prevRotation = useRef(rotation)
  const isInitialSelection = useRef(true)
  const [shouldAnimate, setShouldAnimate] = useState(false)
  const ringAngle = useSpring(0, {
    damping: 20,
    stiffness: 200,
  })

  useEffect(() => {
    if (activeIndex < 0) {
      ringAngle.set(0)
      prevActiveIndex.current = activeIndex
      isInitialSelection.current = true
      setShouldAnimate(false)
      return
    }

    const newAngle = normalizeAngle(
      (360 / totalItems) * activeIndex - ITEM_OFFSET - rotation,
    )

    if (prevActiveIndex.current < 0 || isInitialSelection.current) {
      ringAngle.set(newAngle)
      isInitialSelection.current = false
      setShouldAnimate(false)
    } else {
      const oldAngle = normalizeAngle(ringAngle.get())
      const diff = getAngleDifference(oldAngle, newAngle)
      ringAngle.set(ringAngle.get() + diff)
      setShouldAnimate(true)
    }

    prevActiveIndex.current = activeIndex
    prevRotation.current = rotation
  }, [activeIndex, totalItems, rotation, ringAngle])

  const pathTransform = useTransform(ringAngle, (angle) => {
    const normalizedAngle = normalizeAngle(angle)
    const start = normalizedAngle
    const end = normalizedAngle + 360 / totalItems
    return getArcPath(cx, cy, RADIUS + 8, start, end)
  })

  if (activeIndex < 0) return null

  if (!shouldAnimate) {
    const staticAngle = normalizeAngle(
      (360 / totalItems) * activeIndex - ITEM_OFFSET - rotation,
    )
    const staticPath = getArcPath(
      cx,
      cy,
      RADIUS + 8,
      staticAngle,
      staticAngle + 360 / totalItems,
    )

    return (
      <path
        className="fill-none stroke-gray-300 stroke-8 dark:stroke-[#4a4a4a]"
        d={staticPath}
      />
    )
  }

  return (
    <motion.path
      className="fill-none stroke-gray-300 stroke-8 dark:stroke-[#4a4a4a]"
      d={pathTransform}
    />
  )
}

function RadialMenuDecorations() {
  const { items, rotation, size, cx, cy } = useRadialMenu()

  return (
    <svg width={size} height={size} className="absolute top-0 left-0">
      {items.map((item, i) => (
        <RadialMenuSegment key={item.label + i} index={i} />
      ))}
      <circle
        cx={cx}
        cy={cy}
        r={CENTER_RADIUS - 6}
        className="fill-none stroke-gray-200 stroke-1 dark:stroke-[#333333]"
      />
      <circle
        cx={cx}
        cy={cy}
        r={CENTER_RADIUS}
        className="fill-none stroke-gray-200 stroke-1 dark:stroke-[#333333]"
      />
      <circle
        cx={cx}
        cy={cy}
        r={RADIUS + 8}
        className="fill-none stroke-gray-200 stroke-8 dark:stroke-[#232323]"
      />
      {items.map((_, i) => {
        const angle = (360 / items.length) * i - rotation - ITEM_OFFSET
        return (
          <path
            key={`divider-${i}`}
            d={getDividerPath(cx, cy, angle)}
            className="fill-none stroke-gray-300 stroke-1 dark:stroke-[#333333]"
          />
        )
      })}
      <RadialMenuActiveIndicator />
    </svg>
  )
}

function RadialMenuOverlay({ children }: { children: React.ReactNode }) {
  const {
    visible,
    position,
    size,
    menuRef,
    onPointerDownMenu,
    onPointerMoveMenu,
  } = useRadialMenu()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          data-visible={visible}
          style={{
            left: position.x - size / 2,
            top: position.y - size / 2,
            width: size,
            height: size,
          }}
          className="pointer-events-auto fixed isolate select-none"
          onPointerDown={onPointerDownMenu}
          onPointerMove={onPointerMoveMenu}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

type RadialMenuProps = {
  items: RadialMenuItem[]
  onVisibleChange?: (visible: boolean) => void
  containerRef?: React.RefObject<HTMLElement | null>
}

export function RadialMenu({
  items,
  onVisibleChange,
  containerRef,
}: RadialMenuProps) {
  const [visible, setVisible] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(-1)
  const [lastSelectedIndex, setLastSelectedIndex] = useState(-1)
  const [currentPointerPosition, setCurrentPointerPosition] = useState({
    x: 0,
    y: 0,
  })
  const startAngleRef = useRef(0)
  const startRotationRef = useRef(0)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    onVisibleChange?.(visible)
  }, [visible, onVisibleChange])

  useEffect(() => {
    const container = containerRef?.current || window

    function onPointerDown(e: Event) {
      const pointerEvent = e as PointerEvent
      setVisible(true)
      setPosition({ x: pointerEvent.clientX, y: pointerEvent.clientY })
      setCurrentPointerPosition({
        x: pointerEvent.clientX,
        y: pointerEvent.clientY,
      })
      setLastSelectedIndex(-1)
      setHoveredIndex(-1)
      setRotation(0)
    }
    function onPointerUp() {
      setVisible(false)
      setDragging(false)
      setHoveredIndex(-1)
    }

    container.addEventListener("pointerdown", onPointerDown)
    container.addEventListener("pointerup", onPointerUp)
    return () => {
      container.removeEventListener("pointerdown", onPointerDown)
      container.removeEventListener("pointerup", onPointerUp)
    }
  }, [containerRef])

  function getPointerAngle(e: React.PointerEvent) {
    const rect = menuRef.current?.getBoundingClientRect()
    if (!rect) return 0
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = ("clientX" in e ? e.clientX : 0) - cx
    const dy = ("clientY" in e ? e.clientY : 0) - cy
    return normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI)
  }

  function getHoveredIndex(e: React.PointerEvent | PointerEvent) {
    const rect = menuRef.current?.getBoundingClientRect()
    if (!rect) return -1
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < CENTER_RADIUS * 0.3 || distance > RADIUS) return -1

    const angle = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI)
    const adjustedAngle = normalizeAngle(angle + rotation + ITEM_OFFSET)
    const segmentAngle = 360 / items.length
    const index = Math.floor(adjustedAngle / segmentAngle)
    return index >= 0 && index < items.length ? index : -1
  }

  function onPointerDownMenu(e: React.PointerEvent) {
    e.stopPropagation()
    setDragging(true)
    setCurrentPointerPosition({ x: e.clientX, y: e.clientY })
    startAngleRef.current = getPointerAngle(e)
    startRotationRef.current = rotation

    const currentHoveredIndex = getHoveredIndex(e)
    if (currentHoveredIndex >= 0) {
      setLastSelectedIndex(currentHoveredIndex)
    } else {
      const rect = menuRef.current?.getBoundingClientRect()
      if (rect) {
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance > CENTER_RADIUS * 0.3 && distance <= RADIUS) {
          const angle = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI)
          const adjustedAngle = normalizeAngle(angle + rotation + ITEM_OFFSET)
          const segmentAngle = 360 / items.length
          const index = Math.floor(adjustedAngle / segmentAngle)
          if (index >= 0 && index < items.length) {
            setLastSelectedIndex(index)
          }
        }
      }
    }

    window.addEventListener("pointermove", onPointerMove)
    window.addEventListener("pointerup", onPointerUpMenu)
  }

  function onPointerMove(e: PointerEvent) {
    if (!dragging) return
    const rect = menuRef.current?.getBoundingClientRect()
    if (!rect) return
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const angle = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI)
    const diff = getAngleDifference(startAngleRef.current, angle)
    setRotation(normalizeAngle(startRotationRef.current + diff))
    setCurrentPointerPosition({ x: e.clientX, y: e.clientY })
  }

  function onPointerUpMenu() {
    setDragging(false)
    window.removeEventListener("pointermove", onPointerMove)
    window.removeEventListener("pointerup", onPointerUpMenu)
  }

  function onPointerMoveMenu(e: React.PointerEvent) {
    if (!visible) return
    setCurrentPointerPosition({ x: e.clientX, y: e.clientY })
    const index = getHoveredIndex(e)
    setHoveredIndex(index)
    if (index >= 0) {
      setLastSelectedIndex(index)
    }
  }

  const nearestIndex = useMemo(() => {
    if (!dragging) return -1

    const rect = menuRef.current?.getBoundingClientRect()
    if (!rect) return -1

    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    const dx = currentPointerPosition.x - cx
    const dy = currentPointerPosition.y - cy
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < CENTER_RADIUS * 0.3 || distance > RADIUS) return -1

    const angle = normalizeAngle((Math.atan2(dy, dx) * 180) / Math.PI)
    const adjustedAngle = normalizeAngle(angle + rotation + ITEM_OFFSET)
    const segmentAngle = 360 / items.length
    const index = Math.floor(adjustedAngle / segmentAngle)
    return index >= 0 && index < items.length ? index : -1
  }, [dragging, items, rotation, currentPointerPosition])

  const activeIndex = useMemo(() => {
    if (hoveredIndex >= 0) return hoveredIndex
    if (dragging && nearestIndex >= 0) return nearestIndex
    if (lastSelectedIndex >= 0) return lastSelectedIndex
    return -1
  }, [hoveredIndex, dragging, nearestIndex, lastSelectedIndex])

  const size = RADIUS * 2 + 32
  const cx = size / 2
  const cy = size / 2

  return (
    <RadialMenuContext
      value={{
        items,
        visible,
        position,
        rotation,
        activeIndex,
        size,
        cx,
        cy,
        menuRef,
        onPointerDownMenu,
        onPointerMoveMenu,
      }}
    >
      <RadialMenuOverlay>
        <RadialMenuDecorations />
        {items.map((item, i) => (
          <RadialMenuIcon key={item.label + i} item={item} index={i} />
        ))}
        <RadialMenuCenter />
      </RadialMenuOverlay>
    </RadialMenuContext>
  )
}
