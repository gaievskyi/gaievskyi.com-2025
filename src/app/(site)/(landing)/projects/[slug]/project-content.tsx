"use client"

import { AnimatedGroup } from "@/components/animated-group"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { HapticLink } from "@/components/ui/haptic-link"
import { Icon } from "@/components/ui/icon"
import { Heading } from "@/components/ui/typography/heading"
import { use } from "react"
import type { Project } from "../../../../../../payload-types"

const expandVariants = {
  container: {
    visible: {
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
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

  return (
    <AnimatedGroup
      variants={expandVariants}
      className="mb-4 flex w-full items-center justify-between"
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink render={<HapticLink href="/" />}>
              <Icon name="sprite:arrow-back" className="size-4.5" /> Index
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>Projects</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              <Heading weight="medium" className="tracking-tight">
                {project.title}
              </Heading>
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <time
        dateTime={project.createdAt}
        className="text-xs text-muted-foreground sm:text-sm"
      >
        {Intl.DateTimeFormat(undefined, {
          month: "long",
          year: "numeric",
        }).format(new Date(project.createdAt))}
      </time>
    </AnimatedGroup>
  )
}
