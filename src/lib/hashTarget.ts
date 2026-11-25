/**
 * The #section the page was opened at (a link like /#work from the blog), or null.
 * Back/forward and reloads return null: the browser restores their scroll position itself.
 */
export function initialHashTarget(): string | null {
  const navigation = performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined
  if (navigation && navigation.type !== "navigate") return null
  return decodeURIComponent(window.location.hash.slice(1)) || null
}

/** Shows the content hidden on arrival at a #section (data-arriving, see main.tsx) with its rise. */
export function revealArrival() {
  const html = document.documentElement
  if (!("arriving" in html.dataset)) return
  delete html.dataset.arriving
  html.dataset.arrived = ""
}
