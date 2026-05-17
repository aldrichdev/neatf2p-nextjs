import { cn } from '@utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

interface StandardLinkProps {
  href: string
  children: ReactNode
  target?: string
  /** Optional Tailwind class(es) to override default appearance of the component. */
  className?: string
  /** If the link should only have an underline on hover. */
  hoverUnderline?: boolean
}

/** A basic link that utilizes the standard brand colors of the website. */
const StandardLink = (props: StandardLinkProps) => {
  const { href, children, target, className, hoverUnderline } = props

  return (
    <Link
      href={href}
      target={target || '_self'}
      className={cn(
        'cursor-pointer text-primary-main hover:text-secondary-main',
        hoverUnderline ? 'decoration-none hover:underline' : 'underline',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default StandardLink
