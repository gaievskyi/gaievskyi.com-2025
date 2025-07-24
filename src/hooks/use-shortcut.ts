import { useEffect, useState } from "react"

// https://github.com/microsoft/TypeScript/issues/17002
export const isReadonlyArray = (value: unknown): value is readonly unknown[] =>
  Array.isArray(value)

type UseShortcutOptions = {
  preventDefault?: boolean
  stopPropagation?: boolean
  delimiter?: string
}

type Shortcut = string | readonly string[]

export function useShortcut(
  shortcut: Shortcut,
  callback: (e: KeyboardEvent) => void,
  options: UseShortcutOptions = {
    delimiter: "+",
  },
) {
  const _shortcut: string = isReadonlyArray(shortcut)
    ? shortcut.join(options?.delimiter)
    : shortcut
  const [isPressed, setIsPressed] = useState(false)
  const { preventDefault = true, stopPropagation = true } = options || {}

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const keys = _shortcut.toLowerCase().split("+")
      const key = keys.at(-1)
      const modifiers = keys.slice(0, -1)

      const isModifierMatch = modifiers.every((mod) => {
        switch (mod) {
          case "cmd": {
            return e.metaKey || e.ctrlKey
          }
          case "alt": {
            return e.altKey
          }
          case "shift": {
            return e.shiftKey
          }
          default: {
            return false
          }
        }
      })

      if (e.key.toLowerCase() === key && isModifierMatch) {
        if (preventDefault) e.preventDefault()
        if (stopPropagation) e.stopPropagation()
        setIsPressed(true)
        callback(e)
      }
    }

    globalThis.addEventListener("keydown", onKeyDown)

    return () => {
      globalThis.removeEventListener("keydown", onKeyDown)
    }
  }, [shortcut, callback, preventDefault, stopPropagation, _shortcut])

  return isPressed
}
