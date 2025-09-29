import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import type { ComponentProps, PropsWithChildren } from "react"
import {
  typographyVariants,
  type TypographyVariants,
} from "./typography-variants"

type TextBaseProps = PropsWithChildren & {
  className?: string
}

type TextAsChildProps = {
  asChild?: boolean
  as?: never
}
type TextSpanProps = {
  as?: "span"
  asChild?: never
} & ComponentProps<"span">
type TextDivProps = {
  as: "div"
  asChild?: never
} & ComponentProps<"div">
type TextLabelProps = {
  as: "label"
  asChild?: never
} & ComponentProps<"label">
type TextSupProps = { as: "sup"; asChild?: never } & ComponentProps<"sup">
type TextPProps = { as: "p"; asChild?: never } & ComponentProps<"p">
type TextProps =
  | TextAsChildProps
  | TextSpanProps
  | TextDivProps
  | TextLabelProps
  | TextPProps
  | TextSupProps

function Text({
  children,
  className,
  asChild = false,
  as: Tag = "p",
  size = "base",
  weight = "normal",
  italic = false,
  color = "default",
  ...textProps
}: TextProps & TextBaseProps & TypographyVariants) {
  return (
    <Slot
      {...textProps}
      className={cn(
        "leading-normal tracking-normal",
        typographyVariants({ size, weight, italic, color }),
        className,
      )}
    >
      {asChild ? children : <Tag>{children}</Tag>}
    </Slot>
  )
}

export { Text }
export type { TextProps }
