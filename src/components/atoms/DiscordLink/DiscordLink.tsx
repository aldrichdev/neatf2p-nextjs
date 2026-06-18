import { StandardLink } from '@atoms/StandardLink'
import { DiscordInviteLink } from '@consts/discord'

type DiscordLinkProps = {
  /** Optional prop if you wish to wrap the Discord link in something other than "Discord". */
  children?: JSX.Element | string
}

const DiscordLink = (props: DiscordLinkProps) => {
  const { children } = props

  return (
    <StandardLink href={DiscordInviteLink} target='_blank' className='flex justify-center'>
      {children || 'Discord'}
    </StandardLink>
  )
}

export default DiscordLink
