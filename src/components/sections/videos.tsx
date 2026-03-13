import { HapticLink } from "@/components/ui/haptic-link"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
import { Text } from "@/components/ui/typography/text"
import { Video } from "@/components/video/video"
import type { Asset } from "next-video/dist/assets.js"

type VideosProps = {
  title: string
  videos: Record<string, Asset>
  basePath: string
  itemLabel: string
}

export function Videos({ title, videos, basePath, itemLabel }: VideosProps) {
  const videoEntries = Object.entries(videos)
  return (
    <>
      <Flex className="mb-6">
        <Heading as="h2">{title}</Heading>
        <Text size="xs" color="muted" as="sup">
          {videoEntries.length}
        </Text>
      </Flex>
      <Flex wrap="wrap" gap="md" className="group">
        {videoEntries.map(([slug, video]) => (
          <HapticLink
            key={slug}
            href={`/${basePath}/${slug}`}
            aria-label={`Explore ${itemLabel} ${slug}`}
            className="video-link pointer-events-auto block flex-[1_1_calc(50%-0.375rem)] rounded-xl transition-opacity duration-300 ease-out group-hover:opacity-50 hover:opacity-100!"
          >
            <Video src={video} slug={slug} />
          </HapticLink>
        ))}
      </Flex>
    </>
  )
}
