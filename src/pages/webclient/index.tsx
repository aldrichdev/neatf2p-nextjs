import { WebclientBanner } from '@atoms/WebclientBanner'
import { Webclient } from '@atoms/Webclient'
import Checkbox from '@mui/material/Checkbox'
import { Button, FormControlLabel } from '@mui/material'
import { ContentBlock } from '@atoms/ContentBlock'
import { HideAdsFormGroup } from '@styledPages/Webclient.styled'
import { useState } from 'react'
import { Modal } from '@molecules/Modal'
import Link from 'next/link'

const WebclientPage = () => {
  const [hideAds, setHideAds] = useState(false)
  const [hideRunescapeBanners, setHideRunescapeBanners] = useState(false)
  const [showHelpModal, setShowHelpModal] = useState(false)
  const gameServerHost = process.env.NEXT_PUBLIC_GAME_SERVER_HOST
  const gameServerRsaPublicKey = process.env.NEXT_PUBLIC_GAME_SERVER_RSA_PUBLIC_KEY
  const webclientUrl = `https://${gameServerHost}/index.html#free,${gameServerHost},43494,65537,${gameServerRsaPublicKey},true`

  const handleHideAdsCheck = () => {
    setHideAds(!hideAds)
  }

  const handleHideRunescapeBannersCheck = () => {
    setHideRunescapeBanners(!hideRunescapeBanners)
  }

  const handleWebclientNotWorkingButtonClick = () => {
    setShowHelpModal(true)
  }

  const handleHelpModalClose = () => {
    setShowHelpModal(false)
    document.body.style.overflow = 'unset'
  }

  if (showHelpModal) {
    // Prevent scrolling
    document.body.style.overflow = 'hidden'
  }

  return (
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
        <FormControlLabel
          control={<Button variant='text' onClick={handleWebclientNotWorkingButtonClick} />}
          label='Webclient Not Working?'
        />
      </HideAdsFormGroup>
      <Modal
        open={showHelpModal}
        handleClose={handleHelpModalClose}
        heading='Webclient Not Loading?'
        body={
          <p>
            If the webclient is not loading, you need to accept a privacy warning first.{' '}
            <Link href={webclientUrl} target='_blank'>
              Click here
            </Link>{' '}
            and you will see a privacy warning. Click the <strong>Advanced</strong> button on the page and then click{' '}
            <strong>Proceed to...</strong> to accept the privacy issue. The game client should then load. Close the
            current tab and go back to the Neat webclient and refresh the page, and the client should load.
          </p>
        }
      />
    </ContentBlock>
  )
}

export default WebclientPage
