import { ExternalLink } from "../ui/external-link"
import { AnimatedHeart } from "../animated-heart"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"

export function About() {
  return (
    <Flex direction="col" gap="xl">
      <div>
        <Heading as="h2" weight="medium">
          I develop elegant, user-centered, and visually appealing applications.
        </Heading>
        <br className="block sm:hidden" />
        <Text weight="medium">
          You can find me on social media &rarr;{" "}
          <ExternalLink
            href="https://x.com/dgaievskyi"
            className="dark:text-muted-foreground"
          >
            Twitter
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://t.me/designbeng"
            className="dark:text-muted-foreground"
          >
            Telegram
          </ExternalLink>
          , and{" "}
          <ExternalLink
            href="https://github.com/gaievskyi"
            className="dark:text-muted-foreground"
          >
            GitHub
          </ExternalLink>
          .
        </Text>
      </div>
      <Text weight="medium">
        With background in front-end development, I consider myself a designer
        at <AnimatedHeart /> and enjoy building highly polished products, where
        every detail matters.
      </Text>
      <Text size="sm" color="muted">
        I like projects where design and code naturally flow together, so that
        nothing gets{" "}
        <Text as="span" italic color="muted">
          missed during implementation
        </Text>
        .
      </Text>
      <Text size="sm" color="muted">
        I’m drawn to experiments. I dive in fast, and explore broadly. Whether
        I’m shaping early ideas, refining products in production, or crafting
        visuals for one-off moments, I make sure everything feels and looks
        excellent.
      </Text>
    </Flex>
  )
}
