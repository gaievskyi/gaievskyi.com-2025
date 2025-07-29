"use client"

import * as React from "react"
import * as SeparatorPrimitive from "@radix-ui/react-separator"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const separatorVariants = cva(
  "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
  {
    variants: {
      dashed: {
        true: "border-border-foreground mx-2 flex-1 border-b border-dashed dark:border-border",
        false: "bg-border data-[orientation=horizontal]:w-full",
      },
    },
    defaultVariants: {
      dashed: false,
    },
  },
)

interface SeparatorProps
  extends React.ComponentProps<typeof SeparatorPrimitive.Root>,
    VariantProps<typeof separatorVariants> {}

function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  dashed,
  ...props
}: SeparatorProps) {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(separatorVariants({ dashed }), className)}
      {...props}
    />
  )
}

export { Separator }
