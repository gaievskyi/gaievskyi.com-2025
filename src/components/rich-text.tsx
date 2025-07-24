import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
} from "@payloadcms/richtext-lexical"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"
import {
  type JSXConvertersFunction,
  RichText as RichTextWithoutBlocks,
} from "@payloadcms/richtext-lexical/react"
import { BannerBlock } from "@/cms/blocks/banner/banner"
import { CodeBlock, type CodeBlockProps } from "@/cms/blocks/code/code"
import { MediaBlock } from "@/cms/blocks/media/media"
import { cn } from "@/lib/utils"
import type {
  BannerBlock as BannerBlockProps,
  MediaBlock as MediaBlockProps,
} from "../../payload-types"
import type { HTMLAttributes, ReactNode } from "react"
import Link from "next/link"
import { ExternalLink } from "@/components/ui/external-link"

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<MediaBlockProps | BannerBlockProps | CodeBlockProps>

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== "object") {
    throw new TypeError("Expected value to be an object")
  }
  const slug = value.slug
  return relationTo === "articles"
    ? `/blog/${slug}`
    : relationTo === "projects"
      ? `/projects/${slug}`
      : `/${slug}`
}

// Custom link converter with external link icon and custom styling
const customLinkConverter = {
  link: ({
    node,
    nodesToJSX,
  }: {
    node: SerializedLinkNode
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    nodesToJSX: (args: { nodes: any[] }) => ReactNode[]
  }) => {
    const { fields } = node
    const { url, linkType } = fields

    // Determine the href based on link type
    let href = ""
    if (linkType === "custom" && url) {
      href = url
    } else if (linkType === "internal" && fields.doc) {
      href = internalDocToHref({ linkNode: node })
    }

    const isInternal = linkType === "internal" && fields.doc

    const children = nodesToJSX({ nodes: node.children })

    const Comp = isInternal ? Link : ExternalLink

    return <Comp href={href}>{children}</Comp>
  },
}

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({
  defaultConverters,
}) => ({
  ...defaultConverters,
  ...customLinkConverter,
  blocks: {
    banner: ({ node }) => (
      <BannerBlock className="col-start-2 mb-4" {...node.fields} />
    ),
    mediaBlock: ({ node }) => (
      <MediaBlock
        className="col-span-3 col-start-1"
        imgClassName="m-0"
        {...node.fields}
        captionClassName="mx-auto max-w-[48rem]"
        enableGutter={false}
      />
    ),
    code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
  },
})

type Props = {
  data: SerializedEditorState
  enableGutter?: boolean
} & HTMLAttributes<HTMLDivElement>

export function RichText(props: Props) {
  const { className, enableGutter = true, ...rest } = props
  return (
    <RichTextWithoutBlocks
      converters={jsxConverters}
      className={cn(
        "article",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
        },
        className,
      )}
      {...rest}
    />
  )
}
