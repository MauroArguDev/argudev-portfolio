import { useEffect } from "react"

/**
 * Scrolls to the URL's #section once the lazy sections exist. Arriving from the blog at
 * /#work, the browser looks for #work before the lazy Work chunk has rendered and gives up.
 * Render it inside the same Suspense boundary as the sections so its effect runs after them.
 * Back/forward and reloads are left alone: the browser restores their scroll position.
 */
export function ScrollToHash() {
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
    if (navigation && navigation.type !== "navigate") return
    const id = decodeURIComponent(window.location.hash.slice(1))
    // Instant, like the browser's own jump to a #fragment on arrival
    if (id) document.getElementById(id)?.scrollIntoView({ behavior: "instant" })
  }, [])

  return null
}
