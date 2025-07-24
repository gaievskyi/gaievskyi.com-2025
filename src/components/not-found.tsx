"use client"

import { motion } from "motion/react"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

const FuzzyText = dynamic(() => import("@/components/fuzzy-text"))

export function NotFound() {
  const { resolvedTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  return (
    <motion.div
      initial={{
        opacity: 0,
        filter: "blur(5px)",
      }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="flex h-[170px] flex-col gap-4"
    >
      <FuzzyText fontSize={140} color={isDark ? "#fff" : "#000"}>
        404
      </FuzzyText>
      <FuzzyText
        fontSize={70}
        fontFamily="Heldane"
        color={isDark ? "#fff" : "#000"}
      >
        not found
      </FuzzyText>
    </motion.div>
  )
}
