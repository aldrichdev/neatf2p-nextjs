import { useRouter } from 'next/router'
import { NavUnorderedList, NavLink } from './MainNavigation.styled'

const MainNavigation = () => {
  const { asPath } = useRouter()
  const navigationLinks = [
    {
      path: '/',
      text: 'Home',
    },
    {
      path: '/about',
      text: 'About',
    },
    {
      path: '/news',
      text: 'News',
    },
    {
      path: '/how-to-play',
      text: 'How to Play',
    },
    {
      path: '/hiscores',
      text: 'Hiscores',
    },
    {
      path: '/bug-reports',
      text: 'Report a Bug',
    },
  ]

  const isLinkActive = (linkPath: string): boolean => {
    // Special cases.
    if (linkPath === '/news' && asPath.startsWith('/news')) {
      return true
    }

    if (linkPath === '/hiscores' && asPath.startsWith('/hiscores')) {
      return true
    }

    if (linkPath === '/how-to-play' && asPath.startsWith('/how-to-play')) {
      return true
    }

    return linkPath === asPath
  }

  return (
    <NavUnorderedList>
      {navigationLinks.map((link: { path: string; text: string }) => (
        <li key={link.path}>
          <NavLink href={link.path} isActive={isLinkActive(link.path)}>
            {link.text}
          </NavLink>
        </li>
      ))}
    </NavUnorderedList>
  )
}

export default MainNavigation
