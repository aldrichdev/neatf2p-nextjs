import { WebclientBanner } from '@atoms/WebclientBanner'
import { Webclient } from '@atoms/Webclient'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { HideAdsFormGroup } from '@styledPages/Webclient.styled'
import { useState } from 'react'
import useAuthentication from '@hooks/useAuthentication'
import { Spinner } from '@molecules/Spinner'
import { MustBeAdminBlock } from '@molecules/MustBeAdminBlock'

const WebclientPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)
  const user = useAuthentication(setIsLoading)

  const handleHideAdsCheck = () => {
    setHideAds(!hideAds)
  }

  const handleHideRunescapeBannersCheck = () => {
    setHideRunescapeBanners(!hideRunescapeBanners)
  }

  if (isLoading) {
    return <Spinner />
  }

  // TODO: Remove this and isLoading/user logic when ready for launch
  if (!user.isAdmin) {
    return <MustBeAdminBlock textColor='white' />
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
