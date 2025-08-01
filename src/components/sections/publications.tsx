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
      <Flex justify="between" align="center" className="mb-6">
        <Heading as="h2" className="inline-flex items-center gap-1">
          Publications
          <Text as="sup" size="xs" color="muted">
            {items.length}
          </Text>
        </Heading>
        <Link href="/blog/rss.xml">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-rss-icon lucide-rss size-4.5"
          >
            <path d="M4 11a9 9 0 0 1 9 9" />
            <path d="M4 4a16 16 0 0 1 16 16" />
            <circle cx="5" cy="19" r="1" />
          </svg>
        </Link>
      </Flex>
      <div className="group/items">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={`/blog/${item.slug}`}
            className="group/item block py-2 transition-all duration-300 ease-out group-hover/items:blur-[2px] hover:!opacity-100 hover:!blur-none"
          >
            <Flex align="center" gap="sm">
              {item.publishedAt && (
                <Text as="span" size="sm" color="muted" className="mr-3">
                  {Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                  }).format(new Date(item.publishedAt))}
                </Text>
              )}
              <Text as="span" size="sm">
                {item.title}
              </Text>
              <Separator dashed />
              {item.publishedAt && (
                <Text as="span" size="sm" color="muted">
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
