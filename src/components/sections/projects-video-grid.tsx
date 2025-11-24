import { HapticLink } from "@/components/ui/haptic-link"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import { videosMap } from "@/components/video/projects-videos"
import { Video } from "@/components/video/video"

const videos = Object.entries(videosMap)

export function ProjectsVideoGrid() {
  return (
    <>
      <Heading as="h2" className="mb-6 inline-flex items-center gap-1">
        Projects
        <Text as="sup" size="xs" color="muted">
          {videos.length}
        </Text>
      </Heading>
      <div className="group pointer-events-none grid grid-cols-1 gap-4 sm:grid-cols-2">
        {videos.map(([slug, video]) => (
          <div
            key={slug}
            className="pointer-events-auto transition-opacity duration-300 ease-out group-hover:opacity-50 hover:opacity-100!"
          >
            <HapticLink
              href={`/projects/${slug}`}
              aria-label={`Explore project ${slug}`}
              className="video-link block rounded-xl"
            >
              <Video src={video} slug={slug} />
            </HapticLink>
          </div>
        ))}
      </div>
    </>
  )
}
