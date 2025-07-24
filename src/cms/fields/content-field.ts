import { Banner } from "@/cms/blocks/banner/banner.config"
import { Code } from "@/cms/blocks/code/code-config"
import { MediaBlock } from "@/cms/blocks/media/media-config"
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
import type { TabsField } from "payload"

type ContentFieldOptions = {
  contentRequired?: boolean
}

export const contentField = (options: ContentFieldOptions = {}): TabsField => {
  const { contentRequired = true } = options

  return {
    type: "tabs",
    tabs: [
      {
        label: "Content",
        fields: [
          {
            name: "content",
            type: "richText",
            editor: lexicalEditor({
              features: ({ rootFeatures }) => [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
                }),
                BlocksFeature({ blocks: [Banner, Code, MediaBlock] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                HorizontalRuleFeature(),
              ],
            }),
            label: false,
            required: contentRequired,
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
  }
}
