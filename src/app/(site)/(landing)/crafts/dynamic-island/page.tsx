import { ComponentDemoLayout } from "@/components/labs/component-demo-layout"
import { DynamicIsland } from "@/components/labs/dynamic-island/dynamic-island"
import { Iphone15Pro } from "@/components/labs/dynamic-island/iphone-15-pro"

export default function DynamicIslandPage() {
  return (
    <ComponentDemoLayout
      title="Dynamic Island"
      date="September 2024"
      previous={{
        title: "Vercel Badge",
        subtitle: "3D interaction",
        href: "/labs/vercel-badge",
      }}
      next={{
        title: "Voice Chat Toolbar",
        subtitle: "Interactive component",
        href: "/labs/voice-chat-toolbar",
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
