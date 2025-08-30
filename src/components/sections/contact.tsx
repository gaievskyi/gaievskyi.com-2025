import { ExternalLink } from "@/components/ui/external-link"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"

export function Contact() {
  return (
    <Flex direction="col" gap="xl">
      <Text color="muted">
        I like projects where design and code naturally flow together.
      </Text>
      <Text color="muted">
        I’m drawn to experiments. I dive in fast, and explore broadly. Whether
        I’m shaping early ideas, refining products in production, or crafting
        visuals for one-off moments, I make sure everything feels and looks
        excellent.
      </Text>
      <Text color="muted">
        If you share this vision, and are looking for a partner to push your
        product forward, reach out at{" "}
        <ExternalLink
          href="https://x.com/dgaievskyi"
          className="font-medium text-link underline decoration-1 dark:text-foreground"
        >
          @dgaievskyi
        </ExternalLink>{" "}
        or{" "}
        <ExternalLink
          href="mailto:daniel@gaievskyi.com"
          className="font-medium text-link underline decoration-1 dark:text-foreground"
        >
          daniel@gaievskyi.com
        </ExternalLink>
      </Text>
      <Heading as="h2" color="muted">
        Based in Poland, available remotely worldwide.
      </Heading>
    </Flex>
  )
}
