import { RichText } from "@/components/rich-text"
import { cn } from "@/lib/utils"
import type { BannerBlock as BannerBlockProps } from "../../../../payload-types"
import { Icon } from "@/components/ui/icon"

type Props = {
  className?: string
} & BannerBlockProps

export function BannerBlock({ className, content, style }: Props) {
  const iconName = `sprite:${style}` as const
  return (
    <div
      className={cn(
        "mx-auto my-4 w-full border border-dashed px-4 flex items-start gap-4 rounded-md relative",
        {
          "border-border": style === "info",
          "border-error bg-error/30": style === "error",
          "border-success bg-success/30": style === "success",
          "border-warning bg-warning/30": style === "warning",
        },
        className,
      )}
    >
      <Icon name={iconName} className="mt-6 size-5 shrink-0" />
      <RichText data={content} enableGutter />
    </div>
  )
}
