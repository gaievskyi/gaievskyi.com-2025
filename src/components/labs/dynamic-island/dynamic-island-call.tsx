import { Icon } from "@/components/ui/icon"
import Image from "next/image"

export function DynamicIslandCall() {
  return (
    <div className="font-system flex w-[284px] items-center justify-between py-3 pr-3 pl-4">
      {/* Profile Picture */}
      <div className="flex items-center gap-3">
        <div className="size-9 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
          <Image
            src="https://avatars.githubusercontent.com/u/91077711?v=4"
            alt="Makaroni"
            width={36}
            height={36}
            className="size-full object-cover"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100' height='100' fill='%23d1d5db'/%3e%3cpath d='m30 40 20-10 20 10v30l-20 10-20-10z' fill='%23f3f4f6'/%3e%3ccircle cx='50' cy='35' r='8' fill='%23d1d5db'/%3e%3c/svg%3e")`,
            }}
          />
        </div>

        {/* Contact Info */}
        <div className="flex flex-col">
          <div className="text-xs font-normal text-gray-400">mobile</div>
          <div className="text-base leading-tight font-medium text-white">
            Makaroni
          </div>
        </div>
      </div>

      {/* Call Action Buttons */}
      <div className="flex items-center gap-3">
        {/* Decline Button - Red */}
        <button
          aria-label="Decline call"
          className="flex size-10 items-center justify-center rounded-full bg-[#ff453a] transition-colors hover:bg-[#ff3b30]"
        >
          <Icon
            name="sprite:phone"
            className="size-5 rotate-[135deg] text-white"
          />
        </button>

        {/* Accept Button - Green */}
        <button
          aria-label="Accept call"
          className="flex size-10 items-center justify-center rounded-full bg-[#30d158] transition-colors hover:bg-[#28c946]"
        >
          <Icon name="sprite:phone" className="size-5 text-white" />
        </button>
      </div>
    </div>
  )
}
