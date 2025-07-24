import { isProduction } from "@/lib/constants"
import { env } from "../../env/env"

export function ScreenSizeIndicator() {
  if (isProduction || env.HIDE_TAILWIND_INDICATOR) {
    return null
  }

  return (
    <div className="fixed right-3 bottom-2 z-999 grid size-6 place-content-center rounded-full p-3 font-mono text-xs text-white">
      <div className="block sm:hidden">xs</div>
      <div className="hidden sm:block md:hidden">sm</div>
      <div className="hidden md:block lg:hidden">md</div>
      <div className="hidden lg:block xl:hidden">lg</div>
      <div className="hidden xl:block 2xl:hidden">xl</div>
      <div className="hidden 2xl:block">2xl</div>
    </div>
  )
}
