import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"

export function OpenInV0Button({ url, title }: { url: string; title: string }) {
  return (
    <Button
      aria-label="Open in v0"
      className="absolute top-3 right-3 h-7 gap-1 rounded-[6px] bg-black px-3 text-xs text-white hover:bg-black hover:text-white dark:bg-white dark:text-black"
      asChild
    >
      <a
        href={`https://v0.dev/chat/api/open?title=${title}&url=${url}`}
        target="_blank"
        rel="noreferrer"
      >
        Open in <Icon name="sprite:v0" />
      </a>
    </Button>
  )
}
