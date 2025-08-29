import { getArticles } from "@/cms/data-access/articles"
import { getProjects } from "@/cms/data-access/projects"
import { craftsMap } from "@/components/video/crafts-videos"
import { isVideo, videosMap } from "@/components/video/projects-videos"
import { getServerSideURL } from "@/lib/get-url"
import type { MetadataRoute } from "next"
import { cacheLife } from "next/dist/server/use-cache/cache-life"
import { cacheTag } from "next/dist/server/use-cache/cache-tag"

async function generateSitemap(): Promise<MetadataRoute.Sitemap> {
  "use cache"
  cacheTag("sitemap")
  cacheLife("max")

  const url = getServerSideURL()
  const articles = await getArticles().then((articles) =>
    articles.map(({ slug, updatedAt, illustration }) => {
      const images: string[] = []
      if (
        illustration &&
        typeof illustration === "object" &&
        illustration.url
      ) {
        images.push(`${url}${illustration.url}`)
      }
      return {
        url: `${url}/blog/${slug}`,
        lastModified: new Date(updatedAt),
        images: images.length > 0 ? images : undefined,
      }
    }),
  )
  const projects = await getProjects().then((projects) =>
    projects.map(({ title, slug, updatedAt }) => {
      const sitemapVideos: {
        title: string
        thumbnail_loc: string
        description: string
      }[] = []
      const video = isVideo(slug) ? videosMap[slug] : undefined
      if (video?.poster) {
        sitemapVideos.push({
          title: title,
          thumbnail_loc: video.poster + "?time=0",
          description: title,
        })
      }
      return {
        url: `${url}/projects/${slug}`,
        lastModified: new Date(updatedAt),
        images: [video?.poster + "?time=0"],
        videos: sitemapVideos.length > 0 ? sitemapVideos : undefined,
      }
    }),
  )
  // TODO: add crafts dynamically
  // const crafts = await getCrafts()
  const crafts: MetadataRoute.Sitemap = [
    {
      url: url + "/crafts/radial-menu",
      lastModified: new Date(),
      images: [craftsMap["radial-menu"].poster + "?time=1.2"],
      videos: [
        {
          title: "Radial Menu",
          thumbnail_loc: craftsMap["radial-menu"].poster + "?time=1.2",
          description: "Elegant radial menu made with React and Tailwind CSS",
        },
      ],
    },
    {
      url: url + "/crafts/fractional-slider",
      lastModified: new Date(),
      images: [craftsMap["fractional-slider"].poster + "?time=0"],
      videos: [
        {
          title: "Fractional Slider",
          thumbnail_loc: craftsMap["fractional-slider"].poster + "?time=0",
          description: "Experimental fractional slider component with SFX",
        },
      ],
    },
    {
      url: url + "/crafts/ios-slider",
      lastModified: new Date(),
      images: [craftsMap["ios-slider"].poster + "?time=11"],
      videos: [
        {
          title: "iOS Slider",
          thumbnail_loc: craftsMap["ios-slider"].poster + "?time=11",
          description: "Stretchable iOS slider component from Control Center",
        },
      ],
    },
    {
      url: url + "/crafts/family-wallet",
      lastModified: new Date(),
      images: [craftsMap["family-wallet"].poster + "?time=0"],
      videos: [
        {
          title: "Family Wallet",
          thumbnail_loc: craftsMap["family-wallet"].poster + "?time=0",
          description: "Family wallet experiment",
        },
      ],
    },
    {
      url: url + "/crafts/dynamic-island",
      lastModified: new Date(),
      images: [craftsMap["dynamic-island"].poster!],
      videos: [
        {
          title: "Dynamic Island",
          thumbnail_loc: craftsMap["dynamic-island"].poster!,
          description: "Apple Dynamic island inspired component in React",
        },
      ],
    },
    {
      url: url + "/crafts/vercel-badge",
      lastModified: new Date(),
      images: [craftsMap["vercel-badge"].poster + "?time=2.5"],
      videos: [
        {
          title: "Vercel Badge",
          thumbnail_loc: craftsMap["vercel-badge"].poster + "?time=2.5",
          description: "My Vercel badge from Vercel Ship 2024",
        },
      ],
    },
  ]
  return [
    {
      url,
      lastModified: new Date(),
      priority: 1.0,
    },
    {
      url: url + "/blog",
      lastModified: new Date(),
      priority: 0.8,
    },
    ...articles,
    ...projects,
    ...crafts,
  ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const sitemap = await generateSitemap()
  return sitemap
}
