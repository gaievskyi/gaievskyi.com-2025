import { ExternalLink } from "@/components/ui/external-link"
import { Text } from "@/components/ui/typography/text"

export function Socials() {
  return (
    <Text color="muted" className="text-sm md:text-base">
      You can find me on{" "}
      <ExternalLink
        href="https://x.com/dgaievskyi"
        className="dark:text-foreground dark:hover:text-white"
      >
        X
      </ExternalLink>
      ,{" "}
      <ExternalLink
        href="https://t.me/designbeng"
        className="dark:text-foreground dark:hover:text-white"
      >
        Telegram
      </ExternalLink>
      , and{" "}
      <ExternalLink
        href="https://github.com/gaievskyi"
        className="dark:text-foreground dark:hover:text-white"
      >
        GitHub
      </ExternalLink>
      .
    </Text>
  )
}
