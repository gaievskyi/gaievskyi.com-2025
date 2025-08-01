import { getServerSideURL } from "@/lib/get-url"
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // fuck russians
        userAgent: ["Yandex", "Mail.ru"],
        disallow: ["/"],
      },
    ],
    sitemap: getServerSideURL() + "/sitemap.xml",
  }
}
