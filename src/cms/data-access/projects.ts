import config from "@payload-config"
import { getPayload } from "payload"
import { cache as dedupe } from "react"
import type { Project } from "../../../payload-types"

export const getProjects = dedupe(async () => {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: "projects",
  })
  return projects.docs
})

export const getProject = dedupe(async (slug: string): Promise<Project> => {
  const payload = await getPayload({ config })
  const project = await payload.find({
    collection: "projects",
    where: { slug: { equals: slug } },
  })
  return project.docs[0]
})

export const getProjectsSlugs = dedupe(async () => {
  const payload = await getPayload({ config })
  const projects = await payload.find({
    collection: "projects",
    select: { slug: true },
  })
  return projects.docs.map((project) => ({ slug: project.slug }))
})
