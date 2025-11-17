"use client"

import FuzzyText from "@/components/fuzzy-text"
import { Magnetic } from "@/components/magnetic"
import { Providers } from "@/components/providers"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import "@/styles/globals.css"
import { motion } from "motion/react"
import Link from "next/link"
import { useEffect, useState } from "react"

type GlobalErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className="font-system root relative antialiased"
      >
        <Providers>
          <main className="container max-w-md mx-auto grid h-svh place-content-center gap-8">
            <motion.div
              initial={{
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-end size-full mx-14"
            >
              <FuzzyText fontSize={75} fontFamily="Heldane">
                Critical
              </FuzzyText>
              <FuzzyText fontSize={200}>Error</FuzzyText>
            </motion.div>
            <Flex
              direction="col"
              gap="lg"
              className="mr-10 md:mr-14 w-full"
              align="end"
            >
              <Collapsible
                open={isExpanded}
                onOpenChange={setIsExpanded}
                className="w-full"
              >
                <Alert variant="error">
                  <Icon name="sprite:error" />
                  <AlertTitle>Something went wrong.</AlertTitle>
                  <AlertDescription>
                    <CollapsibleTrigger
                      onClick={(prev) => setIsExpanded(!prev)}
                      className="flex items-center gap-0.5 text-xs text-muted-foreground/80 transition-colors hover:text-muted-foreground data-panel-open:[&_svg]:rotate-180"
                      render={
                        <button>
                          <span>{isExpanded ? "Hide" : "Show"}</span>
                          <Icon
                            name="sprite:chevron-up"
                            className="mt-0.5 text-sm"
                          />
                        </button>
                      }
                    />
                    <CollapsibleContent>
                      <div className="corner-squircle rounded-xl supports-corner:rounded-2xl bg-destructive/8 p-3 mr-4 font-mono text-xs">
                        <div>
                          <span className="text-muted-foreground/60">
                            Name:
                          </span>{" "}
                          <span className="text-foreground">{error.name}</span>
                        </div>
                        {error.digest && (
                          <div>
                            <span className="text-muted-foreground/60">
                              Digest:
                            </span>{" "}
                            <span className="text-foreground">
                              {error.digest}
                            </span>
                          </div>
                        )}
                        <div>
                          <span className="text-muted-foreground/60">
                            Message:{" "}
                          </span>
                          <span className="text-foreground">
                            {error.message}
                          </span>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </AlertDescription>
                  <AlertAction>
                    <Button size="xs" variant="outline" onClick={reset}>
                      Retry
                    </Button>
                  </AlertAction>
                </Alert>
              </Collapsible>
              <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
                <Button
                  size="lg"
                  render={
                    <Link href="/">
                      <span>Go home</span>
                      <Icon name="sprite:arrow2" />
                    </Link>
                  }
                />
              </Magnetic>
            </Flex>
          </main>
        </Providers>
      </body>
    </html>
  )
}
