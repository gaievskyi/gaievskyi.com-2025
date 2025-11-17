"use client"

import FuzzyText from "@/components/fuzzy-text"
import { Magnetic } from "@/components/magnetic"
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import * as motion from "motion/react-client"
import { useEffect } from "react"

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
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
          500
        </FuzzyText>
        <FuzzyText fontSize={200}>Error</FuzzyText>
      </motion.div>
      <Flex direction="col" gap="lg" className="mr-10 md:mr-14" align="end">
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
  )
}
