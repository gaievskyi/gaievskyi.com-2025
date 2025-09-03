import { CopyText } from "@/components/ui/copy-text"
import { Flex } from "@/components/ui/layout/flex"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
      </Flex>
      <Tooltip>
        <TooltipTrigger>
          <a href="mailto:daniel@gaievskyi.com">
            <Text size="sm">Contact</Text>
          </a>
        </TooltipTrigger>
        <TooltipContent className="max-w-[180px]">
          <Flex direction="col" gap="sm">
            <Text size="sm" color="muted">
              Twitter
            </Text>
            <CopyText content="@dgaievskyi" />
            <Separator />
            <Text size="sm" color="muted">
              Email
            </Text>
            <CopyText content="daniel@gaievskyi.com" />
          </Flex>
        </TooltipContent>
      </Tooltip>
    </Flex>
  )
}
