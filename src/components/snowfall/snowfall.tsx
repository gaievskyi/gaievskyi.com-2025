"use client"

import {
  addSnowToHeap,
  calculateDeltaTime,
  calculateHeapIndex,
  CONFIG,
  createHeapGradient,
  createParticle,
  getDimensions,
  getOrCreatePath,
  getScrollY,
  getThemeStyle,
  meltHeap,
  renderHeap,
  renderHeapOutline,
  renderParticle,
  shouldResetParticle,
  smoothHeap,
  updateParticle,
} from "@/components/snowfall/utils"
import { useIsMountedState } from "@/hooks/use-is-mounted-state"
import { debounce } from "@/lib/debounce"
import { useTheme } from "next-themes"
import { useEffect, useRef } from "react"

interface SnowfallProps {
  snowflakeCount?: number
}

export function Snowfall({ snowflakeCount = 100 }: SnowfallProps = {}) {
  const snowflakesCanvasRef = useRef<HTMLCanvasElement>(null)
  const heapCanvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isMounted = useIsMountedState()

  useEffect(() => {
    if (!isMounted) return

    const snowflakesCanvas = snowflakesCanvasRef.current
    const heapCanvas = heapCanvasRef.current
    if (!snowflakesCanvas || !heapCanvas) return

    const snowflakesCtx = snowflakesCanvas.getContext(
      "2d",
      CONFIG.canvas,
    ) as CanvasRenderingContext2D | null
    const heapCtx = heapCanvas.getContext(
      "2d",
      CONFIG.canvas,
    ) as CanvasRenderingContext2D | null
    if (!snowflakesCtx || !heapCtx) return

    let dimensions = getDimensions()
    const heapResolution = Math.max(
      2,
      Math.floor(dimensions.width / CONFIG.heap.sampleRate),
    )
    let heap = new Float32Array(Math.ceil(dimensions.width / heapResolution))
    let heapGradient: CanvasGradient | null = null
    let lastHeapHeight = 0
    let lastTheme = resolvedTheme

    let animationFrameId: number
    let lastFrameTime = performance.now()
    let frameCounter = 0

    let particles = Array.from({ length: snowflakeCount }, () =>
      createParticle(dimensions.width, dimensions.height),
    )
    const pathCache = new Map<string, Path2D>()

    const resize = debounce(() => {
      dimensions = getDimensions()
      snowflakesCanvas.width = dimensions.width
      snowflakesCanvas.height = dimensions.height
      heapCanvas.width = dimensions.width
      heapCanvas.height = dimensions.viewportHeight
      const newHeapLength = Math.ceil(dimensions.width / heapResolution)
      if (heap.length !== newHeapLength) heap = new Float32Array(newHeapLength)
    }, CONFIG.resize.debounceMs)

    window.addEventListener("resize", resize)
    resize()

    const animate = (currentTime: number) => {
      const deltaTime = calculateDeltaTime(currentTime, lastFrameTime)
      lastFrameTime = currentTime
      frameCounter++

      snowflakesCtx.clearRect(0, 0, dimensions.width, dimensions.height)
      heapCtx.clearRect(0, 0, dimensions.width, dimensions.viewportHeight)

      const isDark = resolvedTheme === "dark"
      const style = getThemeStyle(isDark)
      const maxHeapHeight = Math.max(...heap) || 0

      if (
        !heapGradient ||
        Math.abs(lastHeapHeight - maxHeapHeight) > 5 ||
        lastTheme !== resolvedTheme
      ) {
        heapGradient = createHeapGradient(
          heapCtx,
          dimensions.viewportHeight,
          maxHeapHeight,
          style,
        )
        lastHeapHeight = maxHeapHeight
        lastTheme = resolvedTheme
      }

      if (maxHeapHeight > 0) {
        renderHeap(
          heapCtx,
          heap,
          heapResolution,
          dimensions,
          heapGradient,
          style,
        )
        renderHeapOutline(
          heapCtx,
          heap,
          heapResolution,
          dimensions.viewportHeight,
          style,
        )
      }

      const scrollY = getScrollY()
      const visibleBottom = scrollY + dimensions.viewportHeight

      particles = particles.map((p) => {
        const updated = updateParticle(p, deltaTime, dimensions)
        const heapIndex = calculateHeapIndex(updated.x, heapResolution)
        const heapHeight =
          heapIndex >= 0 && heapIndex < heap.length ? heap[heapIndex] : 0

        if (shouldResetParticle(updated, heapHeight, visibleBottom)) {
          addSnowToHeap(
            heap,
            updated.x,
            updated.radius,
            heapResolution,
            dimensions.height * CONFIG.heap.maxHeightRatio,
          )
          return createParticle(dimensions.width, dimensions.height)
        }

        renderParticle(
          snowflakesCtx,
          updated,
          getOrCreatePath(pathCache, updated.radius, updated.complexity),
          style,
          isDark,
        )
        return updated
      })

      if (frameCounter % CONFIG.melt.intervalFrames === 0) meltHeap(heap)
      if (frameCounter % CONFIG.smooth.intervalFrames === 0) smoothHeap(heap)

      animationFrameId = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animationFrameId)
      pathCache.clear()
    }
  }, [snowflakeCount, resolvedTheme, isMounted])

  if (!isMounted) return null

  const isDark = resolvedTheme === "dark"
  const style = getThemeStyle(isDark)

  return (
    <>
      <canvas
        ref={snowflakesCanvasRef}
        className="pointer-events-none absolute left-0 top-0 z-0"
        style={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          willChange: "transform",
          filter: style.filter,
        }}
      />
      <canvas
        ref={heapCanvasRef}
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50"
        style={{
          width: "100%",
          height: "100vh",
          willChange: "transform",
          filter: style.heapFilter,
        }}
      />
    </>
  )
}
