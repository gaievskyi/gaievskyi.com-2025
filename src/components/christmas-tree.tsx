import { cn } from "@/lib/utils"

interface Ornament {
  x: number
  y: number
  color: "red" | "gold" | "blue"
  size: number
  delay: number
}

const ORNAMENTS: Ornament[] = [
  { x: 16, y: 18, color: "gold", size: 4, delay: 0 },
  { x: 13, y: 21, color: "red", size: 4, delay: 0.2 },
  { x: 19, y: 21, color: "blue", size: 4, delay: 0.4 },
  { x: 11, y: 25, color: "blue", size: 5, delay: 0.6 },
  { x: 16, y: 26, color: "gold", size: 3, delay: 0.8 },
  { x: 21, y: 25, color: "red", size: 4, delay: 1 },
  { x: 9, y: 29, color: "red", size: 4, delay: 1.2 },
  { x: 16, y: 30, color: "blue", size: 4, delay: 1.4 },
  { x: 23, y: 29, color: "gold", size: 5, delay: 1.6 },
]

const ORNAMENT_STYLES = {
  red: {
    bg: "bg-red-500",
    shadow: "shadow-[0_0_8px_rgba(239,68,68,0.6),0_0_12px_rgba(239,68,68,0.3)]",
  },
  gold: {
    bg: "bg-amber-400",
    shadow:
      "shadow-[0_0_8px_rgba(251,191,36,0.6),0_0_12px_rgba(251,191,36,0.3)]",
  },
  blue: {
    bg: "bg-blue-500",
    shadow:
      "shadow-[0_0_8px_rgba(59,130,246,0.6),0_0_12px_rgba(59,130,246,0.3)]",
  },
} as const

export function ChristmasTree() {
  return (
    <div className="relative mb-1 size-[32px_40px] overflow-visible">
      <svg
        width="32"
        height="40"
        viewBox="0 -6 32 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 overflow-visible"
      >
        <path
          d="M16 8 L10 16 L12 16 L7 23 L9 23 L4 32 L28 32 L23 23 L25 23 L20 16 L22 16 Z"
          className="fill-green-500/95 stroke-green-500/35 drop-shadow-[0_0_4px_rgba(34,197,94,0.4)]"
          strokeWidth="0.5"
        />
        <rect
          x="13"
          y="32"
          width="6"
          height="6"
          rx="1"
          className="fill-amber-950/95 stroke-amber-950/45"
          strokeWidth="0.5"
        />
        <g transform="translate(16, 8)">
          <defs>
            <radialGradient id="starGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FEF9C3" />
              <stop offset="50%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FACC15" />
            </radialGradient>
            <filter id="starGlow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            d="M0,-6 L1.4,-1.4 L6,0 L1.4,1.4 L0,6 L-1.4,1.4 L-6,0 L-1.4,-1.4 Z"
            fill="url(#starGradient)"
            filter="url(#starGlow)"
            className="animate-christmas-twinkle drop-shadow-[0_0_12px_rgba(250,204,21,1)]"
            strokeWidth="0.5"
            stroke="#FACC15"
          />
          <circle
            cx="0"
            cy="0"
            r="1.5"
            fill="#FEF9C3"
            className="animate-christmas-twinkle"
            style={{ animationDelay: "0.5s" }}
          />
        </g>
      </svg>
      {ORNAMENTS.map((ornament, index) => {
        const styles = ORNAMENT_STYLES[ornament.color]
        return (
          <div
            key={index}
            className={cn(
              "absolute z-20 size-full animate-christmas-ornament-glow rounded-full",
              styles.bg,
              styles.shadow,
            )}
            style={{
              left: `${ornament.x}px`,
              top: `${ornament.y}px`,
              width: `${ornament.size}px`,
              height: `${ornament.size}px`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${ornament.delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}
