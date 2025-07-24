import { getServerSideURL } from "@/lib/get-url"
import type { MetadataRoute } from "next"

const generateSitemap = async (): Promise<MetadataRoute.Sitemap> => {
  const url = getServerSideURL()

  return [
    {
      url,
      lastModified: new Date(),
      priority: 1,
    },
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = await generateSitemap()
  return sitemap
}
