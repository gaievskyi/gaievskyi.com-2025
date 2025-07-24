import { useEffect, useState } from "react"

export function useScroll() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY / document.documentElement.scrollHeight)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { scrollY, scrollYPercentage: scrollY * 100 }
}
