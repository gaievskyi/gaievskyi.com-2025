import { ExternalLink } from "@/components/ui/external-link"
import { ComponentDemoLayout } from "@/components/labs/component-demo-layout"
import { DynamicIsland } from "@/components/labs/dynamic-island/dynamic-island"
import { Iphone15Pro } from "@/components/labs/dynamic-island/iphone-15-pro"

export default function DynamicIslandPage() {
  return (
    <ComponentDemoLayout
      title="Dynamic Island"
      date="September 2024"
      description={
        <p>
          Dynamic Island <span className="text-foreground"></span> is a
          masterpiece of intersecting hardware and software. <br />
          <br /> I&apos;ve completed{" "}
          <ExternalLink href="https://animations.dev">
            the course
          </ExternalLink>{" "}
          by{" "}
          <ExternalLink href="https://emilkowal.ski">
            Emil Kowalski
          </ExternalLink>
          , where one of the lessons was to recreate this component on the web.
          It reflects Apple&apos;s signature design with smooth transitions,
          morphing shapes, springs, and interactive states.
        </p>
      }
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
      className="h-[600px] pt-40"
      slug="dynamic-island"
    >
      <Iphone15Pro height={682}>
        <DynamicIsland />
      </Iphone15Pro>
    </ComponentDemoLayout>
  )
}
