import { StandardLink } from '@atoms/StandardLink'

interface BackToLinkProps {
  href: string
  children: string
}

const BackToLink = ({ href, children }: BackToLinkProps) => (
  <StandardLink href={href} underline={false} className='mt-4 block text-sm'>
    {children}
  </StandardLink>
)

export default BackToLink
