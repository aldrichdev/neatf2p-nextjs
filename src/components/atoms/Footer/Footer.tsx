import { useEffect, useState } from 'react'
import { EasterEggObject } from './Footer.types'
import clsx from 'clsx'
import { StandardLink } from '@atoms/StandardLink'
import { DiscordInviteLink } from '@consts/discord'

const Footer = () => {
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const [randomEasterEgg, setRandomEasterEgg] = useState<EasterEggObject>()
  const animationDurationSeconds = 5
  const listItemClassName = 'list-none my-5 text-center md:text-left'

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
    <footer
      className={clsx(
        'relative flex flex-col items-center justify-center',
        'bg-stone-950 text-white',
        'overflow-hidden px-20 py-10',
        'md:flex-row',
      )}
      onMouseEnter={handleFooterHover}
    >
      <img src='/img/NeatF2PLogoTransparent.png' alt='Neat F2P Logo' className='h-36 w-45' />
      <div
        className={clsx(
          'bg-background-paper self-stretch',
          'my-10 mb-5 h-px w-full rotate-180',
          'md:mx-20 md:my-0 md:h-auto md:w-px md:transform-none',
        )}
      />
      <ul className='m-0 list-none p-0'>
        <li className={listItemClassName}>
          <StandardLink href={DiscordInviteLink} target='_blank' hoverUnderline className='text-white'>
            Discord
          </StandardLink>
        </li>
        <li className={listItemClassName}>
          <StandardLink href='https://www.youtube.com/@NeatF2P' target='_blank' hoverUnderline className='text-white'>
            YouTube
          </StandardLink>
        </li>
        <li className={listItemClassName}>
          <StandardLink
            href='https://github.com/aldrichdev/Neat-F2P'
            target='_blank'
            hoverUnderline
            className='text-white'
          >
            GitHub (Game)
          </StandardLink>
        </li>
        <li className={listItemClassName}>
          <StandardLink
            href='https://github.com/aldrichdev/neatf2p-nextjs'
            target='_blank'
            hoverUnderline
            className='text-white'
          >
            GitHub (Website)
          </StandardLink>
        </li>
      </ul>
      {showEasterEgg && !!randomEasterEgg && (
        <img
          src={randomEasterEgg.src}
          alt={randomEasterEgg.alt}
          style={{ animationDuration: `${animationDurationSeconds}s` }}
          className={clsx(
            'hidden',
            'md:animate-footer-character-pop-up md:absolute md:top-100 md:block',
            randomEasterEgg.position === 'left' && 'md:left-50',
            randomEasterEgg.position === 'right' && 'md:right-50',
          )}
        />
      )}
    </footer>
  )
}

export default Footer
