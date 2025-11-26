export const CONFIG = {
  canvas: { alpha: true, desynchronized: true, willReadFrequently: false },
  heap: { sampleRate: 200, maxHeightRatio: 0.3 },
  animation: { targetFps: 120, maxDeltaMultiplier: 2 },
  melt: { intervalFrames: 30, spots: 15, rate: 0.1 },
  smooth: { intervalFrames: 5, weight: 0.7, neighborWeight: 0.15 },
  particle: {
    radius: { min: 0.8, max: 3.5 },
    speed: { min: 0.5, max: 1 },
    wind: { min: -0.15, max: 0.15 },
    opacity: { min: 0.4, max: 0.95 },
    rotation: { min: -0.02, max: 0.02 },
    swayAmplitude: 0.5,
    swayFrequency: 0.008,
    flutterAmplitude: 0.15,
    flutterFrequency: 0.05,
  },
} as const
