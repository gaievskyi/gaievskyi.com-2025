import { Magnetic } from "@/components/magnetic"
import { NotFound } from "@/components/not-found"
import { Icon } from "@/components/ui/icon"
import Link from "next/link"

export default function NotFoundPage() {
  return (
    <main className="container mx-auto grid h-svh place-content-center gap-8 text-center">
      <NotFound />
      <p className="text-sm">This page does not exist or has been removed.</p>
      <Magnetic springOptions={{ bounce: 0 }} intensity={0.3}>
        <Link
          href="/"
          className="group inline-flex items-center gap-1 rounded-full bg-zinc-100 px-4 py-2 text-sm text-black transition-colors duration-200 hover:bg-zinc-950 hover:text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
        >
          <span>Go home</span>
          <Icon name="sprite:arrow2" />
        </Link>
      </Magnetic>
    </main>
  )
}
