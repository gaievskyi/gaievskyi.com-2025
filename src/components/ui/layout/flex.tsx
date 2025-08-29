import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import type { ElementType, HTMLAttributes, ReactNode, RefObject } from "react"

const flexVariants = cva("flex", {
  variants: {
    direction: {
      row: "flex-row",
      col: "flex-col",
      "row-reverse": "flex-row-reverse",
      "col-reverse": "flex-col-reverse",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    wrap: {
      none: "flex-nowrap",
      wrap: "flex-wrap",
      reverse: "flex-wrap-reverse",
    },
    gap: {
      none: "",
      xs: "gap-1",
      sm: "gap-2",
      md: "gap-3",
      lg: "gap-4",
      xl: "gap-5",
    },
    grow: {
      0: "grow-0",
      1: "grow",
    },
    shrink: {
      0: "shrink-0",
      1: "shrink",
    },
    basis: {
      0: "flex-basis-0",
      auto: "flex-basis-auto",
      full: "flex-basis-full",
    },
  },
  defaultVariants: {
    direction: "row",
    align: "start",
    justify: "start",
    wrap: "none",
    gap: "none",
    grow: 0,
    shrink: 1,
  },
})

type FlexProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof flexVariants> & {
    children: ReactNode
    className?: string
    as?: ElementType
    ref?: RefObject<HTMLElement>
  }

function Flex({
  children,
  className,
  as: Component = "div",
  direction,
  align,
  justify,
  wrap,
  gap,
  grow,
  shrink,
  basis,
  ...props
}: FlexProps) {
  return (
    // @ts-expect-error - cannot type correctly yet
    <Component
      // @ts-expect-error - cannot type correctly yet
      className={cn(
        flexVariants({
          direction,
          align,
          justify,
          wrap,
          gap,
          grow,
          shrink,
          basis,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

export { Flex }
