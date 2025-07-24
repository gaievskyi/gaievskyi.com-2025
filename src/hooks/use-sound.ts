import { useCallback, useEffect, useRef, useState } from "react"

type SoundOptions = {
  volume?: number
  playbackRate?: number
  interrupt?: boolean
  onLoad?: () => void
  onError?: (error: Error) => void
}

export function useSound(soundPath: string, options: SoundOptions = {}) {
  const {
    volume = 1,
    playbackRate = 1,
    interrupt = false,
    onLoad,
    onError,
  } = options

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<number | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const audio = new Audio(soundPath)

    const loadAudio = () => {
      setDuration(audio.duration * 1000)
      setIsLoaded(true)
      onLoad?.()
    }

    const processError = (error: ErrorEvent) => {
      console.warn(`Could not load sound (${soundPath}):`, error.message)
      onError?.(new Error(error.message))
    }

    audio.addEventListener("loadedmetadata", loadAudio)
    audio.addEventListener("error", processError)

    audioRef.current = audio

    return () => {
      audio.removeEventListener("loadedmetadata", loadAudio)
      audio.removeEventListener("error", processError)
      audio.pause()
    }
  }, [soundPath, onError, onLoad])

  // Update audio properties when they change
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume
    audio.playbackRate = playbackRate
  }, [volume, playbackRate])

  const play = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (interrupt && !audio.paused) {
        audio.pause()
        audio.currentTime = 0
      }
      await audio.play()
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error)
      console.warn(`Could not play sound (${soundPath}):`, errorMessage)
      onError?.(new Error(errorMessage))
    }
  }, [soundPath, interrupt, onError])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }, [])

  const pause = useCallback(() => {
    audioRef.current?.pause()
  }, [])

  return [
    play,
    {
      stop,
      pause,
      duration,
      isLoaded,
      audio: audioRef,
    },
  ] as const
}
