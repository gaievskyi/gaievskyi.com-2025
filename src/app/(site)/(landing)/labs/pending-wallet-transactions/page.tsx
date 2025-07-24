import { ExternalLink } from "@/components/ui/external-link"
import { ComponentDemoLayout } from "@/components/labs/component-demo-layout"
import { PendingWalletTransactions } from "@/components/labs/pending-wallet-transactions"

export default function PendingWalletTransactionsPage() {
  return (
    <ComponentDemoLayout
      title="Pending Wallet Transactions"
      date="January 2025"
      description={
        <p>
          We all love{" "}
          <ExternalLink href="https://family.co/">Family</ExternalLink>.
          Inspired by them, I designed this component with pretty cascading
          effect, enhanced with subtle SFX, spring animations and a bit of
          -like blur. Feels cool, doesn&apos;t it?
        </p>
      }
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
