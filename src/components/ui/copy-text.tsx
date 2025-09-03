"use client"

import { Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/typography/text"
import { useState } from "react"

export function CopyText({ content }: { content: string }) {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content)
    setIsCopied(true)
  }

  return (
    <Text
      onClick={copyToClipboard}
      size="sm"
      className="inline-flex cursor-copy items-center gap-2"
    >
      {content}{" "}
      {isCopied ? <Icon name="sprite:check" /> : <Icon name="sprite:copy" />}
    </Text>
  )
}
