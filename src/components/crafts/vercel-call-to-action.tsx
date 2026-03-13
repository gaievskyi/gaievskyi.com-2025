import { Icon } from "@/components/ui/icon"
import { FlipText } from "@/components/ui/split-text/flip-text"
import { geist } from "@/lib/fonts"

export function VercelCallToAction() {
  return (
    <button
      className={`${geist.className} group inline-flex h-[72px] w-fit items-center justify-between gap-6 rounded-full border border-[#ffffff25] bg-black pr-3 pl-5 transition-colors focus-within:outline-[#47A8FF] hover:bg-[rgb(10,10,10)] lg:h-[96px] lg:gap-20 lg:pr-4 lg:pl-7`}
    >
      <FlipText className="mb-2 text-4xl font-semibold tracking-tight lg:text-5xl">
        Start Deploying
      </FlipText>
      <div className="relative flex size-12 items-center justify-center overflow-hidden rounded-full bg-white text-black lg:size-16">
        <Icon
          name="sprite:vercel-arrow-right"
          className="size-6 filter-[drop-shadow(3rem_0_0_currentColor)] transition-transform duration-400 ease-out group-hover:-translate-x-12 lg:size-9 lg:filter-[drop-shadow(4rem_0_0_currentColor)] lg:group-hover:-translate-x-16"
        />
      </div>
    </button>
  )
}
