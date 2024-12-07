import { useRouter } from 'next/router'
import { NavUnorderedList, NavLink, NavContainer } from './MainNavigation.styled'
import { NavigationItem } from './MainNavigation.types'
import { MainNavigationDropdownItem } from 'src/components/MainNavigationDropdownItem'

const MainNavigation = () => {
  const { asPath } = useRouter()
  const navigationItems: NavigationItem[] = [
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
      path: '/events',
      text: 'Events',
    },
    {
      path: '/how-to-play',
      text: 'How to Play',
    },
    {
      text: 'Hiscores',
      subItems: [
        {
          path: '/hiscores',
          text: 'Player',
        },
        {
          path: '/npc-hiscores',
          text: 'NPC Kills',
        },
      ],
    },
    {
      text: 'Other Pages',
      subItems: [
        {
          path: '/hall-of-fame',
          text: 'Hall of Fame',
        },
        {
          path: '/bug-reports',
          text: 'Report a Bug',
        },
      ],
    },
  ]

  const isLinkActive = (linkPath: string): boolean => {
    // Special cases.
    if (linkPath === '/news' && asPath.startsWith('/news')) {
      return true
    }

    if (linkPath === '/hiscores' && (asPath.startsWith('/hiscores') || asPath.startsWith('/npc-hiscores'))) {
      return true
    }

    if (linkPath === '/how-to-play' && asPath.startsWith('/how-to-play')) {
      return true
    }

    return linkPath === asPath
  }

  return (
    <NavContainer>
      <NavUnorderedList>
        {navigationItems.map((item: NavigationItem) => (
          <li key={item.path || item.subItems?.[0]?.path}>
            {item.path ? (
              <NavLink href={item.path} isActive={isLinkActive(item.path)}>
                {item.text}
              </NavLink>
            ) : (
              <MainNavigationDropdownItem
                title={item.text}
                subItems={item.subItems || []}
                isItemActive={isLinkActive}
              />
            )}
          </li>
        ))}
      </NavUnorderedList>
    </NavContainer>
  )
}

export default MainNavigation
