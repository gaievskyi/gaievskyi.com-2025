import { getArticle } from "@/cms/data-access/articles"
import { getServerSideURL } from "@/lib/get-url"
import { ImageResponse } from "next/og"

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
  const url = getServerSideURL()

  let sfPro: ArrayBuffer | null = null
  let defaultOgImage: ArrayBuffer | null = null

  try {
    const [fontResponse, imageResponse] = await Promise.all([
      fetch(new URL(`${url}/fonts/sf-pro/SFPro-Medium.woff`)),
      fetch(new URL(`${url}/images/opengraph-image.png`)),
    ])

    if (fontResponse.ok) {
      sfPro = await fontResponse.arrayBuffer()
    }
    if (imageResponse.ok) {
      defaultOgImage = await imageResponse.arrayBuffer()
    }
  } catch {
    console.warn("Could not load custom assets, using fallbacks")
  }

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
        {defaultOgImage ? (
          <img
            // @ts-expect-error - ArrayBuffer works for ImageResponse
            src={defaultOgImage}
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
        ) : (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
          />
        )}
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
