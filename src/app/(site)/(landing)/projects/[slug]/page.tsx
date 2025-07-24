import { getProject, getProjectsSlugs } from "@/cms/data-access/projects"
import { BackAside } from "@/components/back-aside"
import { ProjectContent } from "@/components/project-content"
import { isVideo, videosMap } from "@/components/video/videos"
import { notFound } from "next/navigation"

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
  const project = await getProject(slug)
  if (!project) {
    return notFound()
  }

  const video = isVideo(slug) ? videosMap[slug] : undefined
  if (!video) {
    return notFound()
  }

  return (
    <>
      <BackAside />
      <main className="container mx-auto my-12 flex min-h-[70svh] flex-col items-center gap-6 px-6 sm:px-0">
        <ProjectContent video={video} slug={slug} project={project} />
      </main>
    </>
  )
}
