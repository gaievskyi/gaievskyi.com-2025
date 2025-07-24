"use client"

import { CopyButton } from "@/components/buttons/copy-button"
import { Highlight, themes } from "prism-react-renderer"
import { useTheme } from "next-themes"
import { useIsMountedState } from "@/hooks/use-is-mounted-state"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type Props = {
  code: string
  language?: string
}

export function Code({ code, language = "" }: Props) {
  const { resolvedTheme } = useTheme()
  const isMounted = useIsMountedState()

  if (!code) return null

  // Use light theme until component mounts and theme is resolved
  // This ensures server and client render the same content initially
  const syntaxTheme =
    isMounted && resolvedTheme === "dark" ? themes.oneDark : themes.oneLight

  return (
    <ScrollArea className="relative rounded border border-border bg-white dark:bg-black">
      <Highlight code={code} language={language} theme={syntaxTheme}>
        {({ getLineProps, getTokenProps, tokens }) => (
          <pre className="relative w-max min-w-full p-4 text-xs">
            {tokens.map((line, i) => (
              <div
                key={i}
                {...getLineProps({ className: "flex whitespace-nowrap", line })}
              >
                <span className="mr-4 min-w-[2ch] shrink-0 text-right text-black/25 select-none dark:text-white/25">
                  {i + 1}
                </span>
                <span className="flex-1 whitespace-pre">
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <div className="absolute top-2 right-3 z-10 rounded-md bg-white/5 p-1 backdrop-blur-sm dark:bg-black/5">
        <CopyButton text={code} tooltipSide="bottom" />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
