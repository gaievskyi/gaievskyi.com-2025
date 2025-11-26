import { CONFIG } from "./config"
import type { CanvasContexts, CanvasRefs } from "./types"

export const getCanvasContexts = (
  refs: CanvasRefs,
): CanvasContexts | null => {
  const snowflakesCtx = refs.snowflakes.getContext(
    "2d",
    CONFIG.canvas,
  ) as CanvasRenderingContext2D | null

  const heapCtx = refs.heap.getContext(
    "2d",
    CONFIG.canvas,
  ) as CanvasRenderingContext2D | null

  if (!snowflakesCtx || !heapCtx) return null

  return { snowflakes: snowflakesCtx, heap: heapCtx }
}

export const calculateHeapResolution = (width: number): number =>
  Math.max(2, Math.floor(width / CONFIG.heap.sampleRate))

