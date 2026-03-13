import { cn } from "@/lib/utils"
import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva, type VariantProps } from "class-variance-authority"
import { useMemo } from "react"

const spinnerVariants = cva("relative block opacity-[0.65]", {
  variants: {
    size: {
      sm: "size-4",
      md: "size-6",
      lg: "size-8",
    },
  },
  defaultVariants: {
    size: "sm",
  },
})

export interface SpinnerProps
  extends
    useRender.ComponentProps<"span">,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean
}

const Spinner = ({
  className,
  size,
  loading = true,
  render,
  ...props
}: SpinnerProps) => {
  const [bgColorClass, filteredClassName] = useMemo(() => {
    const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || []
    const filteredClasses = className
      ?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, "")
      .trim()
    return [bgClass, filteredClasses]
  }, [className])

  const defaultProps: useRender.ElementProps<"span"> = {
    className: cn(spinnerVariants({ size, className: filteredClassName })),
    children: Array.from({ length: 8 }).map((_, i) => (
      <span
        key={i}
        className="absolute top-0 left-1/2 h-full w-[9.5%] animate-spinner-leaf-fade"
        style={{
          transform: `rotate(${i * 45}deg)`,
          animationDelay: `${-(7 - i) * 100}ms`,
        }}
      >
        <span
          className={cn("block h-[30%] w-full rounded-full", bgColorClass)}
        ></span>
      </span>
    )),
  }

  const component = useRender({
    defaultTagName: "span",
    render,
    props: mergeProps<"span">(defaultProps, props),
  })

  if (!loading) return null
  return component
}

export { Spinner, spinnerVariants }
