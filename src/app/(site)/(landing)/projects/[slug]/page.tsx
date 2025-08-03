import { AnimatedGroup } from "@/components/animated-group"
import { AutoScrollTop } from "@/components/auto-scroll-top"
import { Magnetic } from "@/components/magnetic"
import { GithubButton } from "@/components/buttons/github-button"
import { Icon } from "@/components/ui/icon"
import { Video } from "@/components/video/video"
import { RichText } from "@/cms/rich-text"
import Link from "next/link"
import { getProject, getProjectsSlugs } from "@/cms/data-access/projects"
import { BackAside } from "@/components/back-aside"
import { isVideo, videosMap } from "@/components/video/projects-videos"
import { notFound } from "next/navigation"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"

const expandVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 24,
      scale: 0.96,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },
}

const contentVariants = {
  container: {
    visible: {
      transition: {
        delayChildren: 0.5,
      },
    },
  },
  item: {
    hidden: {
      opacity: 0,
      y: 16,
      filter: "blur(2px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  },
}
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

  const projectDate = new Date(project.createdAt)

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
        <AnimatedGroup
          variants={expandVariants}
          className="flex w-full items-center justify-between"
        >
          <Flex direction="col" gap="xs">
            <Heading size="xl" weight="medium">
              {project.title}
            </Heading>
            <time
              dateTime={projectDate.toISOString()}
              className="text-xs text-muted-foreground sm:text-sm"
            >
              {projectDate.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </time>
          </Flex>
          <Flex gap="sm">
            {project.url && (
              <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 sm:w-auto sm:justify-start dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                >
                  Try it out
                  <Icon name="sprite:arrow2" />
                </Link>
              </Magnetic>
            )}
            {project.githubUrl && <GithubButton href={project.githubUrl} />}
          </Flex>
        </AnimatedGroup>
        {project.Content?.content && (
          <AnimatedGroup variants={contentVariants} className="-mt-4 w-full">
            <RichText
              data={project.Content.content}
              enableGutter={false}
              className="prose-p:text-pretty"
            />
          </AnimatedGroup>
        )}
      </Flex>
    </>
  )
}
