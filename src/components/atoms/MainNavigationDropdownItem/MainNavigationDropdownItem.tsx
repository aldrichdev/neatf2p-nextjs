import { useState, useEffect, useRef } from 'react'
import { MainNavigationDropdownItemProps } from './MainNavigationDropdownItem.types'
import { Button } from '@ui/button'
import Link from 'next/link'
import clsx from 'clsx'

const MainNavigationDropdownItem = (props: MainNavigationDropdownItemProps) => {
  const { title, subItems, isItemActive } = props
  const [isDropdownVisible, setIsDropdownVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isActive = subItems.some(subItem => isItemActive(subItem.path))

  const handleClick = () => {
    setIsDropdownVisible(prev => !prev)
  }

  const handleSubItemClick = () => {
    setIsDropdownVisible(false)
  }

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsDropdownVisible(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [])

  return (
    <div ref={containerRef} className='group relative'>
      <Button
        variant='ghost'
        onClick={handleClick}
        className={clsx(
          'h-10.75 rounded-none p-2 text-[18px] font-normal',
          'hover:text-secondary-main hover:bg-transparent',
          isActive ? 'text-secondary-main' : 'text-white',
          'md:h-auto',
        )}
      >
        {title}
      </Button>
      <div
        className={clsx('absolute w-full', isDropdownVisible ? 'block' : 'hidden', 'lg:hidden lg:group-hover:block')}
      >
        <ul className='m-0 list-none p-0'>
          {subItems.map(subItem => (
            <li key={subItem.path} className='list-none bg-[#100c08]'>
              <Link
                href={subItem.path}
                target={subItem.opensInNewTab ? '_blank' : '_self'}
                onClick={handleSubItemClick}
                className='hover:text-nav-link-hover block p-2 text-[16px] text-white no-underline'
              >
                {subItem.text}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default MainNavigationDropdownItem
