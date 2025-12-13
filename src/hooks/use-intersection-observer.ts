import { useCallback, useEffect, useRef } from "react"

export type UseIntersectionObserverOptions =
  globalThis.IntersectionObserverInit & {
    onIntersect?: (entries: IntersectionObserverEntry[]) => void
    enabled?: boolean
  }

export type UseIntersectionObserverReturn = {
  observe: (element: Element) => void
  unobserve: (element: Element) => void
  observeElements: (elements: Element[]) => void
  unobserveElements: (elements: Element[]) => void
  disconnect: () => void
  isObserving: boolean
}

export function useIntersectionObserver({
  onIntersect,
  enabled = true,
  root = null,
  rootMargin = "0px",
  threshold = 0,
}: UseIntersectionObserverOptions = {}): UseIntersectionObserverReturn {
  const observerRef = useRef<IntersectionObserver | null>(null)
  const observedElementsRef = useRef<Set<Element>>(new Set())

  const handleIntersect = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      onIntersect?.(entries)
    },
    [onIntersect],
  )

  useEffect(() => {
    if (!enabled) {
      if (observerRef.current) {
        observerRef.current.disconnect()
        observerRef.current = null
        observedElementsRef.current.clear()
      }
      return
    }

    const observer = new IntersectionObserver(handleIntersect, {
      root,
      rootMargin,
      threshold,
    })

    const previousElements = [...observedElementsRef.current]

    if (observerRef.current) {
      observerRef.current.disconnect()
    }

    observerRef.current = observer

    for (const element of previousElements) {
      if (document.contains(element)) {
        observer.observe(element)
      } else {
        observedElementsRef.current.delete(element)
      }
    }

    const currentObservedElements = observedElementsRef.current

    return () => {
      observer.disconnect()
      observerRef.current = null
      currentObservedElements.clear()
    }
  }, [enabled, root, rootMargin, threshold, handleIntersect])

  const observe = useCallback(
    (element: Element) => {
      if (!observerRef.current || !enabled) return

      observerRef.current.observe(element)
      observedElementsRef.current.add(element)
    },
    [enabled],
  )

  const unobserve = useCallback((element: Element) => {
    if (!observerRef.current) return

    observerRef.current.unobserve(element)
    observedElementsRef.current.delete(element)
  }, [])

  const observeElements = useCallback(
    (elements: Element[]) => {
      for (const element of elements) {
        observe(element)
      }
    },
    [observe],
  )

  const unobserveElements = useCallback(
    (elements: Element[]) => {
      for (const element of elements) {
        unobserve(element)
      }
    },
    [unobserve],
  )

  const disconnect = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observedElementsRef.current.clear()
    }
  }, [])

  return {
    observe,
    unobserve,
    observeElements,
    unobserveElements,
    disconnect,
    // eslint-disable-next-line react-hooks/refs
    isObserving: Boolean(observerRef.current && enabled),
  }
}
