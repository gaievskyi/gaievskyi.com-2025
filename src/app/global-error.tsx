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
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import "@/styles/globals.css"
import { motion } from "motion/react"
import { useEffect } from "react"

type GlobalErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalErrorPage({
  error,
  reset,
}: GlobalErrorPageProps) {
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
          <main className="container mx-auto grid h-svh place-content-center gap-8">
            <motion.div
              initial={{
                opacity: 0,
                filter: "blur(5px)",
              }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="flex flex-col items-end size-full"
            >
              <FuzzyText fontSize={75} fontFamily="Heldane" className="ml-2">
                critical
              </FuzzyText>
              <FuzzyText fontSize={200}>Error</FuzzyText>
            </motion.div>
            <Flex
              direction="col"
              gap="lg"
              className="mr-10 md:mr-14"
              align="end"
            >
              <Alert variant="error">
                <AlertTitle>{error.name}</AlertTitle>
                <AlertDescription className="truncate max-w-[200px]">
                  {error.message}
                </AlertDescription>
                <AlertAction>
                  <Button size="xs" variant="outline" onClick={reset}>
                    Retry
                  </Button>
                </AlertAction>
              </Alert>
              <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
                <Button
                  size="lg"
                  render={
                    <a href="/">
                      <span>Go home</span>
                      <Icon name="sprite:arrow2" />
                    </a>
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
