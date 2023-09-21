import { useRouter } from "next/router"
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
      text: 'About'
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
      text: 'Report a Bug'
    },
  ]

  return (
    <NavUnorderedList>
      {navigationLinks.map((link: { path: string; text: string; }) => (
        <li key={link.path}>
          <NavLink href={link.path} isActive={link.path === asPath}>{link.text}</NavLink>
        </li>
      ))}
    </NavUnorderedList>
  )
}

export default MainNavigation