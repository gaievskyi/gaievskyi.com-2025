import { contentField } from "@/cms/fields/content-field"
import { slugField } from "@/cms/fields/slug/slug-field"
import { populatePublishedAt } from "@/cms/hooks/populate-published-at"
import { revalidateLab } from "@/cms/hooks/revalidate-lab"
import { authenticated, authenticatedOrPublished } from "@/cms/utils/access"
import { makePreviewURL } from "@/cms/utils/make-preview-url"
import type { CollectionConfig } from "payload"

export const Labs: CollectionConfig = {
  slug: "labs",
  labels: {
    singular: "Lab",
    plural: "Labs",
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  defaultPopulate: {
    slug: true,
  },
  hooks: {
    afterChange: [revalidateLab],
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
          collection: "labs",
          req,
        }),
    },
    preview: (data, { req }) =>
      makePreviewURL({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "labs",
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
      name: "description",
      label: "Description",
      type: "textarea",
      localized: true,
      required: true,
    },
    {
      // TODO: add component JSX preview
      name: "component",
      label: "Component",
      type: "text",
      required: true,
    },
    contentField({ contentRequired: false }),
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
