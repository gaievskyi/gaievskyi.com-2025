import { Media } from "@/components/media/media"
import type { Media as MediaType } from "../../../payload-types"

export function Illustration({ src }: { src: MediaType }) {
  return (
    <div className="relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      {src && typeof src !== "number" && (
        <Media fill priority imgClassName="-z-10 object-cover" resource={src} />
      )}
      <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-black/20 to-transparent" />
    </div>
  )
}
