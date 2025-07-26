import { motion } from "motion/react"
import { useEffect, useState } from "react"

const formatTime = (totalSeconds: number) => {
  const minutes = Math.floor(totalSeconds / 60)
  const secs = totalSeconds % 60
  return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}

export function DynamicIslandVoiceRecord() {
  const [waveformHeights, setWaveformHeights] = useState<number[]>([])
  const [seconds, setSeconds] = useState(75)
  const [grayDotOffset, setGrayDotOffset] = useState(0)

  useEffect(() => {
    const initialHeights = [
      4, 8, 5, 4, 30, 8, 30, 14, 30, 50, 10, 6, 30, 6, 4, 8, 5, 4, 8, 4,
    ]
    setWaveformHeights(initialHeights)

    // Animate marquee effect for gray dots
    const marqueeInterval = setInterval(() => {
      setGrayDotOffset((prev) => prev + 2)
    }, 50)

    // Animate waveform heights for the recorded (orange) bars only
    const waveformInterval = setInterval(() => {
      setWaveformHeights((prev) =>
        prev.map((baseHeight, index) => {
          // First 12 bars are recorded (orange), they animate
          // Rest are unrecorded (gray), they stay static in height
          if (index < 12) {
            const centerFactor = Math.sin((index / 2) * Math.PI) // Bell curve for natural variation
            const baseVariation = 1 + centerFactor * 3
            const timeVariation =
              Math.sin(Date.now() / 120 + index * 0.4) * baseVariation
            const noiseVariation = (Math.random() - 0.5) * 2.5
            const newHeight = baseHeight + timeVariation + noiseVariation

            return Math.max(3, Math.min(19, newHeight))
          }
          return baseHeight
        }),
      )
    }, 60) // Update every 60ms for natural voice feel

    return () => {
      clearInterval(marqueeInterval)
      clearInterval(waveformInterval)
    }
  }, [])

  useEffect(() => {
    // Timer counting up
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const baseDotPattern = Array.from({ length: 10 }, () => 3) // 10 dots of height 3
  const grayDotsPattern = [
    ...baseDotPattern,
    ...baseDotPattern,
    ...baseDotPattern,
    ...baseDotPattern,
  ]

  return (
    <div className="flex w-[284px] items-center justify-between py-3 pr-3 pl-4">
      {/* Audio Waveform Visualization */}
      <div className="flex h-5 items-center gap-0.5">
        {/* Fixed orange bars on the left */}
        {waveformHeights.slice(0, 12).map((height, index) => (
          <motion.div
            key={`orange-${index}`}
            className="w-0.5 rounded-full bg-gradient-to-t from-red-500 via-red-400 to-orange-400"
            animate={{ height }}
            transition={{
              duration: 0.1,
              ease: "easeOut",
            }}
            style={{ minHeight: 5 }}
          />
        ))}

        {/* Seamless scrolling gray dots on the right */}
        <div className="flex w-[45px] items-center gap-0.5 overflow-hidden">
          <div
            className="flex items-center gap-0.5"
            style={{
              transform: `translateX(-${grayDotOffset % (baseDotPattern.length * 6)}px)`, // Reset seamlessly based on pattern length
              transition: "none", // Disable transition for smooth continuous scroll
            }}
          >
            {grayDotsPattern.map((height, index) => (
              <div
                key={`gray-${index}`}
                className="w-1 flex-shrink-0 rounded-full bg-gray-500/30"
                style={{
                  height: `${height}px`,
                  minHeight: 2,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5">
        {/* Timer Display - matching iOS style exactly */}
        <div className="font-system text-lg font-medium tracking-wide text-[#fd6a68] tabular-nums">
          {formatTime(seconds)}
        </div>

        {/* Stop Button - exact iOS style with white border, black bg, red square */}
        <button
          aria-label="Stop recording"
          className="flex size-10 items-center justify-center rounded-full border-2 border-white bg-black transition-colors hover:bg-gray-900"
        >
          <div className="size-4.5 rounded bg-[#fd6a68]" />
        </button>
      </div>
    </div>
  )
}
