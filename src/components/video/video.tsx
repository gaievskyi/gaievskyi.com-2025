import BackgroundVideo from "next-video/background-video"
import type { Asset } from "next-video/dist/assets.js"
import Link from "next/link"
import { type PropsWithChildren } from "react"
import { unstable_ViewTransition as ViewTransition } from "react"

import { cn } from "@/lib/utils"

type VideoProps = PropsWithChildren &
  Readonly<{
    src: Asset
    slug: string
    asLink?: boolean
    linkType?: "crafts" | "projects"
    className?: string
    blurDataUrl?: string
  }>

export function Video({
  slug,
  src,
  asLink = false,
  linkType = "crafts",
  className,
  blurDataUrl,
}: VideoProps) {
  const linkHref =
    linkType === "projects" ? `/projects/${slug}` : `/crafts/${slug}`

  return (
    <ViewTransition name={`video-${slug}`}>
      <div
        className={cn(
          "rounded-xl size-full overflow-clip bg-transparent outline-solid outline-1 outline-border",
          className,
        )}
      >
        {asLink ? (
          <Link href={linkHref}>
            <BackgroundVideo
              src={src}
              blurDataURL={blurDataUrl}
              muted
              playsInline
              loop
              autoPlay
              className="size-full object-cover"
            />
          </Link>
        ) : (
          <BackgroundVideo
            src={src}
            blurDataURL={blurDataUrl}
            muted
            playsInline
            loop
            autoPlay
            className="size-full object-cover"
          />
        )}
      </div>
    </ViewTransition>
  )
}
