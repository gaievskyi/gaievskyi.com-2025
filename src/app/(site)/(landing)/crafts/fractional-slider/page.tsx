import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { DynamicIsland } from "@/components/crafts/dynamic-island/dynamic-island"
import { Iphone15Pro } from "@/components/crafts/dynamic-island/iphone-15-pro"
import { FractionalSlider } from "@/components/crafts/fractional-slider/fractional-slider"

export default function FractionalSliderPage() {
  return (
    <ComponentDemoLayout
      title="Fractional Slider"
      date="July 2025"
      previous={{
        title: "iOS Slider",
        href: "/crafts/ios-slider",
      }}
      className="h-[300px]"
      slug="fractional-slider"
    >
      <FractionalSlider />
    </ComponentDemoLayout>
  )
}
