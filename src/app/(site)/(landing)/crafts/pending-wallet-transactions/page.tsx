import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { PendingWalletTransactions } from "@/components/crafts/pending-wallet-transactions"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pending Wallet Transactions",
  description: "Pending Wallet Transactions",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "Pending Wallet Transactions",
    type: "website",
    url: "/crafts/pending-wallet-transactions",
    images: [
      {
        url: "https://image.mux.com/Gkh89hLJGcXesp75xQxrysOjmCgNdr3a1HbeRolSweY/thumbnail.png?time=0",
        alt: "Pending Wallet Transactions",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://image.mux.com/Gkh89hLJGcXesp75xQxrysOjmCgNdr3a1HbeRolSweY/thumbnail.png?time=0",
        alt: "Pending Wallet Transactions",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "Pending Wallet Transactions",
    creator: "@dgaievskyi",
  },
}

export default function PendingWalletTransactionsPage() {
  return (
    <ComponentDemoLayout
      title="Pending Wallet Transactions"
      date="January 2024"
      next={{
        title: "Vercel Badge",
        href: "/crafts/vercel-badge",
      }}
      slug="pending-wallet-transactions"
    >
      <PendingWalletTransactions />
    </ComponentDemoLayout>
  )
}
