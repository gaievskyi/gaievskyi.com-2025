import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { FamilyWallet } from "@/components/crafts/family-wallet"
import { craftsMap } from "@/components/video/crafts-videos"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Family Wallet",
  description: "Family Wallet",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Family Wallet",
    type: "website",
    url: "/crafts/family-wallet",
    images: [
      {
        url: craftsMap["family-wallet"].poster + "?time=0",
        alt: "Family Wallet",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["family-wallet"].poster + "?time=0",
        alt: "Family Wallet",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Family Wallet",
    creator: "@dgaievskyi",
  },
}

export default function FamilyWalletPage() {
  return (
    <ComponentDemoLayout
      title="Family Wallet"
      date="January 2024"
      next={{
        title: "Vercel Badge",
        href: "/crafts/vercel-badge",
      }}
      slug="family-wallet"
    >
      <FamilyWallet />
    </ComponentDemoLayout>
  )
}
