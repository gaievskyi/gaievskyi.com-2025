import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { FamilyTransactions } from "@/components/crafts/family-transactions"
import { craftsMap } from "@/components/video/crafts-videos"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Family Transactions",
  description: "Family Transactions",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Family Transactions",
    type: "website",
    url: "/crafts/family-transactions",
    images: [
      {
        url: craftsMap["family-transactions"].poster + "?time=0",
        alt: "Family Transactions",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: craftsMap["family-transactions"].poster + "?time=0",
        alt: "Family Transactions",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Family Transactions",
    creator: "@dgaievskyi",
  },
}

export default function FamilyWalletPage() {
  return (
    <ComponentDemoLayout
      title="Family Transactions"
      date="January 2024"
      next={{
        title: "Vercel Badge",
        href: "/crafts/vercel-badge",
      }}
      slug="family-transactions"
      className="h-[420px] items-start pt-4"
      decoratedBackground={false}
    >
      <FamilyTransactions />
    </ComponentDemoLayout>
  )
}
