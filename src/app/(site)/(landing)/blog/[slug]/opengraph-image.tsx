import { getArticle } from "@/cms/data-access/articles"
import { ImageResponse } from "next/og"
import { readFile } from "node:fs/promises"
import { join } from "node:path"

export const size = {
  width: 834,
  height: 446,
}

export const contentType = "image/png"

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = await getArticle(slug)

  let sfPro: Buffer | null = null
  try {
    sfPro = await readFile(
      join(process.cwd(), "public/fonts/sf-pro/SFPro-Medium.woff"),
    )
  } catch {
    console.warn("Could not load SF Pro font, using system font fallback")
  }

  const defaultOgImage = await readFile(
    join(process.cwd(), "public/images/opengraph-image.png"),
  )
  const defaultOgImageSrc = Uint8Array.from(defaultOgImage).buffer

  const fonts = sfPro
    ? [
        {
          name: "SF Pro",
          data: sfPro,
          style: "normal" as const,
          weight: 400 as const,
        },
      ]
    : []

  return new ImageResponse(
    (
      <div style={{ position: "relative", display: "flex" }}>
        <img
          // @ts-expect-error - everything works
          src={defaultOgImageSrc}
          alt="Daniel Gaievskyi"
          width={834}
          height={446}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            objectFit: "cover",
          }}
        />
        <div
          style={{
            fontSize: 50,
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            color: "white",
            display: "flex",
            alignItems: "flex-end",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            padding: "40px",
            fontFamily: sfPro
              ? "SF Pro"
              : "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          }}
        >
          {article.title}
        </div>
      </div>
    ),
    {
      ...size,
      fonts,
    },
  )
}
