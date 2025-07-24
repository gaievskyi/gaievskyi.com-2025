"use client"

import { getClientSideURL } from "@/lib/get-url"
import type { StaticImageData } from "next/image"
import Image from "next/image"
import type { Props as MediaProps } from "./types"

const breakpoints = {
  "3xl": 1920,
  "2xl": 1536,
  xl: 1280,
  lg: 1024,
  md: 768,
  sm: 640,
}

export const ImageMedia = (props: MediaProps) => {
  const {
    alt: altFromProps,
    fill,
    imgClassName,
    priority,
    resource,
    size: sizeFromProps,
    src: srcFromProps,
    loading: loadingFromProps,
  } = props

  let width: number | undefined
  let height: number | undefined
  let alt = altFromProps
  let src: StaticImageData | string = srcFromProps || ""

  if (!src && resource && typeof resource === "object") {
    const {
      alt: altFromResource,
      url,
      height: fullHeight,
      width: fullWidth,
    } = resource

    width = fullWidth!
    height = fullHeight!
    alt = altFromResource || ""

    const cacheTag = resource.updatedAt

    src = `${getClientSideURL()}${url}?${cacheTag}`
  }

  const loading = loadingFromProps || (priority ? undefined : "lazy")

  // NOTE: this is used by the browser to determine which image to download at different screen sizes
  const sizes =
    sizeFromProps ??
    Object.entries(breakpoints)
      .map(([, value]) => `(max-width: ${value}px) ${value * 2}w`)
      .join(", ")

  return (
    <picture className="mb-0">
      <Image
        suppressHydrationWarning
        alt={alt || ""}
        className={imgClassName}
        fill={fill}
        height={fill ? undefined : height}
        priority={priority}
        quality={100}
        loading={loading}
        sizes={sizes}
        src={src}
        width={fill ? undefined : width}
      />
    </picture>
  )
}
