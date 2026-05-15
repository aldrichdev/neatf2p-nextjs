import { useRouter } from 'next/router'
import { NavigationItem } from './MainNavigation.types'
import { MainNavigationDropdownItem } from '@atoms/MainNavigationDropdownItem'
import { useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@utils/cn'

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
    <div className='flex justify-center'>
      <ul
        className='list-none py-3 px-0 m-0 flex flex-wrap justify-center items-center gap-4 bg-dark-gray border-0 
        w-full md:border-solid md:border-2 md:border-black md:gap-8 lg:flex-nowrap'
      >
        {navigationItems.map((item: NavigationItem) => (
          <li key={item.path || item.subItems?.[0]?.path} className='flex items-center'>
            {item.path ? (
              <Link
                href={item.path}
                target={item.opensInNewTab ? '_blank' : '_self'}
                className={cn(
                  'text-white text-lg font-normal p-2 hover:text-nav-link-hover',
                  isLinkActive(item.path) ? 'text-secondary-main hover:text-secondary-main' : '',
                )}
              >
                {item.text}
              </Link>
            ) : (
              <MainNavigationDropdownItem
                title={item.text}
                subItems={item.subItems || []}
                isItemActive={isLinkActive}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MainNavigation
