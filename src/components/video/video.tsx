import BackgroundVideo from "next-video/background-video"
import type { Asset } from "next-video/dist/assets.js"
import { ViewTransition, type PropsWithChildren } from "react"

import { cn } from "@/lib/utils"

type VideoProps = PropsWithChildren &
  Readonly<{
    src: Asset
    slug: string
    className?: string
    blurDataUrl?: string
  }>

export function Video({ slug, src, className, blurDataUrl }: VideoProps) {
  return (
    <ViewTransition name={`video-${slug}`} default="scale">
      <div
        className={cn(
          "size-full overflow-clip rounded-lg bg-transparent outline-1 outline-border outline-solid corner-squircle supports-corner:rounded-2xl",
          className,
        )}
      >
        <BackgroundVideo
          src={src}
          blurDataURL={blurDataUrl}
          muted
          playsInline
          loop
          autoPlay
          className="size-full object-cover"
        />
      </div>
    </ViewTransition>
  )
}
