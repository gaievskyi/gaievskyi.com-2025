import type { Metadata } from "next"
import { RadialMenuDemo } from "./radial-menu-demo"
import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"

export const metadata: Metadata = {
  title: "Radial Menu",
  description: "Radial Menu",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Radial Menu",
    type: "website",
    url: "/crafts/radial-menu",
    images: [
      {
        url: "https://image.mux.com/T1sxypWpc5JF2Xe1GVj00D00UCpZNR1EgFHBmxDZRm00iw/thumbnail.png?time=1.2",
        alt: "Radial Menu",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://image.mux.com/T1sxypWpc5JF2Xe1GVj00D00UCpZNR1EgFHBmxDZRm00iw/thumbnail.png?time=1.2",
        alt: "Radial Menu",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Radial Menu",
    creator: "@dgaievskyi",
  },
}

export default function RadialMenuPage() {
  return (
    <ComponentDemoLayout
      title="Radial Menu"
      date="May 2025"
      slug="radial-menu"
      previous={{ title: "Dynamic Island", href: "/crafts/dynamic-island" }}
      next={{ title: "iOS Slider", href: "/crafts/ios-slider" }}
    >
      <RadialMenuDemo />
    </ComponentDemoLayout>
  )
}
