import type { Dimensions } from "./types"

export const getDocumentHeight = (): number =>
  Math.max(document.documentElement.scrollHeight, window.innerHeight)

export const getDimensions = (): Dimensions => ({
  width: window.innerWidth,
  height: getDocumentHeight(),
  viewportHeight: window.innerHeight,
})

export const getComputedStyleValue = (property: string): string =>
  getComputedStyle(document.documentElement).getPropertyValue(property).trim()

export const random = (min: number, max: number): number =>
  Math.random() * (max - min) + min

export const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(max, value))

export const wrap = (value: number, max: number): number =>
  value < 0 ? max : value > max ? 0 : value
