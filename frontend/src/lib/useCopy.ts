import { useEffect, useRef, useState } from 'react'

/** Copy text to the clipboard and expose a short-lived `copied` flag for feedback. */
export function useCopy(resetMs = 2000) {
  const [copied, setCopied] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), resetMs)
    }).catch(() => {})
  }

  return { copied, copy }
}
