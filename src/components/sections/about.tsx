import { Flex } from "@/components/ui/layout/flex"
import { Text } from "@/components/ui/typography/text"
import { ExternalLink } from "../ui/external-link"

export function About() {
  return (
    <Flex direction="col" gap="xl">
      <Text color="muted">
        You can find me on{" "}
        <ExternalLink
          href="https://x.com/dgaievskyi"
          className="dark:text-foreground"
        >
          X
        </ExternalLink>
        ,{" "}
        <ExternalLink
          href="https://t.me/designbeng"
          className="dark:text-foreground"
        >
          Telegram
        </ExternalLink>
        , and{" "}
        <ExternalLink
          href="https://github.com/gaievskyi"
          className="dark:text-foreground"
        >
          GitHub
        </ExternalLink>
        .
      </Text>
    </Flex>
  )
}
