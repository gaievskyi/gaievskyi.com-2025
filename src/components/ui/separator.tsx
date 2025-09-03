import { cn } from "@/lib/utils"
import { Separator as BaseSeparator } from "@base-ui-components/react/separator"
import { cva } from "class-variance-authority"
import type { ComponentProps } from "react"

const separatorVariants = cva(
  "shrink-0 data-[orientation=horizontal]:h-px data-[orientation=vertical]:w-px",
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

type SeparatorProps = ComponentProps<typeof BaseSeparator> & {
  dashed?: boolean
}

function Separator({
  className,
  orientation = "horizontal",
  dashed,
  ...props
}: SeparatorProps) {
  return (
    <BaseSeparator
      data-slot="separator"
      orientation={orientation}
      className={cn(separatorVariants({ dashed }), className)}
      {...props}
    />
  )
}

export { Separator }
