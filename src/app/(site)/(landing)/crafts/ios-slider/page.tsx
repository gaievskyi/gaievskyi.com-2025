import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { IosSlider } from "@/components/crafts/ios-slider"

export default function IosSliderPage() {
  return (
    <ComponentDemoLayout
      title="iOS Slider"
      date="June 2025"
      slug="ios-slider"
      previous={{ title: "Radial Menu", href: "/crafts/radial-menu" }}
      next={{ title: "Fractional Slider", href: "/crafts/fractional-slider" }}
    >
      <IosSlider defaultValue={45} />
    </ComponentDemoLayout>
  )
}
