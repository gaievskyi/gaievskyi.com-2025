import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { PropsWithChildren } from "react"
import {
  typographyVariants,
  type TypographyVariants,
} from "./typography-variants"

type HeadingBaseProps = PropsWithChildren & {
  className?: string
}

type HeadingAsChildProps = {
  asChild?: boolean
  as?: never
}
type HeadingAsProps = {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
  asChild?: never
}
type HeadingProps = HeadingBaseProps &
  TypographyVariants &
  (HeadingAsChildProps | HeadingAsProps)

function Heading({
  children,
  className,
  asChild = false,
  as: Component = "h1",
  weight = "normal",
  size = "base",
  italic = false,
  color = "default",
  ...headingProps
}: HeadingProps) {
  return (
    <Slot
      {...headingProps}
      className={cn(
        typographyVariants({ size, weight, italic, color }),
        className,
      )}
    >
      {asChild ? children : <Component>{children}</Component>}
    </Slot>
  )
}

export { Heading }
export type { HeadingProps }
