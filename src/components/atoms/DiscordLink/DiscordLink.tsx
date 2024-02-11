import Link from 'next/link'

type DiscordLinkProps = {
  /** Optional prop if you wish to wrap the Discord link in something other than "Discord". */
  children?: JSX.Element | string
}

const DiscordLink = (props: DiscordLinkProps) => {
  const { children } = props

  return (
    <Link href='https://discord.gg/wd67zUxPXn' target='_blank'>
      {children || 'Discord'}
    </Link>
  )
}

export default DiscordLink
