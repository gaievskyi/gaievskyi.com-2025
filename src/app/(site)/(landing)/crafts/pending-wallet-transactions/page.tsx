import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { PendingWalletTransactions } from "@/components/crafts/pending-wallet-transactions"

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
