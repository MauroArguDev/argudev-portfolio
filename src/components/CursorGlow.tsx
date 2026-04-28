import { useEffect } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export function CursorGlow() {
  const mouseX = useMotionValue(-360)
  const mouseY = useMotionValue(-360)

  const x = useSpring(mouseX, { stiffness: 500, damping: 50 })
  const y = useSpring(mouseY, { stiffness: 500, damping: 50 })

  useEffect(() => {
    function handleMove(e: MouseEvent) {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMove, { passive: true })
    return () => window.removeEventListener("mousemove", handleMove)
  }, [mouseX, mouseY])

  return (
    <motion.div
      aria-hidden="true"
      style={{
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        background: "radial-gradient(circle, rgba(176,38,255,0.07) 0%, transparent 65%)",
      }}
      className="fixed top-0 left-0 z-0 hidden md:block w-[360px] h-[360px] rounded-full pointer-events-none"
    />
  )
}
