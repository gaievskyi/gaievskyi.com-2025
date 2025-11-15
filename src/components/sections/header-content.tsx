import { ThemeSwitch } from "@/components/theme-switch"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"

export function HeaderContent() {
  return (
    <Flex align="center" justify="between" gap="sm">
      <Flex direction="col">
        <Heading as="h1" weight="semibold" className="text-sm md:text-base">
          Daniel Gaievskyi
        </Heading>
        <Heading as="h2" color="muted" className="text-sm md:text-base">
          Design Engineer
        </Heading>
      </Flex>
      <ThemeSwitch />
    </Flex>
  )
}
