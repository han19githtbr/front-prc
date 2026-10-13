import { useId } from 'react'

interface LogoMarkProps {
  className?: string
}

/** Folha com a nervura diagonal — marca do AgroRotação. */
export function LogoMark({ className }: LogoMarkProps) {
  const id = useId()
  return (
    <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`${id}-leaf`} x1="12%" y1="8%" x2="88%" y2="94%">
          <stop offset="0" stopColor="#2f8f4a" />
          <stop offset="0.55" stopColor="#14684a" />
          <stop offset="1" stopColor="#0b4a43" />
        </linearGradient>
      </defs>
      <path
        d="M93 7C52 4 9 22 9 62c0 20 14 32 34 31 36-2 53-36 50-86Z"
        fill={`url(#${id}-leaf)`}
      />
      <path d="M17 91 78 21" stroke="#fff" strokeWidth="4.2" strokeLinecap="round" fill="none" />
    </svg>
  )
}

interface LogoProps {
  /** "stacked": ícone acima do nome (splash/login). */
  className?: string
}

export default function Logo({ className }: LogoProps) {
  return (
    <div className={`logo ${className ?? ''}`.trim()}>
      <LogoMark className="logo__mark" />
      <span className="logo__word">AgroRotação</span>
    </div>
  )
}
