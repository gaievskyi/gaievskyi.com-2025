"use client"

import { AnimatedGroup } from "@/components/animated-group"
import { Magnetic } from "@/components/magnetic"
import { Button } from "@/components/ui/button"
import { Icon } from "@/components/ui/icon"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
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
      y: -32,
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

type ProjectActionsProps = Readonly<{
  projectPromise: Promise<Project>
}>

export function ProjectActions({ projectPromise }: ProjectActionsProps) {
  const project = use(projectPromise)

  return (
    <AnimatedGroup
      variants={expandVariants}
      className="mt-4 flex justify-end gap-2"
      asChild="div"
    >
      {project.url && (
        <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
          <Link href={project.url} target="_blank">
            <Button size="lg">
              Try it out
              <Icon name="sprite:arrow2" />
            </Button>
          </Link>
        </Magnetic>
      )}
      {project.githubUrl && (
        <Tooltip>
          <TooltipTrigger
            render={
              <a href={project.githubUrl} target="_blank">
                <Button variant="outline" size="icon-lg">
                  <Icon name="sprite:github" />
                </Button>
              </a>
            }
          />
          <TooltipContent side="right">Source code</TooltipContent>
        </Tooltip>
      )}
    </AnimatedGroup>
  )
}
