"use client"

import { createContext, use } from "react"
import type { RadialMenuItem } from "./radial-menu"

type RadialMenuContextType = {
  items: RadialMenuItem[]
  visible: boolean
  position: { x: number; y: number }
  rotation: number
  activeIndex: number
  size: number
  cx: number
  cy: number
  menuRef: React.RefObject<HTMLDivElement | null>
  onPointerDownMenu: (e: React.PointerEvent) => void
  onPointerMoveMenu: (e: React.PointerEvent) => void
}

export const RadialMenuContext = createContext<RadialMenuContextType | null>(
  null,
)

export function useRadialMenu() {
  const context = use(RadialMenuContext)
  if (!context) {
    throw new Error("useRadialMenu() must be used within a RadialMenuProvider")
  }
  return context
}
