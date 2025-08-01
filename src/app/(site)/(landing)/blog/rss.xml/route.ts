import { getArticles } from "@/cms/data-access/articles"
import { getServerSideURL } from "@/lib/get-url"
import RSS from "rss"

export async function GET() {
  const url = getServerSideURL()
  const date = new Date()
  const feed = new RSS({
    title: "Daniel Gaievskyi Blog",
    description: "I own a computer.",
    feed_url: `${url}/feed.xml`,
    site_url: url,
    managingEditor: "daniel@gaievskyi.com (Daniel Gaievskyi)",
    webMaster: "daniel@gaievskyi.com (Daniel Gaievskyi)",
    copyright: `Copyright ${date.getFullYear()}, Daniel Gaievskyi`,
    language: "en-US",
    image_url: `${url}/images/opengraph-image.png`,
    pubDate: date.toUTCString(),
    ttl: 60 * 60 * 24 * 7, // 7 days
  })
  const articles = await getArticles()

  for (const article of articles) {
    feed.item({
      title: article.title,
      description: article.meta?.description ?? "",
      url: `${url}/blog/${article.slug}`,
      author: "Daniel Gaievskyi",
      date: article.publishedAt ?? "",
    })
  }

  return new Response(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  })
}
