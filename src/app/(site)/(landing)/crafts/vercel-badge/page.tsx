import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { craftsMap } from "@/components/video/crafts-videos"
import type { Metadata } from "next"
import dynamic from "next/dynamic"

const VercelBadgeScene = dynamic(
  () => import("@/components/crafts/vercel-badge-scene"),
)

export const metadata: Metadata = {
  title: "Vercel Badge",
  description: "Vercel Badge",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Vercel Badge",
    type: "website",
    url: "/crafts/vercel-badge",
    images: [
      {
        url: craftsMap["vercel-badge"].poster + "?time=2.5",
        alt: "Vercel Badge",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["vercel-badge"].poster + "?time=2.5",
        alt: "Vercel Badge",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Vercel Badge",
    creator: "@dgaievskyi",
  },
}

export default function VercelBadgePage() {
  return (
    <>
      <VercelBadgeScene />
      <ComponentDemoLayout
        title="Vercel Badge"
        date="June 2024"
        previous={{
          title: "Family Wallet",
          href: "/crafts/family-wallet",
        }}
        next={{
          title: "Dynamic Island",
          href: "/crafts/dynamic-island",
        }}
        className="mt-32"
      >
        {null}
      </ComponentDemoLayout>
    </>
  )
}
