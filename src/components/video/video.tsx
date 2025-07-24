"use client"

import BackgroundVideo from "next-video/background-video"
import type { Asset } from "next-video/dist/assets.js"
import Link from "next/link"
import { type PropsWithChildren, useRef } from "react"
import { unstable_ViewTransition as ViewTransition } from "react"

import { cn } from "@/lib/utils"

type VideoProps = PropsWithChildren &
  Readonly<{
    src: Asset
    slug: string
    asLink?: boolean
    linkType?: "labs" | "projects"
    className?: string
    blurDataUrl?: string
  }>

export function Video({
  slug,
  src,
  asLink = false,
  linkType = "labs",
  className,
  blurDataUrl,
}: VideoProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const linkHref =
    linkType === "projects" ? `/projects/${slug}` : `/labs/${slug}`

  return (
    <ViewTransition name={`video-${slug}`}>
      <div
        className={cn(
          "rounded-xl size-full overflow-clip bg-transparent outline-solid outline-border",
          className,
        )}
      >
        {asLink ? (
          <Link href={linkHref}>
            <BackgroundVideo
              ref={videoRef}
              src={src}
              blurDataURL={blurDataUrl}
              muted
              playsInline
              loop
              autoPlay
              className="size-full"
            />
          </Link>
        ) : (
          <BackgroundVideo
            ref={videoRef}
            src={src}
            blurDataURL={blurDataUrl}
            muted
            playsInline
            loop
            autoPlay
            className="size-full"
          />
        )}
      </div>
    </ViewTransition>
  )
}
