import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"

export function Contact() {
  return (
    <Flex direction="col" gap="xl" className="mt-4">
      <Text size="sm" color="muted">
        If you share this vision, and are looking for a partner to push your
        product forward, reach out at{" "}
        <a
          href="mailto:daniel@gaievskyi.com"
          className="hover:text-brand font-medium underline decoration-1"
        >
          daniel@gaievskyi.com
        </a>
        .
      </Text>
      <Heading as="h2" size="sm" color="muted">
        Based in Poland, available remotely worldwide.
      </Heading>
    </Flex>
  )
}
