import { LinkLoadingIndicator } from "@/components/link-loading-indicator"
import { Flex } from "@/components/ui/layout/flex"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import Link from "next/link"
import { use } from "react"

type ListItem = {
  title: string
  slug: string
  publishedAt?: string | null
}

type PublicationsProps = {
  itemsPromise: Promise<ListItem[]>
}

export function Publications({ itemsPromise }: PublicationsProps) {
  const items = use(itemsPromise)
  return (
    <>
      <Heading as="h2" className="mb-6 inline-flex items-center gap-1">
        Publications
        <Text as="sup" size="xs" color="muted">
          {items.length}
        </Text>
      </Heading>
      <div className="group/items">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group/item block py-2 transition-all duration-300 ease-out group-hover/items:blur-[2px] hover:opacity-100! hover:blur-none!"
          >
            <Flex align="center" gap="sm">
              <LinkLoadingIndicator>
                {item.publishedAt && (
                  <Text
                    as="span"
                    color="muted"
                    className="mr-3 text-sm md:text-base"
                  >
                    {Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                    }).format(new Date(item.publishedAt))}
                  </Text>
                )}
              </LinkLoadingIndicator>
              <Text as="span" className="text-sm md:text-base">
                {item.title}
              </Text>
              <Separator dashed />
              {item.publishedAt && (
                <Text as="span" color="muted" className="text-sm md:text-base">
                  {Intl.DateTimeFormat("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                  }).format(new Date(item.publishedAt))}
                </Text>
              )}
            </Flex>
          </Link>
        ))}
      </div>
    </>
  )
}
