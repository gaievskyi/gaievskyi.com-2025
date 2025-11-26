import { CONFIG } from "./config"

export const calculateHeapIndex = (x: number, resolution: number): number =>
  Math.floor(x / resolution)

const calculateSpreadAmount = (distance: number, radius: number): number =>
  Math.max(0, radius * 0.8 - distance * 0.3)

export const addSnowToHeap = (
  heap: Float32Array,
  x: number,
  radius: number,
  resolution: number,
  maxHeight: number,
): void => {
  const heapIndex = calculateHeapIndex(x, resolution)
  if (heapIndex < 0 || heapIndex >= heap.length) return

  const spreadIndices = Math.ceil((radius * 2) / resolution)

  for (let j = -spreadIndices; j <= spreadIndices; j++) {
    const targetIndex = heapIndex + j
    if (targetIndex >= 0 && targetIndex < heap.length) {
      const amount = calculateSpreadAmount(Math.abs(j), radius)
      heap[targetIndex] = Math.min(heap[targetIndex] + amount, maxHeight)
    }
  }
}

export const meltHeap = (heap: Float32Array): void => {
  Array.from({ length: CONFIG.melt.spots }, () => {
    const index = Math.floor(Math.random() * heap.length)
    if (heap[index] > 0)
      heap[index] = Math.max(0, heap[index] - CONFIG.melt.rate)
  })
}

export const smoothHeap = (heap: Float32Array): void => {
  if (heap.length <= 2) return
  for (let i = 1; i < heap.length - 1; i++) {
    heap[i] =
      heap[i] * CONFIG.smooth.weight +
      (heap[i - 1] + heap[i + 1]) * CONFIG.smooth.neighborWeight
  }
}

export const createHeapArray = (
  width: number,
  resolution: number,
): Float32Array => new Float32Array(Math.ceil(width / resolution))
