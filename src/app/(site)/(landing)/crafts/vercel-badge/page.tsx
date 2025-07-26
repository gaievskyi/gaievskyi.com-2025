import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import dynamic from "next/dynamic"

const VercelBadgeScene = dynamic(
  () => import("@/components/crafts/vercel-badge-scene"),
)

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
