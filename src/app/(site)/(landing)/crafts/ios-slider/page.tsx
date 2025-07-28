import { ComponentDemoLayout } from "@/components/crafts/component-demo-layout"
import { BrightnessSlider } from "@/components/crafts/ios-slider/brightness-slider"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "iOS Slider",
  description: "iOS Slider",
  openGraph: {
    siteName: "@dgaievskyi",
    title: "iOS Slider",
    type: "website",
    url: "/crafts/ios-slider",
    images: [
      {
        url: "https://image.mux.com/OyI6tBDXZ402vENs38B6T45jmeAp01wd5CGwSX5U01ulcM/thumbnail.png?time=11",
        alt: "iOS Slider",
        width: 1920,
        height: 1080,
      },
    ],
  },
  twitter: {
    images: [
      {
        url: "https://image.mux.com/OyI6tBDXZ402vENs38B6T45jmeAp01wd5CGwSX5U01ulcM/thumbnail.png?time=11",
        alt: "iOS Slider",
        width: 1920,
        height: 1080,
      },
    ],
    card: "summary_large_image",
    title: "iOS Slider",
    creator: "@dgaievskyi",
  },
}

export default function IosSliderPage() {
  return (
    <ComponentDemoLayout
      title="iOS Slider"
      date="June 2025"
      slug="ios-slider"
      previous={{ title: "Radial Menu", href: "/crafts/radial-menu" }}
      next={{ title: "Fractional Slider", href: "/crafts/fractional-slider" }}
    >
      <BrightnessSlider />
    </ComponentDemoLayout>
  )
}
