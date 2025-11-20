import { getArticles } from "@/cms/data-access/articles"
import { LinkLoadingIndicator } from "@/components/link-loading-indicator"
import { PublicationsSkeletons } from "@/components/publications-skeletons"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import Link from "next/link"
import { Suspense, use } from "react"

export function Publications() {
  const items = use(getArticles())
  return (
    <>
      <Heading as="h2" className="mb-6 inline-flex items-center gap-1">
        Publications
        <Suspense
          fallback={<Skeleton className="absolute -top-1 -right-4.5 size-4" />}
        >
          <Text as="sup" size="xs" color="muted">
            {items.length}
          </Text>
        </Suspense>
      </Heading>
      <Suspense fallback={<PublicationsSkeletons count={items.length} />}>
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
                    <div className="relative overflow-clip mr-3 inline-flex items-center justify-center text-sm md:text-base">
                      <Text
                        as="span"
                        color="muted"
                        className="transition-all duration-300 ease-out group-hover/item:-translate-x-full "
                      >
                        {Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                        }).format(new Date(item.publishedAt))}
                      </Text>
                      <Icon
                        name="sprite:arrow2"
                        className="absolute text-xl translate-x-full opacity-0 transition-[translate,opacity] duration-250 ease-out group-hover/item:translate-x-0 group-hover/item:opacity-100"
                      />
                    </div>
                  )}
                </LinkLoadingIndicator>
                <Text as="span" className="text-sm md:text-base">
                  {item.title}
                </Text>
                <Separator dashed />
                {item.publishedAt && (
                  <Text
                    as="span"
                    color="muted"
                    className="text-sm md:text-base"
                  >
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
      </Suspense>
    </>
  )
}
