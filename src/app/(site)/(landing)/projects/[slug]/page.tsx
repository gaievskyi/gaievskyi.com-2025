import { AutoScrollTop } from "@/components/auto-scroll-top"
import { Video } from "@/components/video/video"
import { getProject, getProjectsSlugs } from "@/cms/data-access/projects"
import { BackAside } from "@/components/back-aside"
import { isVideo, videosMap } from "@/components/video/projects-videos"
import { notFound } from "next/navigation"
import { Flex } from "@/components/ui/layout/flex"
import { ProjectContent } from "./project-content"
import { Suspense } from "react"

type ProjectPageProps = Readonly<{
  params: Promise<{
    slug: string
  }>
}>

export async function generateStaticParams() {
  const slugs = await getProjectsSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const projectPromise = getProject(slug)
  const video = isVideo(slug) ? videosMap[slug] : undefined
  if (!video) {
    return notFound()
  }

  return (
    <>
      <AutoScrollTop />
      <BackAside />
      <Flex
        as="main"
        direction="col"
        align="center"
        gap="lg"
        className="container mx-auto my-12 min-h-[70svh] px-6 sm:px-0"
      >
        <Video src={video} slug={slug} />
        <Suspense>
          <ProjectContent projectPromise={projectPromise} />
        </Suspense>
      </Flex>
    </>
  )
}
