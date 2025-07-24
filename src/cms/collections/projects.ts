import { Banner } from "@/cms/blocks/banner/banner.config"
import { Code } from "@/cms/blocks/code/code-config"
import { MediaBlock } from "@/cms/blocks/media/media-config"
import { slugField } from "@/cms/fields/slug/slug-field"
import { populatePublishedAt } from "@/cms/hooks/populate-published-at"
import { authenticated, authenticatedOrPublished } from "@/cms/utils/access"
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"
import { type CollectionConfig } from "payload"

export const Projects: CollectionConfig = {
  slug: "projects",
  admin: {
    useAsTitle: "title",
  },
  access: {
    create: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "video",
      type: "upload",
      relationTo: "videos",
      label: "Video",
      admin: {
        description: "Video preview of the project",
      },
    },
    {
      name: "videoSrc",
      type: "text",
      label: "Video Source",
      admin: {
        description: "Source of the video",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          name: "Content",
          fields: [
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({
                      enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                    }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              hasGenerateFn: true,
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "url",
      label: "URL",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "githubUrl",
      label: "Github URL",
      type: "text",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],

  hooks: {
    beforeChange: [populatePublishedAt],
  },
}
