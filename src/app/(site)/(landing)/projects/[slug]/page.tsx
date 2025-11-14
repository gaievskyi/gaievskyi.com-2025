import { getProject, getProjectsSlugs } from "@/cms/data-access/projects"
import { BackAside } from "@/components/back-aside"
import { Flex } from "@/components/ui/layout/flex"
import { isVideo, videosMap } from "@/components/video/projects-videos"
import { Video } from "@/components/video/video"
import { notFound } from "next/navigation"
import { Suspense } from "react"
import { ProjectActions } from "./project-actions"
import { ProjectContent } from "./project-content"

export async function generateStaticParams() {
  const slugs = await getProjectsSlugs()
  return slugs.map(({ slug }) => ({ slug }))
}

export default async function ProjectPage({
  params,
}: PageProps<"/projects/[slug]">) {
  const { slug } = await params
  const projectPromise = getProject(slug)
  const video = isVideo(slug) ? videosMap[slug] : undefined
  if (!video) {
    return notFound()
  }

  return (
    <>
      <BackAside />
      <Flex
        as="main"
        direction="col"
        align="center"
        gap="lg"
        className="container mx-auto -mt-14 grid h-svh w-full max-w-3xl place-content-center px-6 sm:px-0"
      >
        <Suspense>
          <ProjectContent projectPromise={projectPromise} />
        </Suspense>
        <Video src={video} slug={slug} />
        <Suspense>
          <ProjectActions projectPromise={projectPromise} />
        </Suspense>
      </Flex>
    </>
  )
}
