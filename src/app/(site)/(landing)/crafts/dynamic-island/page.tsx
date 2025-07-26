import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { DynamicIsland } from "@/components/crafts/dynamic-island/dynamic-island"
import { Iphone15Pro } from "@/components/crafts/dynamic-island/iphone-15-pro"

export default function DynamicIslandPage() {
  return (
    <ComponentDemoLayout
      title="Dynamic Island"
      date="September 2024"
      previous={{
        title: "Vercel Badge",
        href: "/crafts/vercel-badge",
      }}
      next={{
        title: "Radial Menu",
        href: "/crafts/radial-menu",
      }}
      className="h-[400px] pt-40"
      slug="dynamic-island"
    >
      <Iphone15Pro height={482}>
        <DynamicIsland />
      </Iphone15Pro>
    </ComponentDemoLayout>
  )
}
