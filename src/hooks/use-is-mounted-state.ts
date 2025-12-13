import { useEffect, useState } from "react"

export function useIsMountedState(): boolean {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-you-might-not-need-an-effect/no-initialize-state
    setIsMounted(true)
  }, [])

  return isMounted
}
