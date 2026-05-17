import { HoverUnderlineLink } from '@atoms/HoverUnderlineLink'
import { useEffect, useState } from 'react'
import {
  EasterEgg,
  FooterElement,
  FooterNavigation,
  FooterNavigationItem,
  Logo,
  VerticalDivider,
} from './Footer.styled'
import { EasterEggObject } from './Footer.types'

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [randomEasterEgg, setRandomEasterEgg] = useState<EasterEggObject>()
  const animationDurationSeconds = 5

  const handleFooterHover = () => {
    if (showEasterEgg === false) {
      setShowEasterEgg(true)
      setTimeout(
        () => {
          setShowEasterEgg(false)
        },
        (animationDurationSeconds - 0.5) * 1000,
      )
    }
  }

  useEffect(() => {
    const easterEggs: EasterEggObject[] = [
      { src: '/img/FooterEasterEgg.png', alt: 'Bruh, do you even mine?', position: 'left' },
      { src: '/img/FooterEasterEgg2.png', alt: 'Selling strength pots', position: 'right' },
      { src: '/img/FooterEasterEgg3.png', alt: 'Selling rare black lobster 1200gp', position: 'left' },
    ]

    setRandomEasterEgg(easterEggs[Math.floor(Math.random() * easterEggs.length)])
  }, [showEasterEgg])

  return (
    <FooterElement onMouseEnter={handleFooterHover}>
      <Logo src='/img/NeatF2PLogoTransparent.png' alt='Neat F2P Logo' />
      <VerticalDivider orientation='vertical' flexItem />
      <FooterNavigation>
        <FooterNavigationItem>
          <HoverUnderlineLink href='https://discord.gg/wd67zUxPXn' target='_blank' className='text-white'>
            Discord
          </HoverUnderlineLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <HoverUnderlineLink href='https://www.youtube.com/@NeatF2P' target='_blank' className='text-white'>
            YouTube
          </HoverUnderlineLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <HoverUnderlineLink href='https://github.com/aldrichdev/Neat-F2P' target='_blank' className='text-white'>
            GitHub (Game)
          </HoverUnderlineLink>
        </FooterNavigationItem>
        <FooterNavigationItem>
          <HoverUnderlineLink
            href='https://github.com/aldrichdev/neatf2p-nextjs'
            target='_blank'
            className='text-white'
          >
            GitHub (Website)
          </HoverUnderlineLink>
        </FooterNavigationItem>
      </FooterNavigation>
      {showEasterEgg && !!randomEasterEgg && (
        <EasterEgg
          src={randomEasterEgg.src}
          alt={randomEasterEgg.alt}
          position={randomEasterEgg.position}
          animationDurationSeconds={animationDurationSeconds}
        />
      )}
    </FooterElement>
  )
}

export default Footer
