import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import type { Metadata } from 'next'
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
        url: "https://image.mux.com/65NSXM39p1009IVy9zoYmv4jL76lxzCEMnGnYox4Tloc/thumbnail.png?time=2.5",
        alt: "Vercel Badge",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://image.mux.com/65NSXM39p1009IVy9zoYmv4jL76lxzCEMnGnYox4Tloc/thumbnail.png?time=2.5",
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
          title: "Pending Wallet Transactions",
          href: "/crafts/pending-wallet-transactions",
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
