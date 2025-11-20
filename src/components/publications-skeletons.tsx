import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

type PublicationsSkeletonsProps = {
  count?: number
}

export function PublicationsSkeletons({
  count = 3,
}: PublicationsSkeletonsProps) {
  return Array.from({ length: count }).map((_, index) => (
    <div key={index} className="py-2">
      <div className="flex items-center gap-4">
        {/* Year */}
        <Skeleton className="h-5 md:h-6 w-9 md:w-10 shrink-0" />
        {/* Title */}
        <Skeleton className="md:h-6 h-5 shrink-0 w-32 md:w-38" />
        {/* Dashed line */}
        <Separator dashed />
        {/* Date */}
        <Skeleton className="md:h-6 h-5 w-9 md:w-11 shrink-0" />
      </div>
    </div>
  ))
}
