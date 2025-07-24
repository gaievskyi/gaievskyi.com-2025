import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload"
import { revalidatePath, revalidateTag } from "next/cache"
import type { Lab } from "../../../payload-types"

export const revalidateLab: CollectionAfterChangeHook<Lab> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === "published") {
      const path = `/labs/${doc.slug}`
      payload.logger.info(`Revalidating lab: ${path}`)
      revalidatePath(path)
      revalidateTag("labs")
    }
    // If the lab was previously published, we need to revalidate the old path
    if (previousDoc._status === "published" && doc._status !== "published") {
      const oldPath = `/labs/${previousDoc.slug}`
      payload.logger.info(`Revalidating old lab at path: ${oldPath}`)
      revalidatePath(oldPath)
      revalidateTag("labs")
    }
  }
  return doc
}

export const revalidateLabDelete: CollectionAfterDeleteHook<Lab> = ({
  doc,
  req: { context },
}) => {
  if (!context.disableRevalidate) {
    const path = `/labs/${doc?.slug}`
    revalidatePath(path)
    revalidateTag("labs")
  }
  return doc
}
