import { ThemeSwitch } from "@/components/theme-switch"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"

export function HeaderContent() {
  return (
    <Flex align="center" justify="between" gap="sm">
      <div>
        <Heading as="h1" size="base" weight="semibold">
          Daniel Gaievskyi
        </Heading>
        <Heading as="h2" size="base" color="muted">
          Design Engineer
        </Heading>
      </div>
      <ThemeSwitch />
    </Flex>
  )
}
