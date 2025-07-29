import { HeaderContent } from "@/components/sections/header-content"
import { About } from "@/components/sections/about"
import { Contact } from "@/components/sections/contact"
import { FooterContent } from "@/components/sections/footer-content"
import { CraftsVideoGrid } from "@/components/sections/crafts-video-grid"
import { ProjectsVideoGrid } from "@/components/sections/projects-video-grid"
import { Grid, GridItem } from "@/components/ui/layout/grid"
import { CrossBackground } from "@/components/cross-background"
import { Publications } from "@/components/sections/publications"
import { getArticles } from "@/cms/data-access/articles"
import { Suspense } from "react"
import { PublicationsSkeleton } from "@/components/publications-skeleton"

export default function IndexPage() {
  const articlesPromise = getArticles()
  return (
    <Grid as="main">
      <GridItem
        as="header"
        row={1}
        padding="sm"
        outlined="top"
        dashed
        className="mt-12"
      >
        <HeaderContent />
      </GridItem>
      <GridItem as="section" id="about" row={2} outlined="both" padding="md">
        <CrossBackground className="text-neutral-700" />
        <About />
      </GridItem>
      <GridItem as="section" id="contact" row={3} padding="lg">
        <Contact />
      </GridItem>
      <GridItem
        as="section"
        id="publications"
        row={4}
        outlined="top"
        padding="md"
      >
        <Suspense fallback={<PublicationsSkeleton count={1} />}>
          <Publications itemsPromise={articlesPromise} />
        </Suspense>
      </GridItem>
      <GridItem as="section" id="crafts" row={4} outlined="top" padding="md">
        <CraftsVideoGrid />
      </GridItem>
      <GridItem as="section" id="projects" row={5} outlined="top" padding="md">
        <ProjectsVideoGrid />
      </GridItem>
      <GridItem
        as="footer"
        row={6}
        padding="xs"
        outlined="both"
        dashed="bottom"
        className="mb-16"
      >
        <FooterContent />
      </GridItem>
    </Grid>
  )
}
