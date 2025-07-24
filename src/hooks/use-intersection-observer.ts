import { useRef, useCallback, useEffect } from "react"

export type UseIntersectionObserverOptions =
  globalThis.IntersectionObserverInit & {
    /**
     * Callback function called when intersection changes occur
     */
    onIntersect?: (entries: IntersectionObserverEntry[]) => void
    /**
     * Whether the observer should be enabled
     * @default true
     */
    enabled?: boolean
  }

export type UseIntersectionObserverReturn = {
  /**
   * Observe a single element
   */
  observe: (element: Element) => void
  /**
   * Unobserve a single element
   */
  unobserve: (element: Element) => void
  /**
   * Observe multiple elements
   */
  observeElements: (elements: Element[]) => void
  /**
   * Unobserve multiple elements
   */
  unobserveElements: (elements: Element[]) => void
  /**
   * Disconnect the observer and unobserve all elements
   */
  disconnect: () => void
  /**
   * Check if the observer is currently active
   */
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
    isObserving: Boolean(observerRef.current && enabled),
  }
}
