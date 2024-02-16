import { useState } from 'react'
import {
  EasterEgg,
  FooterElement,
  FooterLink,
  FooterNavigation,
  FooterNavigationItem,
  Logo,
  VerticalDivider,
} from './Footer.styled'

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  const handleFooterHover = () => {
    setShowEasterEgg(true)
  }

  return (
    <FooterElement onMouseEnter={handleFooterHover}>
      <Logo src='/img/NeatF2PLogoTransparent.png' alt='Neat F2P Logo' />
      <VerticalDivider orientation='vertical' flexItem />
      <FooterNavigation>
        <FooterNavigationItem>
          <FooterLink href='https://discord.gg/wd67zUxPXn' target='_blank'>
            Discord
          </FooterLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <FooterLink href='https://www.youtube.com/@NeatF2P' target='_blank'>
            YouTube
          </FooterLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <FooterLink href='https://github.com/aldrichdev/Neat-F2P' target='_blank'>
            GitHub (Game)
          </FooterLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <FooterLink href='https://github.com/aldrichdev/neatf2p-nextjs' target='_blank'>
            GitHub (Website)
          </FooterLink>
        </FooterNavigationItem>
      </FooterNavigation>
      {showEasterEgg && <EasterEgg src='/img/FooterEasterEgg.png' alt='Bruh, do you even mine?' />}
    </FooterElement>
  )
}

export default Footer
