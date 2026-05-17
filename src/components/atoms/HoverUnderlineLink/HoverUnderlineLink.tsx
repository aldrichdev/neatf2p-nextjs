import { cn } from '@utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

interface HoverUnderlineProps {
  href: string
  children: ReactNode
  target?: string
  /** Optional Tailwind class(es) to override appearance of the component. */
  className?: string
}

/** A link that displays an underline only on hover.
 * TODO: Deprecated, use `StandardLink` component with `hoverUnderline=TRUE` instead of this.
 */
const HoverUnderlineLink = (props: HoverUnderlineProps) => {
  const { href, children, target, className } = props

  return (
    <Link
      href={href}
      target={target}
      className={cn(
        'text-primary-main hover:text-secondary-main cursor-pointer decoration-none hover:underline',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default HoverUnderlineLink
