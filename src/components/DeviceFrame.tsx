interface Props {
  src: string
  alt: string
  className?: string
}

// A minimal iPhone outline around a screen recording
export function DeviceFrame({ src, alt, className = "" }: Props) {
  return (
    <div className={`relative rounded-[46px] bg-[#1b1b22] p-[9px] shadow-[0_40px_80px_rgb(0_0_0/0.55),inset_0_0_0_1px_rgb(255_255_255/0.12)] ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        width={360}
        height={782}
        className="block w-full h-auto rounded-[38px]"
      />
    </div>
  )
}
