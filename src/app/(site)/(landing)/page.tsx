import { CrossBackground } from "@/components/cross-background"
import { About } from "@/components/sections/about"
import { CraftsVideoGrid } from "@/components/sections/crafts-video-grid"
import { FooterContent } from "@/components/sections/footer-content"
import { HeaderContent } from "@/components/sections/header-content"
import { ProjectsVideoGrid } from "@/components/sections/projects-video-grid"
import { Publications } from "@/components/sections/publications"
import { Socials } from "@/components/sections/socials"
import { Grid, GridItem } from "@/components/ui/layout/grid"
import Script from "next/script"
import type { Person, WithContext } from "schema-dts"

export const personJsonLd: WithContext<Person> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Daniel Gaievskyi",
  image: "https://gaievskyi.com/images/opengraph-image.png",
  description:
    "Someone who loves mixing different approaches, genres and styles to create unique, innovative experiences. I enjoy pushing boundaries and exploring new ways to express myself without limitations.",
  url: "https://gaievskyi.com",
  sameAs: [
    "https://github.com/gaievskyi",
    "https://x.com/dgaievskyi",
    "https://t.me/designbeng",
  ],
  jobTitle: "Design Engineer",
  email: "daniel@gaievskyi.com",
}

export default function IndexPage() {
  return (
    <>
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
        <GridItem
          as="section"
          id="socials"
          row={2}
          outlined="both"
          padding="md"
        >
          <CrossBackground className="text-neutral-700" />
          <Socials />
        </GridItem>
        <GridItem as="section" id="about" row={3} padding="lg">
          <About />
        </GridItem>
        <GridItem
          as="section"
          id="publications"
          row={4}
          outlined="top"
          padding="md"
        >
          <Publications />
        </GridItem>
        <GridItem as="section" id="crafts" row={4} outlined="top" padding="md">
          <CraftsVideoGrid />
        </GridItem>
        <GridItem
          as="section"
          id="projects"
          row={5}
          outlined="top"
          padding="md"
        >
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
      <Script
        id="json-ld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  )
}
