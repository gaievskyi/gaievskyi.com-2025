import { getArticles } from "@/cms/data-access/articles"
import { PublicationItem } from "@/components/sections/publication-item"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
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
      <div className="group/items">
        <Suspense
          fallback={Array.from({ length: items.length }).map((_, index) => (
            <div key={index} className="py-2">
              <div className="flex items-center gap-4">
                {/* Year */}
                <Skeleton className="h-5 w-9 shrink-0 md:h-6 md:w-10" />
                {/* Title */}
                <Skeleton className="h-5 w-32 shrink-0 md:h-6 md:w-38" />
                {/* Dashed line */}
                <Separator dashed />
                {/* Date */}
                <Skeleton className="h-5 w-9 shrink-0 md:h-6 md:w-11" />
              </div>
            </div>
          ))}
        >
          {items.map((item) => (
            <PublicationItem key={item.id} {...item} />
          ))}
        </Suspense>
      </div>
    </>
  )
}
