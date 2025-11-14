"use client"

import { AnimatedGroup } from "@/components/animated-group"
import { Flex } from "@/components/ui/layout/flex"
import { Heading } from "@/components/ui/typography/heading"
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
      y: 32,
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
      className="mb-4 flex w-full items-center"
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
    </AnimatedGroup>
  )
}
