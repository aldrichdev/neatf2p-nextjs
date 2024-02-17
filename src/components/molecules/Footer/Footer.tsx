import { useEffect, useState } from 'react'
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
  const [randomEasterEgg, setRandomEasterEgg] = useState<{ src: string; alt: string }>()

  const handleFooterHover = () => {
    setShowEasterEgg(true)
  }

  useEffect(() => {
    const easterEggs = [
      { src: '/img/FooterEasterEgg.png', alt: 'Bruh, do you even mine?' },
      { src: '/img/FooterEasterEgg2.png', alt: 'Selling strength pots' },
    ]

    setRandomEasterEgg(easterEggs[Math.floor(Math.random() * easterEggs.length)])
  }, [])

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
      {showEasterEgg && !!randomEasterEgg && <EasterEgg src={randomEasterEgg.src} alt={randomEasterEgg.alt} />}
    </FooterElement>
  )
}

export default Footer
