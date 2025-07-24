"use client"

import {
  type ReactNode,
  type JSX,
  useMemo,
  type ElementType,
  Children,
} from "react"
import { motion, type Variants } from "motion/react"

type PresetType = "fade" | "blur"

type AnimatedGroupProps = {
  children: ReactNode
  className?: string
  variants?: {
    container?: Variants
    item?: Variants
  }
  preset?: PresetType
  as?: ElementType
  asChild?: ElementType
}

const defaultContainerVariants: Variants = {
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
}

const defaultItemVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const presetVariants: Record<PresetType, Variants> = {
  fade: {},
  blur: {
    hidden: { filter: "blur(4px)" },
    visible: { filter: "blur(0px)" },
  },
}

const addDefaultVariants = (variants: Variants) => ({
  hidden: { ...defaultItemVariants.hidden, ...variants.hidden },
  visible: { ...defaultItemVariants.visible, ...variants.visible },
})

function AnimatedGroup({
  children,
  className,
  variants,
  preset,
  as = "div",
  asChild = "div",
}: AnimatedGroupProps) {
  const selectedVariants = {
    item: addDefaultVariants(preset ? presetVariants[preset] : {}),
    container: addDefaultVariants(defaultContainerVariants),
  }
  const containerVariants = variants?.container || selectedVariants.container
  const itemVariants = variants?.item || selectedVariants.item

  const MotionComponent = useMemo(
    () => motion.create(as as keyof JSX.IntrinsicElements),
    [as],
  )
  const MotionChild = useMemo(
    () => motion.create(asChild as keyof JSX.IntrinsicElements),
    [asChild],
  )

  return (
    <MotionComponent
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={className}
    >
      {Children.map(children, (child, index) => (
        <MotionChild key={index + "-motion-child"} variants={itemVariants}>
          {child}
        </MotionChild>
      ))}
    </MotionComponent>
  )
}

export { AnimatedGroup }
