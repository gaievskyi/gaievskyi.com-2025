import type { Dimensions, Particle } from "./types"
import { getComputedStyleValue } from "./utils"

const applyContextStyle = (
  ctx: CanvasRenderingContext2D,
  style: { color: string; blur: number; offset?: number; width?: number },
): void => {
  ctx.shadowColor = style.color
  ctx.shadowBlur = style.blur
  if (style.offset !== undefined) ctx.shadowOffsetY = style.offset
  if (style.width !== undefined) ctx.lineWidth = style.width
}

export const createHeapGradient = (
  ctx: CanvasRenderingContext2D,
  viewportHeight: number,
  maxHeight: number,
): CanvasGradient => {
  const gradient = ctx.createLinearGradient(
    0,
    viewportHeight,
    0,
    viewportHeight - Math.max(maxHeight, 100),
  )
  const colors = [
    getComputedStyleValue("--snowfall-heap-gradient-1"),
    getComputedStyleValue("--snowfall-heap-gradient-2"),
    getComputedStyleValue("--snowfall-heap-gradient-3"),
  ]
  colors.forEach((color, i) => gradient.addColorStop(i / 2, color))
  return gradient
}

export const renderHeap = (
  ctx: CanvasRenderingContext2D,
  heap: Float32Array,
  resolution: number,
  dimensions: Dimensions,
  gradient: CanvasGradient,
): void => {
  ctx.save()
  applyContextStyle(ctx, {
    color: getComputedStyleValue("--snowfall-heap-shadow-color"),
    blur: parseFloat(getComputedStyleValue("--snowfall-heap-shadow-blur")),
    offset: parseFloat(getComputedStyleValue("--snowfall-heap-shadow-offset")),
  })
  ctx.fillStyle = gradient
  ctx.beginPath()
  ctx.moveTo(0, dimensions.viewportHeight)
  Array.from(heap).forEach((height, i) => {
    ctx.lineTo(i * resolution, dimensions.viewportHeight - height)
  })
  ctx.lineTo(dimensions.width, dimensions.viewportHeight)
  ctx.closePath()
  ctx.fill()
  ctx.restore()
}

export const renderHeapOutline = (
  ctx: CanvasRenderingContext2D,
  heap: Float32Array,
  resolution: number,
  viewportHeight: number,
): void => {
  ctx.save()
  ctx.strokeStyle = getComputedStyleValue("--snowfall-heap-stroke-color")
  applyContextStyle(ctx, {
    color: getComputedStyleValue("--snowfall-heap-stroke-shadow"),
    blur: parseFloat(getComputedStyleValue("--snowfall-heap-stroke-blur")),
    width: parseFloat(getComputedStyleValue("--snowfall-heap-stroke-width")),
  })
  ctx.beginPath()
  ctx.moveTo(0, viewportHeight - heap[0])
  Array.from(heap)
    .slice(1)
    .forEach((height, i) => {
      ctx.lineTo((i + 1) * resolution, viewportHeight - height)
    })
  ctx.stroke()
  ctx.restore()
}

export const renderParticle = (
  ctx: CanvasRenderingContext2D,
  particle: Particle,
  path: Path2D,
  isDark: boolean,
): void => {
  const depthOpacity = 0.5 + particle.depth * 0.5
  const finalOpacity = particle.opacity * depthOpacity * (isDark ? 0.85 : 1)
  const particleBlur = parseFloat(
    getComputedStyleValue("--snowfall-particle-blur"),
  )
  const depthBlur = particleBlur * (0.7 + particle.depth * 0.6)

  ctx.save()
  ctx.translate(particle.x, particle.y)
  ctx.rotate(particle.rotation)

  applyContextStyle(ctx, {
    color: getComputedStyleValue("--snowfall-particle-shadow"),
    blur: depthBlur,
  })
  ctx.shadowOffsetX = 0
  ctx.shadowOffsetY = 0

  const particleFill = getComputedStyleValue("--snowfall-particle-fill")
  const fillColor = `rgba(${particleFill}, ${finalOpacity})`
  ctx.fillStyle = fillColor
  ctx.strokeStyle = fillColor

  const particleWidth = parseFloat(
    getComputedStyleValue("--snowfall-particle-width"),
  )
  ctx.lineWidth = particleWidth * (particle.complexity > 0.1 ? 1 : 0.5)

  ctx.fill(path)

  if (particle.complexity > 0.1) {
    ctx.stroke(path)
  }

  ctx.restore()
}

export const clearCanvas = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
): void => {
  ctx.clearRect(0, 0, width, height)
}
