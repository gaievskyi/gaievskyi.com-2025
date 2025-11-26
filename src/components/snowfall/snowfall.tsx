"use client"

import { useIsMountedState } from "@/hooks/use-is-mounted-state"
import { debounce } from "@/lib/debounce"
import { useTheme } from "next-themes"
import { useEffect, useEffectEvent, useRef } from "react"
import { calculateDeltaTime, shouldUpdateHeapGradient } from "./animation"
import { calculateHeapResolution, getCanvasContexts } from "./canvas-setup"
import { CONFIG } from "./config"
import {
  addSnowToHeap,
  calculateHeapIndex,
  createHeapArray,
  meltHeap,
  smoothHeap,
} from "./heap"
import {
  createParticle,
  createParticles,
  shouldResetParticle,
  updateParticle,
} from "./particle"
import {
  clearCanvas,
  createHeapGradient,
  renderHeap,
  renderHeapOutline,
  renderParticle,
} from "./renderer"
import { getOrCreatePath } from "./snowflake-path"
import type { AnimationState } from "./types"
import { getDimensions } from "./utils"

interface SnowfallProps {
  snowflakeCount?: number
}

export function Snowfall({ snowflakeCount = 100 }: SnowfallProps = {}) {
  const snowflakesCanvasRef = useRef<HTMLCanvasElement>(null)
  const heapCanvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()
  const isMounted = useIsMountedState()

  const onAnimate = useEffectEvent(
    (
      contexts: ReturnType<typeof getCanvasContexts> & {},
      state: AnimationState,
      pathCache: Map<string, Path2D>,
      heapResolution: number,
      currentTime: number,
      lastFrameTime: number,
    ) => {
      const deltaTime = calculateDeltaTime(currentTime, lastFrameTime)
      state.frameCounter++

      clearCanvas(
        contexts.snowflakes,
        state.dimensions.width,
        state.dimensions.height,
      )
      clearCanvas(
        contexts.heap,
        state.dimensions.width,
        state.dimensions.viewportHeight,
      )

      const isDark = resolvedTheme === "dark"
      const maxHeapHeight = Math.max(...state.heap) || 0

      if (
        shouldUpdateHeapGradient(
          maxHeapHeight,
          state.lastHeapHeight,
          resolvedTheme,
          state.lastTheme,
          !!state.heapGradient,
        )
      ) {
        state.heapGradient = createHeapGradient(
          contexts.heap,
          state.dimensions.viewportHeight,
          maxHeapHeight,
        )
        state.lastHeapHeight = maxHeapHeight
        state.lastTheme = resolvedTheme
      }

      if (maxHeapHeight > 0 && state.heapGradient) {
        renderHeap(
          contexts.heap,
          state.heap,
          heapResolution,
          state.dimensions,
          state.heapGradient,
        )
        renderHeapOutline(
          contexts.heap,
          state.heap,
          heapResolution,
          state.dimensions.viewportHeight,
        )
      }

      const scrollY = window.scrollY || window.pageYOffset
      const visibleBottom = scrollY + state.dimensions.viewportHeight

      state.particles = state.particles.map((p) => {
        const updated = updateParticle(p, deltaTime, state.dimensions)
        const heapIndex = calculateHeapIndex(updated.x, heapResolution)
        const heapHeight =
          heapIndex >= 0 && heapIndex < state.heap.length
            ? state.heap[heapIndex]
            : 0

        if (shouldResetParticle(updated, heapHeight, visibleBottom)) {
          addSnowToHeap(
            state.heap,
            updated.x,
            updated.radius,
            heapResolution,
            state.dimensions.height * CONFIG.heap.maxHeightRatio,
          )
          return createParticle(state.dimensions.width, state.dimensions.height)
        }

        renderParticle(
          contexts.snowflakes,
          updated,
          getOrCreatePath(pathCache, updated.radius, updated.complexity),
          isDark,
        )
        return updated
      })

      if (state.frameCounter % CONFIG.melt.intervalFrames === 0) {
        meltHeap(state.heap)
      }
      if (state.frameCounter % CONFIG.smooth.intervalFrames === 0) {
        smoothHeap(state.heap)
      }

      return deltaTime
    },
  )

  useEffect(() => {
    if (!isMounted) return

    const snowflakesCanvas = snowflakesCanvasRef.current
    const heapCanvas = heapCanvasRef.current
    if (!snowflakesCanvas || !heapCanvas) return

    const contexts = getCanvasContexts({
      snowflakes: snowflakesCanvas,
      heap: heapCanvas,
    })
    if (!contexts) return

    const dimensions = getDimensions()
    const heapResolution = calculateHeapResolution(dimensions.width)

    const state: AnimationState = {
      dimensions,
      heap: createHeapArray(dimensions.width, heapResolution),
      heapGradient: null,
      lastHeapHeight: 0,
      lastTheme: resolvedTheme,
      particles: createParticles(
        snowflakeCount,
        dimensions.width,
        dimensions.height,
      ),
      frameCounter: 0,
    }

    let animationFrameId: number
    let lastFrameTime = performance.now()
    const pathCache = new Map<string, Path2D>()

    const handleResize = debounce(() => {
      state.dimensions = getDimensions()
      snowflakesCanvas.width = state.dimensions.width
      snowflakesCanvas.height = state.dimensions.height
      heapCanvas.width = state.dimensions.width
      heapCanvas.height = state.dimensions.viewportHeight

      const newHeapLength = Math.ceil(state.dimensions.width / heapResolution)
      if (state.heap.length !== newHeapLength) {
        state.heap = createHeapArray(state.dimensions.width, heapResolution)
      }
    }, 150)

    window.addEventListener("resize", handleResize)
    handleResize()

    const animate = (currentTime: number): void => {
      onAnimate(
        contexts,
        state,
        pathCache,
        heapResolution,
        currentTime,
        lastFrameTime,
      )
      lastFrameTime = currentTime
      animationFrameId = requestAnimationFrame(animate)
    }

    animate(performance.now())

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationFrameId)
      pathCache.clear()
    }
  }, [snowflakeCount, isMounted])

  if (!isMounted) return null

  return (
    <>
      <canvas
        ref={snowflakesCanvasRef}
        className="pointer-events-none absolute left-0 top-0 z-0 h-full min-h-screen w-full will-change-transform dark:drop-shadow-[0_0_3px_rgba(255,255,255,0.5)] drop-shadow-[0_0_3px_rgba(150,190,240,0.6)]"
      />
      <canvas
        ref={heapCanvasRef}
        className="pointer-events-none fixed bottom-0 left-0 right-0 z-50 h-screen w-full will-change-transform dark:drop-shadow-[0_-2px_4px_rgba(255,255,255,0.2)] drop-shadow-[0_-2px_8px_rgba(80,130,200,0.4)]"
      />
    </>
  )
}
