"use client"

import { useState } from "react"
import { motion, LayoutGroup } from "motion/react"
import { useSound } from "@/hooks/use-sound"
import Image from "next/image"
import { Icon } from "@/components/ui/icon"

type PendingTransaction = {
  id: string
  recipient: {
    name: string
  }
  collection: string
  amount: string
  type: "crypto" | "nft"
}

const mockPendingTransactions: PendingTransaction[] = [
  {
    id: "1",
    recipient: {
      name: "Makaroni",
    },
    collection: "Ethereum",
    amount: "$20.00",
    type: "crypto",
  },
  {
    id: "2",
    recipient: {
      name: "Makaroni",
    },
    collection: "DeadFellaz",
    amount: "Fee Only",
    type: "nft",
  },
  {
    id: "3",
    recipient: {
      name: "Makaroni",
    },
    collection: "DeadFellaz",
    amount: "Fee Only",
    type: "nft",
  },
  {
    id: "4",
    recipient: {
      name: "Makaroni",
    },
    collection: "DeadFellaz",
    amount: "Fee Only",
    type: "nft",
  },
]

const nftImages = [
  "/images/deadfellaz1.webp",
  "/images/deadfellaz2.webp",
  "/images/deadfellaz3.webp",
]

type TransactionAvatarProps = {
  transaction: PendingTransaction
  index: number
}

function TransactionAvatar({ transaction, index }: TransactionAvatarProps) {
  return (
    <div className="relative">
      <div className="size-12 overflow-hidden rounded-md">
        {index === 0 ? (
          <div className="flex size-12 items-center justify-center rounded-full bg-black">
            <Icon name="sprite:ethereum" className="h-8 w-16" />
          </div>
        ) : transaction.type === "nft" ? (
          <div
            className="h-full w-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${nftImages[index % nftImages.length]})`,
            }}
          />
        ) : null}
      </div>
      <div className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-sky-500">
        <Icon
          name="sprite:spinner"
          className="size-3 animate-[spin_0.45s_linear_infinite] text-white"
        />
      </div>
    </div>
  )
}

type TransactionDetailsProps = {
  transaction: PendingTransaction
}

function TransactionDetails({ transaction }: TransactionDetailsProps) {
  return (
    <div>
      <div className="flex items-center gap-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-[#B5B3AD]">
        Sending to{" "}
        <Image
          unoptimized
          src="/images/nyan-cat.gif"
          alt="nyan cat"
          className="size-4 rounded-full"
          width={16}
          height={16}
        />{" "}
        {transaction.recipient.name}
      </div>
      <div className="text-[17px] font-semibold text-gray-900 dark:text-white">
        {transaction.collection}
      </div>
    </div>
  )
}

type TransactionAmountProps = {
  amount: string
}

function TransactionAmount({ amount }: TransactionAmountProps) {
  return (
    <div className="text-right">
      {amount === "Fee Only" ? (
        <div className="rounded-md border border-gray-200 bg-gray-50 px-2 py-1 text-xs font-semibold text-gray-600 dark:border-zinc-700 dark:bg-background/30 dark:text-zinc-400">
          Fee Only
        </div>
      ) : (
        <div className="text-lg font-semibold text-gray-800 dark:text-zinc-200">
          {amount}
        </div>
      )}
    </div>
  )
}

type TransactionCardProps = {
  transaction: PendingTransaction
  index: number
  layoutId: string
  isStacked?: boolean
  stackIndex?: number
  totalItems?: number
}

function TransactionCard({
  transaction,
  index,
  layoutId,
  isStacked = false,
  stackIndex = 0,
  totalItems = 0,
}: TransactionCardProps) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={false}
      animate={
        isStacked
          ? {
              y: stackIndex * 4,
              scale: 1 - stackIndex * 0.02,
              zIndex: totalItems - stackIndex,
            }
          : {
              y: 0,
              scale: 1,
              zIndex: 1,
            }
      }
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      }}
      style={{
        position: stackIndex === 0 || !isStacked ? "relative" : "absolute",
        top: 0,
        left: 0,
        right: 0,
      }}
      className="rounded-xl border border-gray-200 bg-white/90 p-2 backdrop-blur-sm dark:border-zinc-700/30 dark:bg-zinc-800/60"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <TransactionAvatar transaction={transaction} index={index} />
          <TransactionDetails transaction={transaction} />
        </div>
        <TransactionAmount amount={transaction.amount} />
      </div>
    </motion.div>
  )
}

type PendingHeaderProps = {
  isExpanded: boolean
  pendingCount: number
  onToggle: () => void
}

function PendingHeader({
  isExpanded,
  pendingCount,
  onToggle,
}: PendingHeaderProps) {
  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className="flex cursor-pointer items-center justify-between bg-white/80 px-4 py-3 select-none dark:bg-transparent"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Pending
        </h2>
        <Icon
          name="sprite:info"
          className="size-4 text-gray-500 dark:text-zinc-500"
        />
      </div>
      <div className="flex items-center gap-3">
        <span className="text-xl font-semibold text-gray-900 dark:text-white">
          {pendingCount}
        </span>
        <motion.div initial={false} animate={{ rotate: isExpanded ? 0 : -180 }}>
          <Icon
            name="sprite:chevron-up"
            className="size-5 text-gray-500 dark:text-zinc-500"
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

export function PendingWalletTransactions() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pendingCount = mockPendingTransactions.length
  const [playTriggerSound] = useSound("/sounds/trigger.mp3")

  const onToggle = () => {
    setIsExpanded(!isExpanded)
    playTriggerSound()
  }

  return (
    <LayoutGroup>
      <motion.div
        layout
        initial={false}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        className="mx-auto w-full max-w-[350px] overflow-hidden rounded-2xl"
      >
        <PendingHeader
          isExpanded={isExpanded}
          pendingCount={pendingCount}
          onToggle={onToggle}
        />

        {isExpanded ? (
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="space-y-2 px-4 pb-4"
          >
            {mockPendingTransactions.map((transaction, index) => (
              <TransactionCard
                key={transaction.id}
                transaction={transaction}
                index={index}
                layoutId={`transaction-${transaction.id}`}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="px-4 pb-4"
          >
            <div className="relative">
              {mockPendingTransactions.map((transaction, index) => (
                <TransactionCard
                  key={transaction.id}
                  transaction={transaction}
                  index={index}
                  layoutId={`transaction-${transaction.id}`}
                  isStacked={true}
                  stackIndex={index}
                  totalItems={mockPendingTransactions.length}
                />
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>
    </LayoutGroup>
  )
}
