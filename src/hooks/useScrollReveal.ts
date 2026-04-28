import { useInView, type UseInViewOptions } from "framer-motion"
import { useRef } from "react"

export function useScrollReveal<T extends Element = HTMLDivElement>(
  margin: UseInViewOptions["margin"] = "-80px"
) {
  const ref = useRef<T>(null)
  const inView = useInView(ref, { once: true, margin })
  return { ref, inView }
}
