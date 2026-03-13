"use client"

import { cn } from "@/lib/utils"
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"

type TabsVariant = "default" | "underline"

function Tabs({ className, ...props }: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn(
        "flex flex-col gap-2 data-[orientation=vertical]:flex-row",
        className,
      )}
      {...props}
    />
  )
}

function TabsList({
  variant = "default",
  className,
  children,
  ...props
}: TabsPrimitive.List.Props & {
  variant?: TabsVariant
}) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      style={
        {
          "--tabs-padding": "2px",
          "--tabs-outer-radius": "var(--radius-lg)",
          "--tabs-outer-radius-squircle": "var(--radius-xl)",
          "--tabs-inner-radius": `calc(var(--radius-lg) - var(--tabs-padding))`,
          "--tabs-inner-radius-squircle": `calc(var(--radius-xl) - var(--tabs-padding))`,
        } as React.CSSProperties
      }
      className={cn(
        "relative z-0 flex w-fit items-center justify-center gap-x-0.5 text-muted-foreground",
        "data-[orientation=vertical]:flex-col",
        variant === "default"
          ? "rounded-(--tabs-outer-radius) bg-muted p-(--tabs-padding) text-muted-foreground/64 corner-squircle supports-corner:rounded-(--tabs-outer-radius-squircle)"
          : "data-[orientation=horizontal]:py-1 data-[orientation=vertical]:px-1 *:data-[slot=tabs-trigger]:hover:bg-accent",
        className,
      )}
      {...props}
    >
      {children}
      <TabsPrimitive.Indicator
        data-slot="tab-indicator"
        className={cn(
          "absolute bottom-0 left-0 h-(--active-tab-height) w-(--active-tab-width) translate-x-(--active-tab-left) -translate-y-(--active-tab-bottom) transition-[width,translate] duration-200 ease-in-out",
          variant === "underline"
            ? "z-10 bg-primary data-[orientation=horizontal]:h-0.5 data-[orientation=horizontal]:translate-y-px data-[orientation=vertical]:w-0.5 data-[orientation=vertical]:-translate-x-px"
            : "-z-1 rounded-(--tabs-inner-radius) bg-background shadow-sm corner-squircle supports-corner:rounded-(--tabs-inner-radius-squircle)",
        )}
      />
    </TabsPrimitive.List>
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "flex flex-1 shrink-0 cursor-pointer items-center justify-center rounded-(--tabs-inner-radius) border border-transparent text-sm font-medium whitespace-nowrap transition-[color,background-color,box-shadow] outline-none corner-squircle focus-visible:ring-2 focus-visible:ring-ring data-disabled:pointer-events-none data-disabled:opacity-64 supports-corner:rounded-(--tabs-inner-radius-squircle) [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "hover:text-muted-foreground data-active:text-foreground",
        "gap-1.5 px-[calc(--spacing(2.5)-1px)] py-[calc(--spacing(1.5)-1px)]",
        "data-[orientation=vertical]:w-full data-[orientation=vertical]:justify-start",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
