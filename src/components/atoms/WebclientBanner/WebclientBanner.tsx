import { BannerImage, BannerLink } from './WebclientBanner.styled'
import { WebclientBannerProps } from './WebclientBanner.types'
import { useEffect, useState } from 'react'

const WebclientBanner = (props: WebclientBannerProps) => {
  const { bannerType, bannerPlacement } = props
  const [randomBanner, setRandomBanner] = useState('')
  const runescapeBanners = [
    '/img/banners/runescape/Attachmentwarning.gif',
    '/img/banners/runescape/Banned.gif',
    '/img/banners/runescape/Ccfraud.gif',
    '/img/banners/runescape/Cheatwarn.gif',
    '/img/banners/runescape/Dontbuysellcharacters.gif',
    '/img/banners/runescape/Dontshare.gif',
    '/img/banners/runescape/Gory.gif',
    '/img/banners/runescape/Moremonsters.gif',
    '/img/banners/runescape/Moretoexplore.gif',
    '/img/banners/runescape/Moreweapons.gif',
    '/img/banners/runescape/Newquests2.gif',
    '/img/banners/runescape/Newskills.gif',
    '/img/banners/runescape/Passadvice.gif',
    '/img/banners/runescape/Wizard.gif',
  ]
  const adBanners = [
    '/img/banners/ad/1.gif',
    '/img/banners/ad/2.gif',
    '/img/banners/ad/3.gif',
    '/img/banners/ad/4.gif',
    '/img/banners/ad/5.gif',
    '/img/banners/ad/6.gif',
    '/img/banners/ad/7.gif',
    '/img/banners/ad/8.gif',
    '/img/banners/ad/9.gif',
    '/img/banners/ad/10.gif',
    '/img/banners/ad/11.gif',
    '/img/banners/ad/12.gif',
  ]
  const choices = bannerType === 'Runescape' ? runescapeBanners : adBanners
  const linkUrl =
    bannerType === 'Runescape'
      ? 'https://classic.runescape.wiki/w/Special:Random'
      : 'https://www.webdesignmuseum.org/exhibitions/web-banners-in-the-90s'

  useEffect(() => {
    setRandomBanner(choices[Math.floor(Math.random() * choices.length)])
  }, [choices])

  return (
    <BannerLink href={linkUrl} target='_blank' bannerPlacement={bannerPlacement}>
      <BannerImage src={randomBanner} alt={`${bannerType} Banner`} />
    </BannerLink>
  )
}

export default WebclientBanner
