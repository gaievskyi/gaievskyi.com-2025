import { Fragment, type ElementType } from "react"
import { ImageMedia } from "./image-media"
import type { Props } from "./types"
import { VideoMedia } from "./video-media"

export const Media = (props: Props) => {
  const { className, htmlElement = "div", resource } = props

  const isVideo =
    typeof resource === "object" && resource?.mimeType?.includes("video")

  const Tag = (htmlElement as ElementType) || Fragment

  return (
    // @ts-expect-error idk some shit
    <Tag
      {...(htmlElement === null
        ? {}
        : {
            className,
          })}
    >
      {isVideo ? <VideoMedia {...props} /> : <ImageMedia {...props} />}
    </Tag>
  )
}
