import { LinkLoadingIndicator } from "@/components/link-loading-indicator"
import { HapticLink } from "@/components/ui/haptic-link"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import { Separator } from "@/components/ui/separator"
import { Text } from "@/components/ui/typography/text"
import type { Article } from "../../../payload-types"

type PublicationItemProps = Pick<Article, "slug" | "title" | "publishedAt">

export function PublicationItem({
  slug,
  title,
  publishedAt,
}: PublicationItemProps) {
  return (
    <HapticLink
      key={slug}
      href={`/blog/${slug}`}
      className="group/item block py-2 transition-all duration-300 ease-out group-hover/items:blur-[2px] hover:opacity-100! hover:blur-none!"
    >
      <Flex align="center" gap="sm">
        <LinkLoadingIndicator>
          {publishedAt && (
            <div className="relative overflow-clip mr-3 inline-flex items-center justify-center">
              <Text
                as="span"
                color="muted"
                className="transition-all text-sm md:text-base duration-300 ease-out group-hover/item:-translate-x-full "
              >
                {Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                }).format(new Date(publishedAt))}
              </Text>
              <Icon
                name="sprite:arrow2"
                className="absolute text-xl translate-x-full opacity-0 transition-[translate,opacity] duration-250 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100"
              />
            </div>
          )}
        </LinkLoadingIndicator>
        <Text as="span" className="text-sm md:text-base">
          {title}
        </Text>
        <Separator dashed />
        {publishedAt && (
          <Text as="span" color="muted" className="text-sm md:text-base">
            {Intl.DateTimeFormat("en-US", {
              month: "2-digit",
              day: "2-digit",
            }).format(new Date(publishedAt))}
          </Text>
        )}
      </Flex>
    </HapticLink>
  )
}
