import { isProduction } from "@/lib/constants"
import type { CollectionSlug, PayloadRequest } from "payload"

/**
 * Maps collection slugs to their corresponding URL prefixes.
 * This determines the URL structure for different content types.
 */
const collectionPrefixMap: Partial<Record<CollectionSlug, string>> = {
  articles: "/blog",
  projects: "/projects",
  labs: "/labs",
}

type Props = {
  collection: keyof typeof collectionPrefixMap
  slug: string
  req: PayloadRequest
}

/**
 * Generates a preview URL for Payload CMS content.
 * This allows editors to preview unpublished or draft content.
 */
export const makePreviewURL = ({ collection, slug, req }: Props) => {
  const path = `${collectionPrefixMap[collection]}/${slug}`

  const params = {
    slug,
    collection,
    path,
  }

  const encodedParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    encodedParams.append(key, value)
  }

  const protocol = isProduction ? "https:" : req.protocol
  const url = `${protocol}//${req.host}/next/preview?${encodedParams.toString()}`
  return url
}
