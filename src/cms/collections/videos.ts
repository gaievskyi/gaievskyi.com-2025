import { anyone, authenticated } from "@/cms/utils/access"
import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import type { CollectionConfig } from "payload"

export const Videos: CollectionConfig = {
  slug: "videos",
  access: {
    create: authenticated,
    read: anyone,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
  ],
  upload: {
    staticDir: "src/videos",
    mimeTypes: ["video/*"],
  },
}
