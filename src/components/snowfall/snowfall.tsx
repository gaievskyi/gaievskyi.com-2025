"use client"

import { debounce } from "@/lib/debounce"
import { useTheme } from "next-themes"
import { useEffect, useEffectEvent, useRef } from "react"
import { calculateDeltaTime } from "./animation"
import { CONFIG } from "./config"
import { createParticle, createParticles, updateParticle } from "./particle"
import { renderParticle } from "./renderer"
import { getOrCreatePath } from "./snowflake-path"
import type { Particle } from "./types"

interface SnowfallProps {
  snowflakeCount?: number
}

const TOP_AREA_HEIGHT = 140

export function Snowfall({ snowflakeCount = 10 }: SnowfallProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme } = useTheme()

  const onAnimate = useEffectEvent(
    (
      ctx: CanvasRenderingContext2D,
      particles: Particle[],
      pathCache: Map<string, Path2D>,
      width: number,
      height: number,
      currentTime: number,
      lastFrameTime: number,
    ): Particle[] => {
      const deltaTime = calculateDeltaTime(currentTime, lastFrameTime)
      const isDark = resolvedTheme === "dark"

      ctx.clearRect(0, 0, width, height)

      return particles.map((p) => {
        const updated = updateParticle(p, deltaTime, {
          width,
          height,
          viewportHeight: height,
        })

        if (updated.y > height) {
          return createParticle(width, height)
        }

        renderParticle(
          ctx,
          updated,
          getOrCreatePath(pathCache, updated.radius, updated.complexity),
          isDark,
          height,
          CONFIG.particle.fadeZone,
        )
        return updated
      })
    },
  )

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", {
      alpha: true,
      desynchronized: true,
      willReadFrequently: false,
    })
    if (!ctx) return

    const width = window.innerWidth
    const height = TOP_AREA_HEIGHT

    canvas.width = width
    canvas.height = height

    let particles = createParticles(snowflakeCount, width, height)
    let animationFrameId: number
    let lastFrameTime = performance.now()
    const pathCache = new Map<string, Path2D>()

    const handleResize = debounce(() => {
      const newWidth = window.innerWidth
      canvas.width = newWidth
      canvas.height = height
    }, 150)

    window.addEventListener("resize", handleResize)

    const animate = (currentTime: number): void => {
      particles = onAnimate(
        ctx,
        particles,
        pathCache,
        canvas.width,
        height,
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
  }, [resolvedTheme, snowflakeCount])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute top-0 left-0 z-50 w-full"
      style={{ height: `${TOP_AREA_HEIGHT}px` }}
    />
  )
}
