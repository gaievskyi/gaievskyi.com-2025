import { AnimatedGroup } from "@/components/animated-group"
import { Magnetic } from "@/components/magnetic"
import { GithubButton } from "@/components/buttons/github-button"
import { Icon } from "@/components/ui/icon"
import { Video } from "@/components/video/video"
import { RichText } from "@/components/rich-text"
import Link from "next/link"
import type { Asset } from "next-video/dist/assets.js"
import type { Project } from "@/../payload-types"

type ProjectContentProps = {
  video: Asset
  slug: string
  project: Project
}

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
        ease: [0.16, 1, 0.3, 1] as const, // Apple's preferred easing
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

export function ProjectContent({ video, slug, project }: ProjectContentProps) {
  const projectDate = new Date(project.createdAt)

  return (
    <>
      <Video src={video} slug={slug} />
      <AnimatedGroup
        variants={expandVariants}
        className="flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
      >
        <div className="flex items-baseline gap-3">
          <h1 className="text-lg font-medium sm:text-xl lg:text-2xl">
            {project.title}
          </h1>
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
        </div>

        <div className="flex gap-3 sm:items-center sm:gap-4">
          {project.url && (
            <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
              <Link
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 sm:w-auto sm:justify-start dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
              >
                Try it out
                <Icon name="sprite:arrow" />
              </Link>
            </Magnetic>
          )}
          {project.githubUrl && <GithubButton href={project.githubUrl} />}
        </div>
      </AnimatedGroup>

      {project.Content?.content && (
        <AnimatedGroup variants={contentVariants} className="-mt-4 w-full">
          <RichText data={project.Content.content} enableGutter={false} />
        </AnimatedGroup>
      )}
    </>
  )
}
