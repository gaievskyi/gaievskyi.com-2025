import Link from "next/link"
import { use } from "react"

type ListItem = {
  title: string
  slug: string
  publishedAt?: string | null
}

type PublicationsProps = {
  className?: string
  itemsPromise: Promise<ListItem[]>
}

export function Publications({ className, itemsPromise }: PublicationsProps) {
  const items = use(itemsPromise)
  return (
    <div className={className}>
      <div className="mb-6 flex items-center gap-6">
        <h2 className="relative">
          Publications
          <span className="absolute -top-1 -right-3 text-xs text-muted-foreground">
            {items.length}
          </span>
        </h2>
      </div>
      <div className="group/items mt-2">
        {items.map((item) => (
          <div
            key={item.slug}
            className="group/item transition-all duration-300 ease-out group-hover/items:blur-[2px] hover:!opacity-100 hover:!blur-none"
          >
            <Link href={`/blog/${item.slug}`} className="block py-2">
              <div className="flex items-center gap-2">
                {item.publishedAt && (
                  <span className="w-12 shrink-0 text-sm text-muted-foreground">
                    {Intl.DateTimeFormat("en-US", {
                      year: "numeric",
                    }).format(new Date(item.publishedAt))}
                  </span>
                )}
                <span className="shrink-0 text-sm text-foreground">
                  {item.title}
                </span>
                <div className="border-border-foreground mx-2 flex-1 border-b border-dashed dark:border-border"></div>
                {item.publishedAt && (
                  <span className="shrink-0 text-sm text-muted-foreground">
                    {Intl.DateTimeFormat("en-US", {
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(item.publishedAt))}
                  </span>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
