import { ExternalLink } from "@/components/ui/external-link"
import { ComponentDemoLayout } from "@/components/labs/component-demo-layout"
import dynamic from "next/dynamic"

const VercelBadgeScene = dynamic(
  () => import("@/components/labs/vercel-badge-scene"),
)

export default function VercelBadgePage() {
  return (
    <>
      <VercelBadgeScene />
      <ComponentDemoLayout
        title="Vercel Badge"
        date="June 2024"
        description={
          <p>
            Everyone who attended{" "}
            <ExternalLink href="https://vercel.com/ship/2024">
              Vercel Ship
            </ExternalLink>{" "}
            conference in 2024 remembers this interactive experience after the
            registration. I played with this badge for a while, then decided to
            make it by myself using Three.js.
          </p>
        }
        previous={{
          title: "Segmented Control",
          subtitle: "Component showcase",
          href: "/labs/segmented-control",
        }}
        next={{
          title: "Dynamic Island",
          subtitle: "Interactive component",
          href: "/labs/dynamic-island",
        }}
      >
        {null}
      </ComponentDemoLayout>
    </>
  )
}
