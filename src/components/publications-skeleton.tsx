import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export function PublicationsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="w-full">
      <div>
        <div className="flex items-center gap-6">
          <div className="relative">
            Publications
            <Skeleton className="absolute -top-1 -right-4.5 size-4" />
          </div>
        </div>
        <div className="mt-6 space-y-0">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="py-2">
              <div className="flex items-center gap-4">
                {/* Year skeleton */}
                <Skeleton className="h-5 md:h-6 w-9 md:w-10 shrink-0" />
                {/* Title skeleton */}
                <Skeleton className="md:h-6 h-5 shrink-0 w-32 md:w-38" />
                {/* Dashed line */}
                <Separator dashed />
                {/* Date skeleton */}
                <Skeleton className="md:h-6 h-5 w-9 md:w-11 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
