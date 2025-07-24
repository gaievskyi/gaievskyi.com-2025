"use client"

import { useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type FloatingHeart = {
  id: number
  x: number
  y: number
  scale: number
  duration: number
  delay: number
}

export function AnimatedHeart({ className }: { className?: string }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [isHovering, setIsHovering] = useState(false)

  const spawnHearts = () => {
    const newHearts: FloatingHeart[] = []
    const heartCount = 8

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: Date.now() + i,
        x: (Math.random() - 0.5) * 120, // Random spread
        y: -20 - Math.random() * 40, // Upward direction
        scale: 1 + Math.random() * 1.2, // Random size
        duration: 1.5 + Math.random() * 0.5, // Random duration
        delay: i * 0.1, // Staggered spawn
      })
    }

    setHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter(
          (heart) => !newHearts.some((newHeart) => newHeart.id === heart.id),
        ),
      )
    }, 2500)
  }

  return (
    <span
      className={cn("relative inline-block select-none", className)}
      onClick={() => {
        spawnHearts()
      }}
      onMouseEnter={() => {
        setIsHovering(true)
        spawnHearts()
      }}
      onMouseLeave={() => setIsHovering(false)}
    >
      <Image
        src="/images/red-heart.png"
        alt="Heart emoji"
        width={16}
        height={16}
        className={cn(
          "pointer-events-none transition-transform duration-200 inline-block mb-0.5",
          isHovering ? "scale-110" : "scale-100",
        )}
      />
      <span className="pointer-events-none absolute inset-0">
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-fly-heart"
            style={
              {
                animationDuration: `${heart.duration}s`,
                animationDelay: `${heart.delay}s`,
                "--heart-x": `${heart.x}px`,
                "--heart-y": `${heart.y}px`,
                "--heart-scale": heart.scale,
              } as CSSProperties & { [key: string]: string | number }
            }
          >
            <Image
              src="/images/red-heart.png"
              alt="Heart emoji"
              width={16}
              height={16}
            />
          </span>
        ))}
      </span>
    </span>
  )
}
