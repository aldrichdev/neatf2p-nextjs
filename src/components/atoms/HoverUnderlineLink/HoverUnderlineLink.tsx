import { cn } from '@utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HoverUnderlineProps {
  href: string
  children: ReactNode
  target?: string
  textColorStyle?: string
  hoverTextColorStyle?: string
}

/** A link that displays an underline only on hover. */
const HoverUnderlineLink = (props: HoverUnderlineProps) => {
  const { href, children, target, textColorStyle, hoverTextColorStyle } = props

  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'cursor-pointer decoration-none hover:underline',
        textColorStyle || 'text-primary-main',
        hoverTextColorStyle || 'hover:text-secondary-main',
      )}
    >
      {children}
    </Link>
  )
}

export default HoverUnderlineLink
