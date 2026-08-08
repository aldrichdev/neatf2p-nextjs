import { NavigationItem } from '@molecules/MainNavigation/MainNavigation.types'
import { ExternalLink } from 'lucide-react'

export const navigationItems: NavigationItem[] = [
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
    text: 'Community',
    subItems: [
      {
        path: '/hall-of-fame',
        text: 'Hall of Fame',
      },
      {
        path: '/tournament-info',
        text: 'Tournaments',
      },
      {
        path: 'https://1drv.ms/x/c/0cb70e2f2bdaea22/EfbycDseWvJIpIkJt5itoNsBPD5TaJHX0bTjNb7Heor5UA?e=7zaO8Q',
        text: (
          <div className='flex items-center gap-1'>
            Price Guide <ExternalLink className='size-4' />
          </div>
        ),
        opensInNewTab: true,
      },
    ],
  },
]
