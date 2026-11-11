import { useEffect, useRef } from "react"

interface Props {
  sources: { src: string; type: string }[]
  poster: string
  label: string
  className?: string
}

// A minimal iPhone outline around a looping screen recording.
// The video loads and plays only while it is on screen, and stays on its
// poster frame when the viewer asks the system to reduce motion.
export function DeviceFrame({ sources, poster, label, className = "" }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { threshold: 0.25 },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={`relative rounded-[46px] bg-[#1b1b22] p-[9px] shadow-[0_40px_80px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.12)] ${className}`}>
      <video
        ref={videoRef}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        aria-label={label}
        width={360}
        height={782}
        className="block w-full h-auto rounded-[38px]"
      >
        {sources.map(({ src, type }) => (
          <source key={src} src={src} type={type} />
        ))}
      </video>
    </div>
  )
}
