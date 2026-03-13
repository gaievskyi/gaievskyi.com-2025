"use client"

import { Icon } from "@/components/ui/icon"
import { useSound } from "@/hooks/use-sound"
import { LayoutGroup } from "motion/react"
import * as m from "motion/react-m"
import Image from "next/image"
import { useState } from "react"

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
            <Icon name="sprite:ethereum" className="text-3xl text-white!" />
          </div>
        ) : transaction.type === "nft" ? (
          <div
            className="size-full bg-cover bg-center"
            style={{
              backgroundImage: `url(${nftImages[index % nftImages.length]})`,
            }}
          />
        ) : null}
      </div>
      <div className="absolute -top-1 -left-1 flex size-5 items-center justify-center rounded-full bg-sky-500">
        <Icon
          name="sprite:spinner"
          className="size-3 animate-[spin_0.45s_linear_infinite] text-white!"
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
      <div className="flex items-center gap-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-[#93918b]">
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
        <div className="rounded-md border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-sm font-bold text-gray-600 dark:border-zinc-800 dark:bg-background/30 dark:text-[#93918b]">
          Fee Only
        </div>
      ) : (
        <div className="text-lg font-semibold text-gray-600 dark:text-[#93918b]">
          {amount}
        </div>
      )}
    </div>
  )
}

type TransactionCardProps = {
  transaction: PendingTransaction
  index: number
  layoutId?: string
  isStacked?: boolean
  stackIndex?: number
  totalItems?: number
}

function TransactionCard({ transaction, index }: TransactionCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-2.5 dark:border-zinc-700/30 dark:bg-[#111111]">
      <div className="flex items-end justify-between">
        <div className="flex items-center gap-2.5">
          <TransactionAvatar transaction={transaction} index={index} />
          <TransactionDetails transaction={transaction} />
        </div>
        <TransactionAmount amount={transaction.amount} />
      </div>
    </div>
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
    <m.div
      layout
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 500, damping: 35 }}
      className="flex cursor-pointer items-center justify-between bg-white/80 px-6 py-3 select-none dark:bg-transparent"
      onClick={onToggle}
    >
      <div className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Pending
        </h2>
        <Icon
          name="sprite:info"
          className="text-md text-gray-500 dark:text-zinc-500"
        />
      </div>
      <div className="flex items-center gap-1.5">
        <span className="text-lg font-semibold text-gray-900 dark:text-white">
          {pendingCount}
        </span>
        <m.div
          initial={false}
          animate={{
            rotate: isExpanded ? 0 : -180,
            transition: { duration: 0.2 },
          }}
        >
          <Icon
            name="sprite:chevron-up"
            className="text-2xl text-gray-500 dark:text-zinc-500"
          />
        </m.div>
      </div>
    </m.div>
  )
}

export function FamilyTransactions() {
  const [isExpanded, setIsExpanded] = useState(false)
  const pendingCount = mockPendingTransactions.length
  const [playTriggerSound] = useSound("/sounds/trigger.mp3")

  const onToggle = () => {
    const newState = !isExpanded
    setIsExpanded(newState)
    playTriggerSound()
  }

  return (
    <LayoutGroup>
      <div className="mx-auto w-full max-w-[350px] rounded-2xl">
        <div className="overflow-hidden rounded-t-2xl">
          <PendingHeader
            isExpanded={isExpanded}
            pendingCount={pendingCount}
            onToggle={onToggle}
          />
        </div>

        <div className="px-4 pb-4">
          <m.div
            layout="position"
            className="relative"
            animate={{
              height: isExpanded
                ? mockPendingTransactions.slice(0, 4).length * 68 + 4
                : 60,
            }}
            transition={
              isExpanded
                ? {
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                    mass: 0.9,
                  }
                : {
                    type: "spring",
                    stiffness: 500,
                    damping: 35,
                    mass: 0.6,
                  }
            }
          >
            {mockPendingTransactions.map((transaction, index) => {
              const showWhenCollapsed = index < 3
              return (
                <m.div
                  key={transaction.id}
                  layoutId={`transaction-${transaction.id}`}
                  initial={false}
                  animate={
                    isExpanded
                      ? {
                          y: index * 78,
                          scale: 1,
                          opacity: 1,
                          zIndex: mockPendingTransactions.length - index,
                        }
                      : {
                          y: index * 9,
                          scale: 1 - index * 0.05,
                          opacity: showWhenCollapsed ? 1 : 0,
                          zIndex: mockPendingTransactions.length - index,
                        }
                  }
                  transition={
                    isExpanded
                      ? {
                          type: "spring",
                          stiffness: 220,
                          damping: 28,
                          mass: 1,
                        }
                      : {
                          type: "spring",
                          stiffness: 450,
                          damping: 35,
                          mass: 0.7,
                        }
                  }
                  className="absolute inset-x-0 top-0"
                >
                  <TransactionCard transaction={transaction} index={index} />
                </m.div>
              )
            })}
          </m.div>
        </div>
      </div>
    </LayoutGroup>
  )
}
