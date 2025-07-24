import type { StaticImageData } from "next/image"

import { cn } from "@/lib/utils"
import React from "react"

import type { MediaBlock as MediaBlockProps } from "../../../../payload-types"

import { Media } from "@/components/media/media"
import { RichText } from "@/components/rich-text"

type Props = MediaBlockProps & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  imgClassName?: string
  staticImage?: StaticImageData
}

export const MediaBlock: React.FC<Props> = (props) => {
  const {
    captionClassName,
    className,
    enableGutter = true,
    imgClassName,
    media,
    staticImage,
  } = props

  let caption
  if (media && typeof media === "object") caption = media.caption

  return (
    <div
      className={cn(
        "",
        {
          container: enableGutter,
        },
        className,
      )}
    >
      {(media || staticImage) && (
        <Media
          imgClassName={cn(
            "border border-border rounded-[0.8rem]",
            imgClassName,
          )}
          resource={media}
          src={staticImage}
        />
      )}
      {caption && (
        <div className={cn(captionClassName)}>
          <RichText
            data={caption}
            enableGutter={false}
            className="[&>p]:my-2 [&>p]:text-xs"
          />
        </div>
      )}
    </div>
  )
}
