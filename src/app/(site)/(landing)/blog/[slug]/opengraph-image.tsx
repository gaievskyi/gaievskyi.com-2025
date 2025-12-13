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
  const [sfProResponse, defaultOgImageResponse] = await Promise.all([
    fetch(`${url}/fonts/sf-pro/SFPro-Medium.ttf`),
    fetch(`${url}/images/opengraph-image.png`),
  ])
  const [sfPro, defaultOgImage] = await Promise.all([
    sfProResponse.arrayBuffer(),
    defaultOgImageResponse.arrayBuffer(),
  ])

  return new ImageResponse(
    <div style={{ position: "relative", display: "flex" }}>
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
      <div
        style={{
          fontSize: 50,
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
          color: "white",
          display: "flex",
          alignItems: "flex-end",
          whiteSpace: "nowrap",
          textOverflow: "ellipsis",
          padding: "55px 32px",
          fontFamily: "Inter",
        }}
      >
        {article.title}
      </div>
      )
    </div>,
    {
      ...size,
      fonts: [
        {
          name: "SF Pro",
          data: sfPro,
          style: "normal",
          weight: 500,
        },
      ],
    },
  )
}
