import type {
  SerializedEditorState,
  SerializedLexicalNode,
} from "@payloadcms/richtext-lexical/lexical"

export type TocItem = Readonly<{
  id: string
  title: string
  level: number
}>

function isSerializedLexicalNode(node: unknown): node is SerializedLexicalNode {
  return (
    typeof node === "object" &&
    node !== null &&
    "type" in node &&
    typeof node.type === "string"
  )
}

function extractTextFromNode(node: SerializedLexicalNode): string {
  let text = ""

  if ("text" in node && typeof node.text === "string") {
    text += node.text
  }

  if ("children" in node && Array.isArray(node.children)) {
    for (const child of node.children) {
      if (isSerializedLexicalNode(child)) {
        text += extractTextFromNode(child)
      }
    }
  }

  return text
}

/**
 * Extracts table of contents items from Payload CMS rich text content
 * This runs on the server-side to avoid client-side delays
 */
export function generateTableOfContents(
  content: SerializedEditorState,
): TocItem[] {
  const tocItems: TocItem[] = []

  function traverseNodes(nodes: SerializedLexicalNode[]): void {
    for (const node of nodes) {
      // Check if this is a heading node
      if (node.type === "heading") {
        // Type assertion for heading node with tag property
        const headingNode = node as SerializedLexicalNode & { tag?: string }
        if (headingNode.tag) {
          const level = Number.parseInt(headingNode.tag.charAt(1)) // Extract number from h1, h2, etc.
          const title = extractTextFromNode(headingNode)

          if (title.trim()) {
            // Generate ID similar to how the client-side code does it
            const id = title
              .toLowerCase()
              .replaceAll(/[^a-z0-9]+/g, "-")
              .replaceAll(/(^-|-$)/g, "")

            tocItems.push({
              id,
              title: title.trim(),
              level,
            })
          }
        }
      }

      // Recursively traverse child nodes
      if ("children" in node && Array.isArray(node.children)) {
        const validChildren = node.children.filter((child) =>
          isSerializedLexicalNode(child),
        )
        traverseNodes(validChildren)
      }
    }
  }

  if (content?.root?.children && Array.isArray(content.root.children)) {
    const validChildren = content.root.children.filter((child) =>
      isSerializedLexicalNode(child),
    )
    traverseNodes(validChildren)
  }

  return tocItems
}
