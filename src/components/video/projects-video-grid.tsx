import { Video } from "@/components/video/video"
import { videosMap } from "@/components/video/videos"
import { cn } from "@/lib/utils"

const videos = Object.entries(videosMap)

export function ProjectsVideoGrid({ className }: { className?: string }) {
  return (
    <div className={cn(className)}>
      <div className="mb-8 flex items-center gap-6 ">
        <h2 className="relative">
          Projects
          <span className="absolute -top-1 -right-3 text-xs text-muted-foreground">
            {videos.length}
          </span>
        </h2>
      </div>
      <div className="group pointer-events-none grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.map(([slug, video]) => (
          <div
            key={slug}
            className="pointer-events-auto transition-opacity duration-300 ease-out group-hover:opacity-50 hover:opacity-100!"
          >
            <Video src={video} slug={slug} asLink linkType="projects" />
          </div>
        ))}
      </div>
    </div>
  )
}
