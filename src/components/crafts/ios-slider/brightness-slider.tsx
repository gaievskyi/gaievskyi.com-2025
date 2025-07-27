"use client"

import { useState } from "react"
import { IosSlider } from "./ios-slider"
import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"

export function BrightnessSlider() {
  const [value, setValue] = useState(45)

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.valueAsNumber)
  }

  return (
    <IosSlider
      value={value}
      onChange={onChange}
      icon={
        <Icon
          name="sprite:sun2"
          className={cn(
            "size-11 transition-colors duration-300 ease-in-out",
            value < 10 ? "text-gray-500" : "text-ios-slider-icon",
          )}
        />
      }
    />
  )
}
