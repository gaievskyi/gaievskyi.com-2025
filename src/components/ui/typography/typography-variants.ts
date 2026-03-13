import { cva, type VariantProps } from "class-variance-authority"

export const typographyVariants = cva("m-0 sm:text-pretty", {
  variants: {
    size: {
      xs: "text-xs",
      sm: "text-sm",
      base: "text-base",
      lg: "text-lg",
      xl: "text-xl",
      "2xl": "text-2xl",
      "3xl": "text-3xl",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    italic: {
      true: "italic font-heldane text-[15px]",
      false: "",
    },
    color: {
      default: "text-foreground",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "base",
    weight: "normal",
    italic: false,
  },
})

export type TypographyVariants = VariantProps<typeof typographyVariants>
