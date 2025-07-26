import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { PendingWalletTransactions } from "@/components/crafts/pending-wallet-transactions"

export default function PendingWalletTransactionsPage() {
  return (
    <ComponentDemoLayout
      title="Pending Wallet Transactions"
      date="January 2025"
      previous={{
        title: "Voice Chat Toolbar",
        subtitle: "Interactive component",
        href: "/labs/voice-chat-toolbar",
      }}
      next={{
        title: "Liquid Glass",
        subtitle: "3D interaction",
        href: "/labs/liquid-glass",
      }}
      slug="pending-wallet-transactions"
    >
      <PendingWalletTransactions />
    </ComponentDemoLayout>
  )
}
