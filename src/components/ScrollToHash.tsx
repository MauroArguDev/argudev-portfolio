import { useLayoutEffect } from "react"
import { initialHashTarget, revealArrival } from "@/lib/hashTarget"

/**
 * Scrolls to the #section the page was opened at, once the lazy sections exist (the browser
 * looks for #work before the lazy Work chunk has rendered and gives up), then reveals the
 * content main.tsx hid until now. Render it inside the same Suspense boundary as the sections
 * so it runs after them.
 */
export function ScrollToHash() {
  useLayoutEffect(() => {
    const id = initialHashTarget()
    // Instant, like the browser's own jump to a #fragment on arrival
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
    revealArrival()
  }, [])

  return null
}
