import { Skeleton } from "@/components/ui/skeleton"
import { cn } from "@/lib/utils"

export function PublicationsSkeleton({ count = 3 }: { count?: number }) {
  return (
    <section className="container w-full">
      <div>
        {/* Title button skeleton */}
        <div className="flex items-center gap-6">
          <div className="relative">
            Publications
            <Skeleton className="absolute -top-1 -right-4.5 size-4" />
          </div>
        </div>
        {/* Items list skeleton */}
        <div className="mt-6 space-y-0">
          {Array.from({ length: count }).map((_, index) => (
            <div key={index} className="py-2">
              <div className="flex items-center gap-4">
                {/* Year skeleton */}
                <Skeleton className="h-5 w-10 shrink-0" />
                {/* Title skeleton - varying widths for more realistic look */}
                <Skeleton
                  className={cn(
                    "h-5 shrink-0",
                    index === 0
                      ? "w-52"
                      : index === 1
                        ? "w-46"
                        : index === 2
                          ? "w-48"
                          : "w-56",
                  )}
                />
                {/* Dashed line */}
                <div className="mx-2 flex-1 border-b border-dashed border-border"></div>
                {/* Date skeleton */}
                <Skeleton className="h-5 w-12 shrink-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
