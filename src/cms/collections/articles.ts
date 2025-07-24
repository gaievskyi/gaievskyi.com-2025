import { contentField } from "@/cms/fields/content-field"
import { slugField } from "@/cms/fields/slug/slug-field"
import { populatePublishedAt } from "@/cms/hooks/populate-published-at"
import {
  revalidateArticle,
  revalidateArticleDelete,
} from "@/cms/hooks/revalidate-article"
import { authenticated, authenticatedOrPublished } from "@/cms/utils/access"
import { makePreviewURL } from "@/cms/utils/make-preview-url"
import type { CollectionConfig } from "payload"

export const Articles: CollectionConfig = {
  slug: "articles",
  labels: {
    singular: "Article",
    plural: "Articles",
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  defaultPopulate: {
    slug: true,
    publishedAt: true,
    updatedAt: true,
    author: true,
    title: true,
  },
  hooks: {
    afterChange: [revalidateArticle],
    afterDelete: [revalidateArticleDelete],
    beforeChange: [populatePublishedAt],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 60 * 5 * 1000, // 5 minutes
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    useAsTitle: "title",
    livePreview: {
      url: ({ data, req }) =>
        makePreviewURL({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "articles",
          req,
        }),
    },
    preview: (data, { req }) =>
      makePreviewURL({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "articles",
        req,
      }),
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "text",
      maxLength: 128,
      localized: true,
      required: true,
    },
    {
      name: "illustration",
      type: "upload",
      relationTo: "media",
      label: "Illustration",
      admin: {
        description: "Featured image of the article",
      },
    },
    contentField(),
    ...slugField(),
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      // TODO: autoselect current user by default
      name: "author",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        position: "sidebar",
      },
    },
  ],
}
