import { useState } from 'react'
import { MainNavigationDropdownItemProps } from './MainNavigationDropdownItem.types'
import { NavButton, NavDropdownMenu, NavItem, NavSubItem, NavSubLink } from './MainNavigationDropdownItem.styled'

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
    <NavItem onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <NavButton variant='text' isActive={isActive}>
        {title}
      </NavButton>
      {isDropdownVisible && (
        <NavDropdownMenu>
          <ul>
            {subItems.map(subItem => (
              <NavSubItem key={subItem.path}>
                <NavSubLink href={subItem.path}>{subItem.text}</NavSubLink>
              </NavSubItem>
            ))}
          </ul>
        </NavDropdownMenu>
      )}
    </NavItem>
  )
}

export default MainNavigationDropdownItem
