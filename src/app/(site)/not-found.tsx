import { Magnetic } from "@/components/magnetic"
import { NotFound } from "@/components/not-found"
import { Button } from "@/components/ui/button"
import { HapticLink } from "@/components/ui/haptic-link"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"

export default function NotFoundPage() {
  return (
    <main className="container mx-auto grid h-svh place-content-center gap-8">
      <NotFound />
      <Flex direction="col" gap="lg" className="mr-10 md:mr-14" align="end">
        <p className="text-right text-wrap max-w-[300px] ">
          This page does not exist or has been removed.
        </p>
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
          <Button
            size="lg"
            render={
              <HapticLink href="/">
                <span>Go home</span>
                <Icon name="sprite:arrow2" />
              </HapticLink>
            }
          />
        </Magnetic>
      </Flex>
    </main>
  )
}
