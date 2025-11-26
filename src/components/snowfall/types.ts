export interface Particle {
  readonly x: number
  readonly y: number
  readonly radius: number
  readonly speed: number
  readonly wind: number
  readonly opacity: number
  readonly rotation: number
  readonly rotationSpeed: number
  readonly sinOffset: number
  readonly complexity: number
  readonly flutter: number
  readonly depth: number
}

export interface Dimensions {
  readonly width: number
  readonly height: number
  readonly viewportHeight: number
}

export interface AnimationState {
  dimensions: Dimensions
  heap: Float32Array
  heapGradient: CanvasGradient | null
  lastHeapHeight: number
  lastTheme: string | undefined
  particles: Particle[]
  frameCounter: number
}

export interface CanvasRefs {
  readonly snowflakes: HTMLCanvasElement
  readonly heap: HTMLCanvasElement
}

export interface CanvasContexts {
  readonly snowflakes: CanvasRenderingContext2D
  readonly heap: CanvasRenderingContext2D
}
