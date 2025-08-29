import { Icon } from "@/components/ui/icon"
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
        <a
          href="https://x.com/dgaievskyi"
          className="font-medium text-link underline decoration-1 dark:text-foreground"
        >
          @dgaievskyi
          <Icon name="sprite:arrow2" />
        </a>{" "}
        or{" "}
        <a
          href="mailto:daniel@gaievskyi.com"
          className="font-medium text-link underline decoration-1 dark:text-foreground"
        >
          daniel@gaievskyi.com
          <Icon name="sprite:arrow2" />
        </a>
      </Text>
      <Heading as="h2" color="muted">
        Based in Poland, available remotely worldwide.
      </Heading>
    </Flex>
  )
}
