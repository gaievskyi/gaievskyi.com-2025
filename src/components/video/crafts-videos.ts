// TODO: refactor with dynamic imports

import pendingWalletTransactionsVideo from "@/videos/pending-wallet-transactions.mp4"
import dynamicIslandVideo from "@/videos/dynamic-island.mp4"
import vercelBadgeVideo from "@/videos/vercel-badge.mp4"
import radialMenuVideo from "@/videos/radial-menu.mp4"
import iosSliderVideo from "@/videos/ios-slider.mp4"
import fractionalSliderVideo from "@/videos/fractional-slider.mp4"

export const craftsMap = {
  "fractional-slider": fractionalSliderVideo,
  "ios-slider": iosSliderVideo,
  "radial-menu": radialMenuVideo,
  "dynamic-island": dynamicIslandVideo,
  "vercel-badge": vercelBadgeVideo,
  "pending-wallet-transactions": pendingWalletTransactionsVideo,
} as const
