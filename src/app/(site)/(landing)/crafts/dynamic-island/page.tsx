import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { DynamicIsland } from "@/components/crafts/dynamic-island/dynamic-island"
import { Iphone15Pro } from "@/components/crafts/dynamic-island/iphone-15-pro"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Dynamic Island",
  description: "Dynamic Island",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Dynamic Island",
    type: "website",
    url: "/crafts/dynamic-island",
    images: [
      {
        url: "https://image.mux.com/k2NTQLQroQAYH3YxvAzlnTnkuJiA9fAKzLeMc02n3YjY/thumbnail.png",
        alt: "Dynamic Island",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://image.mux.com/k2NTQLQroQAYH3YxvAzlnTnkuJiA9fAKzLeMc02n3YjY/thumbnail.png",
        alt: "Dynamic Island",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Dynamic Island",
    creator: "@dgaievskyi",
  },
}

export default async function DynamicIslandPage() {
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
