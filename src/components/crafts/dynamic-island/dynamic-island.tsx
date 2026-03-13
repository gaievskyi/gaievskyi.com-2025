"use client"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AnimatePresence, LazyMotion, type Variants } from "motion/react"
import * as m from "motion/react-m"
import { useState } from "react"
import { DynamicIslandCall } from "./dynamic-island-call"
import { DynamicIslandMusic } from "./dynamic-island-music"
import { DynamicIslandRing } from "./dynamic-island-ring"
import { DynamicIslandTimer } from "./dynamic-island-timer"
import { DynamicIslandVoiceRecord } from "./dynamic-island-voice-record"

const domMax = () => import("@/components/dom-max").then((mod) => mod.default)

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
  },
  "timer-ring": {
    scale: 0.7,
    y: -7.5,
  },
  "ring-timer": {
    scale: 1.4,
    y: 7.5,
  },
  "timer-idle": {
    scale: 0.7,
    y: -7.5,
  },
  "music-idle": {
    scale: 0.5,
    y: -30,
  },
  "idle-music": {
    scale: 1,
    y: 8,
  },
  "music-timer": {
    scale: 1,
    y: -30,
  },
  "timer-music": {
    scale: 0.3,
    y: 20,
  },
  "music-ring": {
    scale: 0.5,
    y: -50,
  },
  "ring-music": {
    scale: 1.3,
    y: 2.5,
  },
  "voice-idle": {
    scale: 0.75,
    y: -10,
  },
  "idle-voice": {
    scale: 1.2,
    y: 10,
  },
  "voice-ring": {
    scale: 0.7,
    y: -8,
  },
  "ring-voice": {
    scale: 1.4,
    y: 8,
  },
  "voice-timer": {
    scale: 0.8,
    y: -6,
  },
  "timer-voice": {
    scale: 1.1,
    y: 6,
  },
  "voice-music": {
    scale: 0.75,
    y: -8,
  },
  "music-voice": {
    scale: 1,
    y: -30,
  },
  "call-idle": {
    scale: 0.8,
    y: -8,
  },
  "idle-call": {
    scale: 1,
    y: 8,
  },
  "call-ring": {
    scale: 0.9,
    y: -2.5,
  },
  "ring-call": {
    scale: 1.3,
    y: 2.5,
  },
  "call-timer": {
    scale: 0.9,
    y: -8,
  },
  "timer-call": {
    scale: 1.1,
    y: 5,
  },
  "call-music": {
    scale: 0.8,
    y: -6,
  },
  "music-call": {
    scale: 1,
    y: -30,
  },
  "call-voice": {
    scale: 0.9,
    y: -8,
  },
  "voice-call": {
    scale: 0.8,
    y: -6,
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
  "idle-music": 0.2,
  "music-timer": 0.3,
  "timer-music": 0.2,
  "music-ring": 0.4,
  "ring-music": 0.2,
  "voice-idle": 0.3,
  "idle-voice": 0.3,
  "voice-ring": 0.35,
  "ring-voice": 0.35,
  "voice-timer": 0.35,
  "timer-voice": 0.35,
  "voice-music": 0.2,
  "music-voice": 0.25,
  "call-idle": 0.3,
  "idle-call": 0.3,
  "call-ring": 0.4,
  "ring-call": 0.4,
  "call-timer": 0.35,
  "timer-call": 0.35,
  "call-music": 0.2,
  "music-call": 0.25,
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

type DynamicIslandControlsProps = {
  view: ViewVariant
  onViewSwitch: (view: ViewVariant) => void
}

function DynamicIslandControls({
  view,
  onViewSwitch,
}: DynamicIslandControlsProps) {
  return (
    <div className="flex w-full items-center justify-center">
      <ScrollArea className="w-full">
        <div className="flex items-center justify-center px-2 pb-4">
          <Tabs
            value={view}
            onValueChange={(value) => onViewSwitch(value as ViewVariant)}
          >
            <TabsList>
              {VIEW_VARIANTS.map((view) => (
                <TabsTrigger key={view} value={view} className="capitalize">
                  {view}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
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
      return <div className="h-9" />
    }
  }
}

export function DynamicIsland() {
  const [view, setView] = useState<ViewVariant>("idle")
  const [variantKey, setVariantKey] =
    useState<`${ViewVariant}-${ViewVariant}`>("idle-idle")

  const switchView = (newView: ViewVariant) => {
    setView(newView)
    setVariantKey(`${view}-${newView}`)
  }

  return (
    <LazyMotion strict features={domMax}>
      <div className="h-[300px]">
        <div className="relative flex size-full flex-col justify-between">
          <m.div
            layout
            transition={{
              type: "spring",
              bounce:
                BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
              mass: 1,
              stiffness: 150,
              damping: 16,
              restDelta: 0.001,
            }}
            style={{ borderRadius: 32 }}
            className="mx-auto w-fit min-w-[120px] overflow-hidden rounded-full bg-black"
          >
            <m.div
              key={view}
              transition={{
                type: "spring",
                bounce:
                  BOUNCE_VARIANTS[variantKey as keyof typeof BOUNCE_VARIANTS],
              }}
              initial={{
                scale: 0.8,
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
                  delay: 0.1,
                },
              }}
            >
              <DynamicIslandContent view={view} />
            </m.div>
          </m.div>
          <div className="pointer-events-none absolute top-0 left-1/2 flex h-[200px] w-[300px] -translate-x-1/2 items-start justify-center">
            <AnimatePresence
              mode="popLayout"
              custom={
                ANIMATION_VARIANTS[
                  variantKey as keyof typeof ANIMATION_VARIANTS
                ]
              }
            >
              <m.div
                initial={{ opacity: 0 }}
                exit="exit"
                variants={variants}
                key={view}
              >
                <DynamicIslandContent view={view} />
              </m.div>
            </AnimatePresence>
          </div>
          <DynamicIslandControls view={view} onViewSwitch={switchView} />
        </div>
      </div>
    </LazyMotion>
  )
}
