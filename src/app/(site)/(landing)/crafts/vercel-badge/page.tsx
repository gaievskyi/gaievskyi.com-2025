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
        className="mt-32"
      >
        {null}
      </ComponentDemoLayout>
    </>
  )
}
