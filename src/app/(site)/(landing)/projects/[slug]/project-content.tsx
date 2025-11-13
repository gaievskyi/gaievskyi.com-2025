"use client"

import { AnimatedGroup } from "@/components/animated-group"
import { Magnetic } from "@/components/magnetic"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import { Flex } from "@/components/ui/layout/flex"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { Heading } from "@/components/ui/typography/heading"
import Link from "next/link"
import { use } from "react"
import type { Project } from "../../../../../../payload-types"

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

type ProjectContentProps = Readonly<{
  projectPromise: Promise<Project>
}>

export function ProjectContent({ projectPromise }: ProjectContentProps) {
  const project = use(projectPromise)
  const projectDate = new Date(project.createdAt)

  return (
    <AnimatedGroup
      variants={expandVariants}
      className="mb-4 flex w-full items-center justify-between"
    >
      <Flex direction="col" gap="xs">
        <Heading size="3xl" weight="medium">
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
      <Flex gap="sm" className="mt-4">
        {project.url && (
          <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
            <Link
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 rounded-xl bg-zinc-100 px-4 py-2 text-black transition-colors duration-200 [corner-shape:squircle] hover:bg-zinc-950 hover:text-zinc-50 sm:w-auto sm:justify-start dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
            >
              Try it out
              <Icon name="sprite:arrow2" />
            </Link>
          </Magnetic>
        )}
        {project.githubUrl && (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button variant="ghost" size="icon">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name="sprite:github" className="mt-1" />
                  </a>
                </Button>
              }
            />
            <TooltipContent side="right">Source code</TooltipContent>
          </Tooltip>
        )}
      </Flex>
    </AnimatedGroup>
  )
}
