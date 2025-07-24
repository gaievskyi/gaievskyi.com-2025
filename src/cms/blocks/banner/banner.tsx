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
        "mx-auto my-4 w-full border border-dashed pt-2 px-4 flex items-start gap-3 rounded-md relative",
        {
          "border-border": style === "info",
          "border-error bg-error/30": style === "error",
          "border-success bg-success/30": style === "success",
          "border-warning bg-warning/30": style === "warning",
        },
        className,
      )}
    >
      <div className="mt-2 mr-4">
        <Icon name={iconName} className="size-5.5 shrink-0" />
      </div>
      <RichText data={content} enableGutter={false} />
    </div>
  )
}
