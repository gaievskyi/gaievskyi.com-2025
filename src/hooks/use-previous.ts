import { useState } from "react"

export function usePrevious<T>(value: T): T {
  const [state, setState] = useState({
    value: value,
    prev: value,
  })

  const current = state.value

  if (value !== current) {
    setState({
      value: value,
      prev: current,
    })
  }

  return state.prev
}
