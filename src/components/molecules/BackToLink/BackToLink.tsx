import { StandardLink } from '@atoms/StandardLink'
import { cn } from '@utils/cn'

interface BackToLinkProps {
  href: string
  children: string
  className?: string
}

const BackToLink = ({ href, children, className }: BackToLinkProps) => (
  <StandardLink href={href} underline={false} className={cn('mt-4 block text-sm font-normal', className)}>
    {children}
  </StandardLink>
)

export default BackToLink
