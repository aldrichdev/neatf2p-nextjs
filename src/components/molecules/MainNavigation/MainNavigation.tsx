import { useRouter } from 'next/router'
import { NavigationItem } from './MainNavigation.types'
import { MainNavigationDropdownItem } from '@atoms/MainNavigationDropdownItem'
import Link from 'next/link'
import { cn } from '@utils/cn'
import { AccountWidget } from '@molecules/AccountWidget'
import useAuthentication from '@hooks/useAuthentication'
import { MobileNavTrigger } from '@atoms/MobileNavTrigger'
import { navigationItems } from '@consts/navigation'
import { isLinkActive } from '@utils/navigation'

const MainNavigation = () => {
  const { asPath } = useRouter()
  const user = useAuthentication()

  return (
    <div className='bg-dark-gray flex items-center justify-between px-5 py-3'>
      <MobileNavTrigger />
      <span className='flex items-center font-medium whitespace-nowrap text-white'>Neat F2P</span>
      <ul className='ml-auto hidden items-center gap-5 lg:flex'>
        {navigationItems.map((item: NavigationItem) => (
          <li key={item.path || item.subItems?.[0]?.path} className='flex items-center'>
            {item.path ? (
              <Link
                href={item.path}
                target={item.opensInNewTab ? '_blank' : '_self'}
                className={cn(
                  'hover:text-nav-link-hover p-2 text-lg font-normal text-white',
                  isLinkActive(asPath, item.path) ? 'text-secondary-main hover:text-secondary-main' : '',
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
      <div className='flex items-center justify-center lg:ml-5'>
        <AccountWidget user={user} />
      </div>
    </div>
  )
}

export default MainNavigation
