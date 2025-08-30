import { Clock } from "@/components/clock"
import { Flex } from "@/components/ui/layout/flex"
import { Text } from "@/components/ui/typography/text"

export function FooterContent() {
  return (
    <Flex justify="between" align="center" gap="lg">
      <Flex align="center" gap="sm">
        <Text className="inline-flex gap-1">
          <Text as="span" size="sm">
            &copy;
          </Text>
          <Text as="span" size="sm" className="hidden lg:inline">
            Daniel Gaievskyi
          </Text>
          <Text as="span" size="sm" className="inline lg:hidden">
            Daniel G.
          </Text>
        </Text>
        <Text size="sm">{new Date().getFullYear()},</Text>
        <Clock />
      </Flex>
      <Text size="sm">
        <a href="mailto:daniel@gaievskyi.com">Contact</a>
      </Text>
    </Flex>
  )
}
