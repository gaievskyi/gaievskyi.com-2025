import { ThemeSwitch } from "@/components/theme-switch"
import { Button } from "./ui/button"
import { Icon } from "./ui/icon"
import Link from "next/link"

type BackAsideProps = {
  children?: React.ReactNode
}

export function BackAside({ children }: BackAsideProps) {
  return (
    <>
      <aside className="isolate z-[51] h-fit lg:fixed lg:top-10 lg:left-2 lg:ml-2">
        <Link href="/">
          <Button
            variant="link"
            aria-label="Go back"
            size="sm"
            className="text-sm"
          >
            <Icon name="sprite:arrow-back" /> Index
          </Button>
        </Link>
        {children}
      </aside>
      <div className="fixed bottom-8 left-6 z-[51]">
        <ThemeSwitch />
      </div>
    </>
  )
}
