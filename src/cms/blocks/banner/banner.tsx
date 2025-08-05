import { RichText } from "@/cms/rich-text"
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
        "mx-auto my-8! w-full border border-dashed px-4 flex items-start gap-2 rounded-md relative",
        {
          "border-border": style === "info",
          "border-error bg-error/30": style === "error",
          "border-success bg-success/30": style === "success",
          "border-warning bg-warning/30": style === "warning",
        },
        className,
      )}
    >
      <RichText data={content} enableGutter className="prose-p:leading-[1.5]" />
      <Icon name={iconName} className="mt-5 size-4 shrink-0" />
    </div>
  )
}
