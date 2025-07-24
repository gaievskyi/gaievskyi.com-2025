import { cacheTag } from "next/dist/server/use-cache/cache-tag"
import type { Article } from "../../../payload-types"
import config from "../../../payload.config"
import { draftMode } from "next/headers"
import { getPayload } from "payload"
import { cache as dedupe } from "react"
import { cacheLife } from "next/dist/server/use-cache/cache-life"

type ArticlesQueryParams = {
  limit?: number
}

export const getArticles = dedupe(
  async ({ limit }: ArticlesQueryParams = {}) => {
    "use cache"
    cacheTag("articles")
    cacheLife("blog")

    const payload = await getPayload({ config })
    const articles = await payload.find({
      collection: "articles",
      select: {
        title: true,
        slug: true,
        illustration: true,
        meta: true,
        publishedAt: true,
        createdAt: true,
        updatedAt: true,
      },
      where: {
        _status: {
          equals: "published",
        },
      },
      limit,
      sort: "-publishedAt",
      pagination: false,
    })
    return articles.docs
  },
)

export const getArticle = dedupe(async (slug: string): Promise<Article> => {
  const { isEnabled: isDraft } = await draftMode()
  const payload = await getPayload({ config })
  const article = await payload.find({
    collection: "articles",
    where: {
      slug: {
        equals: slug,
      },
    },
    limit: 1,
    draft: isDraft,
    overrideAccess: isDraft,
    pagination: false,
  })
  return article.docs[0]
})

export const getArticlesSlugs = dedupe(
  async (): Promise<Pick<Article, "slug">[]> => {
    const payload = await getPayload({ config })
    const articles = await payload.find({
      collection: "articles",
      select: {
        slug: true,
      },
      pagination: false,
      draft: false,
      overrideAccess: false,
    })
    const slugs = articles.docs
    return slugs
  },
)
