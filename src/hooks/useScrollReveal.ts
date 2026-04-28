import { useInView, type UseInViewOptions } from "framer-motion"
import { useRef } from "react"

export function useScrollReveal(margin: UseInViewOptions["margin"] = "-80px") {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin })
  return { ref, inView }
}
