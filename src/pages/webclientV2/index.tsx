import { WebclientBanner } from '@atoms/WebclientBanner'
import { Webclient } from '@atoms/Webclient'
import Checkbox from '@mui/material/Checkbox'
import { FormControlLabel } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { HideAdsFormGroup } from '@styledPages/Webclient.styled'
import { useState } from 'react'
import { renderHead } from '@helpers/renderUtils'
import { getProtocol } from '@helpers/envUtils'

const WebclientV2Page = () => {
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)
  const protocol = getProtocol()
  const webHost = process.env.NEXT_PUBLIC_WEBSITE_HOST
  const gameServerHost = process.env.NEXT_PUBLIC_GAME_SERVER_HOST
  const gameServerRsaPublicKey = process.env.NEXT_PUBLIC_GAME_SERVER_RSA_PUBLIC_KEY
  const webclientUrl = `${protocol}://${webHost}/client/index.html#free,${gameServerHost},43494,65537,${gameServerRsaPublicKey},true`

  const handleHideAdsCheck = () => {
    setHideAds(!hideAds)
  }

  const handleHideRunescapeBannersCheck = () => {
    setHideRunescapeBanners(!hideRunescapeBanners)
  }

  return (
    <>
      {renderHead('Web Client V2')}
      <ContentBlock>
        {!hideAds && <WebclientBanner bannerType='Ad' bannerPlacement='top' />}
        <Webclient url={webclientUrl} />
        {!hideRunescapeBanners && <WebclientBanner bannerType='Runescape' bannerPlacement='bottom' />}
        <HideAdsFormGroup>
          <FormControlLabel control={<Checkbox color='success' onChange={handleHideAdsCheck} />} label='Hide Ads' />
          <FormControlLabel
            control={<Checkbox color='success' onChange={handleHideRunescapeBannersCheck} />}
            label='Hide Runescape Banners'
          />
        </HideAdsFormGroup>
      </ContentBlock>
    </>
  )
}

export default WebclientV2Page
