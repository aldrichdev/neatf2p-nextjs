import { WebclientBanner } from '@atoms/WebclientBanner'
import { Webclient } from '@atoms/Webclient'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { HideAdsFormGroup } from '@styledPages/Webclient.styled'
import { useState } from 'react'

const WebclientPage = () => {
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)

  const handleHideAdsCheck = () => {
    setHideAds(!hideAds)
  }

  const handleHideRunescapeBannersCheck = () => {
    setHideRunescapeBanners(!hideRunescapeBanners)
  }

  return (
    <ContentBlock>
      {!hideAds && <WebclientBanner bannerType='Ad' bannerPlacement='top' />}
      <Webclient />
      {!hideRunescapeBanners && <WebclientBanner bannerType='Runescape' bannerPlacement='bottom' />}
      <HideAdsFormGroup>
        <FormControlLabel control={<Checkbox color='success' onChange={handleHideAdsCheck} />} label='Hide Ads' />
        <FormControlLabel
          control={<Checkbox color='success' onChange={handleHideRunescapeBannersCheck} />}
          label='Hide Runescape Banners'
        />
      </HideAdsFormGroup>
    </ContentBlock>
  )
}

export default WebclientPage
