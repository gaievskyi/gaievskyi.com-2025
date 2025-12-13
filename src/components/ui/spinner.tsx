import { cn } from "@/lib/utils"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { useMemo, type ComponentProps, type Ref } from "react"

const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface SpinnerProps
  extends ComponentProps<"span">, VariantProps<typeof spinnerVariants> {
  loading?: boolean
  asChild?: boolean
  ref?: Ref<HTMLSpanElement>
}

const Spinner = ({
  className,
  size,
  loading = true,
  asChild = false,
  ref,
  ...props
}: SpinnerProps) => {
  const Comp = asChild ? Slot : "span"

  const [bgColorClass, filteredClassName] = useMemo(() => {
    const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || []
    const filteredClasses = className
      ?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, "")
      .trim()
    return [bgClass, filteredClasses]
  }, [className])

  if (!loading) return null

  return (
    <Comp
      className={cn(spinnerVariants({ size, className: filteredClassName }))}
      ref={ref}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 left-1/2 h-full w-[9.5%] animate-spinner-leaf-fade"
          style={{
            transform: `rotate(${i * 45}deg)`,
            animationDelay: `${-(7 - i) * 100}ms`,
          }}
        >
          <span
            className={cn("block w-full h-[30%] rounded-full", bgColorClass)}
          ></span>
        </span>
      ))}
    </Comp>
  )
}

export { Spinner, spinnerVariants }
