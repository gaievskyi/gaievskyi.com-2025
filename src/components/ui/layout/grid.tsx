import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import {
  Children,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type ElementType,
  type ReactNode,
} from "react"

type OutlinedPosition = "top" | "bottom" | "both"
type RowPosition = number | `${number}/${number}`

const gridItemVariants = cva("col-2", {
  variants: {
    padding: {
      none: "",
      xs: `
        px-3 py-3
        md:px-8 md:py-4
      `,
      sm: `
        px-3 py-3
        md:px-8 md:py-6
      `,
      md: `
        px-3 py-8
        md:px-8
      `,
      lg: `
        px-3 py-8
        md:px-8
      `,
    },
  },
  defaultVariants: {
    padding: "sm",
  },
})

type BaseGridItemProps = {
  children: ReactNode
  className?: string
  row: RowPosition
  outlined?: OutlinedPosition
  dashed?: boolean | OutlinedPosition
  height?: string
  padding?: VariantProps<typeof gridItemVariants>["padding"]
}

type GridItemProps<T extends ElementType = "div"> = BaseGridItemProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseGridItemProps | "as">

function GridItem<T extends ElementType = "div">({
  as,
  children,
  className,
  row,
  outlined,
  dashed,
  height,
  padding,
  ...props
}: GridItemProps<T>) {
  const Component = as || "div"

  const outlinedClasses: Record<OutlinedPosition, string> = {
    top: "outlined-top",
    bottom: "outlined-bottom",
    both: "outlined-top outlined-bottom",
  }

  const rowClass = typeof row === "number" ? `row-${row}` : `row-[${row}]`
  const heightClass = height
    ? height.includes("-") || height.includes("[") || height.includes("h-")
      ? height
      : `h-${height}`
    : undefined

  const getOutlinedClass = () => {
    if (outlined && dashed && typeof dashed !== "boolean") {
      const combinedPositions = new Set([
        ...(outlined === "both" ? ["top", "bottom"] : [outlined]),
        ...(dashed === "both" ? ["top", "bottom"] : [dashed]),
      ])
      if (combinedPositions.has("top") && combinedPositions.has("bottom")) {
        return "outlined-top outlined-bottom"
      } else if (combinedPositions.has("top")) {
        return "outlined-top"
      } else if (combinedPositions.has("bottom")) {
        return "outlined-bottom"
      }
    } else if (outlined) {
      return outlinedClasses[outlined]
    } else if (dashed && typeof dashed !== "boolean") {
      return outlinedClasses[dashed]
    }
    return undefined
  }

  const getDashedClass = () => {
    if (!dashed) return undefined
    if (dashed === true) return "dashed"
    if (dashed === "top") return "dashed-top"
    if (dashed === "bottom") return "dashed-bottom"
    if (dashed === "both") return "dashed-top dashed-bottom"
    return undefined
  }

  return (
    // @ts-expect-error - cannot type correctly yet
    <Component
      className={cn(
        gridItemVariants({ padding }),
        rowClass,
        getOutlinedClass(),
        getDashedClass(),
        heightClass,
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}

type BaseGridProps = {
  children: ReactNode
  className?: string
  maxWidth?: string
  totalRows?: number
}

type GridProps<T extends ElementType = "div"> = BaseGridProps & {
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof BaseGridProps | "as">

function Grid<T extends ElementType = "div">({
  as,
  children,
  className,
  maxWidth = "85ch",
  ...props
}: GridProps<T>) {
  const Component = as || "div"
  const rows = Children.count(children)

  return (
    // @ts-expect-error - cannot type correctly yet
    <Component
      className={cn("overflow-x-clip px-3", className)}
      style={{
        "--fluid-col":
          "clamp(0px, calc(20px + (80 * ((100vw - 450px) / (1024 - 450)))), 100px)" as CSSProperties,
      }}
      {...props}
    >
      <div
        className={cn(
          "content mx-auto grid min-h-screen w-full border-x border-dashed",
          "grid-cols-[var(--fluid-col)_1fr_var(--fluid-col)]",
          "grid-rows-[repeat(6,auto)_1fr_repeat(4,auto)]",
        )}
        style={{ maxWidth }}
      >
        <div
          data-rows={rows}
          className={cn(
            "col-2 row-[1/data-rows] grid grid-rows-subgrid border-x",
          )}
        >
          {children}
        </div>
      </div>
    </Component>
  )
}

export { Grid, GridItem }
export type { OutlinedPosition, RowPosition }
