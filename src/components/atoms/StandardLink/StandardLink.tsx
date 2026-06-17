import { cn } from '@utils/cn'
import Link from 'next/link'
import { ReactNode } from 'react'

interface StandardLinkProps {
  href: string
  children: ReactNode
  target?: string
  download?: boolean
  /** If the link should do something when clicked. Usually pass an empty href in this case. */
  onClick?: () => void
  /** Whether the link should have an underline at all. */
  underline?: boolean
  /** If the link should only have an underline on hover. */
  hoverUnderline?: boolean
  /** Optional Tailwind class(es) to override default appearance of the component. */
  className?: string
}

/** A basic link that utilizes the standard brand colors of the website. */
const StandardLink = (props: StandardLinkProps) => {
  const { href, children, target, download, onClick, underline = true, hoverUnderline, className } = props

  return (
    <Link
      href={href}
      target={target || '_self'}
      download={download}
      onClick={onClick}
      className={cn(
        'text-primary-main hover:text-secondary-main cursor-pointer',
        hoverUnderline ? 'decoration-none hover:underline' : underline ? 'underline' : '',
        className,
      )}
    >
      {children}
    </Link>
  )
}

export default StandardLink
