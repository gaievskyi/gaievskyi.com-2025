import { Icon } from "@/components/ui/icon"
import { cn } from "@/lib/utils"
import Image from "next/image"
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react"

// Sample playlist
const playlist = [
  {
    id: 1,
    title: "goosebumps",
    artist: "Travis Scott",
    duration: 244, // 4:04 in seconds
    cover: "/images/goosebumps.jpeg",
  },
  {
    id: 2,
    title: "Kyoto",
    artist: "Yung Lean",
    duration: 270, // 4:30 in seconds
    cover: "/images/kyoto.jpg",
  },
  {
    id: 3,
    title: "Breathe",
    artist: "Yeat",
    duration: 170, // 2:50 in seconds
    cover: "/images/breathe.jpg",
  },
]

// Format time in MM:SS
const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, "0")}`
}

export function DynamicIslandMusic() {
  const [isPlaying, setIsPlaying] = useState(true)
  const [currentTime, setCurrentTime] = useState(0)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [progressAnimating, setProgressAnimating] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const currentTrack = playlist[currentTrackIndex]
  const progress = (currentTime / currentTrack.duration) * 100

  const handleTrackTransition = (newIndex: number, resetTime = true) => {
    setIsTransitioning(true)
    setProgressAnimating(true)

    setTimeout(() => {
      setCurrentTrackIndex(newIndex)
      if (resetTime) {
        setCurrentTime(0)
      }
      setIsTransitioning(false)
    }, 150)

    setTimeout(() => {
      setProgressAnimating(false)
    }, 300)
  }

  const handleNextTrack = useCallback(() => {
    const nextIndex =
      currentTrackIndex === playlist.length - 1 ? 0 : currentTrackIndex + 1
    handleTrackTransition(nextIndex)
  }, [currentTrackIndex])

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= currentTrack.duration) {
            handleNextTrack()
            return 0
          }
          return prev + 1
        })
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isPlaying, currentTrack.duration, handleNextTrack])

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handlePreviousTrack = () => {
    if (currentTime > 10) {
      setProgressAnimating(true)
      setCurrentTime(0)
      setTimeout(() => setProgressAnimating(false), 300)
    } else {
      const prevIndex =
        currentTrackIndex === 0 ? playlist.length - 1 : currentTrackIndex - 1
      handleTrackTransition(prevIndex)
    }
  }

  const handleProgressClick = (e: MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const progressBarWidth = rect.width
    const clickedProgress = (clickX / progressBarWidth) * 100
    const newTime = Math.floor((clickedProgress / 100) * currentTrack.duration)
    setProgressAnimating(true)
    setCurrentTime(newTime)
    setTimeout(() => setProgressAnimating(false), 200)
  }

  return (
    <div className="flex w-[320px] flex-col gap-3 py-5 pr-6 pl-5">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "size-12 shrink-0 overflow-hidden rounded-lg bg-linear-to-br from-orange-400 via-pink-500 to-purple-600 transition-all duration-300 ease-out",
            isTransitioning ? "scale-95 opacity-80" : "scale-100 opacity-100",
          )}
        >
          <Image
            src={currentTrack.cover}
            alt="Album cover"
            width={48}
            height={48}
            className="size-full object-cover"
          />
        </div>

        <div className="flex min-w-0 flex-col font-medium">
          <div
            className={cn(
              "font-system transition-all duration-300 ease-out",
              isTransitioning
                ? "translate-x-2 transform opacity-0"
                : "translate-x-0 transform opacity-100",
            )}
          >
            <span className="block truncate text-sm/tight text-white">
              {currentTrack.title}
            </span>
            <span className="block truncate text-sm/tight text-white/60">
              {currentTrack.artist}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="font-system text-xs font-medium text-[#434542] tabular-nums">
          {formatTime(currentTime)}
        </span>
        <div
          className="h-1.5 flex-1 cursor-pointer overflow-hidden rounded-full bg-[#3a3b3d]"
          onClick={handleProgressClick}
        >
          <div
            className={cn(
              "h-full bg-[#707070] transition-all",
              progressAnimating
                ? "duration-300 ease-out"
                : "duration-100 ease-linear",
            )}
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="font-system text-xs font-medium text-[#434542] tabular-nums">
          -{formatTime(currentTrack.duration - currentTime)}
        </span>
      </div>
      <div className="ml-5 flex items-center justify-between">
        <div className="flex flex-1 items-center justify-center gap-6">
          <button
            className="rotate-180 transition-transform duration-150 ease-out active:scale-90"
            onClick={handlePreviousTrack}
          >
            <Icon
              name="sprite:fast-forward"
              className="mt-[5px] text-2xl text-white"
            />
          </button>

          <button onClick={togglePlayPause}>
            {isPlaying ? (
              <Icon name="sprite:pause" className="text-2xl text-white" />
            ) : (
              <Icon name="sprite:play" className="text-2xl text-white" />
            )}
          </button>

          <button
            onClick={handleNextTrack}
            className="transition-transform duration-150 ease-out active:scale-90"
          >
            <Icon name="sprite:fast-forward" className="text-2xl text-white" />
          </button>
        </div>

        <button className="transition-transform duration-150 ease-out active:scale-90">
          <Icon name="sprite:podcast" className="text-2xl text-white" />
        </button>
      </div>
    </div>
  )
}
