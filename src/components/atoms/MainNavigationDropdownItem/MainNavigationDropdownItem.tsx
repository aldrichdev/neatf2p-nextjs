import { useState } from 'react'
import { MainNavigationDropdownItemProps } from './MainNavigationDropdownItem.types'
import { Button } from '@ui/button'
import Link from 'next/link'
import clsx from 'clsx'

const MainNavigationDropdownItem = (props: MainNavigationDropdownItemProps) => {
  const { title, subItems, isItemActive } = props
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const isActive = subItems.some(subItem => isItemActive(subItem.path))

  const handleMouseEnter = () => {
    setIsDropdownVisible(true)
  }

  const handleMouseLeave = () => {
    setIsDropdownVisible(false)
  }

  return (
    <div className='relative' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Button
        variant='ghost'
        className={clsx(
          'h-10.75 rounded-none p-2 text-[18px] font-normal',
          'hover:bg-transparent hover:text-white',
          isActive ? 'text-secondary-main' : 'text-white',
          'md:h-auto',
        )}
      >
        {title}
      </Button>
      {isDropdownVisible && (
        <div className='absolute w-full'>
          <ul className='m-0 list-none p-0'>
            {subItems.map(subItem => (
              <li key={subItem.path} className='list-none bg-[#100c08]'>
                <Link
                  href={subItem.path}
                  target={subItem.opensInNewTab ? '_blank' : '_self'}
                  className='hover:text-nav-link-hover block p-2 text-[16px] text-white no-underline'
                >
                  {subItem.text}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default MainNavigationDropdownItem
