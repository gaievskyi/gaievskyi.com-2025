import { Icon } from "@/components/ui/icon"
import { useInterval } from "@/hooks/use-inteval"
import NumberFlow from "@number-flow/react"
import { AnimatePresence } from "motion/react"
import * as m from "motion/react-m"
import { useState } from "react"

export function DynamicIslandTimer() {
  const [isPaused, setIsPaused] = useState(false)

  return (
    <div className="flex w-[270px] items-center gap-2 py-2 pr-4 pl-3">
      <m.button
        aria-label="Pause timer"
        onClick={() => setIsPaused((p) => !p)}
        whileTap={{ scale: 0.9 }}
        className="flex size-10 items-center justify-center rounded-full bg-[#5A3C07] transition-colors hover:bg-[#694608]"
      >
        <AnimatePresence initial={false} mode="wait">
          {isPaused ? (
            <Icon name="sprite:play" className="text-xl text-[#FDB000]!" />
          ) : (
            <Icon name="sprite:pause" className="text-xl text-[#FDB000]!" />
          )}
        </AnimatePresence>
      </m.button>
      <button
        aria-label="Exit"
        className="flex size-10 items-center justify-center rounded-full bg-[#3C3D3C] text-white transition-colors hover:bg-[#4A4B4A]"
      >
        <Icon name="sprite:x" className="text-2xl" />
      </button>
      <div className="ml-auto flex items-baseline gap-1.5 pr-0.5 text-[#F7A815]">
        <Counter paused={isPaused} />
      </div>
    </div>
  )
}

function Counter({ paused }: { paused?: boolean }) {
  const [count, setCount] = useState(60)

  useInterval(() => {
    if (paused) return
    setCount((c) => {
      if (c === 0) {
        return 60
      }
      return c - 1
    })
  }, 1000)

  return (
    <div className="font-system relative w-[64px] overflow-hidden text-3xl font-light whitespace-nowrap">
      0:
      <NumberFlow value={count} />
    </div>
  )
}
