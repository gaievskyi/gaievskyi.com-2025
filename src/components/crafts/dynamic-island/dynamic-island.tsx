"use client"

import { useState } from "react"
import { AnimatePresence, motion, type Variants } from "motion/react"
import { AnimatedBackground } from "@/components/animated-background"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { DynamicIslandRing } from "./dynamic-island-ring"
import { DynamicIslandTimer } from "./dynamic-island-timer"
import { DynamicIslandMusic } from "./dynamic-island-music"
import { DynamicIslandVoiceRecord } from "./dynamic-island-voice-record"
import { DynamicIslandCall } from "./dynamic-island-call"

const variants: Variants = {
  exit: (transition) => {
    return {
      ...transition,
      opacity: [1, 0],
      filter: "blur(5px)",
    }
  },
}

const ANIMATION_VARIANTS = {
  "ring-idle": {
    scale: 0.9,
    scaleX: 0.9,
    bounce: 0.5,
  },
  "timer-ring": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.35,
  },
  "ring-timer": {
    scale: 1.4,
    y: 7.5,
    bounce: 0.35,
  },
  "timer-idle": {
    scale: 0.7,
    y: -7.5,
    bounce: 0.3,
  },
  "music-idle": {
    scale: 0.5,
    y: -30,
    bounce: 0.3,
  },
  "idle-music": {
    scale: 1,
    y: 8,
    bounce: 0.3,
  },
  "music-timer": {
    scale: 1,
    y: -30,
    bounce: 0.4,
  },
  "timer-music": {
    scale: 0.3,
    y: 20,
    bounce: 0.35,
  },
  "music-ring": {
    scale: 0.5,
    y: -50,
    bounce: 0.3,
  },
  "ring-music": {
    scale: 1.3,
    y: 2.5,
    bounce: 0.4,
  },
  "voice-idle": {
    scale: 0.75,
    y: -10,
    bounce: 0.3,
  },
  "idle-voice": {
    scale: 1.2,
    y: 10,
    bounce: 0.3,
  },
  "voice-ring": {
    scale: 0.7,
    y: -8,
    bounce: 0.35,
  },
  "ring-voice": {
    scale: 1.4,
    y: 8,
    bounce: 0.35,
  },
  "voice-timer": {
    scale: 0.8,
    y: -6,
    bounce: 0.35,
  },
  "timer-voice": {
    scale: 1.1,
    y: 6,
    bounce: 0.35,
  },
  "voice-music": {
    scale: 0.75,
    y: -8,
    bounce: 0.4,
  },
  "music-voice": {
    scale: 1,
    y: -30,
    bounce: 0.4,
  },
  "call-idle": {
    scale: 0.8,
    y: -8,
    bounce: 0.3,
  },
  "idle-call": {
    scale: 1,
    y: 8,
    bounce: 0.3,
  },
  "call-ring": {
    scale: 0.9,
    y: -2.5,
    bounce: 0.4,
  },
  "ring-call": {
    scale: 1.3,
    y: 2.5,
    bounce: 0.4,
  },
  "call-timer": {
    scale: 0.9,
    y: -8,
    bounce: 0.4,
  },
  "timer-call": {
    scale: 1.1,
    y: 5,
    bounce: 0.35,
  },
  "call-music": {
    scale: 0.8,
    y: -6,
    bounce: 0.4,
  },
  "music-call": {
    scale: 1,
    y: -30,
    bounce: 0.4,
  },
  "call-voice": {
    scale: 0.9,
    y: -8,
    bounce: 0.4,
  },
  "voice-call": {
    scale: 0.8,
    y: -6,
    bounce: 0.35,
  },
}

const BOUNCE_VARIANTS = {
  idle: 0.5,
  "ring-idle": 0.5,
  "timer-ring": 0.35,
  "ring-timer": 0.35,
  "timer-idle": 0.3,
  "idle-timer": 0.3,
  "idle-ring": 0.5,
  "music-idle": 0.3,
  "idle-music": 0.3,
  "music-timer": 0.35,
  "timer-music": 0.35,
  "music-ring": 0.4,
  "ring-music": 0.3,
  "voice-idle": 0.3,
  "idle-voice": 0.3,
  "voice-ring": 0.35,
  "ring-voice": 0.35,
  "voice-timer": 0.35,
  "timer-voice": 0.35,
  "voice-music": 0.3,
  "music-voice": 0.4,
  "call-idle": 0.3,
  "idle-call": 0.3,
  "call-ring": 0.4,
  "ring-call": 0.4,
  "call-timer": 0.35,
  "timer-call": 0.35,
  "call-music": 0.3,
  "music-call": 0.4,
  "call-voice": 0.4,
  "voice-call": 0.4,
}

const VIEW_VARIANTS = [
  "idle",
  "call",
  "ring",
  "timer",
  "music",
  "voice",
] as const
type ViewVariant = (typeof VIEW_VARIANTS)[number]

const isViewVariant = (value: string | null): value is ViewVariant =>
  typeof value === "string" && VIEW_VARIANTS.includes(value as ViewVariant)

type DynamicIslandControlsProps = {
  view: ViewVariant
  onViewSwitch: (newActiveId: string | null) => void
}

function DynamicIslandControls({
  view,
  onViewSwitch,
}: DynamicIslandControlsProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <ScrollArea className="w-full">
        <div className="flex items-center justify-center px-2 pb-4">
          <div className="flex w-fit items-center rounded-full border border-transparent bg-gray-100 p-1 shadow-sm backdrop-blur-xl dark:border-white/20 dark:bg-white/10 dark:shadow-lg">
            <AnimatedBackground
              defaultValue={view}
              onValueChange={onViewSwitch}
              className="rounded-full bg-white shadow-sm dark:bg-white/20"
              transition={{
                type: "spring",
                bounce: 0.3,
                duration: 0.3,
              }}
            >
              {VIEW_VARIANTS.map((v) => (
                <button
                  key={v}
                  data-id={v}
                  type="button"
                  className="relative p-2 text-xs font-medium whitespace-nowrap text-gray-600 capitalize transition-all duration-200 hover:text-gray-800 data-[checked=true]:text-gray-900 sm:px-4 sm:text-sm md:px-5 dark:text-white/70 dark:hover:text-white/90 dark:data-[checked=true]:text-white"
                >
                  {v}
                </button>
              ))}
            </AnimatedBackground>
          </div>
        </div>
        <ScrollBar orientation="horizontal" className="h-2 px-4" />
      </ScrollArea>
    </div>
  )
}

type DynamicIslandContentProps = {
  view: ViewVariant
}

function DynamicIslandContent({ view }: DynamicIslandContentProps) {
  switch (view) {
    case "ring": {
      return <DynamicIslandRing />
    }
    case "timer": {
      return <DynamicIslandTimer />
    }
    case "music": {
      return <DynamicIslandMusic />
    }
    case "voice": {
      return <DynamicIslandVoiceRecord />
    }
    case "call": {
      return <DynamicIslandCall />
    }
    case "idle": {
      return <div className="h-9 " />
    }
  }
}

export function DynamicIsland() {
  const [view, setView] = useState<ViewVariant>("idle")
  const [variantKey, setVariantKey] =
    useState<`${ViewVariant}-${ViewVariant}`>("idle-idle")

  const switchView = (newActiveId: string | null) => {
    if (isViewVariant(newActiveId)) {
      setView(newActiveId)
      setVariantKey(`${view}-${newActiveId}`)
    }
  }

  return (
    <div className="h-[300px]">
      <div className="relative flex h-full w-full flex-col justify-between">
        <motion.div
          layout
          transition={{
            type: "spring",
            bounce: BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
          }}
          style={{ borderRadius: 32 }}
          className="mx-auto w-fit min-w-[120px] overflow-hidden rounded-full bg-black"
        >
          <motion.div
            key={view}
            transition={{
              type: "spring",
              bounce:
                BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
            }}
            initial={{
              scale: 0.9,
              opacity: 0,
              filter: "blur(5px)",
              origin: 0.5,
            }}
            animate={{
              scale: 1,
              opacity: 1,
              filter: "blur(0px)",
              origin: 0.5,
              transition: {
                delay: 0.05,
              },
            }}
          >
            <DynamicIslandContent view={view} />
          </motion.div>
        </motion.div>
        <div className="pointer-events-none absolute top-0 left-1/2 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
          <AnimatePresence
            mode="popLayout"
            custom={
              ANIMATION_VARIANTS[variantKey as keyof typeof ANIMATION_VARIANTS]
            }
          >
            <motion.div
              initial={{ opacity: 0 }}
              exit="exit"
              variants={variants}
              key={view}
            >
              <DynamicIslandContent view={view} />
            </motion.div>
          </AnimatePresence>
        </div>
        <DynamicIslandControls view={view} onViewSwitch={switchView} />
      </div>
    </div>
  )
}
