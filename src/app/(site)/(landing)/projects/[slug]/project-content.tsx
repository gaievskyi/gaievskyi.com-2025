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
import { Flex } from "@/components/ui/layout/flex"
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
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" />}>Index</BreadcrumbLink>
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
      </Flex>
    </AnimatedGroup>
  )
}
