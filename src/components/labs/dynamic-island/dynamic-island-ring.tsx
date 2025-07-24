import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Icon } from "@/components/ui/icon"

export function DynamicIslandRing() {
  const [isSilent, setIsSilent] = useState(false)
  const [firstTime, setFirstTime] = useState(true)

  useEffect(() => {
    const id = setTimeout(
      () => {
        setFirstTime(false)
        setIsSilent((s) => !s)
      },
      firstTime ? 1000 : 2000,
    )

    return () => clearTimeout(id)
  }, [isSilent, firstTime])

  return (
    <motion.div
      initial={false}
      className="relative flex h-9 items-center justify-between px-2.5"
      animate={{ width: isSilent ? 168 : 148 }}
      transition={{ type: "spring", bounce: 0.6 }}
    >
      <AnimatePresence>
        {isSilent ? (
          <motion.div
            initial={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            animate={{
              width: 40,
              opacity: 1,
              filter: "blur(0px)",
            }}
            exit={{ width: 0, opacity: 0, filter: "blur(4px)" }}
            transition={{ type: "spring", bounce: 0.35 }}
            className="absolute left-[5px] h-[24px] w-10 rounded-full bg-[#FD4F30]"
          />
        ) : null}
      </AnimatePresence>
      <motion.div
        initial={false}
        className="relative h-[12.75px] w-[11.25px]"
        animate={{
          rotate: isSilent
            ? [0, -15, 5, -2, 0]
            : [0, 20, -15, 12.5, -10, 10, -7.5, 7.5, -5, 5, 0],
          x: isSilent ? 9 : 0,
        }}
      >
        <Icon
          name="sprite:ring"
          className="inset-0 -translate-y-1.5 text-white"
        />
        <div className="absolute inset-0">
          <div className="h-5 translate-x-[5.25px] -translate-y-[5px] rotate-[-40deg] overflow-hidden">
            <motion.div
              animate={{ height: isSilent ? 16 : 0 }}
              transition={{
                ease: "easeInOut",
                duration: isSilent ? 0.125 : 0.05,
                delay: isSilent ? 0.15 : 0,
              }}
              className="w-fit rounded-full"
            >
              <div className="flex h-full w-[3px] items-center justify-center rounded-full bg-[#FD4F30]">
                <div className="h-full w-[0.75px] rounded-full bg-white" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      <div className="font-system ml-auto flex items-center">
        {isSilent ? (
          <span className="font-system text-xs font-medium text-[#FD4F30]">
            Silent
          </span>
        ) : (
          <span className="font-system text-xs font-medium text-white">
            Ring
          </span>
        )}
      </div>
    </motion.div>
  )
}
