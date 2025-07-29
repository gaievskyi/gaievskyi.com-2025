// TODO: refactor with dynamic imports

import capturaVideo from "@/videos/captura.mp4"
import dasGruneVideo from "@/videos/das-grune.mp4"
import jamstackVideo from "@/videos/jamstack.mp4"
import portfolioVideo from "@/videos/portfolio.mp4"
import videoPlayerVideo from "@/videos/video-player.mp4"
import galleryVideo from "@/videos/gallery.mp4"

export const videosMap = {
  gallery: galleryVideo,
  captura: capturaVideo,
  "digital-agency": dasGruneVideo,
  jamstack: jamstackVideo,
  portfolio: portfolioVideo,
  "video-player": videoPlayerVideo,
} as const

export const isVideo = (slug: string): slug is keyof typeof videosMap => {
  return slug in videosMap
}
