import ms from "ms"
import { revalidatePath, revalidateTag } from "next/cache"
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload"
import type { Article } from "../../../payload-types"

export const revalidateArticle: CollectionAfterChangeHook<Article> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/blog/${doc.slug}`
      payload.logger.info(`Revalidating article: ${path}`)
      revalidatePath(path)
      revalidateTag("articles", { expire: ms("1 day") })
      revalidateTag("sitemap", { expire: ms("1 day") })
    }
    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/blog/${previousDoc.slug}`
      payload.logger.info(`Revalidating old article at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag("articles", { expire: ms("1 day") })
      revalidateTag("sitemap", { expire: ms("1 day") })
    }
  }
  return doc
}

export const revalidateArticleDelete: CollectionAfterDeleteHook<Article> = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/blog/${doc?.slug}`
    payload.logger.info(`Revalidating deleted article: ${path}`)
    revalidatePath(path)
    revalidateTag("articles", { expire: ms("1 day") })
    revalidateTag("sitemap", { expire: ms("1 day") })
  }
  return doc
}
