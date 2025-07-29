"use client"

import { useState, type CSSProperties } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

type FloatingHeart = {
  id: string
  x: number
  y: number
  scale: number
  duration: number
  delay: number
}

export function AnimatedHeart({ className }: { className?: string }) {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])
  const [isHovering, setIsHovering] = useState(false)
  const [heartCounter, setHeartCounter] = useState(0)

  const spawnHearts = () => {
    const newHearts: FloatingHeart[] = []
    const heartCount = 8

    for (let i = 0; i < heartCount; i++) {
      newHearts.push({
        id: `heart-${heartCounter + i}`,
        x: (Math.random() - 0.5) * 120,
        y: -20 - Math.random() * 40,
        scale: 1 + Math.random() * 1.2,
        duration: 1.5 + Math.random() * 0.5,
        delay: i * 0.1,
      })
    }

    setHeartCounter((prev) => prev + heartCount)

    setHearts((prev) => [...prev, ...newHearts])

    setTimeout(() => {
      setHearts((prev) =>
        prev.filter(
          (heart) => !newHearts.some((newHeart) => newHeart.id === heart.id),
        ),
      )
    }, 2500)
  }

  const onClick = () => {
    spawnHearts()
  }

  const onMouseEnter = () => {
    setIsHovering(true)
    spawnHearts()
  }

  const onMouseLeave = () => {
    setIsHovering(false)
  }

  return (
    <button
      type="button"
      aria-label="Heart"
      className={cn("relative inline-block select-none", className)}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Image
        src="/images/red-heart.png"
        alt="Heart"
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
              alt="Heart"
              width={16}
              height={16}
            />
          </span>
        ))}
      </span>
    </button>
  )
}
