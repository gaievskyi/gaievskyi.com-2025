import { random, wrap } from '@/components/snowfall/utils'
import { CONFIG } from "./config"
import type { Dimensions, Particle } from "./types"

export const createParticle = (width: number, height: number): Particle => {
  const depth = Math.random()
  const radius = random(CONFIG.particle.radius.min, CONFIG.particle.radius.max)

  const normalizedSize =
    (radius - CONFIG.particle.radius.min) /
    (CONFIG.particle.radius.max - CONFIG.particle.radius.min)

  return {
    x: random(0, width),
    y: -random(0, height),
    radius,
    speed:
      random(CONFIG.particle.speed.min, CONFIG.particle.speed.max) *
      (0.7 + normalizedSize * 0.6),
    wind: random(CONFIG.particle.wind.min, CONFIG.particle.wind.max),
    opacity:
      random(CONFIG.particle.opacity.min, CONFIG.particle.opacity.max) *
      (0.6 + normalizedSize * 0.4),
    rotation: random(0, Math.PI * 2),
    rotationSpeed: random(
      CONFIG.particle.rotation.min,
      CONFIG.particle.rotation.max,
    ),
    sinOffset: random(0, Math.PI * 2),
    complexity: Math.random() < 0.7 ? random(0.3, 1) : 0,
    flutter: random(0.5, 1.5),
    depth,
  }
}

export const updateParticle = (
  p: Particle,
  deltaTime: number,
  dimensions: Dimensions,
): Particle => {
  const swayX =
    Math.sin(p.y * CONFIG.particle.swayFrequency + p.sinOffset) *
    CONFIG.particle.swayAmplitude *
    p.flutter

  const flutterX =
    Math.sin(p.y * CONFIG.particle.flutterFrequency + p.rotation) *
    CONFIG.particle.flutterAmplitude *
    p.flutter

  return {
    ...p,
    y: p.y + p.speed * deltaTime,
    x: wrap(p.x + p.wind * deltaTime + swayX + flutterX, dimensions.width),
    rotation: p.rotation + p.rotationSpeed * deltaTime,
  }
}

export const shouldResetParticle = (
  p: Particle,
  heapHeight: number,
  visibleBottom: number,
): boolean => p.y >= visibleBottom - heapHeight

export const createParticles = (
  count: number,
  width: number,
  height: number,
): Particle[] =>
  Array.from({ length: count }, () => createParticle(width, height))
