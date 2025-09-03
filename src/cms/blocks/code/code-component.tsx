import { CopyButton } from "@/components/copy-button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { codeToHtml } from "shiki"

type Props = {
  code: string
  language?: string
}

export async function Code({ code, language = "" }: Props) {
  if (!code) return null

  try {
    const html = await codeToHtml(code, {
      lang: language || "text",
      theme: "vesper",
      transformers: [
        {
          name: "remove-background",
          pre(node) {
            this.addClassToHast(node, "shiki")
            if (node.properties) {
              delete node.properties.style
            }
          },
        },
      ],
    })

    return (
      <ScrollArea className="relative rounded border border-border bg-white dark:bg-black">
        <div
          className="relative w-max min-w-full p-4 text-xs"
          dangerouslySetInnerHTML={{ __html: html }}
        />
        <div className="absolute top-2 right-3 z-10 rounded-md bg-white/5 p-1 backdrop-blur-sm dark:bg-black/5">
          <CopyButton text={code} tooltipSide="bottom" />
        </div>
      </ScrollArea>
    )
  } catch (error) {
    console.error("Error generating syntax highlighting:", error)
    return (
      <ScrollArea className="relative rounded border border-border bg-white dark:bg-black">
        <pre className="relative w-max min-w-full p-4 text-xs">
          <code>{code}</code>
        </pre>
        <div className="absolute top-2 right-3 z-10 rounded-md bg-white/5 p-1 backdrop-blur-sm dark:bg-black/5">
          <CopyButton text={code} tooltipSide="bottom" />
        </div>
      </ScrollArea>
    )
  }
}
