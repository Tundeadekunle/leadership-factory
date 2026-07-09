'use client'

import { useEffect, useRef, useState } from 'react'

type RevealSectionProps = {
  as?: keyof JSX.IntrinsicElements
  className?: string
  style?: React.CSSProperties
  children: React.ReactNode
  threshold?: number
  rootMargin?: string
  delay?: number
}

export default function RevealSection({
  as = 'section',
  className = '',
  style,
  children,
  threshold = 0.15,
  rootMargin = '0px 0px -120px 0px',
  delay = 0,
}: RevealSectionProps) {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const element = ref.current
    if (!element || visible) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold, rootMargin }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold, rootMargin, visible])

  const Tag = as as keyof JSX.IntrinsicElements

  const mergedStyle = {
    ...style,
    transitionDelay: `${delay}ms`,
  }

  return (
    <Tag
      ref={ref as any}
      className={`${className} section-reveal${visible ? ' section-reveal-visible' : ''}`.trim()}
      style={mergedStyle}
    >
      {children}
    </Tag>
  )
}
