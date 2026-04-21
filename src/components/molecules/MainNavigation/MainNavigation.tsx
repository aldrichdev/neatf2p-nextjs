import { useRouter } from 'next/router'
import { NavUnorderedList, NavLink, NavContainer } from './MainNavigation.styled'
import { NavigationItem } from './MainNavigation.types'
import { MainNavigationDropdownItem } from '@atoms/MainNavigationDropdownItem'
import { useEffect } from 'react'

const MainNavigation = () => {
  const { asPath, prefetch } = useRouter()

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
      path: '/hiscores',
      text: 'Hiscores',
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
        {
          path: '/tournament-info',
          text: 'Tournaments',
        },
        {
          path: 'https://1drv.ms/x/c/0cb70e2f2bdaea22/EfbycDseWvJIpIkJt5itoNsBPD5TaJHX0bTjNb7Heor5UA?e=7zaO8Q',
          text: 'Price Guide',
          opensInNewTab: true,
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

  useEffect(() => {
    // Warm up nav route chunks to remove delay previously seen when clicking around
    navigationItems.forEach(item => {
      if (item.path) prefetch(item.path)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <NavContainer>
      <NavUnorderedList>
        {navigationItems.map((item: NavigationItem) => (
          <li key={item.path || item.subItems?.[0]?.path}>
            {item.path ? (
              <NavLink
                href={item.path}
                isActive={isLinkActive(item.path)}
                target={item.opensInNewTab ? '_blank' : '_self'}
              >
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
